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


const BottomTab = createBottomTabNavigator({
  
})

export default createAppContainer(App);