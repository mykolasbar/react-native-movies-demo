import React, { useState, useEffect, useContext }  from 'react';
import { StyleSheet, Text, View, Button, Pressable, ScrollView, Image } from 'react-native';
import { UserContext } from './UserContext'
import { ThemeContext } from './ThemeContext';
import Styles from '../assets/styles';
import WhiteText from './WhiteText';

const ColorSwitcher = () => {
    let theme = useContext(ThemeContext)

    return (
        <View style = {{flexDirection:'row'}}>
            <View>
                <View style = {{height:36, paddingRight:10}}>
                    <WhiteText>Dark</WhiteText>
                </View>
                <View style = {{height:36, paddingRight:10}}>
                    <WhiteText>Light</WhiteText>
                </View>
            </View>
            <View style = {{flexDirection:'column', backgroundColor:'#7ba5e8', width:36, height:66, alignItems:'center', justifyContent:'center'}}>
                <Pressable 
                    onPress = {() => {theme.setColorTheme('dark')}}
                    style={{width:30, height:30, backgroundColor: theme.getColorTheme()  === 'dark' ? 'black' : '#7ba5e8'}}>
                </Pressable>
                <Pressable 
                    onPress = {() => {theme.setColorTheme('light')}}
                    style={{width:30, height:30, backgroundColor: theme.getColorTheme()  === 'light' ? 'black' : '#7ba5e8'}}>
                </Pressable>
            </View>
        </View>
    );
};

export default ColorSwitcher;