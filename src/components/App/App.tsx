import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
// import css from './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | null>(null);
  const [isModal, setIsModal] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setIsError(false);
      const data = await fetchMovies(query);
      if (data.length === 0) {
        const notify = () => toast('No movies found for your request.');
        notify();
        setMovies([]);
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (selectedMovie: Movie) => {
    setModalMovie(selectedMovie);
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    setModalMovie(null);
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
        <MovieGrid movies={movies} onSelect={openModal} />
      )}
      {isModal && <MovieModal movie={modalMovie!} onClose={closeModal} />}
    </>
  );
}
