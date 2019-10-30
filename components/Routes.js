import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
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
import Profile from './Profile.js';


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
      headerTitle:'Login'
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle:'Sign Up'
    }
  }
},{
  initialRouteName: 'Login'
})

const MainStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      headerTitle:'Search'
    }
  },
  Discover: {
    screen: Discover,
    navigationOptions: {
      headerTitle:'Discover'
    }
  },
  PostList: {
    screen: PostList,
    navigationOptions: {
      headerTitle:'Add a List'
    }
  },
  UpdateList: {
    screen: UpdateList,
    navigationOptions: {
      headerTitle:'Update List'
    }
  },
  Locations: {
    screen: Locations,
    navigationOptions: {
      headerTitle:'**Locations**'
    }
  },
  PostLocation: {
    screen: PostLocation,
    navigationOptions: {
      headerTitle:'Add a Location'
    }
  },
  UpdateLocation: {
    screen: UpdateLocation,
    navigationOptions: {
      headerTitle:'Update Location'
    }
  },
  LocationDetails: {
    screen: LocationDetails,
    navigationOptions: {
      headerTitle:'Location Details'
    }
  },
  Map: {
    screen: Maps
  },
  PostNote: {
    screen: PostNote,
    navigationOptions: {
      headerTitle:'Add a Note'
    }
  },
  UpdateNote: {
    screen: UpdateNote,
    navigationOptions: {
      headerTitle:'Update Note'
    }
  },
},{
  initialRouteName: 'Search'
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerTitle:'Profile'
    }
  },
})

// const AppStack = createBottomTabNavigator({
//   Search: {
//     screen: SearchStack,
//     navigationOptions: {
//       tabBarLabel:'Search'
//     }
//   },
//   Discover: {
//     screen: DiscoverStack,
//     navigationOptions: {
//       tabBarLabel:'Discover'
//     }
//   },
//   Profile: {
//     screen: ProfileStack,
//     navigationOptions: {
//       tabBarLabel:'Profile',
//     }
//   },
// },{
//   initialRouteName: 'Search'
// })

const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: MainStack
  }
}, {
  initialRouteName: 'Auth'
})

export default createAppContainer(App);