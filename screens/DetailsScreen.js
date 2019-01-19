import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, Button, ToastAndroid, AsyncStorage } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { ExpoLinksView } from '@expo/samples';
import { database, app } from '../FirebaseConfig';
import firebase from 'firebase';

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return null;
  };

  constructor(props) {
    super(props);

    this.state = {
      plot: this.props.navigation.getParam('plot', 'N/A'),
      imdb: this.props.navigation.getParam('imdb', 'N/A'),
      rt: this.props.navigation.getParam('rt', 'N/A'),
      metascore: this.props.navigation.getParam('metascore', 'N/A'),
      poster: this.props.navigation.getParam('poster', 'N/A'),
      metaColor: this.props.navigation.getParam('metaColor', 'black'),
      metaText: this.props.navigation.getParam('metaText', 'white'),
      rtImage: this.props.navigation.getParam('rtImage', 0),
      items: [{name: require('../icons/rt2.png')},{name: require('../icons/rt_rotten.png')}],
      title: this.props.navigation.getParam('title', 'Title'),
      year: this.props.navigation.getParam('year', 'Year'),
      keys: []
    }
  }

  addToWatchlist() {
    ToastAndroid.show('Added ' + this.state.title + ' to Watchlist', ToastAndroid.SHORT);
    this.props.navigation.navigate('', {
      title: this.props.navigation.getParam('title', 'Title'),
      poster: this.props.navigation.getParam('poster', 'N/A'),
      keys: this.state.keys
    });

    // push movie to watchlist on database
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        var key = database.ref().child('users/' + user.uid + '/watchlist').push().key;
        database.ref('users/' + user.uid + '/watchlist/' + key).set({
          title: this.state.title,
          year: this.state.year,
          poster: this.state.poster
        })
      }
    });
  }

  render() {

    return (
      <View style={{flex: 1, backgroundColor: '1e1e1e'}}>
        <ScrollView style={{flex: 1, backgroundColor: '1e1e1e'}}>
          <Text style={styles.title}>{this.state.title} ({this.state.year})</Text>
          <View style={styles.detailsContainer}>
            <Image style={{height: 250, margin: 10, flex: 0.5}} source={{uri: JSON.stringify(this.state.poster).replace(/['"]+/g, '')}} />
            <View style={{flex: 0.5}}>

              <View style={styles.rowPadding}>
                <View style={{justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: this.state.metaColor}}>
                  <Text style={{color: this.state.metaText, padding: 0, margin: 0}}>{JSON.stringify(this.state.metascore).replace(/['"]+/g, '')}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={{color: 'white', fontSize: 18, alignItems: 'center'}}>Metascore</Text>
              </View>

              <View style={styles.rowPadding}>
                <Image style={{width: 30, height: 30}} source={require('../icons/imdbStar.png')}/>
              </View>
              <View style={styles.row}>
                <Text style={{color: 'white', fontSize: 18, alignItems: 'center'}}>IMDb: {JSON.stringify(this.state.imdb).replace(/['"]+/g, '')}/10</Text>
              </View>

              <View style={styles.rowPadding}>
                <Image style={{width: 30, height: 30}} source={this.state.items[this.state.rtImage].name}/>
              </View>
              <View style={styles.row}>
                <Text style={{color: 'white', fontSize: 18, alignItems: 'center'}}>RT: {JSON.stringify(this.state.rt).replace(/['"]+/g, '')}</Text>
              </View>
            </View>

          </View>
          {/* Watchlist button */}
          <View style={{backgroundColor: '#1e1e1e', width: 'auto', justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
            <Button title='Add to Watchlist' color='#418bf4' onPress={() => this.addToWatchlist()} />
          </View>
          {/* Plot */}
          <View style={{flex: 1, paddingTop: 10, backgroundColor: '#1e1e1e', alignItems: 'center'}}>
            <Text style={styles.title}>Plot</Text>
            <Text style={styles.text}>{JSON.stringify(this.state.plot).replace(/['"]+/g, '')}</Text>
          </View>
        </ScrollView>
        
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#1e1e1e',
    textAlign: 'center',
    padding: 10
  },

  text: {
    color: 'white',
    fontSize: 18,
    padding: 10,
    alignItems: 'center'
  },

  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#1e1e1e',
    alignItems: 'center'
  },

  square: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'green'
  },

  row: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center'
  },

  rowPadding: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  
  icon: {
    width: 24,
    height: 24
  }
});
