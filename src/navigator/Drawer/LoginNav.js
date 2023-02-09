import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'

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
      <Drawer.Screen name="Home" component={TabNavigator} />
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
