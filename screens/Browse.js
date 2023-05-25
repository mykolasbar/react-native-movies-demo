import React, { useContext }  from 'react';
import { ScrollView } from 'react-native';
import Styles from '../assets/styles.js'
import WhiteText from '../components/WhiteText.js';
import Menu from '../components/Menu.js';
import BrowseMoviesCategory from '../components/BrowseMoviesCategory.js';
import { ThemeContext } from '../components/ThemeContext.js';

export default function Browse({navigation}) {
        let theme = useContext(ThemeContext)

  return (
        <>
        <ScrollView style={[Styles.container, {backgroundColor: theme.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]}>
                <WhiteText style = {Styles.browseScreenHeader}>Currently Showing <WhiteText 
                        style={Styles.browseScreenLink}
                        onPress={() => navigation.navigate('FullCategoryScreen', {query: 'now_playing', title: 'Currently showing'})}>(View more)</WhiteText></WhiteText>
                <BrowseMoviesCategory query = 'now_playing'/>
                <WhiteText style = {Styles.browseScreenHeader}>Popular <WhiteText 
                        style={Styles.browseScreenLink}
                        onPress={() => navigation.navigate('FullCategoryScreen', {query: 'popular', title: 'Popular films'})}>(View more)</WhiteText></WhiteText>
                <BrowseMoviesCategory query = 'popular'/>
                <WhiteText style = {Styles.browseScreenHeader}>Highest rated <WhiteText 
                        style={Styles.browseScreenLink}
                        onPress={() => navigation.navigate('FullCategoryScreen', {query: 'top_rated', title: 'Highest-rated films'})}>(View more)</WhiteText></WhiteText>
                <BrowseMoviesCategory query = 'top_rated'/>
        </ScrollView>
        <Menu navigation = {navigation}/>
        </>
  );
}
