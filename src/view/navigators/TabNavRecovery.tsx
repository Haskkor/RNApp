import * as React from 'react'
import {TabNavigator} from 'react-navigation'
import StopWatch from '../components/StopWatch'
import Timer from '../components/Timer'

const TabNavRecovery = TabNavigator({
  Home: {
    screen: StopWatch
  },
  Profile: {
    screen: Timer
  }
}, {
  tabBarPosition: 'bottom'
})

export default TabNavRecovery