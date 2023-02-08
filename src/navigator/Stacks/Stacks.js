import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'
import Home from 'pages/Home'
import Profile from 'pages/Profile'
import Details from 'pages/Details'
import SelectLanguage from '../../pages/SelectLanguage'
import Vocab from '../../pages/Vocab'
import Login from 'pages/Login'
import Phrasebook from '../../pages/Phrasebook'
import HeaderLeft from './HeaderLeft'
import HeaderTitle from './HeaderTitle'
import Login from '../../pages/AuthPages'
import SignUp from '../../pages/AuthPages/SignUp'
// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.darkPurple },
  headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------

export const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="SelectLanguage"
      component={SelectLanguage}
      options={{
        title: 'SelectLanguage',
      }}
    />
    <Stack.Screen
      name="Vocab"
      component={Vocab}
      options={{
        title: 'Vocab',
      }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'Login',
      }}
    />
    <Stack.Screen
      name="Phrasebook"
      component={Phrasebook}
      options={{
        title: 'Phrasebook',
      }}
    />
  </Stack.Navigator>
)

export const ProfileNavigator = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => ({
        title: 'Profile',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={{
        title: 'Details',
      }}
    />
  </Stack.Navigator>
)
