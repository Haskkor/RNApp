import * as React from 'react'
import {Picker, StyleSheet, Text, TouchableOpacity, View, ScrollView, StatusBar, Dimensions} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid'
import ModalListLog from './ModalListLog'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as loDash from 'lodash'
import ModalSets from './ModalSets'
import exercises from '../../db/exercises'
import {ExerciseMuscle, ExerciseSet, MuscleGroups, Set} from '../../core/types'

type IProps = {
  navigation: any
}

type IState = {
  sets: Set[]
  currentMuscle: string
  currentExercise: string
  showModal: boolean
  showModalSets: boolean
  showFeedback: boolean
  dataLog: ExerciseSet[]
  editing: boolean
}

class QuickLog extends React.PureComponent<IProps, IState> {
  order: string[]
  setToModify: {
    indexSet: number
    reps: number
    weight: number
  } = {indexSet: 0, reps: 8, weight: 75}
  scrollViewRef: any
  scrollViewWidth: number
  muscles: string[]
  exercises: ExerciseMuscle[]
  editedExerciseIndex: number

  constructor() {
    super()
    this.muscles = exercises.map((data: MuscleGroups) => data.muscle).sort()
    this.exercises = loDash.sortBy(exercises.find((data: MuscleGroups) => data.muscle === this.muscles[0]).exercises,
      [(exercise: ExerciseMuscle) => {
        return exercise.name
      }])
    this.state = {
      sets: [{reps: 8, weight: 75}, {reps: 8, weight: 80}, {reps: 8, weight: 85}],
      currentExercise: this.exercises[0].name,
      currentMuscle: this.muscles[0],
      showModal: false,
      showModalSets: false,
      showFeedback: false,
      dataLog: [],
      editing: false
    }
    this.closeModalListLog = this.closeModalListLog.bind(this)
    this.closeModalSets = this.closeModalSets.bind(this)
    this.addExerciseSet = this.addExerciseSet.bind(this)
    this.feedbackTimer = this.feedbackTimer.bind(this)
    this.deleteExercise = this.deleteExercise.bind(this)
    this.editExercise = this.editExercise.bind(this)
    this.saveEditedExercise = this.saveEditedExercise.bind(this)
  }

  closeModalListLog() {
    this.setState({showModal: false})
  }

  closeModalSets() {
    this.setState({showModalSets: false})
  }

  componentDidMount() {
    this.order = Object.keys(this.state.dataLog)
  }

  scrollToEndHorizontally() {
    if (this.scrollViewWidth >= Dimensions.get('window').width - 140) {
      this.scrollViewRef.scrollTo({
        x: this.scrollViewWidth - Dimensions.get('window').width * 0.534,
        y: 0,
        animated: true
      })
    }
  }

  updateDeleteSet(reps?: number, weight?: number) {
    let repsWeightCopy = this.state.sets.slice()
    if (reps) {
      repsWeightCopy.splice(this.setToModify.indexSet, 1, {reps: reps, weight: weight})
    } else {
      repsWeightCopy.splice(this.setToModify.indexSet, 1)
    }
    this.setState({sets: repsWeightCopy})
    this.setToModify = null
  }

  feedbackTimer = () => {
    this.setState({showFeedback: true})
    setTimeout(() => {
      this.setState({showFeedback: false})
    }, 4000)
  }

  addExerciseSet = () => {
    const {currentMuscle, currentExercise, sets, dataLog} = this.state
    this.feedbackTimer()
    const newSet: ExerciseSet = {
      exercise: this.exercises.find((exercise) => {
        return exercise.name === currentExercise
      }),
      muscleGroup: currentMuscle,
      sets: sets
    }
    let dataLogCopy = dataLog.slice()
    dataLogCopy.push(newSet)
    this.order = Object.keys(dataLogCopy)
    this.exercises = loDash.sortBy(exercises.find((data: MuscleGroups) => data.muscle === this.muscles[0]).exercises,
      [(exercise: ExerciseMuscle) => {
        return exercise.name
      }])
    this.setState({
      sets: [{reps: 8, weight: 75}, {reps: 8, weight: 80}, {reps: 8, weight: 85}],
      currentExercise: this.exercises[0].name,
      currentMuscle: this.muscles[0],
      dataLog: dataLogCopy
    })
  }

  editExercise = (index: number) => {
    const exerciseToEdit = this.state.dataLog[index]
    this.setState({currentMuscle: exerciseToEdit.muscleGroup})
    this.exercises = loDash.sortBy(exercises.find((data: MuscleGroups) => data.muscle === exerciseToEdit.muscleGroup).exercises,
      [(exercise: ExerciseMuscle) => {
        return exercise.name
      }])
    this.editedExerciseIndex = index
    this.setState({
      showModal: false,
      sets: exerciseToEdit.sets,
      currentExercise: exerciseToEdit.exercise.name,
      editing: true
    })
  }

  saveEditedExercise = () => {
    const {currentMuscle, currentExercise, sets, dataLog} = this.state
    this.feedbackTimer()
    const newSet: ExerciseSet = {
      exercise: this.exercises.find((exercise) => {
        return exercise.name === currentExercise
      }),
      muscleGroup: currentMuscle,
      sets: sets
    }
    let dataLogCopy = dataLog.slice()
    dataLogCopy[this.editedExerciseIndex] = newSet
    this.order = Object.keys(dataLogCopy)
    this.exercises = loDash.sortBy(exercises.find((data: MuscleGroups) => data.muscle === this.muscles[0]).exercises,
      [(exercise: ExerciseMuscle) => {
        return exercise.name
      }])
    this.setState({
      sets: [{reps: 8, weight: 75}, {reps: 8, weight: 80}, {reps: 8, weight: 85}],
      currentExercise: this.exercises[0].name,
      currentMuscle: this.muscles[0],
      dataLog: dataLogCopy,
      editing: false
    })
  }

  deleteExercise = (newDataLog: ExerciseSet[]) => {
    this.setState({dataLog: newDataLog})
  }

  render() {
    const {sets, editing, currentExercise, currentMuscle, showModal, showModalSets, dataLog, showFeedback} = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <View style={styles.header}>
          <View style={[styles.viewFlex, {marginLeft: 20}]}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="fitness-center" size={22} color="#000"/>
            </TouchableOpacity>
          </View>
          <View style={styles.viewFlex}>
            <Text style={styles.title}>Quick Log</Text>
          </View>
          <View style={styles.viewFlex}/>
        </View>
        <Grid style={styles.grid}>
          <Row size={35} style={styles.rows}>
            <Col size={25} style={styles.textPickers}>
              <Text>Muscle:</Text>
            </Col>
            <Col size={75} style={styles.columns}>
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={currentMuscle}
                onValueChange={(itemValue) => {
                  this.exercises = loDash.sortBy(exercises.find((data: MuscleGroups) => data.muscle === itemValue).exercises,
                    [(exercise: ExerciseMuscle) => {
                      return exercise.name
                    }])
                  this.setState({currentMuscle: itemValue})
                }}>
                {this.muscles.map((muscle: string) => {
                  return <Picker.Item key={muscle} label={muscle} value={muscle}/>
                })}
              </Picker>
            </Col>
          </Row>
          <Row size={35} style={styles.rows}>
            <Col size={25} style={styles.textPickers}>
              <Text>Exercise:</Text>
            </Col>
            <Col size={75} style={styles.columns}>
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={currentExercise}
                onValueChange={(itemValue) => this.setState({currentExercise: itemValue})}>
                {this.exercises.map((muscle: ExerciseMuscle) => {
                  return <Picker.Item key={muscle.name} label={muscle.name} value={muscle.name}/>
                })}
              </Picker>
            </Col>
          </Row>
          <Row size={20} style={styles.rows}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.scroll}
              ref={ref => this.scrollViewRef = ref}
              onContentSizeChange={(width, height) => this.scrollViewWidth = width}>
              {sets.map((item: Set, index: number) => {
                return (
                  <TouchableOpacity
                    key={item.weight + index}
                    style={[styles.elemHorizontalList, styles.shadow]}
                    onPress={() => {
                      this.setToModify = {indexSet: index, reps: item.reps, weight: item.weight}
                      this.setState({showModalSets: true})
                    }}>
                    <Text><Text>{item.reps}</Text><Text> x</Text></Text>
                    <Text><Text>{item.weight}</Text><Text>kg</Text></Text>
                  </TouchableOpacity>
                )
              })}
              <TouchableOpacity
                onPress={() => {
                  this.scrollToEndHorizontally()
                  this.setState({sets: [...this.state.sets, loDash.last(sets)]}
                  )
                }}>
                <Icon name="add-circle-outline" size={30} color="#000"/>
              </TouchableOpacity>
            </ScrollView>
          </Row>
          <Row size={10} style={styles.rows}>
            <Col style={styles.columns}>
              <TouchableOpacity
                style={[styles.buttonCurrentLog, styles.shadow]}
                onPress={() => this.setState({showModal: true})}>
                <Text>See current training</Text>
              </TouchableOpacity>
            </Col>
            <Col style={styles.columns}>
              <TouchableOpacity
                onPress={() => {
                  editing ? this.saveEditedExercise() : this.addExerciseSet()
                }}
                style={[styles.buttonAdd, styles.shadow]}>
                <Text>{editing ? 'Save' : 'Add'}</Text>
              </TouchableOpacity>
            </Col>
          </Row>
        </Grid>
        {showFeedback &&
        <View style={styles.feedbackLog}>
          <TouchableOpacity
            style={styles.feedbackButton}
            onPress={() => this.setState({showFeedback: false})}>
            <Icon name="close" size={22} color="#FFF"/>
          </TouchableOpacity>
          <Text style={styles.feedbackText}>{editing ? 'Changes saved' : 'Exercise logged'}</Text>
        </View>}
        {showModalSets && <ModalSets
          updateDeleteSet={(reps?, weight?) => this.updateDeleteSet(reps, weight)}
          deleteEnabled={sets.length > 1}
          reps={this.setToModify.reps}
          weight={this.setToModify.weight}
          closeModal={this.closeModalSets}
        />}
        {showModal && <ModalListLog
          dataLog={dataLog}
          deleteExercise={this.deleteExercise}
          editExercise={this.editExercise}
          order={this.order}
          closeModal={this.closeModalListLog}
        />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  },
  header: {
    borderBottomWidth: 0.5,
    borderColor: '#000',
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#F7F7F8',
    flexDirection: 'row'
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
    color: '#000'
  },
  logView: {
    flex: 2,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9'
  },
  grid: {
    flex: 1,
    backgroundColor: '#EFEFF4',
    marginRight: 20,
    marginLeft: 20
  },
  columns: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rows: {
    margin: 10
  },
  picker: {
    width: 250,
    height: 'auto'
  },
  elemHorizontalList: {
    flexDirection: 'column',
    marginRight: 38,
    marginLeft: 2
  },
  textPickers: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  scroll: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonCurrentLog: {
    position: 'absolute',
    left: 0
  },
  buttonAdd: {
    position: 'absolute',
    right: 0
  },
  shadow: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    padding: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  pickerItem: {
    fontSize: 18
  },
  feedbackLog: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    top: 80,
    right: 10,
    backgroundColor: 'rgba(0, 183, 0, 0.5)',
    padding: 10
  },
  feedbackButton: {
    marginRight: 10
  },
  feedbackText: {
    color: '#FFF'
  },
  viewFlex: {
    flex: 1
  }
})

export default QuickLog
