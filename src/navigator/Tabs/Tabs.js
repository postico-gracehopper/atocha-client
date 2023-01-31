import React from 'react'
import { View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'

// MV stack navigators - we don't need these for now,
// but I'm retaining the code as a base if we'd like
// to use this navigation format for history, etc.
// Previously, this took you to "Home" with the four violet
// buttons or the same under "Profile."
// import { HomeNavigator, ProfileNavigator } from '../Stacks'

import Details from '../../pages/Details'
import SelectLanguage from '../../pages/SelectLanguage'
import Vocab from '../../pages/Vocab'

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
          case 'Details':
            return (
              <FontIcon
                name="home"
                color={focused ? colors.brightPrimary : colors.fadedPrimary}
                size={20}
                solid
              />
            )
          case 'Language':
            return (
              <FontIcon
                name="user"
                color={focused ? colors.brightPrimary : colors.fadedPrimary}
                size={20}
                solid
              />
            )
          case 'Vocab':
            return (
              <FontIcon
                name="user"
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
    <Tab.Screen name="Details" component={Details} />
    <Tab.Screen name="Language" component={SelectLanguage} />
    <Tab.Screen name="Vocab" component={Vocab} />
  </Tab.Navigator>
)

export default TabNavigator
