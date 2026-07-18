import { fetchMovies } from '../../services/movieService';
import css from './App.module.css';

export default function App() {
  return (
    <button
      onClick={() => {
        fetchMovies('batman');
      }}
    >
      show movies on console
    </button>
  );
}
