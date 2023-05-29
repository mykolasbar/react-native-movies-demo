import React, { useState, useEffect }  from 'react';
import { Text, View, Pressable, Image, ScrollView } from 'react-native';
import Styles from '../assets/styles';
import TextColorSwitcher from './TextColorSwitcher';
import { fetchCategory } from './api';

export default function BrowseMoviesCategory({navigation, query, route}) {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchCategory(query)
        .then(result => setMovies(result.results))
        .catch((err) => {console.log(err.message); setError(err.message)})
    }, [query]);

    return (
        <ScrollView horizontal = {true} style = {Styles.browseRows}>
            {error ? <TextColorSwitcher style = {Styles.browseHeading}>{error}</TextColorSwitcher> :
            movies.map((movie, index) => 
                <View key = {movie.id} style = {Styles.browseComponent}> 
                    <TextColorSwitcher style = {Styles.browseHeading}>{movie.original_title}</TextColorSwitcher>
                    <Image
                        style={Styles.image}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        resizeMethod={'auto'}
                    />
                    <Pressable
                        style={Styles.showMoreButton}
                        onPress={() => {navigation.navigate('MovieDetails', {movieInfo: movie}); console.log('test')}}
                    >
                        <Text style = {Styles.buttonText}>MORE INFO</Text>
                    </Pressable>
                </View>
                )}
        </ScrollView>
    );
};