import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Search from './Search';
import Discover from './Discover';
import Locations from './Locations';
import LocationDetails from './LocationDetails';
import Profile from './Profile.js';


const AuthStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: "Home"
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle:'Login'
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle:'Sign Up'
    }
  }
})

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      headerTitle:'Search'
    }
  },
})

const DiscoverStack = createStackNavigator({
  Discover: {
    screen: Discover,
    navigationOptions: {
      headerTitle:'Discover'
    }
  },
  Locations: {
    screen: Locations,
    navigationOptions: {
      headerTitle:'Locations'
    }
  },
  LocationDetails: {
    screen: LocationDetails,
    navigationOptions: {
      headerTitle:'Location Details'
    }
  },
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerTitle:'Profile'
    }
  },
})

const AppStack = createBottomTabNavigator({
  Search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel:'Search'
    }
  },
  Discover: {
    screen: DiscoverStack,
    navigationOptions: {
      tabBarLabel:'Discover'
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel:'Profile',
    }
  },
},{
  initialRouteName: 'Search'
})

const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: AppStack
  }
})

export default createAppContainer(App);