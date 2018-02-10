import * as React from 'react'
import {StackNavigator} from 'react-navigation'
import Programs from '../components/Programs'
import ProgramNameDays from '../components/ProgramNameDays'

const ProgramsStackNav = StackNavigator({
  Home: {
    screen: Programs,
    navigationOptions: ({navigation}: any): any => ({header: null})
  },
  ProgramNameDays: {
    screen: ProgramNameDays,
    title: 'Name and Days'
  }
}, {
  cardStyle: {
    backgroundColor: '#FFF'
  }
})

export default ProgramsStackNav