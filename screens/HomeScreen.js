import React from 'react';
import {Image, StyleSheet, Text, View, TextInput, FlatList, TouchableHighlight} from 'react-native';
import {  } from 'react-navigation'
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import axios from 'axios';

const APIKey = 'a6793cf9';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon name='home' style={{color: tintColor}}/>
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      movies: [],
      metascore: '',
      imdb: '',
      rt: '',
      poster: '',
      plot: '',
      metaColor: '',
      metaText: '',
      rtImage: 0,
      title: '',
      year: '',
      actors: []
    };
  }

  getMovies(searchText) {
    axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=' + APIKey)
      .then((response) => {
        console.log(response);

        let movies = response.data.Search;

        this.setState({
          movies: movies
        })

        console.log('movies: ' + movies[0].Rated);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getMovie(movieId){
    axios.get('http://www.omdbapi.com?i=' + movieId  + '&apikey=' + APIKey)
      .then((response) => {
        // console.log(response);
        let movie = response.data;

        // get rid of '""' and '%'
        var mScore = parseInt(JSON.stringify(movie.Metascore).replace(/['"]+/g, ''));
        if(movie.Ratings.length > 1 && movie.Ratings[1].Source === "Rotten Tomatoes") {
          var rtScore = parseInt(JSON.stringify(movie.Ratings[1].Value).replace(/['"]+/g, '').slice(0, -1));
          this.setState({rt: movie.Ratings[1].Value});
        }
        else {
          this.setState({rt: 'N/A'});
        }

        console.log(rtScore);

        if(mScore >= 60) {
          this.setState({metaColor: 'green', metaText: 'white'});
        }
        else if(mScore >= 40) {
          this.setState({metaColor: 'yellow', metaText: 'black'});
        }
        else if(mScore >= 0) {
          this.setState({metaColor: 'red', metaText: 'white'});
        }
        else {
          this.setState({metaColor: 'black', metaText: 'white'});
        }

        if(movie.Ratings.length > 1 && movie.Ratings[1].Source === "Rotten Tomatoes") {
          if(rtScore >= 60) {
            this.setState({rtImage: 0});
          }
          else {
            this.setState({rtImage: 1});
          }
        }
        

        this.setState({
          metascore: movie.Metascore,
          imdb: movie.imdbRating,
          // rt: movie.Ratings[1].Value,
          poster: movie.Poster,
          plot: movie.Plot,
          title: movie.Title,
          year: movie.Year
        }, () => this.goToDetails());
        
        console.log(this.state.metascore + " " + this.state.imdb + " " + this.state.rt);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goToDetails() {
    this.props.navigation.navigate('Details', {
      metascore: this.state.metascore,
      imdb: this.state.imdb,
      rt: this.state.rt,
      poster: this.state.poster,
      plot: this.state.plot,
      metaColor: this.state.metaColor,
      metaText: this.state.metaText,
      rtImage: this.state.rtImage,
      title: this.state.title,
      year: this.state.year
    });
  }


  render() {
    return (

      <View style={styles.container}>
        <View style={styles.container2}>
          {/* <Text style={styles.title}>App Name</Text> */}
          <TextInput
            style={{height: 40, color: 'white'}}
            placeholder="Search movie..."
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={() => this.getMovies(this.state.text)}
          />
          <FlatList
            data = {this.state.movies}
            keyExtractor={(item) => item.Title.toString() + item.Year.toString() + item.Poster.toString()}
            renderItem={({ item }) =>
              <View>
                <TouchableHighlight style={{width:200, height: 300, margin: 60}} onPress={() => this.getMovie(item.imdbID)}>
                  <Image style={{width: 200, height: 300}} source={{uri: item.Poster}} />
                </TouchableHighlight>
                
                <Text style={{color: 'white'}}>
                  {`${item.Title} (${item.Year})`}
                </Text>
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
