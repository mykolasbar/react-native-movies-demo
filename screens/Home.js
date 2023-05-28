import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext }  from 'react';
import { Text, View, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import Styles from '../assets/styles.js'
import TextColorSwitcher from '../components/TextColorSwitcher.js';
import { UserContext } from '../components/UserContext.js';
import { ThemeContext } from '../components/ThemeContext.js';

export default function Home({navigation, route}) {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showNotif, setShowNotif] = useState(false)

  let user = useContext(UserContext)
  let theme = useContext(ThemeContext)

  return (
    <KeyboardAvoidingView style={[Styles.container, {backgroundColor: theme.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]}>
      <View style={Styles.homeContainer}>
        <TextColorSwitcher style = { Styles.homeHeader }>Please log in</TextColorSwitcher>
        <TextInput style={Styles.input} placeholder="User name" onChangeText={(text)=>{setUserName(text)}}></TextInput>
        <TextInput style={Styles.input} placeholder="Password" onChangeText={(text)=>{setPassword(text)}}></TextInput>
        <Pressable
            onPress={() => {user.setUserName(userName); password === 'password' ? (navigation.navigate('Browse'), setShowNotif(false)) : (setShowNotif(true))}}
            style = {[Styles.showMoreButton, {margin:10}]}
        >
            <TextColorSwitcher>Log in</TextColorSwitcher>
        </Pressable>
      </View>
     {showNotif && <Text style = {Styles.homeNotif}>Incorrect user name or password</Text>}
    </KeyboardAvoidingView>
  );
}
