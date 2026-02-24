<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Article;
use App\Models\JournalIssue;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        $about = About::where('type', 'Jurnal haqida')->first();
        $journals = JournalIssue::latest()->take(4)->get();
        $articles = Article::latest()->take(5)->get();
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
        $article = Article::where('slug', $slug)->firstOrFail();
        $articles = Article::latest()->take(5)->get();
        return Inertia::render('ArticleView', [
            'article' => $article,
            'articles' => $articles,
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
}