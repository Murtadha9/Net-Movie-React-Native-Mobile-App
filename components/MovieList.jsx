import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'

var {width, height} = Dimensions.get('window')

const MovieList = ({title ,data, hideSeeAll}) => {

    const MovieName='ababil'
    const navigation=useNavigation()
  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-xl'>{title}</Text>
        {
            !hideSeeAll &&(
                <TouchableOpacity>
                   <Text style={styles.text} className='text-lg'>See All</Text>
                </TouchableOpacity>
            )
        }
      </View>

      <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
      >
        {data.map((item,index)=>{
            return(
                <TouchableWithoutFeedback 
                    key={index}
                    onPress={()=>navigation.push('Movie' ,item)}
                    >
                  
                        <View className='mr-4 space-y-1'>
                            <Image source={require('../assets/1.jpg')}
                                    style={{width:width*0.33 , height:height*0.22}}
                                    className='rounded-3xl'
                            />
                            <Text className='text-neutral-300 ml-1'>{
                                MovieName.length>14 ? MovieName.slice(0,14)+'...' :MovieName
                                }</Text>
                        </View>
                       
                </TouchableWithoutFeedback>
            )
        })}
      </ScrollView>
    </View>
  )
}

export default MovieList