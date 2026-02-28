<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleSubmissionRequest;
use App\Models\ArticleSubmission;
use Inertia\Inertia;

class ArticleSubmissionController extends Controller
{
    public function index()
    {
        $submissions = ArticleSubmission::where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Submissions/Index', [
            'submissions' => $submissions,
        ]);
    }

    public function create()
    {
        return Inertia::render('Submissions/Create');
    }

    public function store(ArticleSubmissionRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        if ($request->hasFile('file_url')) {
            $validated['file_url'] = $request->file('file_url')
                ->store('submissions', 'public');
        }

        ArticleSubmission::create($validated);

        return redirect()->route('submissions.index')
            ->with('success', 'Maqola muvaffaqiyatli yuborildi!');
    }
}
