import React, { useState, useEffect, useContext }  from 'react';
import { Text, View, Pressable, Image, ScrollView } from 'react-native';
import Styles from '../assets/styles';
import TextColorSwitcher from '../components/TextColorSwitcher.js';
import Menu from '../components/Menu.js';
import { ThemeContext } from '../components/ThemeContext.js';
import {fetchCategoryFull} from '../components/api.js';
 
export default function FullCategoryScreen({navigation, route}) {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [showNavigation, setShowNavigation] = useState(false)
    const [error, setError] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const [loading, setLoading] = useState(false)

    let theme = useContext(ThemeContext)

    useEffect(() => {
        setLoading(true)
        fetchCategoryFull(route.params.query, page)
        .then((result) => {setTotalPages(result.total_pages); setMovies(result.results); setLoading(false)})
        .catch((err) => {console.log(err.message); setError(true); setErrMessage(err.message)})
    }, [page]);

    let getYear = (date) => {
        return date.split('-')[0]
    }

    return (
        <>
            <ScrollView style={[Styles.container, {backgroundColor: theme.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]} onMomentumScrollBegin = {()=>{setShowNavigation(true)}}>
            {error ? (<TextColorSwitcher style = {Styles.browseHeading}>Error: {errMessage}</TextColorSwitcher>) : 
                loading ? (<TextColorSwitcher style = {Styles.browseHeading}>Loading...</TextColorSwitcher>) : 
                <View style = {{paddingBottom:20}}>
                    <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}><TextColorSwitcher style = {{fontSize: 25, fontWeight: 300, color: "white", paddingBottom: 8}}>{route.params.title}</TextColorSwitcher><TextColorSwitcher>Page: {page}</TextColorSwitcher></View>
                    <View style = {{flexDirection: "row", flexWrap: "wrap"}}>
                    {movies.map((movie, index) => 
                        <View style = {Styles.fulCategoryComponent} key = {movie.id}> 
                            <Image
                                style={{height:230, width:150}}
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                resizeMethod={'auto'}
                            />
                            <View style = {{flexDirection:'column'}}>
                                <TextColorSwitcher style = {{fontWeight:'bold', height:40, paddingTop:5}}>{movie.original_title}</TextColorSwitcher>
                                {route.params.query == 'now_playing' ? 
                                <TextColorSwitcher >Released: <Text style={{fontWeight:'bold'}}>{movie.release_date}</Text></TextColorSwitcher> :                        
                                <TextColorSwitcher>Year: <Text style={{fontWeight:'bold'}}>{getYear(movie.release_date)}</Text></TextColorSwitcher>}
                                {route.params.query == 'top_rated' ? 
                                <View>
                                    <TextColorSwitcher>Average rating: <Text style={{color: theme.getColorTheme() === 'dark' ? 'yellow' : 'blue', fontWeight:'bold'}}>{movie.vote_average}</Text></TextColorSwitcher>
                                    <TextColorSwitcher>Popularity index: <Text style={{color:'green', fontWeight:'bold'}}>{'\n'}{movie.popularity}</Text></TextColorSwitcher>
                                </View> :null}
                                {route.params.query == 'popular' ? 
                                <TextColorSwitcher style = {{height:40, paddingTop:5}}>Popularity index: <Text style={{color:'green', fontWeight:'bold'}}>{'\n'}{movie.popularity}</Text></TextColorSwitcher>
                                : null}
                                <Pressable
                                    style={[Styles.showMoreButton, {marginVertical:10, width: 150}]}
                                    onPress={() => navigation.navigate('MovieDetails', {movieInfo: movie})}
                                >
                                    <Text style = {Styles.buttonText}>
                                        MORE INFO
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        )}
                    </View>
                </View>}
            </ScrollView>
            {showNavigation && <View style = {Styles.navigation}>
                <Pressable
                    disapled = {page <= 1 && true}
                    onPress={() => {setPage(page == 1 ? 1 : page-1)}}
                >
                    <Text style = {Styles.buttonText}>
                        Previous
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => {setPage(page == totalPages ? totalPages : page+1)}}
                >
                    <Text style = {Styles.buttonText}>
                        Next
                    </Text>
                </Pressable>
            </View>}
            <Menu navigation = {navigation}/>
        </>
    );
};