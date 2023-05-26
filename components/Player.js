import React from 'react';
import { StyleSheet, Image, Dimensions, Text, View, Overlay } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import TextColorSwitcher from './TextColorSwitcher';

const Player = (props) => {
    return (
        <View style = {{position:'absolute', left: 0, right: 0, top: 0, zIndex:20, backgroundColor:'rgba(0,0,0,0.5)', height: Dimensions.get('window').height}} contentFit={'contain'}>
            <View style = {{marginTop:100}}>
                <TextColorSwitcher style = {{padding:15, textAlign:'right'}} onPress={()=>{props.closeModal('player')}}>X</TextColorSwitcher>
                <YoutubeIframe width = {Dimensions.get('window').width} height = {200} videoId = {props.videoId}/>
            </View>
        </View>
    );
};

export default Player;


// Movie's videos: https://api.themoviedb.org/3/movie/785759/videos?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b

// Movie's details: https://api.themoviedb.org/3/movie/785759?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b