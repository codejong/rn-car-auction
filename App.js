import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VehicleEditorScreen from './screens/VehicleEditorScreen';
import ListingEditorScreen from './screens/ListingEditorScreen';
import MyVehicleListScreen from './screens/MyVehicleListScreen';
import VehicleDetailScreen from './screens/VehicleDetailScreen';
import AuctionListScreen from './screens/AuctionListScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

const defaultNavigationOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: 'tomato',
  },
};
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const HomeStack = createStackNavigator(
  {
    Home: MyVehicleListScreen,
    VehicleDetail: VehicleDetailScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const AuctionStack = createStackNavigator(
  {
    AuctionList: AuctionListScreen,
    VehicleDetail: VehicleDetailScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    Details: DetailsScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const MainTab = createBottomTabNavigator(
  {
    MyCars: HomeStack,
    Auction: AuctionStack,
    Settings: SettingsStack,
  },
  {
    /* Other configuration remains unchanged */
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'MyCars') {
          iconName = 'ios-car';
        } else if (routeName === 'Auction') {
          iconName = 'ios-trending-up';
        } else if (routeName === 'Settings') {
          iconName = 'ios-settings';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const VehicleEditorStack = createStackNavigator({
  VehicleEditor: VehicleEditorScreen,
});

const ListingEditorStack = createStackNavigator({
  ListingEditor: ListingEditorScreen,
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainTab,
    },
    ListingEditorStack,
    VehicleEditorStack,
    Login: LoginScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
