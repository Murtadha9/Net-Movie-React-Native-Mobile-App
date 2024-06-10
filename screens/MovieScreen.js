import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

var {width, height} = Dimensions.get('window')
const ios=Platform.OS === 'ios';
const marginTop = ios ?'':'mt-3'

const MovieScreen = () => {
    const {params:item}=useRoute()
    const [isFavorite, toggleFavorite]=useState(false)
    const navigation=useNavigation()
    const [cast,setCast]=useState([1,2,3,4])
    const [similarMovies,setSimilarMovies]=useState([1,2,3,4])
    const [loading,setLoading]=useState(false)

    let moviename='maron film'

    useEffect(()=>{},[item])

  return (
    <ScrollView 
        contentContainerStyle={{paddingBottom:40}}
        className='flex-1 bg-neutral-900'
    >
        {/*back button*/}
        <View className='w-full'>
            <SafeAreaView className={'z-20 absolute w-full flex-row justify-between items-center p-4 px-4'+marginTop}>

                <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.background} className='rounded-xl bg-yellow-600 mb'>
                    <Ionicons name="caret-back-outline" size={28} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>toggleFavorite(!isFavorite)}>
                     <MaterialCommunityIcons name="cards-heart" size={35} color={isFavorite?'red' :'white'}/>
                </TouchableOpacity>
            </SafeAreaView>

            {
                loading?(<Loading/>):(
                <View>
                    <Image 
                    source={require('../assets/1.jpg')}
                    style={{width, height:height*0.55}}
                    />
                    <LinearGradient
                    colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                    style={{ width, height: height * 0.40 }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    className='absolute bottom-0'
                    />
            </View>
                )
            }
        </View>

        {/*more Detials */}
        <View style={{marginTop:-(height*0.09)}} className='space-y-3' >
            {/*Title*/}
            <Text className='text-white text-center text-3xl font-bold tracking-wide'>{moviename}</Text>

            {/*status relase runtime*/}
            <Text className='text-neutral-400 font-semibold text-base text-center'>
                Released . 2024 . 140min
            </Text>

            {/*genre*/}
            <View className='flex-row justify-center mx-4 space-x-2'>
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    Action .
                </Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    Thril .
                </Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    Comedy .
                </Text>
            </View>

            {/*description*/}
                <Text className='text-neutral-400 mx-4 tracking-wide'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>

                {/*cast*/}
                <Cast cast={cast} navigation={navigation}/>

                {/*similar movie*/}
                <MovieList title='Similar Movie' hideSeeAll={true} data={similarMovies}/>
     


        </View>
      
    </ScrollView>
  )
}

export default MovieScreen