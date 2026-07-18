import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import type { Movie } from '../../types/movies';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
// import css from './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await fetchMovies(query);
      console.log(data);
      if (data.length === 0) {
        const notify = () => toast('No movies found for your request.');
        notify();
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <MovieGrid movies={movies} />
      )}
    </>
  );
}
