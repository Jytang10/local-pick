import * as React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'; 
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Search from './Search';
import Discover from './Discover';
import PostList from './PostList';
import UpdateList from './UpdateList';
import Locations from './Locations';
import PostLocation from './PostLocation';
import UpdateLocation from './UpdateLocation';
import LocationDetails from './LocationDetails';
import PostNote from './PostNote';
import UpdateNote from './UpdateNote';
import Maps from './Maps';
import Profile from './Profile';

const AuthStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle: 'User Sign Up'
    }
  }
},{
  initialRouteName: 'SignUp',
  defaultNavigationOptions: {
    headerBackground: (
      <LinearGradient
        colors={['#3F54E3', '#E089B3']}
        style={{ flex: 1 }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      />
    ),
    headerTitleStyle: { color: '#fff' },
    headerTintColor: '#fff',
  }
})

const DiscoverStack = createStackNavigator({
  Discover: {
    screen: Discover,
    navigationOptions: {
      headerTitle:'Discover'
    },
  },
  PostList: {
    screen: PostList,
    navigationOptions: {
      headerTitle:'Add Category'
    },
  },
  UpdateList: {
    screen: UpdateList,
    navigationOptions: {
      headerTitle:'Update List Category'
    },
  },
  Locations: {
    screen: Locations,
    navigationOptions: {
      headerTitle:'Locations'
    },
  },
  PostLocation: {
    screen: PostLocation,
    navigationOptions: {
      headerTitle:'Add Location'
    },
  },
  UpdateLocation: {
    screen: UpdateLocation,
    navigationOptions: {
      headerTitle:'Update Location'
    },
  },
  LocationDetails: {
    screen: LocationDetails,
    navigationOptions: {
      headerTitle:'Details'
    },
  },
  Map: {
    screen: Maps
  },
  PostNote: {
    screen: PostNote,
    navigationOptions: {
      headerTitle:'Add Note'
    },
  },
  UpdateNote: {
    screen: UpdateNote,
    navigationOptions: {
      headerTitle:'Update Note'
    },
  },
  },
  {
    initialRouteName: 'Discover',
    defaultNavigationOptions: {
      headerBackground: (
        <LinearGradient
          colors={['#3F54E3', '#E089B3']}
          style={{ flex: 1 }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
      ),
      headerTitleStyle: { color: '#fff' },
      headerTintColor: '#fff',
    }
  }
)

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      headerTitle: 'Search',
      headerBackground: (
        <LinearGradient
          colors={['#3F54E3', '#E089B3']}
          style={{ flex: 1 }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
      ),
      headerTitleStyle: { color: '#fff' },
    },
  },
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerTitle: 'Profile',
      headerBackground: (
        <LinearGradient
          colors={['#3F54E3', '#E089B3']}
          style={{ flex: 1 }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
      ),
      headerTitleStyle: { color: '#fff' },
    },
  },
})

const BottomNavigator = createMaterialBottomTabNavigator({
  Search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor}) => (
        <MaterialIcons name='search' size={26} color={tintColor}></MaterialIcons>
      ),
    },
  },
  Discover: {
    screen: DiscoverStack,
    navigationOptions: {
      tabBarLabel: 'Discover',
      tabBarIcon: ({tintColor}) => (
        <MaterialIcons name='local-dining' size={26} color={tintColor}></MaterialIcons>
      ),
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => (
        <MaterialIcons name='person-outline' size={26} color={tintColor}></MaterialIcons>
      ),
    },
  }
  },
  {
  initialRouteName: 'Search',
  activeColor: '#4654FF',
  inactiveColor: 'grey',
  barStyle: { backgroundColor: "#fff" },
  labeled: true,
  shifting: true,
  tabBarOptions: { 
    showIcon: true 
  }, 
  }
)

const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: BottomNavigator
  },
  }, 
  {
    initialRouteName: 'Auth',
  },
)

export default createAppContainer(App);