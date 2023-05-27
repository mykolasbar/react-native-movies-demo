import { StyleSheet, Dimensions } from 'react-native';

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#1c1d1f',
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    browseHeading: {
      fontWeight:'bold',
      height:40,
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent:'center',

    },
    browseComponent: {
      fontSize: "1rem", 
      width: Dimensions.get('window').width / 2,
    },
    browseRows: {
      marginBottom: 20,
    },
    showMoreButton: {
      width:170,
      height:40,
      backgroundColor:'#2c3b42',
      alignItems: 'center',
      justifyContent:'center',
      margin: 12,
    },
    addToWatchlistButton: {
      height:30,
      backgroundColor:'yellow',
      alignItems: 'center',
      justifyContent:'center',
      marginBottom: 10
    },
    buttonText: {
      color:'white',
    },
    navigation: {
      backgroundColor: 'rgb(24, 25, 38)',
      opacity: 0.9,
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding:6,
    },
    fulCategoryComponent: {
      flexDirection: 'column',
      width:160,
      maxHeight:420,
    },
    movieScreenContainer: {
      paddingBottom:50,
    },
    movieDetailsItem: {
      paddingBottom:10
    },
    movieDetailsHeader: {
      fontWeight:'bold', 
      fontSize: 20,
      paddingBottom:10
    },
    profileHeader: {
      fontSize:20, 
      paddingTop:20, 
      paddingBottom:15
    },
    image: {
      height:250, 
      width:170
    },
    imageModal: {
      width: Dimensions.get('window').width, 
      height:550, 
      position:'relative', 
      left: 0, 
      right: 0, 
      bottom: 0, 
      alignSelf: 'center'
    },
    browseScreenHeader: {
      fontSize: 22, 
      paddingBottom:10
    },
    browseScreenLink: {
      fontWeight:'bold', 
      fontSize: 16, 
      textDecorationLine: 'underline'
    },
    homeHeader: {
      fontSize:24, 
      fontWeight: 'bold', 
      alignSelf: 'center'
    },
    homeContainer: {
      alignSelf: 'center', 
      marginTop:150
    },
    homeNotif: {
      color:'red', 
      alignSelf: 'center', 
      marginTop:10,
    },
    input: {
      height: 40,
      width:170,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white',
    },
    IMDBLogo: {
      height:20, 
      width:60
    },
    menuLogo: {
      height:30,
      width:30,
    },
    searchField: {
      height:30,
      borderWidth: 1,
      backgroundColor: 'white',
      marginBottom:10,
    },
    searchButton: {
      height: 30,
      backgroundColor:'#2c3b42',
      alignItems: 'center',
      justifyContent:'center',
      marginBottom:10,
    },
    searchResult: {
      flexDirection: 'row',
      marginVertical:10
    },
    showMoreButtonSearchResults: {
      width:140,      
      height:30,
      backgroundColor:'#2c3b42',
      alignItems: 'center',
      justifyContent:'center',
      marginTop:15,
    },
    searchResultsInfo: {
      flex:1,
      paddingLeft: 8
    }
  });

export default Styles;