import * as React from 'react'
import {StackNavigator} from 'react-navigation'
import Programs from '../components/Programs'

const ProgramsStackNav = StackNavigator({
  Home: {
    screen: Programs,
    navigationOptions: ({navigation}: any): any => ({header: null})
  }
}, {
  cardStyle: {
    backgroundColor: '#FFF'
  }
})

export default ProgramsStackNav