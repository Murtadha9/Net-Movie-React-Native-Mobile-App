
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbaclMoviePoster, fetchCredtialMovie, fetchDetailMovies, fetchSimillarMovie, image500 } from '../api/movieDB';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const marginTop = ios ? '' : 'mt-3';

const MovieScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [isFavorite, toggleFavorite] = useState(false);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
  
    const { item } = route.params || {}; // Ensure params is an object

    // Log the received item for debugging
    useEffect(() => {
        
    }, [item]);

    useEffect(() => {
        if (item && item.id) {
            setLoading(true);
            getMovieDetail(item.id);
            getMovieCridet(item.id);
            getSimillarMovie(item.id);
        }
    }, [item]);

    const getMovieDetail = async (id) => {
        const data = await fetchDetailMovies(id);
        if (data) setMovie(data);
        setLoading(false);
    };

    const getMovieCridet=async (id) => {
        const data = await fetchCredtialMovie(id);
        if (data.cast) setCast(data.cast);
        setLoading(false);
    }

    const getSimillarMovie=async (id) => {
        const data = await fetchSimillarMovie(id);
        if (data.results) setSimilarMovies(data.results);
        setLoading(false);
    }

    if (!item || !item.id) {
        return (
            <View className='flex-1 justify-center items-center bg-neutral-900'>
                <Text className='text-white'>Movie not found</Text>
            </View>
        );
    }

    return (
        <ScrollView 
            contentContainerStyle={{ paddingBottom: 40 }}
            className='flex-1 bg-neutral-900'
        >
            {/* Back button */}
            <View className='w-full'>
                <SafeAreaView className={`z-20 absolute w-full flex-row justify-between items-center p-4 px-4 ${marginTop}`}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className='rounded-xl bg-yellow-600 mb'>
                        <Ionicons name="caret-back-outline" size={28} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
                        <MaterialCommunityIcons name="cards-heart" size={35} color={isFavorite ? 'red' : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>

                {loading ? (<Loading />) : (
                    <View>
                        <Image 
                            source={{ uri: image500(movie?.poster_path) || fallbaclMoviePoster }}
                            style={{ width, height: height * 0.55 }}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            style={{ width, height: height * 0.40 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className='absolute bottom-0'
                        />
                    </View>
                )}
            </View>

            {/* More Details */}
            <View style={{ marginTop: -(height * 0.09) }} className='space-y-3'>
                {/* Title */}
                <Text className='text-white text-center text-3xl font-bold tracking-wide'>{movie?.title}</Text>

                {/* Status release runtime */}
                {movie?.id && (
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        {movie?.status} . {movie?.release_date?.split('-')[0]} . {movie?.runtime} min
                    </Text>
                )}

                {/* Genre */}
                <View className='flex-row justify-center mx-4 space-x-2'>
                    {movie?.genres?.map((item, index) => (
                        <Text className='text-neutral-400 font-semibold text-base text-center' key={index}>
                            {item.name} .
                        </Text>
                    ))}
                </View>

                {/* Description */}
                <Text className='text-neutral-400 mx-4 tracking-wide'>
                    {movie?.overview}
                </Text>

                {/* Cast */}
                <Cast cast={cast} navigation={navigation} />

                {/* Similar movies */}
                 <MovieList title='Similar Movie' hideSeeAll={true} data={similarMovies} /> 
            </View>
        </ScrollView>
    );
};

export default MovieScreen;
