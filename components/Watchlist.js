import React, { useContext }  from 'react';
import { Text, View, Pressable, ScrollView, Image } from 'react-native';
import { UserContext } from './UserContext'
import { ThemeContext } from './ThemeContext';
import Styles from '../assets/styles';
import WhiteText from './WhiteText';

const Watchlist = () => {
    let user = useContext(UserContext)
    let theme = useContext(ThemeContext)
    let watchlist = user.getWatchlist()

    return (   
        <ScrollView horizontal={true} style = {Styles.browseRows}>
        {watchlist.map((movie, index) => 
            <View key = {index} style = {Styles.browseComponent}> 
                <WhiteText style = {Styles.browseHeading}>{movie.original_title}</WhiteText>
                <Image
                    style={Styles.image}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    resizeMethod={'auto'}
                />
                <Pressable
                    style={Styles.showMoreButton}
                    onPress={() => navigation.navigate('MovieDetails', {movieInfo: movie})}
                >
                    <Text style = {Styles.buttonText}>MORE INFO</Text>
                </Pressable>
                <Pressable
                    style={[Styles.addToWatchlistButton, {width: 170}]}
                    onPress={() => user.removeFromWatchlist(movie.id)}
                >
                    <Text style = {{fontSize:12}}>REMOVE FROM WATCHLIST</Text>
                </Pressable>
            </View>
        )}
        </ScrollView>
    )
};

export default Watchlist;
