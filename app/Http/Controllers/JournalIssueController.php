<?php

namespace App\Http\Controllers;

use App\Http\Requests\JournalRequest;
use App\Models\JournalIssue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JournalIssueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $journals = JournalIssue::paginate(10);
        return Inertia::render('JournalIssues/Index', [
            'journals' => $journals
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('JournalIssues/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JournalRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('file_url')) {
            $path = $request->file('file_url')->store('journal', 'public');
            $validated['file_url'] = $path;
        }

        JournalIssue::create($validated);

        return redirect()->route('journal-issues.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(JournalIssue $journal_issue)
    {
        return Inertia::render('JournalIssues/View', [
            'journal_issue' => $journal_issue,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JournalIssue $journal_issue)
    {
        return Inertia::render('JournalIssues/Edit', [
            'journal_issue' => $journal_issue
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JournalRequest $request, JournalIssue $journal_issue)
    {
        $validated = $request->validated();

        if ($request->hasFile('file_url')) {
            if ($journal_issue->file_url && Storage::disk('public')->exists($journal_issue->file_url)) {
                Storage::disk('public')->delete($journal_issue->file_url);
            }

            $path = $request->file('file_url')->store('journal', 'public');
            $validated['file_url'] = $path;
        } else {
            unset($validated['file_url']);
        }

        $journal_issue->update($validated);

        return redirect()->route('journal-issues.index');
    }

    public function removeFile(JournalIssue $journal_issue)
    {
        if ($journal_issue->file_url) {
            Storage::disk('public')->delete($journal_issue->file_url);
            $journal_issue->update(['file_url' => null]);
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JournalIssue $journal_issue)
    {
        if ($journal_issue->file_url && Storage::disk('public')->exists($journal_issue->file_url)) {
            Storage::disk('public')->delete($journal_issue->file_url);
        }

        $journal_issue->delete();
        return redirect()->route('journal-issues.index');
    }
}