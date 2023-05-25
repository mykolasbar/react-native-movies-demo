import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Browse from './screens/Browse';
import MovieDetails from './screens/MovieDetails';
import Popular from './components/Popular';
import CurrentlyShowing from './components/CurrentlyShowing';
import HighestRated from './components/HighestRated';
import FullCategoryScreen from './screens/FullCategoryScreen';
import FullPoster from './components/FullPoster';
import Profile from './screens/Profile';
import Menu from './components/Menu';
import WhiteText from './components/WhiteText';
import { UserContext, UserProvider } from './components/UserContext.js';
import { ThemeContext, ThemeProvider } from './components/ThemeContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Browse" component={Browse} />
            <Stack.Screen name="Popular" component={Popular} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
            <Stack.Screen name="CurrentlyShowing" component={CurrentlyShowing} />
            <Stack.Screen name="HighestRated" component={HighestRated} />
            <Stack.Screen name="FullCategoryScreen" component={FullCategoryScreen}/>
            <Stack.Screen name="FullPoster" component={FullPoster}/>
            <Stack.Screen name="Menu" component={Menu}/>
            <Stack.Screen name="Profile" component={Profile}/>
          </Stack.Navigator>
        </NavigationContainer>
        <WhiteText />
      </UserProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

