import { useState, useEffect, useMemo } from 'react';
import { fetchMoviesSearch } from '../../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import GoBack from '../../components/GoBack/GoBack';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useSearchParams } from 'react-router-dom';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [inputValue, setInputValue] = useState('');
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearch = searchParams.get('query') ?? '';
  console.log('🚀 ~ MoviesPage ~ querySearch:', querySearch);

  const submitQuerySearch = event => {
    event.preventDefault();
    searchParams.set('query', inputValue);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    async function fetchMoviesPage() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMoviesSearch(querySearch);
        setVisibleMovies(data);
        console.log('🚀 ~ fetchMoviesPage ~ data:', data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMoviesPage();
  }, [querySearch]);

  const filterMovies = useMemo(() => {
    return visibleMovies.filter(movie =>
      movie.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, visibleMovies]);
  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <>
          <GoBack />
          <form className={css.form} onSubmit={submitQuerySearch}>
            <input
              className={css.input}
              type="text"
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
            />
            <button className={css.btn} type="submit">
              Search
            </button>
          </form>
        </>
      )}
      {visibleMovies && <MovieList lists={filterMovies} />}
    </div>
  );
}
