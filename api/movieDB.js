
import axios from "axios";
import { API_KEY } from '@env';

// Endpoints
const apiBaseUrl = `https://api.themoviedb.org/3`;
const TrendingMoviesEndpoints = `${apiBaseUrl}/trending/movie/day?language=en-US&api_key=${API_KEY}`;
const UpcomingMoviesEndpoints = `${apiBaseUrl}/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`;
const TopRatedMoviesEndpoints = `${apiBaseUrl}/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`;

//Dynamically Endpoint

const MovieDetails = id => `${apiBaseUrl}/movie/${id}?language=en-US&api_key=${API_KEY}`;
const MovieCredtial = id => `${apiBaseUrl}/movie/${id}/credits?language=en-US&api_key=${API_KEY}`;
const MovieSimillar = id => `${apiBaseUrl}/movie/${id}/similar?language=en-US&page=1&api_key=${API_KEY}`;
const SearchMovie = `${apiBaseUrl}/search/movie?api_key=${API_KEY}`; // Corrected here

//personEndpoint
const personDetails = id => `${apiBaseUrl}/person/${id}?language=en-US&api_key=${API_KEY}`;
const personMovie = id => `${apiBaseUrl}/person/${id}/movie_credits?language=en-US&api_key=${API_KEY}`;

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbaclMoviePoster = 'https://m.media-amazon.com/images/I/61s8vyZLSzL._AC_UF894,1000_QL80_.jpg';
export const fallbaclPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s';

// API Call Function
const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {}
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;  // Throw the error to handle it in the calling function if needed
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(TrendingMoviesEndpoints);
};

export const fetchUpcomingMovies = () => {
  return apiCall(UpcomingMoviesEndpoints);
};

export const fetchTopRatedMovies = () => {
  return apiCall(TopRatedMoviesEndpoints);
};

export const fetchDetailMovies = (id) => {
  return apiCall(MovieDetails(id));
}

export const fetchCredtialMovie = (id) => {
  return apiCall(MovieCredtial(id));
}

export const fetchSimillarMovie = (id) => {
  return apiCall(MovieSimillar(id));
}

export const fetchPersonDetail = (id) => {
  return apiCall(personDetails(id));
}

export const fetchPersonMovie = (id) => {
  return apiCall(personMovie(id));
}

export const fetchSearchMovie = (params) => {
  return apiCall(SearchMovie, params);
}
