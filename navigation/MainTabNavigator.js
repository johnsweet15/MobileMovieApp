import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { createStackNavigator, createDrawerNavigator, withNavigation, DrawerActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import LoginScreen from '../screens/LoginScreen';


const HomeStack = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Watchlist: WatchlistScreen
});

HomeStack.navigationOptions = {
  title: 'Home',
  headerStyle: {
    backgroundColor: '#0f0f0f',
  },
  headerTintColor: '#418bf4',
  headerTitleStyle: {
    fontWeight: 'normal',
  },
  headerLeftContainerStyle: {
    padding: 20
  },
  headerMode: 'screen',
  drawerBackgroundColor: '#000000'
};

const DetailsStack = createDrawerNavigator({
  Details: DetailsScreen,
});

DetailsStack.navigationOptions = {
  title: 'Details',
  headerStyle: {
    backgroundColor: '#0f0f0f',
  },
  headerTintColor: '#418bf4',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
};

const WatchlistStack = createDrawerNavigator({
  Watchlist: WatchlistScreen,
});

WatchlistScreen.navigationOptions = {
  header: null
}

const LoginStack = createStackNavigator({
  Login: LoginScreen,
});

LoginStack.navigationOptions = {
  header: null
}

// for some god-forsaken reason i have to do this
const Navigation = createStackNavigator({
  HomeStack
},
{
  navigationOptions: ({navigation}) => ({
    initialRouteName: 'Home',
    headerLeft: (
      <TouchableHighlight onPress={() => navigation.toggleDrawer()}>
        <Icon name='menu' size={25} color='#418bf4' />
      </TouchableHighlight>
    )
  })
});

// and this
Navigation.navigationOptions = {
  header: null
}

export default createStackNavigator({
  LoginStack,
  Navigation,
  DetailsStack,
  WatchlistStack
});
