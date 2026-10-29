<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleSubmissionRequest;
use App\Models\ArticleSubmission;
use Illuminate\Support\Facades\Storage;
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
                ->store('submissions', 'local');
        }

        ArticleSubmission::create($validated);

        return redirect()->route('submissions.index')
            ->with('success', 'Maqola muvaffaqiyatli yuborildi!');
    }

    /**
     * Nashr qilinmagan maqola fayli faqat egasi va adminlarga beriladi.
     */
    public function download(ArticleSubmission $submission)
    {
        $user = auth()->user();

        abort_unless($user->isAdmin || $submission->user_id === $user->id, 403);
        abort_unless($submission->file_url, 404);

        // Eski fayllar public diskda qolgan bo'lishi mumkin
        foreach (['local', 'public'] as $disk) {
            if (Storage::disk($disk)->exists($submission->file_url)) {
                return Storage::disk($disk)->response($submission->file_url);
            }
        }

        abort(404);
    }
}
