import React, { useState, useEffect, useContext }  from 'react';
import { Text, View, Button, Image, Dimensions, TouchableOpacity, ScrollView, Linking, Pressable } from 'react-native';
import Styles from '../assets/styles';
import FullPoster from '../components/FullPoster';
// import YoutubeIframe from 'react-native-youtube-iframe';
import Player from '../components/Player';
import TextColorSwitcher from '../components/TextColorSwitcher.js';
import Menu from '../components/Menu';
import { UserContext } from '../components/UserContext';
import { ThemeContext } from '../components/ThemeContext.js';

const MovieDetails = ({navigation, route}) => {
    let user = useContext(UserContext)
    let theme = useContext(ThemeContext)
    let watchlist = user.getWatchlist()

    let [movieDetails, setMovieDetails] = useState({})
    let [showFullPoster, setShowFullPoster] = useState(false)
    let [videos, setVideos] = useState([])
    let [showPlayer, setShowPlayer] = useState(false)
    let [firstTrailer, setFirstTrailer] = useState({})
    let [genres, setGenres] = useState([])
    let [year, setYear] = useState()
    let [inWatchlist, setInWatchlist] = useState((watchlist.findIndex(film=>route.params.movieInfo.id == film.id) === -1) ? false : true)

    let closeModal = (type) => {
        type === 'player' && showPlayer ? setShowPlayer(false) : null
        type === 'poster' && showFullPoster ? setShowFullPoster(false) : null
    }

    let openURL = (url) => {
      Linking.openURL(`https://www.imdb.com/title/${url}`).catch((err) => console.error('An error occurred', err));
    }

    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${route.params.movieInfo.id}?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b`)
      .then(response => response.json())
      .then(result => setMovieDetails(movieDetails = result))
      .then(() => setGenres(movieDetails.genres))
      .then(() => setYear(movieDetails.release_date.split('-')[0]))
    }, []);

    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${route.params.movieInfo.id}/videos?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b`)
      .then(response => response.json())
      .then((videos) => {setFirstTrailer(videos.results.find(video => video.type === 'Trailer'))})
    }, []);

    let convertRuntime = (minutes) => {
      let hours = (minutes - minutes % 60)/60
      minutes = minutes % 60
      return hours + ' h. ' + minutes + ' m.'
    }

    return (
      <>
        {showFullPoster ? <FullPoster image = {movieDetails.poster_path}  closeModal = {closeModal}/> : null}
        {showPlayer ? <Player videoId = {firstTrailer.key} closeModal = {closeModal}/> : null}
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
                <TextColorSwitcher style = {{fontWeight:'bold', paddingTop: 20}} onPress={() => {setShowPlayer(true)}}>View Trailer</TextColorSwitcher>
              </View>
            </View>
            <View style={{flex:1}}><TextColorSwitcher style = {Styles.movieDetailsItem}>{movieDetails.overview}</TextColorSwitcher></View>
            <Pressable
              style = {Styles.addToWatchlistButton}
              onPress={() => {inWatchlist === false ? (user.addToWatchlist(movieDetails), setInWatchlist(true)) : (console.log(movieDetails.id), user.removeFromWatchlist(movieDetails.id), setInWatchlist(false))}}
            >
              <Text>{inWatchlist ? 'REMOVE FROM WATCHLIST' : 'ADD TO WATCHLIST'}</Text>
            </Pressable>
            <Button
              style = {{paddingBottom:10}}
              title="Browse films"
              onPress={() => navigation.navigate('Browse')}
            />
          </View>
        </ScrollView>
        <Menu navigation = {navigation}/>
      </>
    );
};

export default MovieDetails;