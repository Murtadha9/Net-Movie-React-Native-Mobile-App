import axios from "axios";
import { API_KEY } from '@env';

// Endpoints
const apiBaseUrl = `https://api.themoviedb.org/3`;
const TrendingMoviesEndpoints = `${apiBaseUrl}/trending/movie/day?language=en-US&api_key=${API_KEY}`;
const UpcomingMoviesEndpoints = `${apiBaseUrl}/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`;
const TopRatedMoviesEndpoints = `${apiBaseUrl}/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`;


export const image500= path=> path ?`https://image.tmdb.org/t/p/w500${path}` : null
export const image342= path=> path ?`https://image.tmdb.org/t/p/w342${path}` : null
export const image185= path=> path ?`https://image.tmdb.org/t/p/w185${path}` : null

export const fallbaclMoviePoster=''
export const fallbaclPersonImage=''



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
