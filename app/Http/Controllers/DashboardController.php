<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleSubmission;
use App\Models\JournalIssue;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        if (! $user->isAdmin) {
            $submissions = ArticleSubmission::where('user_id', $user->id);

            return Inertia::render('Dashboard', [
                'stats' => [
                    'total'    => (clone $submissions)->count(),
                    'pending'  => (clone $submissions)->where('status', 'pending')->count(),
                    'accepted' => (clone $submissions)->where('status', 'accepted')->count(),
                ],
                'recentSubmissions' => (clone $submissions)->latest()->take(5)
                    ->get(['id', 'name', 'status', 'created_at']),
            ]);
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'articles' => Article::count(),
                'journals' => JournalIssue::count(),
                'pending'  => ArticleSubmission::where('status', 'pending')->count(),
                'users'    => User::count(),
            ],
            'recentSubmissions' => ArticleSubmission::with('user:id,name')->latest()->take(5)
                ->get(['id', 'user_id', 'name', 'status', 'created_at']),
            'latestArticles' => Article::with('journal:id,name')->latest()->take(5)
                ->get(['id', 'name', 'author', 'journal_issue_id', 'created_at']),
        ]);
    }
}
