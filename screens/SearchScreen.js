
import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import debounce from 'lodash/debounce';
import { fallbaclMoviePoster, fetchSearchMovie, image185 } from '../api/movieDB';

var { width, height } = Dimensions.get('window');

const SearchScreen = () => {

    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (value) => {
        console.log(value);
        if (value && value.length > 2) {
            setLoading(true);
            fetchSearchMovie({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then((data) => {
                setLoading(false);
                if (data && data.results) setResults(data.results);
            }).catch(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
            setResults([]);
        }
    }

    const handleText = useCallback(debounce(handleChange, 4000), []);

    return (
        <SafeAreaView className='bg-neutral-800 flex-1'>
            <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
                <TextInput
                    onChangeText={handleText}
                    placeholder='search...'
                    placeholderTextColor={'white'}
                    className='pb-1 pl-6 mt-1 flex-1 text-base font-semibold text-white tracking-wide'
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className='rounded-full p-3 m-1 bg-neutral-500'
                >
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/*Result*/}

            {
                loading ? (<Loading />) :

                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            className='space-y-3'
                        >
                            <Text className='text-white font-semibold ml-1'>Result ({results.length})</Text>
                            <View className='flex-row justify-between flex-wrap'>
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}
                                                className='bg-neutral-500 rounded-full p-3 m-1'
                                            >
                                                <View className='mb-4 space-y-2'>
                                                    <Image className='rounded-3xl'
                                                        source={{ uri: image185(item?.poster_path) || fallbaclMoviePoster }}
                                                        style={{ width: width * 0.44, height: height * 0.3 }}
                                                    />
                                                    <Text className='text-white ml-1'>
                                                        {
                                                            item?.title.length > 14 ? item?.title.slice(0, 14) + '...' : item?.title
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className='flex-row justify-center'>
                            <Image className='h-96 w-96' source={require('../assets/2.png')} />
                        </View>
                    )
            }
        </SafeAreaView>
    )
}

export default SearchScreen;
