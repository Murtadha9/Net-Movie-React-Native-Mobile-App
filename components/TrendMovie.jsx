
import { View, Text, FlatList, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { fallbaclMoviePoster, image500 } from '../api/movieDB';

var {width, height} = Dimensions.get('window')

const TrendMovie = ({data}) => {

    const flatListRef = useRef(null);
    let currentIndex = 0;
  
    useEffect(() => {
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % 10;
        flatListRef.current?.scrollToIndex({
          index: currentIndex,
          animated: true,
        });
      }, 3000);
  
      return () => clearInterval(interval);
    }, []);


    const navigation=useNavigation()
    const handleClik = (item) => {
      navigation.navigate('Movie', { item }); // Pass item as an object
    };


  return (
    <View className='mb-8 flex justify-center items-center'>
      <Text className='text-white text-xl mx-4 mb-4'>TrendMovie</Text>

      <FlatList
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <MovieCard item={item} handleClik={handleClik}/>}
      keyExtractor={(item, index) => index.toString()}
      ref={flatListRef}
      style={{width, margin:6 , padding:6}}
      className='mr-6'
    />

    </View>
  )
}

export default TrendMovie



const MovieCard=({item ,handleClik})=>{
    return(
      <>
      
        <TouchableWithoutFeedback onPress={()=>handleClik(item)}>
            <Image 
                source={{uri:image500(item.poster_path) || fallbaclMoviePoster}}
                style={{
                    width:width,
                    height:height*0.4,
                    margin:6
                }}
                className='rounded-3xl'
            />
        </TouchableWithoutFeedback>
        </>
       
    )
}