<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\JournalIssueController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/members', [PageController::class, 'members'])->name('members');
Route::get('/requirements', [PageController::class, 'requirements'])->name('requirements');
Route::get('/statue', [PageController::class, 'statue'])->name('statue');
Route::get('/article', [PageController::class, 'article'])->name('article');
Route::get('/article/{article}', [PageController::class, 'articleview'])->name('articleview');
Route::get('/archive', [PageController::class, 'archive'])->name('archive');
Route::get('/archive/{archive}', [PageController::class, 'archiveview'])->name('archiveview');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::resource('menus', MenuController::class);

        Route::resource('abouts', AboutController::class);
        Route::put('/abouts/remove-file/{about}', [AboutController::class, 'removeFile'])->name('abouts.removeFile');

        Route::resource('journal-issues', JournalIssueController::class);
        Route::put('/journal-issues/remove-file/{journal_issue}', [JournalIssueController::class, 'removeFile'])->name('journal-issues.removeFile');

        Route::resource('articles', ArticleController::class);
        Route::put('/articles/remove-file/{article}', [ArticleController::class, 'removeFile'])->name('articles.removeFile');
    });
});

require __DIR__ . '/auth.php';