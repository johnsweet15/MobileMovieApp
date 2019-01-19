import React from 'react';
import { View, Text, AsyncStorage, FlatList, TouchableHighlight, Image, StyleSheet } from 'react-native';
import { database, app } from '../FirebaseConfig';
import { forEach } from '@firebase/util';
import HomeScreen from './HomeScreen';

export default class WatchlistScreen extends React.Component {
  static navigationOptions = {
    title: 'Watchlist'
  }
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      title: 'default'
    }
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        // get list of all movies currently on watchlist
        database.ref('users/' + user.uid + '/watchlist/').once('value', (snapshot) => {
          var movies = [];
          snapshot.forEach((childSnapshot) => {
            movies.push(childSnapshot.val());
          });
          this.setState({movies: movies}); 
          console.log(this.state.movies[0].poster);         
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          {/* <Text color='white'>{this.state.movies.map(movie => movie.title + '\n')}</Text> */}
          <FlatList
              data = {this.state.movies.map(movie => movie.poster)}
              keyExtractor={(item) => item}
              renderItem={({ item }) =>
                <View>
                  <TouchableHighlight style={{width:200, height: 300, margin: 60}}>
                    <Image style={{width: 200, height: 300}} source={{uri: item}} />
                  </TouchableHighlight>
                  
                  {/* <Text style={{color: 'white'}}>
                    {`${item.title} (${item.year})`}
                  </Text> */}
                </View>
              }
            />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
  }
});