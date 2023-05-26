import React, { useContext, useState }  from 'react';
import { View, ScrollView, TextInput, Button } from 'react-native';
import { UserContext } from '../components/UserContext';
import { ThemeContext } from '../components/ThemeContext';
import Styles from '../assets/styles.js'
import TextColorSwitcher from '../components/TextColorSwitcher';
import Watchlist from '../components/Watchlist';
import Menu from '../components/Menu';
import ColorSwitcher from '../components/ColorSwitcher';

const Search = ({navigation}) => {
    let user = useContext(UserContext)
    let theme = useContext(ThemeContext)

    let [movies, setMovies] = useState([])
    let [query, setQuery] = useState()
    let [page, setPage] = useState(1)

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer 0f4ef1ceadd5dc4b42d00c8efa9fb83b'
        }
      };

    let handleSearch = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&page=1`, options)
        .then(response => response.json())
        .then(result => setMovies(result.results))
    }

    return (
        <>
            <View style={[Styles.container, {backgroundColor: theme.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]}>
                <View>
                    <TextInput style={Styles.input} placeholder="Search for movie" onChangeText={(text)=>{setQuery(text)}}></TextInput>
                    <Button
                        title="Search"
                        onPress={() => {handleSearch()}}
                    />
                </View>
            <ScrollView horizontal = {true} style = {Styles.browseRows}>
            {movies !== [] && 
            (movies.total_results  == 0 ? 'No results' : movies.map((movie, index) => 
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
                ))}
            </ScrollView>
            <Menu navigation = {navigation}/>
            </View>
        </>
    );
};

export default Search;