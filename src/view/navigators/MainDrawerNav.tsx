import * as React from 'react'
import {DrawerNavigator} from 'react-navigation'
import TabNavRecovery from './TabNavRecovery'
import QuickLog from '../components/QuickLog'

const MainDrawerNav = DrawerNavigator({
  Home: {
    drawerLabel: 'Quick log',
    screen: TabNavRecovery
  },
  QuickLog: {
    drawerLabel: 'Quick log',
    screen: QuickLog
  },
  Recovery: {
    drawerLabel: 'Recovery',
    screen: TabNavRecovery
  }
})

export default MainDrawerNav