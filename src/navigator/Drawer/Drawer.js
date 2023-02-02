import * as React from 'react'
import { Button, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../../pages/AuthPages'
import SignUp from '../../pages/AuthPages/SignUp'
import Details from '../../pages/Details'
import Logout from '../../pages/AuthPages/Logout'
import TabNavigator from '../Tabs/Tabs'
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Drawer.Navigator initialRouteName="Details">
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="SignUp" component={SignUp} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  )
}
