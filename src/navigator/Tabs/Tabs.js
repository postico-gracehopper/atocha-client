import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Ionicons } from '@expo/vector-icons'
import { colors } from 'theme'
import { auth } from '../../../firebase'

import Details from '../../pages/Details'
import Phrasebook from '../../pages/Phrasebook'
import Vocab from '../../pages/Vocab'
import History from '../../pages/History'
import Login from '../../pages/AuthPages'

const Tab = createMaterialBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Details"
    activeColor={colors.white}
    inactiveColor={colors.fadedPrimary}
    barStyle={{ backgroundColor: colors.primary }}
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }) => {
        switch (route.name) {
          case 'Translate':
            return (
              <FontAwesome5
                name="language"
                color={focused ? colors.brightPrimary : colors.fadedPrimary}
                size={25}
                solid
              />
            )
          case 'Language':
            return (
              <FontAwesome5
                name="user"
                color={focused ? colors.brightPrimary : colors.fadedPrimary}
                size={20}
                solid
              />
            )
          case 'History':
            return (
              <FontAwesome5
                name="history"
                color={focused ? colors.brightPrimary : colors.fadedPrimary}
                size={20}
                solid
              />
            )
          case 'Vocab':
            return (
              <FontAwesome5
                name="book-open"
                color={focused ? colors.brightPrimary : colors.fadedPrimary}
                size={20}
                solid
              />
            )
          case 'Logout':
            return (
              <FontAwesome5
                name="logout"
                color={focused ? colors.brightPrimary : colors.fadedPrimary}
                size={20}
                solid
              />
            )
          default:
            return <View />
        }
      },
    })}
  >
    <Tab.Screen name="History" component={History} key={Date.now()} />
    <Tab.Screen name="Phrasebook" component={Phrasebook} />
    <Tab.Screen name="Translate" component={Details} />
    {/* <Tab.Screen name="Language" component={SelectLanguage} /> */}
    <Tab.Screen name="Vocab" component={Vocab} />
  </Tab.Navigator>
)

  return (
    <Tab.Navigator
      initialRouteName="Details"
      activeColor={colors.white}
      inactiveColor={colors.fadedPrimary}
      barStyle={{ backgroundColor: colors.primary }}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'Details':
              return (
                <FontAwesome5
                  name="home"
                  color={focused ? colors.brightPrimary : colors.fadedPrimary}
                  size={20}
                  solid
                />
              )
            case 'Language':
              return (
                <FontAwesome5
                  name="user"
                  color={focused ? colors.brightPrimary : colors.fadedPrimary}
                  size={20}
                  solid
                />
              )
            case 'History':
              return (
                <FontAwesome5
                  name="history"
                  color={focused ? colors.brightPrimary : colors.fadedPrimary}
                  size={20}
                  solid
                />
              )
            case 'Vocab':
              return (
                <FontAwesome5
                  name="book-open"
                  color={focused ? colors.brightPrimary : colors.fadedPrimary}
                  size={20}
                  solid
                />
              )
            case 'Phrasebook':
              return (
                <FontAwesome5
                  name="book"
                  color={focused ? colors.brightPrimary : colors.fadedPrimary}
                  size={20}
                  solid
                />
              )
            case 'Logout':
              return (
                <FontAwesome5
                  name="logout"
                  color={focused ? colors.brightPrimary : colors.fadedPrimary}
                  size={20}
                  solid
                />
              )
            default:
              return <View />
          }
        },
      })}
    >
      <Tab.Screen name="History" component={History} key={Date.now()} />
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Vocab" component={loggedIn ? Vocab : LoggedOutVocab} />
      <Tab.Screen
        name="Phrasebook"
        component={loggedIn ? Phrasebook : LoggedOutPhrasebook}
      />
    </Tab.Navigator>
  )
}
