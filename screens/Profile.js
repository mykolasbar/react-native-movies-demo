import React, { useContext }  from 'react';
import { View, ScrollView } from 'react-native';
import { UserContext } from '../components/UserContext';
import { ThemeContext } from '../components/ThemeContext';
import Styles from '../assets/styles.js'
import TextColorSwitcher from '../components/TextColorSwitcher';
import Watchlist from '../components/Watchlist';
import Menu from '../components/Menu';
import ColorSwitcher from '../components/ColorSwitcher';

const Profile = ({navigation}) => {

    let user = useContext(UserContext)
    let theme = useContext(ThemeContext)

    return (
        <>
        <ScrollView style={[Styles.container, {backgroundColor: theme.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]}>
            <View>
                <TextColorSwitcher style = {Styles.profileHeader}>User name:</TextColorSwitcher>
                <TextColorSwitcher>{user.getUserName()}</TextColorSwitcher>
            </View>
            <View>
                <TextColorSwitcher style = {Styles.profileHeader}>Color theme</TextColorSwitcher>
                <ColorSwitcher />
            </View>
            <View style = {{marginBottom:30}}>
                <TextColorSwitcher style = {Styles.profileHeader}>WATCHLIST:</TextColorSwitcher>
                <Watchlist />
            </View>
        </ScrollView>
        <Menu navigation = {navigation}/>
        </>
    );
};

export default Profile;