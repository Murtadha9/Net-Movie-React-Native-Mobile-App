import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../theme/theme';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbaclPersonImage, fetchPersonDetail, fetchPersonMovie, image342 } from '../api/movieDB';

var {width, height} = Dimensions.get('window')
const ios=Platform.OS === 'ios';
const verticalMargin = ios ?'':'my-3'


const Person = () => {

  const navigation=useNavigation()
  const {params:item}=useRoute()
  const [isFavorite, toggleFavorite]=useState(false)
  const [personMovie, setPersonMovie]=useState([])
  const [person, setPerson]=useState({})

  const [loading,setLoading]=useState(false)


  useEffect(()=>{
    setLoading(true)
    getPersonDetali(item.id)
    getPersonMovie(item.id)
  },[
    item
  ])

  const getPersonDetali=async(id)=>{
    const data= await fetchPersonDetail(id);
    if (data) setPerson(data)
      setLoading(false)

  }

  const getPersonMovie=async(id)=>{
    const data= await fetchPersonMovie(id);
    if (data && data.cast) setPersonMovie(data.cast)
      setLoading(false)

  }

  return (
    <ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{paddingBottom:20}}>
      {/*Back button*/}
      <SafeAreaView className={'z-20  w-full flex-row justify-between items-center p-4 px-4'+verticalMargin}>

      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.background} className='rounded-xl bg-yellow-600 mb'>
          <Ionicons name="caret-back-outline" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>toggleFavorite(!isFavorite)}>
           <MaterialCommunityIcons name="cards-heart" size={35} color={isFavorite?'red' :'white'}/>
      </TouchableOpacity>

        </SafeAreaView>

        {/*Person Detial*/}
        {
          loading ?(<Loading/>):(
            <View>

          <View className='flex-row justify-center'>
            <View className='items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500'>
              <Image 
                //source={require('../assets/1.jpg')}
                source={{uri:image342(person?.profile_path) || fallbaclPersonImage}}
                style={{width:width*0.47, height:height*0.43}}
                />
            </View>
          </View>

          <View className='mt-6'>
            <Text className='text-3xl text-white font-bold text-center'>
              {person?.name}
            </Text>
            <Text className='text-base text-neutral-500 text-center'>
              {person?.place_of_birth}
            </Text>
          </View>

          <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
            <View className='border-r-2 border-neutral-400 px-2 items-center'>
              <Text className='text-white font-semibold'>Gender</Text>
              <Text className='text-neutral-300 font-sm'>
                {
                  person?.gender == 1? 'Female' : 'Male'
                }
              </Text>
            </View>

            <View className='border-r-2 border-neutral-400 px-2 items-center'>
              <Text className='text-white font-semibold'>Birthday</Text>
              <Text className='text-neutral-300 font-sm'>
                {person?.birthday }
              </Text>
            </View>

            <View className='border-r-2 border-neutral-400 px-2 items-center'>
              <Text className='text-white font-semibold'>Known for</Text>
              <Text className='text-neutral-300 font-sm'>
                {person?.known_for_department}
              </Text>
            </View>

            <View className=' px-2 items-center'>
              <Text className='text-white font-semibold'>Populartiy</Text>
              <Text className='text-neutral-300 font-sm'>
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>

          <View className='my-6 mx-4 space-y-2'>
            <Text className='text-white text-lg'>Biography</Text>
            <Text className='text-neutral-400 tracking-wide'>
              {person?.biography || 'N/A'}
            </Text>
          </View>

          {/*movie list*/}
         <MovieList title={'Movies'} hideSeeAll={true} data={personMovie}/> 


        </View>
          )
        }


    </ScrollView>
  )
}

export default Person