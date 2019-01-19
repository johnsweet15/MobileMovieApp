import React from 'react';
import { app } from '../FirebaseConfig';
import { View, TextInput, Button } from 'react-native';
import 'firebase/auth';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login'
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }
  }

  createUser(email, password) {
    app.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  signInUser(email, password) {
    app.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    this.props.navigation.navigate('Home', {
    });
    // app.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     console.log(user.uid);
    //   }
    // });
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40}}
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />
        <Button title="Log in" onPress={() => {this.signInUser(this.state.username, this.state.password)}} />
      </View>
    );
  }
}