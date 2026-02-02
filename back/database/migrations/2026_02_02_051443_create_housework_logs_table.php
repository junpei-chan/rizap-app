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
        Schema::create('housework_logs', function (Blueprint $table) {
            $table->id();
            $table->timestamp('done_at'); //完了日
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); //FK
            $table->foreignId('housework_id')->constrained()->cascadeOnDelete(); //FK
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('housework_logs');
    }
};
