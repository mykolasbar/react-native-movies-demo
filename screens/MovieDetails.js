import React, { useState, useEffect, useContext }  from 'react';
import { Text, View, Button, Image, Dimensions, TouchableOpacity, ScrollView, Linking, Pressable } from 'react-native';
import Styles from '../assets/styles';
import FullPoster from '../components/FullPoster';
import Player from '../components/Player';
import BrowseMoviesCategory from '../components/BrowseMoviesCategory.js';
import TextColorSwitcher from '../components/TextColorSwitcher.js';
import Menu from '../components/Menu';
import { UserContext } from '../components/UserContext';
import { ThemeContext } from '../components/ThemeContext.js';

const MovieDetails = ({navigation, route}) => {
    let user = useContext(UserContext)
    let theme = useContext(ThemeContext)
    let watchlist = user.getWatchlist()

    const [movieDetails, setMovieDetails] = useState({})
    const [showFullPoster, setShowFullPoster] = useState(false)
    const [videos, setVideos] = useState([])
    const [showPlayer, setShowPlayer] = useState(false)
    const [firstTrailer, setFirstTrailer] = useState({})
    const [genres, setGenres] = useState([])
    const [year, setYear] = useState('')
    const [inWatchlist, setInWatchlist] = useState((watchlist.findIndex(film=>route.params.movieInfo.id == film.id) === -1) ? false : true)
    const [error, setError] = useState(false)

    let closeModal = (type) => {
        type === 'player' && showPlayer ? setShowPlayer(false) : null
        type === 'poster' && showFullPoster ? setShowFullPoster(false) : null
    }

    let openURL = (url) => {
        Linking.openURL(`https://www.imdb.com/title/${url}`).catch((err) => console.error('An error occurred', err));
    }

    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${route.params.movieInfo.id}?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b`)
      .then((response) => response.json())
      .then((result) => {setMovieDetails(result); setGenres(result.genres); setYear(result.release_date.split('-')[0])})
      .catch((err) => {console.log(err.message); setError(err.message)})
    }, [route]);

    let convertRuntime = (minutes) => {
      let hours = (minutes - minutes % 60)/60
      minutes = minutes % 60
      return hours + ' h. ' + minutes + ' m.'
    }

    return (
      <>
        {showFullPoster ? <FullPoster image = {movieDetails.poster_path}  closeModal = {closeModal}/> : null}
        {showPlayer ? <Player filmId = {movieDetails.id} videoId = {firstTrailer.key} closeModal = {closeModal}/> : null}
        {error ? <TextColorSwitcher style = {Styles.browseHeading}>{error}</TextColorSwitcher> :
        <ScrollView style={[Styles.container, {backgroundColor: theme.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]} horizontal={false}>
          <View style = {Styles.movieScreenContainer}>
            <TextColorSwitcher style = {Styles.movieDetailsHeader}>{movieDetails.original_title}</TextColorSwitcher>
            <View style = {{flexDirection:'row'}}>
              <TouchableOpacity onPress={() => {setShowFullPoster(true)}} style = {{paddingBottom:8}}>
              <Image
                style={{height:250, width: 170}}
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              />
              </TouchableOpacity>
              <View style={{flexDirection:'column', flex:1, paddingHorizontal:10}}>
                <TextColorSwitcher style = {Styles.movieDetailsItem}>Year: <TextColorSwitcher style = {{fontWeight:'bold'}}>{year}</TextColorSwitcher></TextColorSwitcher>
                <TextColorSwitcher style = {Styles.movieDetailsItem}>Average evaluation: <TextColorSwitcher style = {{fontWeight:'bold'}}>{movieDetails.vote_average}</TextColorSwitcher></TextColorSwitcher>
                <TextColorSwitcher style = {Styles.movieDetailsItem}>Genres: {genres.map((genre, index) => <TextColorSwitcher  key = {genre.id} style = {{fontWeight:'bold'}}>{genre.name}{index === genres.length-1 ? '' : '/'}</TextColorSwitcher>)}</TextColorSwitcher>
                <TextColorSwitcher style = {Styles.movieDetailsItem}>Runtime: <TextColorSwitcher style = {{fontWeight:'bold'}}>{convertRuntime(movieDetails.runtime)}</TextColorSwitcher></TextColorSwitcher>
                <TouchableOpacity onPress = {()=>{openURL(movieDetails.imdb_id)}} style = {Styles.movieDetailsItem}>
                  <Image style = {Styles.IMDBLogo} source = {require('../assets/IMDB_Logo_2016.svg.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setShowPlayer(true)}}>
                  <TextColorSwitcher style = {{fontWeight:'bold', paddingTop: 20}}>View Trailer</TextColorSwitcher>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex:1}}><TextColorSwitcher style = {Styles.movieDetailsItem}>{movieDetails.overview}</TextColorSwitcher></View>
            <Pressable
              style = {Styles.addToWatchlistButton}
              onPress={() => {inWatchlist === false ? (user.addToWatchlist(movieDetails), setInWatchlist(true)) : (console.log(movieDetails.id), user.removeFromWatchlist(movieDetails.id), setInWatchlist(false))}}
            >
              <Text>{inWatchlist ? 'REMOVE FROM WATCHLIST' : 'ADD TO WATCHLIST'}</Text>
            </Pressable>
            <TextColorSwitcher style = {Styles.browseScreenHeader}>Recommended titles</TextColorSwitcher>
            <BrowseMoviesCategory query = {`${route.params.movieInfo.id}/recommendations`} navigation = {navigation}/>
          </View>
        </ScrollView>}
        <Menu navigation = {navigation}/>
      </>
    );
};

export default MovieDetails;