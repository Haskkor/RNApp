import * as React from 'react'
import {TabNavigator} from 'react-navigation'
import StopWatch from '../components/StopWatch'
import Timer from '../components/Timer'

const TabNavRecovery = TabNavigator({
  Stopwatch: {
    screen: StopWatch
  },
  Timer: {
    screen: Timer
  }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeBackgroundColor: '#414143',
    inactiveBackgroundColor: '#3A3A3C',
    activeTintColor: '#FFF',
    inactiveTintColor: '#7A7A7B',
    style: {
      borderTopWidth: 0,
      height: 40
    },
    labelStyle: {
      marginBottom: 15
    }
  }
})

export default TabNavRecovery