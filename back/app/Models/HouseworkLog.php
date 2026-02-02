<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HouseworkLog extends Model
{
    protected $fillable = [
        'user_id',
        'housework_id',
        'done_at'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function housework(): BelongsTo
    {
        return $this->belongsTo(Housework::class, 'housework_id');
    }
}