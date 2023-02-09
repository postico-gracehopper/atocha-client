import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'

import { Login, Logout, Signup } from '../../pages/AuthPages'
import SignUp from '../../pages/AuthPages/SignUp'
import CustomDrawer from './CustomDrawer'
import TabNavigator from '../Tabs/Tabs'

const Drawer = createDrawerNavigator()

export default function LoggedNav() {
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
        name="TabNavigator"
        component={TabNavigator}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="Log out"
        component={Logout}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="language-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Make a new account"
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
