import axios from "axios";
import {apiKey} from '@env'

//endpoints

const apiBaseUrl=`https://api.themoviedb.org/3`
const TrendingMoviesEndpoints=`${apiBaseUrl}/trending/movie/day?language=en-US?api_key=${apiKey}`
const UpcomingMoviesEndpoints=`${apiBaseUrl}/movie/upcoming?language=en-US&page=1?api_key=${apiKey}`
const topRatedMoviesEndpoints=`${apiBaseUrl}/movie/top_rated?language=en-US&page=1?api_key=${apiKey}`


const apiCall=async(endpoint , params)=>{
    const options={
        method:'GET',
        url:endpoint,
        params:params? params:{}
    }

    try {
        const response= await axios.request(options)
        return response.data
    } catch (error) {
        console.log(error) 
    }

}

const fetchTrendingMovies=()=>{
    return apiCall(TrendingMoviesEndpoints)
}

const fetchUpcomingMovies=()=>{
    return apiCall(UpcomingMoviesEndpoints)
}

const fetchTopRatedMovies=()=>{
    return apiCall(topRatedMoviesEndpoints)
}

