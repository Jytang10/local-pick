import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Search from './Search';
import Discover from './Discover';
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
      headerTitle: "Login"
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle: "Sign Up"
    }
  }
})

// const AppStack = createStackNavigator({
//   Search: {
//     screen: Search,
//     navigationOptions: {
//       headerTitle: 'Search',
//     }
//   }
// })

const AppStack = createBottomTabNavigator({
  // Home: {
  //   screen: App,
  //   navigationOptions: {
  //     tabBarLabel: 'Home',
  //   }
  // },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel:'Search'
    }
  },
  Discover: {
    screen: Discover,
    navigationOptions: {
      tabBarLabel:'Discover'
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel:'Profile'
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