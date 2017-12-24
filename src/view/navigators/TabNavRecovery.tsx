import * as React from 'react'
import {Text, View} from 'react-native'
import {TabNavigator} from 'react-navigation'
import StopWatch from '../components/StopWatch'

const profileScreen = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Profile Screen</Text>
  </View>
)

const TabNavRecovery = TabNavigator({
  Home: {
    screen: StopWatch
  },
  Profile: {
    screen: profileScreen
  }
})

export default TabNavRecovery