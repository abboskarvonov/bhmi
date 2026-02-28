<?php

namespace App\Http\Controllers;

use App\Models\ArticleSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SubmissionController extends Controller
{
    public function index()
    {
        $submissions = ArticleSubmission::with('user')
            ->latest()
            ->get();

        return Inertia::render('Dashboard/Submissions/Index', [
            'submissions' => $submissions,
        ]);
    }

    public function show(ArticleSubmission $submission)
    {
        $submission->load('user');

        return Inertia::render('Dashboard/Submissions/Show', [
            'submission' => $submission,
        ]);
    }

    public function update(Request $request, ArticleSubmission $submission)
    {
        $request->validate([
            'status'     => 'required|in:pending,accepted,rejected',
            'admin_note' => 'nullable|string|max:2000',
        ]);

        $submission->update([
            'status'     => $request->status,
            'admin_note' => $request->admin_note,
        ]);

        return back()->with('success', 'Holat muvaffaqiyatli yangilandi!');
    }

    public function destroy(ArticleSubmission $submission)
    {
        if ($submission->file_url && Storage::disk('public')->exists($submission->file_url)) {
            Storage::disk('public')->delete($submission->file_url);
        }

        $submission->delete();

        return redirect()->route('submissions.admin.index')
            ->with('success', 'Ariza o\'chirildi.');
    }
}
