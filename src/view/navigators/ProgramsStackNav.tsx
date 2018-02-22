import * as React from 'react'
import {StackNavigator} from 'react-navigation'
import Programs from '../components/Programs'
import ProgramNameDays from '../components/ProgramNameDays'
import ProgramExercises from '../components/ProgramExercises'
import {colors} from '../../utils/colors'
import QuickLog from '../components/QuickLog'

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
  },
  ProgramEditExercise: {
    screen: QuickLog,
    navigationOptions: ({navigation}: any): any => ({header: null})
  }
}, {
  cardStyle: {
    backgroundColor: colors.white
  }
})

export default ProgramsStackNav