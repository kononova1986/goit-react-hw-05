import axios from 'axios';

const url = 'https://api.themoviedb.org/3/trending/movie/day';
const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTY2YTdiZWE3MGM3NWZjNDkyZWFjNDg0MDBmYmNjNiIsIm5iZiI6MTcyMDUyMzM2NS42MDEzNzQsInN1YiI6IjY2OGQxNGJlMzY4OTVkN2YzZTc5OWUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j81JCUXWLKT1nAkLPEf7poEQNaQto41vpmxBm9cYcow',
  },
};

export async function fetchMovies() {
  const response = await axios.get(url, options);
  return response.data.results;
}

export async function fetchMoviesDetails(id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}`,
    options
  );
  return response.data;
}

export async function fetchMoviesCredits(id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    options
  );
  return response.data.cast;
}

export async function fetchMoviesReviews(id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews`,
    options
  );
  return response.data.results;
}

export async function fetchMoviesSearch(query) {
  const response = await axios.get(
    'https://api.themoviedb.org/3/search/movie',
    {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTY2YTdiZWE3MGM3NWZjNDkyZWFjNDg0MDBmYmNjNiIsIm5iZiI6MTcyMDUyMzM2NS42MDEzNzQsInN1YiI6IjY2OGQxNGJlMzY4OTVkN2YzZTc5OWUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j81JCUXWLKT1nAkLPEf7poEQNaQto41vpmxBm9cYcow',
      },
      params: { query },
    }
  );

  return response.data.results;
}
