import React, { useContext, useState, useEffect }  from 'react';
import { View, ScrollView, TextInput, Pressable, Text, Image, Button } from 'react-native';
import { UserContext } from '../components/UserContext';
import { ThemeContext } from '../components/ThemeContext';
import Styles from '../assets/styles.js'
import TextColorSwitcher from '../components/TextColorSwitcher';
import Menu from '../components/Menu';
import { searchMovies } from '../components/api.js' 

const Search = ({navigation}) => {
    let theme = useContext(ThemeContext)

    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState()
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [totalResults, setTotalResults] = useState()
    const [error, setError] = useState(false)

    const handleSearch = (page) => {
        if (query !== null)
            searchMovies(query, page)
            .then((result) => {setMovies(result.results); setTotalPages(result.total_pages); setTotalResults(result.total_results); console.log(result)})
            .catch((err) => {setError(err.message)})
        }       

    return (
        <>
            <View style={[Styles.container, {backgroundColor: theme.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]}>
            <TextColorSwitcher style = {Styles.browseScreenHeader}>Find films</TextColorSwitcher>
                <View>
                    <TextInput style={Styles.searchField} placeholder="Search by title or part of title" onChangeText={(text)=>{setQuery(text)}}></TextInput>
                    <Pressable
                        style = {Styles.searchButton}
                        onPress={() => {handleSearch(1)}}
                        >
                        <Text style = {{color:'white'}}>SEARCH</Text>
                    </Pressable>
                </View>
                <ScrollView style = {[Styles.browseRows, {marginBottom:5}]}>
                {error ? <TextColorSwitcher style = {Styles.browseHeading}>Error: {error}</TextColorSwitcher> :
                    (totalResults == 0 ? 
                        <TextColorSwitcher style = {Styles.browseScreenHeader}>No results</TextColorSwitcher> : 
                        movies.length !== 0 ?
                        <View style = {{flexDirection:'column'}}>
                            <View style = {Styles.searchResultsTop}>
                                <TextColorSwitcher style = {Styles.browseScreenHeader}>Results</TextColorSwitcher>
                                <TextColorSwitcher>Page: {page}</TextColorSwitcher>
                            </View>
                            <TextColorSwitcher>Total pages: {totalPages}</TextColorSwitcher>
                            <TextColorSwitcher>Total results: {totalResults}</TextColorSwitcher>
                            {movies.map((movie, index) => 
                            <View key = {movie.id} style = {Styles.searchResult}> 
                                <Image
                                    style={Styles.image}
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    resizeMethod={'auto'}
                                />
                                <View style={Styles.searchResultsInfo}>
                                    <TextColorSwitcher style = {Styles.browseHeading}>{movie.original_title}</TextColorSwitcher>
                                    <TextColorSwitcher>Year released: <Text style = {{fontWeight:'bold'}}>{movie.release_date.split('-')[0]}</Text></TextColorSwitcher>
                                    <Pressable
                                        style={Styles.showMoreButtonSearchResults}
                                        onPress={() => navigation.navigate('MovieDetails', {movieInfo: movie})}
                                    >
                                        <Text style = {Styles.buttonText}>MORE INFO</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}</View> : null
                    )
                }
                {totalPages > 1 &&
                (<View style = {Styles.searchNavigation}>
                    <Pressable
                        onPress={() => {setPage(page == 1 ? 1 : page-1); handleSearch(page === 1 ? page : page-1)}}
                    >
                        <Text style = {Styles.buttonText}>
                            Previous
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {setPage(page == totalPages ? totalPages : page+1); handleSearch(page === totalPages ? page : page+1); console.log(page)}}
                    >
                        <Text style = {Styles.buttonText}>
                            Next
                        </Text>
                    </Pressable>
                    </View>)}
                </ScrollView>
            </View>
            <Menu navigation = {navigation}/>
        </>
    );
};

export default Search;