import React from 'react';
import { StyleSheet, Image, Dimensions, Text, View } from 'react-native';
import { ScrollView } from 'react-native-web';
import WhiteText from './WhiteText';
import Styles from '../assets/styles';


const FullPoster = (props) => {
    return (
        <View>
            <Text style = {{padding:5, textAlign:'center'}} onPress={()=>{props.closeModal('poster')}}>X</Text>
            <Image src = {`https://image.tmdb.org/t/p/w500${props.image}`} style = {Styles.imageModal} contentFit={'contain'}/>
        </View>
        );
};

export default FullPoster;