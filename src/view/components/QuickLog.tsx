import * as React from 'react'
import {Picker, StyleSheet, Text, TouchableOpacity, View, Modal, ScrollView} from 'react-native'
import * as SortableListView from 'react-native-sortable-listview'
import {Col, Row, Grid} from 'react-native-easy-grid'

type IProps = {}

type IState = {
  currentReps: string
  currentWeight: string
  currentMuscle: string
  currentExercise: string
  showModal: boolean
  dataLog: any
}

type RowProps = {
  data: any
  sortHandlers?: any
}

type DataRow = { text: string }

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
      showModal: false,
      dataLog: {test: {text: 'test'}, test2: {text: 'test2'}, test3: {text: 'test3'}}
    }
  }

  componentDidMount() {
    this.order = Object.keys(this.state.dataLog)
    this.setState({dataLog: {test: {text: 'test'}, test2: {text: 'test2'}, test3: {text: 'test3'}}})
    this.order = Object.keys(this.state.dataLog)
  }

  render() {
    const {currentReps, currentWeight, currentExercise, dataLog, currentMuscle, showModal} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Quick Log</Text>
        </View>
        <Grid style={{flex: 1, marginTop: 40}}>
          <Row size={30} style={{margin: 10}}>
            <Col size={25}><Text>Muscle:</Text></Col>
            <Col size={75} style={{justifyContent: 'center', alignItems: 'center'}}>
              <Picker
                style={{width: 300, height: 400}}
                itemStyle={{fontSize: 14}}
                selectedValue={currentMuscle}
                onValueChange={(itemValue) => this.setState({currentMuscle: itemValue})}>
                <Picker.Item key="Bench press inclined dumbells" label="Bench press inclined dumbells"
                             value="Bench press inclined dumbells"/>
                <Picker.Item key="tta" label="tta" value="tta"/>
                <Picker.Item key="tts" label="tts" value="tts"/>
              </Picker>
            </Col>
          </Row>
          <Row size={30} style={{margin: 10}}>
            <Col size={25}><Text>Exercise:</Text></Col>
            <Col size={75} style={{justifyContent: 'center', alignItems: 'center'}}>
              <Picker
                style={{width: 300, height: 400}}
                itemStyle={{fontSize: 14}}
                selectedValue={currentExercise}
                onValueChange={(itemValue) => this.setState({currentExercise: itemValue})}>
                <Picker.Item key="aas" label="aas" value="aas"/>
                <Picker.Item key="aad" label="aad" value="aad"/>
                <Picker.Item key="aaf" label="aaf" value="aaf"/>
              </Picker>
            </Col>
          </Row>
          <Row size={20} style={{margin: 10}}>
            <ScrollView horizontal={true}>
              <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{flexDirection: 'column'}}>
                  <Text><Text>8</Text><Text> x</Text></Text>
                  <Text><Text>75</Text><Text>kg</Text></Text>
                </TouchableOpacity>
              </Col>
              <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{flexDirection: 'column'}}>
                  <Text><Text>8</Text><Text> x</Text></Text>
                  <Text><Text>75</Text><Text>kg</Text></Text>
                </TouchableOpacity>
              </Col>
              <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{flexDirection: 'column'}}>
                  <Text><Text>8</Text><Text> x</Text></Text>
                  <Text><Text>75</Text><Text>kg</Text></Text>
                </TouchableOpacity>
              </Col>
              <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{flexDirection: 'column'}}>
                  <Text><Text>8</Text><Text> x</Text></Text>
                  <Text><Text>75</Text><Text>kg</Text></Text>
                </TouchableOpacity>
              </Col>
            </ScrollView>
          </Row>
          <Row size={10} style={{margin: 10}}>
            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => console.log('test')}>
                <Text>
                  Add
                </Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={10} style={{margin: 10}}>
            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => this.setState({showModal: true})}>
                <Text>
                  See current training
                </Text>
              </TouchableOpacity>
            </Col>
          </Row>
        </Grid>
        <Modal
          visible={showModal}
          animationType="slide">
          <SortableListView
            style={{flex: 1}}
            data={dataLog}
            order={this.order}
            onRowMoved={(e: any) => {
              this.order.splice(e.to, 0, this.order.splice(e.from, 1)[0])
              this.forceUpdate()
            }}
            renderRow={(row: DataRow) => <RowComponent data={row}/>}
          />
        </Modal>
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
  }
})

export default QuickLog
