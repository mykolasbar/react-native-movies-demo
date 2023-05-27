import React, { useContext }  from 'react';
import { ScrollView, Text } from 'react-native';
import Styles from '../assets/styles.js'
import TextColorSwitcher from '../components/TextColorSwitcher.js';
import Menu from '../components/Menu.js';
import BrowseMoviesCategory from '../components/BrowseMoviesCategory.js';
import { ThemeContext } from '../components/ThemeContext.js';

export default function Browse({navigation}) {
        let theme = useContext(ThemeContext)

  return (
        <>
        <ScrollView style={[Styles.container, {backgroundColor: theme.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]}>
                <TextColorSwitcher style = {Styles.browseScreenHeader}>Currently Showing <Text 
                        style={Styles.browseScreenLink}
                        onPress={() => navigation.navigate('FullCategoryScreen', {query: 'now_playing', title: 'Currently showing'})}>(View more)</Text></TextColorSwitcher>
                <BrowseMoviesCategory query = 'now_playing' navigation = {navigation}/>
                <TextColorSwitcher style = {Styles.browseScreenHeader}>Popular <Text 
                        style={Styles.browseScreenLink}
                        onPress={() => navigation.navigate('FullCategoryScreen', {query: 'popular', title: 'Popular films'})}>(View more)</Text></TextColorSwitcher>
                <BrowseMoviesCategory query = 'popular' navigation = {navigation}/>
                <TextColorSwitcher style = {Styles.browseScreenHeader}>Highest rated <Text 
                        style={Styles.browseScreenLink}
                        onPress={() => navigation.navigate('FullCategoryScreen', {query: 'top_rated', title: 'Highest-rated films'})}>(View more)</Text></TextColorSwitcher>
                <BrowseMoviesCategory query = 'top_rated' navigation = {navigation}/>
        </ScrollView>
        <Menu navigation = {navigation}/>
        </>
  );
}
