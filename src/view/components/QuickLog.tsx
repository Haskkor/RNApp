import * as React from 'react'
import {Picker, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import * as SortableListView from 'react-native-sortable-listview'
import { Col, Row, Grid } from 'react-native-easy-grid'

type IProps = {}

type IState = {
  currentReps: string
  currentWeight: string
  currentMuscle: string
  currentExercise: string
  dataLog: any
}

type RowProps = {
  data: any
  sortHandlers?: any
}

type DataRow = {text: string}

class RowComponent extends React.PureComponent<RowProps, {}> {
  render() {
    return (
      <TouchableOpacity
        underlayColor={'#eee'}
        style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee'
        }}
        {...this.props.sortHandlers}
      >
        <Text>{this.props.data.text}</Text>
      </TouchableOpacity>
    )
  }
}

class QuickLog extends React.PureComponent<IProps, IState> {
  order: any // fixme any

  constructor() {
    super()
    this.state = {
      currentReps: null,
      currentWeight: null,
      currentExercise: null,
      currentMuscle: null,
      dataLog: {test: {text: 'test'}, test2: {text: 'test2'}, test3: {text: 'test3'}}
    }
  }

  componentDidMount() {
    this.order = Object.keys(this.state.dataLog)
    this.setState({dataLog: {test: {text: 'test'}, test2: {text: 'test2'}, test3: {text: 'test3'}}})
    this.order = Object.keys(this.state.dataLog)
  }

  render() {
    const {currentReps, currentWeight, currentExercise, dataLog, currentMuscle} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.logView}>



          <Grid>
            <Row>
              <Col size={25}><Text>Muscle:</Text></Col>
              <Col size={75}>
                <Picker
                  selectedValue={currentMuscle}
                  onValueChange={(itemValue) => this.setState({currentMuscle: itemValue})}>
                  <Picker.Item key="ttt" label="ttt" value="ttt"/>
                  <Picker.Item key="aaa" label="aaa" value="aaa"/>
                  <Picker.Item key="aaa" label="aaa" value="aaa"/>
                  <Picker.Item key="aaa" label="aaa" value="aaa"/>
                  <Picker.Item key="aaa" label="aaa" value="aaa"/>
                </Picker>
              </Col>
            </Row>
            <Row>
              <Col size={25}><Text>Exercise:</Text></Col>
              <Col size={75}>
                <Picker
                  selectedValue={currentExercise}
                  onValueChange={(itemValue) => this.setState({currentExercise: itemValue})}>
                  <Picker.Item key="ttt" label="ttt" value="ttt"/>
                  <Picker.Item key="aaa" label="aaa" value="aaa"/>
                  <Picker.Item key="aaa" label="aaa" value="aaa"/>
                  <Picker.Item key="aaa" label="aaa" value="aaa"/>
                  <Picker.Item key="aaa" label="aaa" value="aaa"/>
                </Picker>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>

          </Grid>


          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{width: 100}}>Exercise:</Text>
            <Picker
              style={{width: 100}}
              selectedValue={currentExercise}
              onValueChange={(itemValue) => this.setState({currentExercise: itemValue})}>
              <Picker.Item key="ttt" label="ttt" value="ttt"/>
              <Picker.Item key="aaa" label="aaa" value="aaa"/>
              <Picker.Item key="aaa" label="aaa" value="aaa"/>
              <Picker.Item key="aaa" label="aaa" value="aaa"/>
              <Picker.Item key="aaa" label="aaa" value="aaa"/>
            </Picker>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{width: 100}}>Reps:</Text>
            <TextInput
              style={{width: 100}}
              onChangeText={(val) => this.setState({currentReps: val})}
              value={currentReps}
              placeholder="Enter value"
              returnKeyType="done"
              keyboardType="numeric"
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{width: 100}}>Weight:</Text>
            <TextInput
              style={{width: 100}}
              onChangeText={(val) => this.setState({currentWeight: val})}
              value={currentWeight}
              placeholder="Enter value"
              returnKeyType="done"
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => console.log('test')}>
            <Text>
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <SortableListView
          style={{ flex: 1 }}
          data={dataLog}
          order={this.order}
          onRowMoved={(e: any) => {
            this.order.splice(e.to, 0, this.order.splice(e.from, 1)[0])
            this.forceUpdate()
          }}
          renderRow={(row: DataRow) => <RowComponent data={row} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  }
})

export default QuickLog
