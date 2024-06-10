import { View, Text, StatusBar, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../theme/theme';
import TrendMovie from '../components/TrendMovie';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';


const ios=Platform.OS === 'ios';
const HomeScreen = () => {


    const [trending,setTrending]=useState([1,2,3])
    const [upcoming,setUpcoming]=useState([1,2,3])
    const [topRated,setTopRated]=useState([1,2,3])
    const [loading,setLoading]=useState(false)
    const navigation=useNavigation()

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
        <TrendMovie data={trending}/>

        {/*Upcoming Movie row*/}    
        <MovieList title='Upcoming' data={upcoming}/>

        {/*Upcoming Movie row*/}    
        <MovieList title='TopRated' data={topRated}/>


      </ScrollView>
        )
      }

      
    </View>
  )
}

export default HomeScreen