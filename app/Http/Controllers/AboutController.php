<?php

namespace App\Http\Controllers;

use App\Http\Requests\AboutRequest;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $abouts = About::paginate(10);
        return Inertia::render('Abouts/Index', [
            'abouts' => $abouts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Abouts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AboutRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('file_url')) {
            $path = $request->file('file_url')->store('about', 'public');
            $validated['file_url'] = $path;
        }

        About::create($validated);

        return redirect()->route('abouts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(About $about)
    {
        return Inertia::render('Abouts/View', [
            'about' => $about,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(About $about)
    {
        return Inertia::render('Abouts/Edit', [
            'about' => $about,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AboutRequest $request, About $about)
    {
        $validated = $request->validated();

        if ($request->hasFile('file_url')) {
            if ($about->file_url && Storage::disk('public')->exists($about->file_url)) {
                Storage::disk('public')->delete($about->file_url);
            }

            $path = $request->file('file_url')->store('about', 'public');
            $validated['file_url'] = $path;
        } else {
            unset($validated['file_url']);
        }

        $about->update($validated);

        return redirect()->route('abouts.index');
    }

    public function removeFile(About $about)
    {
        if ($about->file_url) {
            Storage::disk('public')->delete($about->file_url);
            $about->update(['file_url' => null]);
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(About $about)
    {
        if ($about->file_url && Storage::disk('public')->exists($about->file_url)) {
            Storage::disk('public')->delete($about->file_url);
        }

        $about->delete();
        return redirect()->route('abouts.index');
    }
}