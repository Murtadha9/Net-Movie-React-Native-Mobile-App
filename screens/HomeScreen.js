import { View, Text, StatusBar, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../theme/theme';
import TrendMovie from '../components/TrendMovie';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/movieDB';


const ios=Platform.OS === 'ios';
const HomeScreen = () => {


    const [trending,setTrending]=useState([])
    const [upcoming,setUpcoming]=useState([])
    const [topRated,setTopRated]=useState([])
    const [loading,setLoading]=useState(true)
    const navigation=useNavigation()


    useEffect(()=>{
      getTrendingMovies();
      getUpcomingMovies();
      getTopRatedMovies();
    },[])

    const getTrendingMovies=async()=>{
        const data= await fetchTrendingMovies()
        if(data && data.results) setTrending(data.results)
          setLoading(false)

    }

    const getUpcomingMovies=async()=>{
      const data= await fetchUpcomingMovies()
      if(data && data.results) setUpcoming(data.results)
        setLoading(false)

  }

  const getTopRatedMovies=async()=>{
    const data= await fetchTopRatedMovies()
    if(data && data.results) setTopRated(data.results)
      setLoading(false)

}

  return (
    <View className='flex-1 bg-neutral-800 '>
      {/*Search bar and Logo*/}
      <SafeAreaView className={ios?'-mb-2':'mb-3'}>
        <StatusBar style='light'/>

        <View className='flex-row justify-between items-center mx-4 mt-4'>

            <FontAwesome6 name="bars" size={24} color="white" />
            <Text className='font-bold text-white text-3xl'><Text style={styles.text}>M</Text>ovies</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                <FontAwesome name="search" size={24} color="white" />
            </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        loading ? (<Loading/>):
        (
          <ScrollView
            contentContainerStyle={{paddingBottom:10}}
            showsVerticalScrollIndicator={false}
      >
        {/*Trending Movie*/}
       {trending.length > 0 && <TrendMovie data={trending}/>}

        {/*Upcoming Movie row*/}    
       {upcoming.length>0 && <MovieList title='Upcoming' data={upcoming}/>}

        {/*Upcoming Movie row*/}    
        {topRated.length>0 && <MovieList title='TopRated' data={topRated}/>}


      </ScrollView>
        )
      }

      
    </View>
  )
}

export default HomeScreen