import { useState, useEffect } from 'react';
import { fetchMoviesReviews } from '../../../movies-api';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();
  useEffect(() => {
    async function fetchReviews() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMoviesReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <>
          <ul>
            {reviews &&
              reviews.map(review => (
                <li key={review.id}>
                  <h1>{review.author}</h1>
                  <p>{review.content}</p>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
