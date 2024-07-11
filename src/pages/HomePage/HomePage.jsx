import { useState, useEffect } from 'react';
import { fetchMovies } from '../../../movies-api';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    async function fetchMoviesTrend() {
      try {
        const data = await fetchMovies();
        setTrends(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMoviesTrend();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList lists={trends} />
    </div>
  );
}
