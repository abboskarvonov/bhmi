<?php

namespace Tests\Feature;

use App\Models\About;
use App\Models\Article;
use App\Models\ArticleSubmission;
use App\Models\JournalIssue;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create()->forceFill(['isAdmin' => 1]);
    }

    private function journal(string $name = 'Jurnal 1'): JournalIssue
    {
        return JournalIssue::create(['name' => $name, 'date' => '2026-01-01']);
    }

    public function test_articles_index_is_paginated_and_searches_all_pages(): void
    {
        $journal = $this->journal();
        foreach (range(1, 25) as $i) {
            Article::create([
                'name' => "Maqola {$i}", 'author' => 'Muallif', 'pages' => '1-2',
                'date' => '2026-01-01', 'journal_issue_id' => $journal->id,
            ]);
        }
        Article::create([
            'name' => 'Noyob mavzu', 'author' => 'Boshqa', 'pages' => '3',
            'date' => '2026-01-01', 'journal_issue_id' => $journal->id,
        ]);

        $this->actingAs($this->admin())
            ->get('/dashboard/articles?page=3')
            ->assertInertia(fn (Assert $page) => $page
                ->component('Articles/Index')
                ->where('articles.current_page', 3)
                ->where('articles.last_page', 3)
                ->where('articles.total', 26)
                ->has('articles.data', 6));

        $this->actingAs($this->admin())
            ->get('/dashboard/articles?search=noyob&sort=name&direction=desc')
            ->assertInertia(fn (Assert $page) => $page
                ->where('articles.total', 1)
                ->where('articles.data.0.name', 'Noyob mavzu')
                ->where('filters.sort', 'name')
                ->where('filters.direction', 'desc'));
    }

    public function test_invalid_sort_column_is_ignored(): void
    {
        $this->actingAs($this->admin())
            ->get('/dashboard/journal-issues?sort=password&direction=asc')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->where('filters.sort', null));
    }

    public function test_about_type_stores_text_and_article_optional_fields_can_be_empty(): void
    {
        $this->actingAs($this->admin())
            ->post('/dashboard/abouts', ['name' => 'Haqida', 'type' => 'Jurnal haqida', 'content' => '<p>x</p>'])
            ->assertRedirect('/dashboard/abouts');

        $this->assertSame('Jurnal haqida', About::first()->type);

        $this->actingAs($this->admin())
            ->post('/dashboard/journal-issues', ['name' => 'Sanasiz jurnal'])
            ->assertRedirect('/dashboard/journal-issues');

        $this->actingAs($this->admin())
            ->post('/dashboard/articles', [
                'name' => 'Kalitsiz', 'author' => 'A', 'pages' => '1',
                'date' => '2026-01-01', 'journal_issue_id' => JournalIssue::first()->id,
            ])
            ->assertRedirect('/dashboard/articles');
    }

    public function test_menu_show_route_does_not_exist(): void
    {
        $this->actingAs($this->admin())->get('/dashboard/menus/1')->assertMethodNotAllowed();
    }

    public function test_submission_files_are_private(): void
    {
        Storage::fake('local');
        Storage::fake('public');

        $owner = User::factory()->create();
        $this->actingAs($owner)->post('/submit-article', [
            'name' => 'Qo\'lyozma',
            'file_url' => UploadedFile::fake()->create('m.pdf', 100, 'application/pdf'),
        ])->assertRedirect('/my-submissions');

        $submission = ArticleSubmission::first();
        Storage::disk('local')->assertExists($submission->file_url);
        Storage::disk('public')->assertMissing($submission->file_url);

        $url = "/submissions/{$submission->id}/download";
        $this->actingAs($owner)->get($url)->assertOk();
        $this->actingAs($this->admin())->get($url)->assertOk();
        $this->actingAs(User::factory()->create())->get($url)->assertForbidden();
    }

    public function test_is_admin_cannot_be_mass_assigned(): void
    {
        $user = User::create(['name' => 'X', 'email' => 'x@x.uz', 'password' => 'secret123', 'isAdmin' => 1]);

        $this->assertSame(0, $user->fresh()->isAdmin);
    }

    public function test_deleting_journal_removes_article_files(): void
    {
        Storage::fake('public');
        Storage::disk('public')->put('article/a.pdf', 'x');
        Storage::disk('public')->put('journal/j.pdf', 'x');

        $journal = JournalIssue::create(['name' => 'J', 'date' => '2026-01-01', 'file_url' => 'journal/j.pdf']);
        Article::create([
            'name' => 'A', 'author' => 'B', 'pages' => '1', 'date' => '2026-01-01',
            'journal_issue_id' => $journal->id, 'file_url' => 'article/a.pdf',
        ]);

        $this->actingAs($this->admin())->delete("/dashboard/journal-issues/{$journal->id}");

        $this->assertSame(0, Article::count());
        Storage::disk('public')->assertMissing(['article/a.pdf', 'journal/j.pdf']);
    }

    public function test_admin_submissions_are_paginated(): void
    {
        $user = User::factory()->create();
        foreach (range(1, 20) as $i) {
            ArticleSubmission::create(['user_id' => $user->id, 'name' => "Ariza {$i}"]);
        }

        $this->actingAs($this->admin())
            ->get('/dashboard/submissions?page=2')
            ->assertInertia(fn (Assert $page) => $page
                ->where('submissions.total', 20)
                ->has('submissions.data', 5));
    }

    public function test_public_pages_render_with_empty_database(): void
    {
        foreach (['/', '/members', '/statue', '/requirements', '/article', '/archive', '/search?q=x'] as $url) {
            $this->get($url)->assertOk();
        }
    }
}
