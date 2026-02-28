<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticleSubmission extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'file_url',
        'comment',
        'admin_note',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
