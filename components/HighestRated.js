import React, { useState, useEffect }  from 'react';
import { Text, View, Pressable, Image, ScrollView, FlatList } from 'react-native';
import Styles from '../assets/styles';
import WhiteText from './WhiteText';

export default function HighestRated({navigation}) {
    let [highestRated, setHighestRated] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b")
        .then(response => response.json())
        .then((result) => {setHighestRated(highestRated = result.results)})
    }, []);

    return (
        <>
        <ScrollView horizontal={true} style = {{marginBottom:40}}>
            {highestRated.map((movie, index) => 
                <View key = {movie.id} style = {Styles.browseComponent}> 
                    <WhiteText style = {Styles.browseHeading}>{movie.original_title}</WhiteText>
                    <Image
                        style={Styles.image}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        resizeMethod={'auto'}
                    />
                    <Pressable
                        style={Styles.showMoreButton}
                        onPress={() => navigation.navigate('MovieDetails', {movieInfo: movie})}
                    >
                        <Text style = {Styles.buttonText}>MORE INFO</Text>
                    </Pressable>
                </View>
                )}
        </ScrollView>
        </>
    );
};