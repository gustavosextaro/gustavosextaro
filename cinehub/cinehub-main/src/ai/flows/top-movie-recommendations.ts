'use server';

/**
 * @fileOverview A flow for generating top movie recommendations based on Letterboxd data.
 *
 * - getTopMovieRecommendations - A function that orchestrates fetching top movies.
 * - TopMovieRecommendationsInput - The input type for the getTopMovieRecommendations function (currently empty).
 * - TopMovieRecommendationsOutput - The return type for the getTopMovieRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getTopRatedMovies} from '@/services/letterboxd';

const TopMovieRecommendationsInputSchema = z.object({});
export type TopMovieRecommendationsInput = z.infer<typeof TopMovieRecommendationsInputSchema>;

const TopMovieRecommendationsOutputSchema = z.array(z.object({
  title: z.string().describe('The title of the movie.'),
  description: z.string().describe('A short summary of the movie.'),
  genre: z.string().describe('The genre of the movie.'),
}));
export type TopMovieRecommendationsOutput = z.infer<typeof TopMovieRecommendationsOutputSchema>;

export async function getTopMovieRecommendations(
    input: TopMovieRecommendationsInput
): Promise<TopMovieRecommendationsOutput> {
  return topMovieRecommendationsFlow(input);
}

const topMovieRecommendationsFlow = ai.defineFlow(
    {
      name: 'topMovieRecommendationsFlow',
      inputSchema: TopMovieRecommendationsInputSchema,
      outputSchema: TopMovieRecommendationsOutputSchema,
    },
    async () => {
        // This flow now bypasses the GenAI summarization to avoid rate-limiting issues during development.
        // It directly returns the raw plot from the mock service as the description.
        const topMovies = await getTopRatedMovies();
        
        return topMovies.map(movie => ({
            title: movie.title,
            description: movie.plot, // Using plot directly as description
            genre: movie.genre,
        }));
    }
);
