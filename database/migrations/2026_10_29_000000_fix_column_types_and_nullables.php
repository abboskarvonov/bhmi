<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * abouts.type matn saqlaydi ("Jurnal haqida" va h.k.), integer emas.
     * articles.keywords/annotations va journal_issues.date validatsiyada nullable.
     */
    public function up(): void
    {
        Schema::table('abouts', function (Blueprint $table) {
            $table->string('type')->change();
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->text('keywords')->nullable()->change();
            $table->text('annotations')->nullable()->change();
        });

        Schema::table('journal_issues', function (Blueprint $table) {
            $table->string('date')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('abouts', function (Blueprint $table) {
            $table->integer('type')->change();
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->text('keywords')->nullable(false)->change();
            $table->text('annotations')->nullable(false)->change();
        });

        Schema::table('journal_issues', function (Blueprint $table) {
            $table->string('date')->nullable(false)->change();
        });
    }
};
