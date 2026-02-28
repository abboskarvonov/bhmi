<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Article;
use App\Models\JournalIssue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        $about = About::where('type', 'Jurnal haqida')->first();
        $journals = JournalIssue::latest()->take(4)->get();
        $articles = Article::latest()->take(10)->get();
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'about' => $about,
            'journals' => $journals,
            'latest_journal' => $journals->first(),
            'articles' => $articles
        ]);
    }

    public function members()
    {
        $member = About::where('type', "Tahririyat a'zolari")->first();
        $articles = Article::latest()->take(5)->get();
        return Inertia::render('Members', [
            'member' => $member,
            'articles' => $articles
        ]);
    }

    public function requirements()
    {
        $requirements = About::where('type', "Maqola talablari")->first();
        $articles = Article::latest()->take(5)->get();
        return Inertia::render('Requirements', [
            'requirements' => $requirements,
            'articles' => $articles,
        ]);
    }

    public function statue()
    {
        $statue = About::where('type', "Tahririyat nizomi")->first();
        $articles = Article::latest()->take(5)->get();
        return Inertia::render('Statue', [
            'statue' => $statue,
            'articles' => $articles,
        ]);
    }

    public function article()
    {
        $articles = Article::latest()->paginate(10);
        $articles_latest = Article::latest()->take(5)->get();
        return Inertia::render('Article', [
            'articles' => $articles,
            'articles_latest' => $articles_latest,
        ]);
    }

    public function articleview(string $slug)
    {
        $article = Article::with('journal')->where('slug', $slug)->firstOrFail();

        // Same journal OR same author, excluding current, random 4
        $related = Article::with('journal')
            ->where('id', '!=', $article->id)
            ->where(function ($q) use ($article) {
                $q->where('journal_issue_id', $article->journal_issue_id)
                  ->orWhere('author', $article->author);
            })
            ->inRandomOrder()
            ->take(4)
            ->get();

        // Fill to 4 if not enough
        if ($related->count() < 4) {
            $fill = Article::with('journal')
                ->whereNotIn('id', $related->pluck('id')->push($article->id))
                ->latest()
                ->take(4 - $related->count())
                ->get();
            $related = $related->merge($fill);
        }

        $articles = Article::latest()->take(5)->get();

        return Inertia::render('ArticleView', [
            'article'          => $article,
            'related_articles' => $related,
            'articles'         => $articles,
        ]);
    }

    public function archive()
    {
        $archives = JournalIssue::latest()->paginate(10);
        $articles = Article::latest()->take(5)->get();
        return Inertia::render('Archive', [
            'archives' => $archives,
            'articles' => $articles,
        ]);
    }

    public function archiveview(string $slug)
    {
        $journal = JournalIssue::with('articles')->where('slug', $slug)->firstOrFail();
        $articles = Article::latest()->take(5)->get();
        return Inertia::render('ArchiveView', [
            'journal' => $journal,
            'articles' => $articles,
        ]);
    }

    public function search(Request $request)
    {
        $q = trim($request->get('q', ''));

        $articles = collect();
        $journals  = collect();

        if ($q !== '') {
            $articles = Article::where('name', 'like', "%{$q}%")
                ->orWhere('author',      'like', "%{$q}%")
                ->orWhere('keywords',    'like', "%{$q}%")
                ->orWhere('annotations', 'like', "%{$q}%")
                ->latest()->get();

            $journals = JournalIssue::where('name', 'like', "%{$q}%")
                ->latest()->get();
        }

        $latest_articles = Article::latest()->take(5)->get();

        return Inertia::render('Search', [
            'query'           => $q,
            'articles'        => $articles,
            'journals'        => $journals,
            'latest_articles' => $latest_articles,
        ]);
    }
}