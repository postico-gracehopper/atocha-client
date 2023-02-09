import * as React from 'react'
import { Button, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Login from '../../pages/AuthPages'
import Phrasebook from '../../pages/Phrasebook'
import SignUp from '../../pages/AuthPages/SignUp'
import Details from '../../pages/Details'
import Logout from '../../pages/AuthPages/Logout'
import TabNavigator from '../Tabs/Tabs'
import CustomDrawer from './CustomDrawer'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../theme/colors'
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveTintColor: 'red',
        headerShown: false,
        drawerLabelStyle: { marginLeft: -25 },
      }}
      initialRouteName="Details"
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="log-in-outline" size={22} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Sign Up"
        component={SignUp}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="language-outline" size={22} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="log-out-outline" size={22} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Phrasebook"
        component={Phrasebook}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="book-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}
