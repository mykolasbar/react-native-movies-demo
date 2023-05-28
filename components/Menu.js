import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { View, Image,TouchableOpacity } from 'react-native';
import Styles from '../assets/styles';

const Menu = ({navigation, route}) => {
    let user = useContext(UserContext)

    return (
        <View style = {Styles.menu}>
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