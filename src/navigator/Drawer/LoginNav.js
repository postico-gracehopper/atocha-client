import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'

import Login from '../../pages/AuthPages/Login'
import SignUp from '../../pages/AuthPages/SignUp'
import CustomDrawer from './CustomDrawer'
import TabNavigator from '../Tabs/Tabs'

const Drawer = createDrawerNavigator()

export default function LoginNav() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveTintColor: 'red',
        headerShown: false,
        drawerLabelStyle: { marginLeft: -25 },
      }}
      initialRouteName="Home"
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
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="log-in-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sign Up"
        component={SignUp}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="language-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}
