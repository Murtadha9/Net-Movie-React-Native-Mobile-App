
import { View, Text, FlatList, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';

var {width, height} = Dimensions.get('window')

const TrendMovie = ({data}) => {

    const flatListRef = useRef(null);
    let currentIndex = 0;
  
    useEffect(() => {
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % 3;
        flatListRef.current?.scrollToIndex({
          index: currentIndex,
          animated: true,
        });
      }, 3000);
  
      return () => clearInterval(interval);
    }, []);


    const navigation=useNavigation()
    const handleClik = ({item}) => {
      navigation.navigate('Movie' , item)
    }


  return (
    <View className='mb-8'>
      <Text className='text-white text-xl mx-4 mb-4'>TrendMovie</Text>

      <FlatList
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <MovieCard item={item} handleClik={handleClik}/>}
      keyExtractor={(item, index) => index.toString()}
      ref={flatListRef}
      style={{width:width*0.62 , margin:6 , padding:6}}
    />

    </View>
  )
}

export default TrendMovie



const MovieCard=({item ,handleClik})=>{
    return(
        <TouchableWithoutFeedback onPress={()=>handleClik(item)}>
            <Image 
            source={require('../assets/1.jpg')}
                style={{
                    width:width*0.6,
                    height:height*0.4,
                    margin:6
                }}
            />
        </TouchableWithoutFeedback>
    )
}