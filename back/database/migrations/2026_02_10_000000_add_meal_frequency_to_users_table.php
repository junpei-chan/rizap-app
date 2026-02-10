<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('users', 'meal_frequency')) {
            Schema::table('users', function (Blueprint $table) {
                $table->unsignedTinyInteger('meal_frequency')->default(0);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('users', 'meal_frequency')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('meal_frequency');
            });
        }
    }
};
