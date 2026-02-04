<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HouseworkLog extends Model
{
    protected $fillable = [
        'user_id',
        'housework_id',
        'done_at',
        'calorie'
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