import * as React from 'react'
import {StackNavigator} from 'react-navigation'
import Programs from '../components/Programs'
import ProgramNameDays from '../components/ProgramNameDays'
import ProgramExercises from '../components/ProgramExercises'

const ProgramsStackNav = StackNavigator({
  Home: {
    screen: Programs,
    navigationOptions: ({navigation}: any): any => ({header: null})
  },
  ProgramNameDays: {
    screen: ProgramNameDays
  },
  ProgramExercises: {
    screen: ProgramExercises
  }
}, {
  cardStyle: {
    backgroundColor: '#FFF'
  }
})

export default ProgramsStackNav