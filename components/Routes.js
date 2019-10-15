import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from './Home';
import Search from './Search';
import Discover from './Discover';
import Profile from './Profile.js';


const AuthStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: "Home"
    }
  }
})

const AppStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
    }
  }
})

// const MainTabs = createBottomTabNavigator({
//   Home: {
//     screen: App,
//     navigationOptions: {
//       tabBarLabel: 'Home',
//     }
//   },
//   Search: {
//     screen: Search,
//     navigationOptions: {
//       tabBarLabel:'Search'
//     }
//   },
//   Discover: {
//     screen: Discover,
//     navigationOptions: {
//       tabBarLabel:'Discover'
//     }
//   },
//   Profile: {
//     screen: Profile,
//     navigationOptions: {
//       tabBarLabel:'Profile'
//     }
//   },
// })

const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: AppStack
  }
})

export default createAppContainer(App);