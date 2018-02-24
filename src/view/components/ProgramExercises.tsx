import * as React from 'react'
import {ActionSheetIOS, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import HeaderStackNavigator from '../navigators/HeaderStackNavigator'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import {ExerciseSet, Set} from '../../core/types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Collapsible from 'react-native-collapsible'
import exercises from '../../db/exercises'
import ModalSearch from './ModalSearch'
import * as loDash from 'lodash'
import {colors} from '../../utils/colors'
import {grid} from '../../utils/grid'
import {HeaderStatus} from './Header'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
}

type IState = {
  exercisesDay: ExercisesDay[]
  showModalSearch: boolean
}

type ExercisesDay = {
  day: string,
  exercises: ExerciseSet[],
  isCollapsed: boolean
}

class ProgramExercises extends React.PureComponent<IProps, IState> {
  daySelected: ExercisesDay
  indexDaySelected: number
  editedDayIndex: number
  editedExerciseIndex: number

  static navigationOptions = HeaderStackNavigator.navigationOptions

  constructor() {
    super()
    this.state = {exercisesDay: [{day: '', exercises: [], isCollapsed: false}], showModalSearch: false}
    this.showActionSheet = this.showActionSheet.bind(this)
    this.editExerciseFinished = this.editExerciseFinished.bind(this)
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

  showActionSheet(day: ExercisesDay, exercise: ExerciseSet) {
    const {exercisesDay} = this.state
    ActionSheetIOS.showActionSheetWithOptions({
        title: exercise.exercise.name,
        message: exercise.exercise.equipment,
        options: ['Edit', 'Delete', 'Cancel'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2
      },
      (buttonIndex) => {
        const indexDay = loDash.findIndex(exercisesDay, (dayRow: ExercisesDay) => {
          return day === dayRow
        })
        const indexExercise = loDash.findIndex(exercisesDay[indexDay].exercises, (exerciseRow: ExerciseSet) => {
          return exercise === exerciseRow
        })
        if (buttonIndex === 0) {
          this.editedExerciseIndex = indexExercise
          this.editedDayIndex = indexDay
          this.props.navigation.navigate('ProgramEditExercise',
            {
              exerciseToEdit: this.state.exercisesDay[indexDay].exercises[indexExercise],
              status: HeaderStatus.editExercise,
              title: 'Edit exercise',
              exercise: exercise,
              saveEdit: this.editExerciseFinished
            })
        } else if (buttonIndex === 1) {
          const exercisesDayCopy = this.state.exercisesDay.slice()
          const exerciseSetCopy = exercisesDayCopy[indexDay].exercises.slice()
          exerciseSetCopy.splice(indexExercise, 1)
          exercisesDayCopy[indexDay].exercises = exerciseSetCopy
          this.setState({exercisesDay: exercisesDayCopy})
        }
      })
  }

  editExerciseFinished = (exercise: ExerciseSet) => {
    console.log(exercise)
    const exercisesDayCopy = this.state.exercisesDay.slice()
    const exerciseSetCopy = exercisesDayCopy[this.editedDayIndex].exercises.slice()
    exerciseSetCopy[this.editedExerciseIndex] = exercise
    exercisesDayCopy[this.editedDayIndex].exercises = exerciseSetCopy
    this.setState({exercisesDay: exercisesDayCopy})
  }

  handleSelectionExercise = (exercise: string, muscle: string, equipment: string) => {
    const newExerciseSet: ExerciseSet = {
      muscleGroup: muscle,
      exercise: {name: exercise, equipment: equipment},
      sets: [{reps: 8, weight: 75}, {reps: 8, weight: 75}, {reps: 8, weight: 75}],
      recoveryTime: '00:00'
    }
    let sortedExercises = this.daySelected.exercises.slice()
    sortedExercises.push(newExerciseSet)
    sortedExercises = loDash.sortBy(sortedExercises, (e: ExerciseSet) => e.exercise.name)
    const copyCurrentDay: ExercisesDay = {
      day: this.daySelected.day,
      isCollapsed: this.daySelected.isCollapsed,
      exercises: sortedExercises
    }
    const copyExercisesDay = this.state.exercisesDay.slice()
    copyExercisesDay[this.indexDaySelected] = copyCurrentDay
    this.setState({exercisesDay: copyExercisesDay, showModalSearch: false})
    this.daySelected = null
    this.indexDaySelected = null
  }

  renderHeaderSection = (day: ExercisesDay, index: number) => {
    return (
      <View style={styles.containerHeaderSection}>
        <Text style={styles.textHeaderSection}>{day.day}</Text>
        <TouchableOpacity onPress={() => {
          this.daySelected = day
          this.indexDaySelected = index
          this.setState({showModalSearch: true})
        }}>
          <Icon name="add-circle-outline" size={20} color={colors.base} style={styles.iconHeaderSectionAdd}/>
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
          <Icon name={day.isCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={20} color={colors.base}
                style={styles.iconHeaderSectionCollapsed}/>
        </TouchableOpacity>
      </View>
    )
  }

  renderExercisesSection = (day: ExercisesDay) => {
    return (
      <Collapsible collapsed={day.isCollapsed} duration={500}>
        {day.exercises.length === 0 &&
        <View style={{padding: 10}}>
          <Text style={styles.sectionNoContent}>No exercises yet</Text>
        </View> ||
        <View>
          {day.exercises.map((set: ExerciseSet, index: number) => {
            return (
              <TouchableOpacity key={set.exercise.name + index}
                                onPress={() => this.showActionSheet(day, set)}
                                style={[styles.sectionElement, {borderBottomWidth: index + 1 !== day.exercises.length ? 1 : 0}]}>
                <View style={styles.sectionElementRow}>
                  <Text style={styles.textBoldSection}>{set.muscleGroup}</Text>
                  <Text style={styles.textMediumSection}>{`${set.exercise.name} - ${set.exercise.equipment}`}</Text>
                </View>
                <View style={styles.sectionElementRow}>
                  <Text style={styles.textBoldSection}>{set.recoveryTime}</Text>
                  {set.sets.map((s: Set) => {
                    return (<Text style={styles.textMediumSection}>{`${s.weight}x${s.reps}`}</Text>)
                  })}
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
        }
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
  },
  containerHeaderSection: {
    width: '100%',
    paddingTop: grid.unit,
    paddingBottom: grid.unit,
    paddingLeft: grid.unit * 2,
    paddingRight: grid.unit,
    backgroundColor: colors.light,
    flexDirection: 'row'
  },
  textHeaderSection: {
    fontFamily: grid.fontBold,
    fontSize: grid.caption,
    color: colors.base,
    flex: 3
  },
  iconHeaderSectionAdd: {
    flex: 1,
    marginRight: grid.unit / 2
  },
  iconHeaderSectionCollapsed: {
    flex: 1,
    marginLeft: grid.unit / 2
  },
  sectionNoContent: {
    fontFamily: grid.font,
    fontSize: grid.caption,
    color: colors.base
  },
  sectionElement: {
    padding: grid.unit,
    borderColor: colors.light,
    flexDirection: 'column'
  },
  sectionElementRow: {
    flexDirection: 'row'
  },
  textBoldSection: {
    fontFamily: grid.fontBold,
    fontSize: grid.caption,
    color: colors.base,
    marginRight: 5
  },
  textMediumSection: {
    fontFamily: grid.fontMedium,
    fontSize: grid.caption,
    color: colors.base,
    marginRight: 5
  }
})

export default ProgramExercises
