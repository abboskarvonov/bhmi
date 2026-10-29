<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private array $tables = ['articles', 'journal_issues'];

    public function up(): void
    {
        foreach ($this->tables as $table) {
            // Takroriy slug'lar bo'lsa, birinchisidan boshqalariga "-{id}" qo'shiladi
            $duplicates = DB::table($table)->select('slug')->whereNotNull('slug')
                ->groupBy('slug')->havingRaw('COUNT(*) > 1')->pluck('slug');

            foreach ($duplicates as $slug) {
                DB::table($table)->where('slug', $slug)->orderBy('id')->skip(1)->take(PHP_INT_MAX)->get(['id'])
                    ->each(fn ($row) => DB::table($table)->where('id', $row->id)->update(['slug' => "{$slug}-{$row->id}"]));
            }

            Schema::table($table, fn (Blueprint $t) => $t->unique('slug'));
        }
    }

    public function down(): void
    {
        foreach ($this->tables as $table) {
            Schema::table($table, fn (Blueprint $t) => $t->dropUnique(['slug']));
        }
    }
};
