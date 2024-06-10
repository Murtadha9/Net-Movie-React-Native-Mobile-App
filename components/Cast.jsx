import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Cast = ({cast=[] ,navigation}) => {


    

    const personName='someone'
    const characterName='someone'
  return (
    <View className='my-6'>
      <Text className='text-white text-lg mx-4 mb-4'>Top Cast</Text>
      <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
      >
        {cast && cast.map((person, index) => (
            <TouchableOpacity onPress={()=>navigation.navigate('Person' ,person)} key={index} className='mr-4 items-center'>
                <View className='rounded-full overflow-hidden w-20 h-20 items-center border-neutral-500'>
                    <Image className='h-24 w-20 rounded-2xl'
                        source={require('../assets/1.jpg')}
                    />
                </View>
              <Text className='text-white text-sm mt-1'>
                {characterName.length>10 ?characterName.slice(0,10)+'...': characterName}
              </Text>
              <Text className='text-sm text-neutral-400 mt-1'>
                {personName.length>10 ?personName.slice(0,10)+'...': personName}
              </Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default Cast