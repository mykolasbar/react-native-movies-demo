import React, { useContext }  from 'react';
import { View, ScrollView } from 'react-native';
import { UserContext } from '../components/UserContext';
import { ThemeContext } from '../components/ThemeContext';
import Styles from '../assets/styles.js'
import WhiteText from '../components/WhiteText';
import Watchlist from '../components/Watchlist';
import ColorSwitcher from '../components/ColorSwitcher';

const Profile = () => {

    let user = useContext(UserContext)
    let theme = useContext(ThemeContext)

    return (
        <ScrollView style={[Styles.container, {backgroundColor: theme.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]}>
            <View>
                <WhiteText style = {Styles.profileHeader}>User name:</WhiteText>
                <WhiteText>{user.getUserName()}</WhiteText>
            </View>
            <View>
                <WhiteText style = {Styles.profileHeader}>Color theme</WhiteText>
                <ColorSwitcher />
            </View>
            <View style = {{marginBottom:30}}>
                <WhiteText style = {Styles.profileHeader}>WATCHLIST:</WhiteText>
                <Watchlist />
            </View>
        </ScrollView>
    );
};

export default Profile;