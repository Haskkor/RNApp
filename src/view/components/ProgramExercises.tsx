import * as React from 'react'
import {ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import HeaderStackNavigator from '../navigators/HeaderStackNavigator'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import {ExerciseSet} from '../../core/types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Collapsible from 'react-native-collapsible'
import exercises from '../../db/exercises'
import ModalSearch from './ModalSearch'
import * as loDash from 'lodash'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
}

type IState = {
  exercisesDay: ExercisesDay[] // fixme any
  showModalSearch: boolean
}

type ExercisesDay = { day: string, exercises: ExerciseSet[], isCollapsed: boolean }

class ProgramExercises extends React.PureComponent<IProps, IState> {
  daySelected: ExercisesDay
  indexDaySelected: number

  static navigationOptions = HeaderStackNavigator.navigationOptions

  constructor() {
    super()
    this.state = {exercisesDay: [{day: '', exercises: [], isCollapsed: false}], showModalSearch: false}
  }

  componentDidMount() {
    const exercisesDayEmpty = this.props.navigation.state.params.days.map((day: string) => {
      return {
        day: day,
        exercises: [] as ExerciseSet[],
        isCollapsed: false
      }
    })
    this.setState({exercisesDay: exercisesDayEmpty})
  }

  handleSelectionExercise = (exercise: string, muscle: string) => {
    const newExerciseSet: ExerciseSet = {
      muscleGroup: muscle,
      exercise: {name: exercise, equipment: ''},
      sets: [],
      recoveryTime: ''
    }
    const copyCurrentDay: ExercisesDay = {
      day: this.daySelected.day,
      isCollapsed: this.daySelected.isCollapsed,
      exercises: this.daySelected.exercises.slice()
    }
    copyCurrentDay.exercises.push(newExerciseSet)
    loDash.sortBy(copyCurrentDay.exercises, (e: ExerciseSet) => e.exercise.name)
    const copyExercisesDay = this.state.exercisesDay.slice()
    copyExercisesDay[this.indexDaySelected] = copyCurrentDay
    this.setState({exercisesDay: copyExercisesDay, showModalSearch: false})
    this.daySelected = null
    this.indexDaySelected = null
  }

  renderHeaderSection = (day: ExercisesDay, index: number) => {
    return (
      <View style={{
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 20,
        backgroundColor: '#F7F7F8',
        flexDirection: 'row'
      }}>
        <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 12, color: '#445878', flex: 3}}>{day.day}</Text>
        <TouchableOpacity onPress={() => {
          this.daySelected = day
          this.indexDaySelected = index
          this.setState({showModalSearch: true})
        }}>
          <Icon name="add-circle-outline" size={20} color="#445878" style={{flex: 1, marginRight: 10}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          const copyCurrentDay: ExercisesDay = {
            day: day.day,
            isCollapsed: !day.isCollapsed,
            exercises: day.exercises.slice()
          }
          const copyExercisesDay = this.state.exercisesDay.slice()
          copyExercisesDay[index] = copyCurrentDay
          this.setState({exercisesDay: copyExercisesDay})
        }}>
          <Icon name={day.isCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={20} color="#445878"
                style={{flex: 1, marginLeft: 10}}/>
        </TouchableOpacity>
      </View>
    )
  }

  renderExercisesSection = (day: ExercisesDay) => {
    return (
      <Collapsible collapsed={day.isCollapsed} duration={500}>
        {day.exercises.length === 0 &&
        <View style={{padding: 10}}>
          <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#445878'}}>No exercises yet</Text>
        </View>}
      </Collapsible>
    )
  }

  renderSectionDay = (day: ExercisesDay, index: number) => {
    return (
      <View key={day.day}>
        {this.renderHeaderSection(day, index)}
        {this.renderExercisesSection(day)}
        {this.state.showModalSearch && <ModalSearch
          exercises={exercises}
          closeModal={() => this.setState({showModalSearch: false})}
          selectExercise={this.handleSelectionExercise}/>}
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        {this.state.exercisesDay.map((day: ExercisesDay, index: number) => {
          return this.renderSectionDay(day, index)
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ProgramExercises
