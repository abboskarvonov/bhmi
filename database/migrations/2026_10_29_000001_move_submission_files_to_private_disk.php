<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

return new class extends Migration
{
    /**
     * Yuborilgan maqola fayllarini public diskdan private (local) diskka ko'chirish.
     */
    public function up(): void
    {
        $public = Storage::disk('public');
        $local = Storage::disk('local');

        DB::table('article_submissions')->whereNotNull('file_url')->orderBy('id')
            ->each(function ($submission) use ($public, $local) {
                $path = $submission->file_url;

                if ($public->exists($path) && ! $local->exists($path)) {
                    $local->writeStream($path, $public->readStream($path));
                    $public->delete($path);
                }
            });
    }

    public function down(): void
    {
        //
    }
};
