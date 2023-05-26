import React, { useState, useEffect }  from 'react';
import { Text, View, Pressable, Image, ScrollView, Dimensions } from 'react-native';
import Styles from '../assets/styles';
import TextColorSwitcher from './TextColorSwitcher';

export default function BrowseMoviesCategory({navigation, query}) {
    let [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${query}?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b&language=en-US`)
        .then(response => response.json())
        .then(result => setMovies(result.results))
    }, []);

    return (
        <ScrollView horizontal = {true} style = {Styles.browseRows}>
            {movies.map((movie, index) => 
                <View key = {movie.id} style = {Styles.browseComponent}> 
                    <TextColorSwitcher style = {Styles.browseHeading}>{movie.original_title}</TextColorSwitcher>
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
    );
};