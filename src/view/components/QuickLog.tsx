import * as React from 'react'
import {Picker, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid'
import ModalListLog from './ModalListLog'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as loDash from 'lodash'
import ModalSets from './ModalSets'

type IProps = {}

type IState = {
  repsWeight: RepsWeight[]
  currentMuscle: string
  currentExercise: string
  showModal: boolean
  showModalSets: boolean
  dataLog: any
}

type RepsWeight = { reps: number, weight: number }

class QuickLog extends React.PureComponent<IProps, IState> {
  order: string[]
  setToModify: {
    indexSet: number
    reps: number
    weight: number
  } = {indexSet: 0, reps: 8, weight: 75}

  constructor() {
    super()
    this.state = {
      repsWeight: [{reps: 8, weight: 75}, {reps: 8, weight: 80}, {reps: 8, weight: 85}],
      currentExercise: null,
      currentMuscle: null,
      showModal: false,
      showModalSets: false,
      dataLog: {test: {text: 'test'}, test2: {text: 'test2'}, test3: {text: 'test3'}}
    }
    this.closeModalListLog = this.closeModalListLog.bind(this)
  }

  closeModalListLog() {
    this.setState({showModal: false})
  }

  componentDidMount() {
    this.setState({dataLog: {test: {text: 'test'}, test2: {text: 'test2'}, test3: {text: 'test3'}}})
    this.order = Object.keys(this.state.dataLog)
  }

  render() {
    const {
      repsWeight, currentExercise, currentMuscle, showModal, dataLog, showModalSets} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Quick Log</Text>
        </View>
        <Grid style={styles.grid}>
          <Row size={30} style={styles.rows}>
            <Col size={25}><Text>Muscle:</Text></Col>
            <Col size={75} style={styles.columns}>
              <Picker
                style={styles.picker}
                itemStyle={{fontSize: 14}}
                selectedValue={currentMuscle}
                onValueChange={(itemValue) => this.setState({currentMuscle: itemValue})}>
                <Picker.Item key="Bench press inclined" label="Bench press inclined"
                             value="Bench press inclined"/>
                <Picker.Item key="tta" label="tta" value="tta"/>
                <Picker.Item key="tts" label="tts" value="tts"/>
              </Picker>
            </Col>
          </Row>
          <Row size={30} style={styles.rows}>
            <Col size={25}><Text>Exercise:</Text></Col>
            <Col size={75} style={styles.columns}>
              <Picker
                style={styles.picker}
                itemStyle={{fontSize: 14}}
                selectedValue={currentExercise}
                onValueChange={(itemValue) => this.setState({currentExercise: itemValue})}>
                <Picker.Item key="aas" label="aas" value="aas"/>
                <Picker.Item key="aad" label="aad" value="aad"/>
                <Picker.Item key="aaf" label="aaf" value="aaf"/>
              </Picker>
            </Col>
          </Row>
          <Row size={20} style={styles.rows}>
            <ScrollView horizontal={true}>
              {repsWeight.map((item: RepsWeight, index: number) => {
                return (
                  <TouchableOpacity
                    key={item.weight + index}
                    style={styles.elemHorizontalList}
                    onPress={() => this.setState({showModalSets: true})}>
                    <Text><Text>{item.reps}</Text><Text> x</Text></Text>
                    <Text><Text>{item.weight}</Text><Text>kg</Text></Text>
                  </TouchableOpacity>
                )
              })}
              <TouchableOpacity
                onPress={() => this.setState({
                  repsWeight: [...this.state.repsWeight, loDash.last(repsWeight)]
                })}>
                <Icon name="add-circle-outline" size={30} color="#900"/>
              </TouchableOpacity>
            </ScrollView>
          </Row>
          <Row size={10} style={styles.rows}>
            <Col style={styles.columns}>
              <TouchableOpacity>
                <Text>Add</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={10} style={styles.rows}>
            <Col style={styles.columns}>
              <TouchableOpacity
                onPress={() => this.setState({showModal: true})}>
                <Text>See current training</Text>
              </TouchableOpacity>
            </Col>
          </Row>
        </Grid>
        <ModalSets
          showModal={showModalSets}
          index={this.setToModify.indexSet}
          modifySet={(weight, reps) => console.log(weight, reps)}
          reps={this.setToModify.reps}
          weight={this.setToModify.weight}
        />
        <ModalListLog
          showModal={showModal}
          dataLog={dataLog}
          order={this.order}
          closeModal={this.closeModalListLog}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    borderBottomWidth: 0.5,
    borderColor: '#414143',
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#282829'
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
    color: '#FFF'
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
    marginTop: 40
  },
  columns: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rows: {
    margin: 10
  },
  picker: {
    width: 300,
    height: 400
  },
  elemHorizontalList: {
    flexDirection: 'column',
    marginRight: 40
  }
})

export default QuickLog
