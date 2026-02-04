<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Housework extends Model
{
    protected $fillable = [
        'name'
    ];

    public function housework_logs(): HasMany
    {
        return $this->hasMany(HouseworkLog::class);
    }
}
