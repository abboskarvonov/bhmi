<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Models\Article;
use App\Models\JournalIssue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = mb_substr(trim((string) $request->query('search', '')), 0, 100);
        $sort = in_array($request->query('sort'), ['name', 'created_at'], true) ? $request->query('sort') : null;
        $direction = $request->query('direction') === 'desc' ? 'desc' : 'asc';

        $articles = Article::with('journal:id,name')
            ->when($search !== '', function ($query) use ($search) {
                $like = '%' . addcslashes($search, '%_\\') . '%';
                $query->where(fn ($q) => $q->where('name', 'like', $like)->orWhere('author', 'like', $like));
            })
            ->when($sort, fn ($q) => $q->orderBy($sort, $direction), fn ($q) => $q->latest())
            ->orderByDesc('id')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
            'filters' => ['search' => $search, 'sort' => $sort, 'direction' => $direction],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $journals = JournalIssue::all();
        return Inertia::render('Articles/Create', [
            'journals' => $journals
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('file_url')) {
            $path = $request->file('file_url')->store('article', 'public');
            $validated['file_url'] = $path;
        }

        Article::create($validated);

        return redirect()->route('articles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $article->load('journal');
        return Inertia::render('Articles/View', [
            'article' => $article
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $article->load('journal');
        $journals = JournalIssue::all();

        return Inertia::render('Articles/Edit', [
            'article' => $article,
            'journals' => $journals
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, Article $article)
    {
        $validated = $request->validated();

        if ($request->hasFile('file_url')) {
            if ($article->file_url && Storage::disk('public')->exists($article->file_url)) {
                Storage::disk('public')->delete($article->file_url);
            }

            $path = $request->file('file_url')->store('article', 'public');
            $validated['file_url'] = $path;
        } else {
            unset($validated['file_url']);
        }

        $article->update($validated);

        return redirect()->route('articles.index');
    }

    public function removeFile(Article $article)
    {
        if ($article->file_url) {
            Storage::disk('public')->delete($article->file_url);
            $article->update(['file_url' => null]);
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        if ($article->file_url && Storage::disk('public')->exists($article->file_url)) {
            Storage::disk('public')->delete($article->file_url);
        }

        $article->delete();
        return redirect()->route('articles.index');
    }
}