import type { Movie } from '../../types/movies';
import css from './MovieGrid.module.css';

interface MovieGrid {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGrid) {
  return (
    <ul className={css.grid}>
      {/* Набір елементів списку з фільмами */}
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <div className={css.card}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
