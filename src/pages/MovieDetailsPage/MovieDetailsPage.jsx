import { useEffect, useState } from 'react';
import { fetchMoviesDetails } from '../../../movies-api';
import { useParams, Outlet, useLocation, NavLink } from 'react-router-dom';
import GoBack from '../../components/GoBack/GoBack';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Suspense } from 'react';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

const buildClassLink = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    async function fetchMovieDetailsPage() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMoviesDetails(movieId);
        setDetails(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetailsPage();
  }, [movieId]);

  const { backdrop_path, title, overview, vote_average, genres } = details;
  return (
    <div className={css.wrap}>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <>
          <GoBack />
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500//${backdrop_path}`}
              alt={title}
            />
            <div>
              <h1>{title}</h1>
              <h2>Use score: {Math.round((vote_average * 100) / 10)}%</h2>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h2>Genres</h2>
              <ul>
                {genres &&
                  genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
              </ul>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <nav className={css.nav}>
              <NavLink
                className={buildClassLink}
                to={`/movies/${movieId}/cast`}
                state={location}
              >
                Cast
              </NavLink>
              <NavLink
                className={buildClassLink}
                to={`/movies/${movieId}/reviews`}
                state={location}
              >
                Reviews
              </NavLink>
            </nav>
            <Suspense
              fallback={
                <div style={{ color: 'orangered' }}>
                  Loading child route component
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
