<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class MovieController extends Controller
{

    public function fetchMovies()
    {
        // Define a unique cache key
        $cacheKey = 'movies_data';
    
        // Determine if the data is already cached
        if (Cache::has($cacheKey)) {
            // Retrieve the data from the cache
            $movies = Cache::get($cacheKey);
        } else {
            // Fetch data from the TMDB API
            // Include your API key from the .env file
            $apiKey = env('TMDB_API_KEY');
            $url = "https://api.themoviedb.org/3/movie/popular?api_key={$apiKey}&language=en-US&page=1";
    
            // Make the HTTP request to the TMDB API
            $response = Http::get($url);
            if ($response->successful()) {
                $movies = $response->json();
                
                // Store the data in the cache for 60 minutes (or any duration you see fit)
                Cache::put($cacheKey, $movies, 60);
            } else {
                // Handle API request errors (optional)
                // For simplicity, return an empty array or a default error message
                return response()->json(['error' => 'Failed to fetch movies from TMDB.'], $response->status());
            }
        }
    
        return response()->json($movies);
    }
    


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movies = Movie::all();
        return response()->json($movies);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $movie = Movie::create($request->all());
        return response()->json($movie, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        return response()->json($movie);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
     
     public function update(Request $request, Movie $movie)
     {
         $movie->update($request->all());
         return response()->json($movie);
     }
 
     // Remove the specified movie from storage
     public function destroy(Movie $movie)
     {
         $movie->delete();
         return response()->json(null, 204);
     }
}
