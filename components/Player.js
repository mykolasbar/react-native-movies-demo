import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Dimensions, Text, View, Overlay, TouchableOpacity } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import TextColorSwitcher from './TextColorSwitcher';
import Styles from '../assets/styles';
import { fetchVideos } from './api';

const Player = (props) => {
    const [firstTrailer, setFirstTrailer] = useState({})
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchVideos(props.filmId)
        .then((videos) => {setFirstTrailer(videos.results.find(video => video.type === 'Trailer'))})
        .catch((err) => {console.log(err.message); setError(err.message)})
      }, []);

    return (
        <View style = {{position:'absolute', left: 0, right: 0, top: 0, zIndex:20, backgroundColor:'rgba(0,0,0,0.5)', height: Dimensions.get('window').height}} contentFit={'contain'}>
            {error ? <TextColorSwitcher style = {Styles.browseHeading}>{error}</TextColorSwitcher> :
            <View style = {{marginTop:100}}>
                <TouchableOpacity onPress={()=>{props.closeModal('player')}}><TextColorSwitcher style = {{padding:15, textAlign:'right'}}>X</TextColorSwitcher></TouchableOpacity>
                <YoutubeIframe width = {Dimensions.get('window').width} height = {200} videoId = {firstTrailer.key}/>
            </View>}
        </View>
    );
};

export default Player;


// Movie's videos: https://api.themoviedb.org/3/movie/785759/videos?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b

// Movie's details: https://api.themoviedb.org/3/movie/785759?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b