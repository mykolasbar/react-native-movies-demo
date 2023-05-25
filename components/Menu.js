import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { StyleSheet, Text, View, Button, TextInput, Dimensions } from 'react-native';
import WhiteText from './WhiteText';

const Menu = ({navigation, route}) => {
    let user = useContext(UserContext)

    return (
        <View style = {{width: Dimensions.get('window').width, height:40, backgroundColor: '#181926'}}>
            <Text style = {{color:'white'}} onPress={() => navigation.navigate('Profile')}>{user.getUserName()}</Text>
        </View>
    );
};

export default Menu;