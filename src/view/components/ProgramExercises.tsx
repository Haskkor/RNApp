import * as React from 'react'
import {ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import HeaderStackNavigator from '../navigators/HeaderStackNavigator'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import {ExerciseSet} from '../../core/types'
import Icon from 'react-native-vector-icons/MaterialIcons'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
}

type IState = {
  exercisesDay: ExercisesDay[] // fixme any
}

type ExercisesDay = { day: string, folded: false, exercises: ExerciseSet[] }

class ProgramExercises extends React.PureComponent<IProps, IState> {

  static navigationOptions = HeaderStackNavigator.navigationOptions

  constructor() {
    super()
    this.state = {exercisesDay: [{day: '', folded: false, exercises: []}]}
  }

  componentDidMount() {
    const exercisesDayEmpty = this.props.navigation.state.params.days.map((day: string) => {
      return {
        day: day,
        folded: false,
        exercises: [] as ExerciseSet[]
      }
    })
    this.setState({exercisesDay: exercisesDayEmpty})
  }

  renderHeaderSection = (day: ExercisesDay) => {
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
        <TouchableOpacity>
          <Icon name="add-circle-outline" size={20} color="#445878" style={{flex: 1, marginRight: 10}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          // copy day, change value of folded and set day
        }}>
          <Icon name="keyboard-arrow-up" size={20} color="#445878" style={{flex: 1, marginLeft: 10}}/>
        </TouchableOpacity>
      </View>
    )
  }

  renderExercisesSection = (day: ExercisesDay) => {
    return (
      <View>
        {day.exercises.length === 0 &&
        <View style={{padding: 10}}>
          <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#445878'}}>No exercises yet</Text>
        </View>}
      </View>
    )
  }

  renderSectionDay = (day: ExercisesDay) => {
    return (
      <View key={day.day}>
        {this.renderHeaderSection(day)}
        {!day.folded && this.renderExercisesSection(day)}
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        {this.state.exercisesDay.map((day: ExercisesDay) => {
          return this.renderSectionDay(day)
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
