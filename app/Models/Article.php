<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Article extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'name',
        'author',
        'pages',
        'date',
        'journal_issue_id',
        'keywords',
        'annotations',
        'slug',
        'file_url'
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name') // Slug qaysi maydondan yaratiladi
            ->saveSlugsTo('slug')        // Slugni qaysi maydonga saqlash kerak
            ->doNotGenerateSlugsOnUpdate(); // Yangilashda slugni qayta yaratmaslik
    }

    public function journal()
    {
        return $this->belongsTo(JournalIssue::class, 'journal_issue_id');
    }
}