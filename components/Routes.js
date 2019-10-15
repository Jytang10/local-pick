import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";

const App = createSwitchNavigator({
  Auth: {
    screen: Auth,
  },
  App: {
    screen: App
  }
})

const AuthStack = createStackNavigator({
  
})

const AppStack = createStackNavigator({

})

const MainTabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
    }
  },
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
})

export default createAppContainer(App);