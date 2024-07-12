import { useState, useEffect } from 'react';
import { fetchMoviesCredits } from '../../../movies-api';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMoviesCredits(movieId);
        setCasts(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieCast();
  }, [movieId]);
  console.log('🚀 ~ MovieCast ~ casts:', casts);

  const defaultImg =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <>
          <ul className={css.list}>
            {casts &&
              casts.map(cast => (
                <li className={css.item} key={cast.id}>
                  <img
                    className={css.images}
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                        : defaultImg
                    }
                    alt={cast.name}
                  />
                  <p className={css.name}>{cast.name}</p>
                  <p style={{ width: '200px' }}>{cast.character}</p>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
