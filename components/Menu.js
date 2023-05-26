import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { StyleSheet, Text, View, Button, Dimensions, Image,TouchableOpacity } from 'react-native';
import TextColorSwitcher from './TextColorSwitcher';
import Styles from '../assets/styles';

const Menu = ({navigation, route}) => {
    let user = useContext(UserContext)

    return (
        <View style = {{width: Dimensions.get('window').width, backgroundColor: '#181926', flexDirection:'row', padding:5, justifyContent:'space-between'}}>
            {/* <Text style = {{color:'white', padding:10}} onPress={() => navigation.navigate('Profile')}>{user.getUserName()}</Text> */}
            <TouchableOpacity onPress={() => navigation.navigate('Browse')}>
                <Image style = {Styles.menuLogo} source = {require('../assets/menu-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Image style = {Styles.menuLogo} source = {require('../assets/search-icon-white-png-18.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image style = {Styles.menuLogo} source = {require('../assets/profile-icon2.png')} />
            </TouchableOpacity>
        </View>
    );
};

export default Menu;