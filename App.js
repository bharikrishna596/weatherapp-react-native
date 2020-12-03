import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerNavigator, createDrawerNavigator, StackNavigator, createStackNavigator } from 'react-navigation';
import Main from './city/Main';
import City from './city/City';
import QRCodeScan from './city/QRCodeScan';
import SideBar from './SideBar'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return <AppNavigator />
  }

  // check = () => {
  //   if (this.state.clickcount < 2) {
  //     this.refs.backButonToaster.show('Press back again to exit App', 5000, () => {
  //       this.setState({ 'clickcount': 0 })
  //     });
  //   }
  //   else if (this.state.clickcount == 2) {
  //   }
  // }

  // handleBackButton = () => {
  //   alert(this.state.backClickCount)
  //   return true;
  // }
}

export const MainStack = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,
    }
  },
  City: {
    screen: City,
    navigationOptions: {
      header: null,
    }
  },
  QRCodeScan: {
    screen: QRCodeScan,
    navigationOptions: {
      header: null,
    }
  },
}, {
  headerMode: 'screen',
  initialRouteName: 'Main'
});

// Drawer Navigator
export const Drawer = createDrawerNavigator({
  MainStack: {
    screen: MainStack
  }
}, {
  contentComponent: props => <SideBar {...props} />,
  drawerPosition: "left",
  drawerLockMode: 'locked-closed'
});

export const AppNavigator = createStackNavigator({
  Drawer: {
    screen: Drawer,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,

    }
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Drawer'
});


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // drawerImage: {
  //   height: 90,
  //   width: 90,
  //   borderRadius: 45,
  //   marginTop: 20,
  //   alignSelf: 'center',
  // },
  // text: {
  //   fontSize: 15,
  //   alignSelf: 'center',
  //   paddingTop: 5,
  //   fontFamily: 'Shruti',
  // },
});