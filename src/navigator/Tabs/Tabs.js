import React from 'react'
import { View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Ionicons } from '@expo/vector-icons'
import { colors } from 'theme'

// MV stack navigators - we don't need these for now,
// but I'm retaining the code as a base if we'd like
// to use this navigation format for history, etc.
// Previously, this took you to "Home" with the four violet
// buttons or the same under "Profile."
// import { HomeNavigator, ProfileNavigator } from '../Stacks'

import Details from '../../pages/Details'
import Phrasebook from '../../pages/Phrasebook'
import SelectLanguage from '../../pages/SelectLanguage'
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

export default TabNavigator
