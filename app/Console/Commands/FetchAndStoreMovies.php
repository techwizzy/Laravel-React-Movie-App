<?php

namespace App\Console\Commands;

use App\Models\Movie;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchAndStoreMovies extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'movies:fetch-store';
    protected $description = 'Fetch movies from TMDB and store them in the database';
    /**
     * The console command description.
     *
     * @var string
     */
    
     public function __construct()
     {
         parent::__construct();
     }
 
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $apiKey = env('TMDB_API_KEY');
        $url = "https://api.themoviedb.org/3/movie/popular?api_key={$apiKey}&language=en-US&page=1";

        $response = Http::get($url);
        $movies = $response->json()['results'] ?? [];

        foreach ($movies as $movieData) {
            Movie::updateOrCreate(
                ['id' => $movieData['id']], // Assuming 'id' is the TMDB movie ID
                [
                    'title' => $movieData['title'],
                    'overview' => $movieData['overview'],
                    'poster_path' => $movieData['poster_path'],
                    'genre_ids' => json_encode($movieData['genre_ids']),
                    'vote_average' => $movieData['vote_average'],
                ]
            );
        }

        $this->info('Movies fetched and stored successfully.');
    }
}
