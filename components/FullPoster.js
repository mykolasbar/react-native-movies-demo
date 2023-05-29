import React from 'react';
import { Image, Text, View, Pressable, Dimensions } from 'react-native';
import Styles from '../assets/styles';
import TextColorSwitcher from './TextColorSwitcher';


const FullPoster = (props) => {
    return (
        <View style = {Styles.imageModal}>
            <Pressable onPress={()=>{props.closeModal('poster')}}><TextColorSwitcher style = {{padding:5, width: Dimensions.get('window').width, textAlign:'right', fontSize:20}}>X</TextColorSwitcher></Pressable>
            <Image src = {`https://image.tmdb.org/t/p/w500${props.image}`} contentFit={'contain'} style = {{height:500, width:330}}/>
        </View>
        );
};

export default FullPoster;