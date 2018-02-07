import * as React from 'react'
import {DrawerNavigator} from 'react-navigation'
import TabNavRecovery from './TabNavRecovery'
import QuickLog from '../components/QuickLog'
import Programs from '../components/Programs'

const MainDrawerNav = DrawerNavigator({
  Home: {
    drawerLabel: 'Programs',
    screen: Programs
  },
  QuickLog: {
    drawerLabel: 'Quick log',
    screen: QuickLog
  },
  Programs: {
    drawerLabel: 'Programs',
    screen: Programs
  },
  Recovery: {
    drawerLabel: 'Recovery',
    screen: TabNavRecovery
  }
})

export default MainDrawerNav