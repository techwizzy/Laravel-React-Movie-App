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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('overview'); // Changed from 'description' to 'overview' to match TMDB terminology
            $table->string('poster_path'); // Changed from 'poster_url' to 'poster_path' for consistency with TMDB
            $table->json('genre_ids')->nullable(); // Store genre IDs in a JSON column; adjust if your DB doesn't support JSON
            $table->date('release_date')->nullable();
            $table->decimal('vote_average', 3, 1)->nullable(); // Adjusted the name for consistency with TMDB
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
