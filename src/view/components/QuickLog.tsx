import * as React from 'react'
import {Picker, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import * as SortableListView from 'react-native-sortable-listview'

type IProps = {}

type IState = {
  currentReps: string
  currentWeight: string
  currentExercise: string
  dataLog: any // fixme any
}


// let data = {
//   hello: { text: 'world' },
//   how: { text: 'are you' },
//   test: { text: 123 },
//   this: { text: 'is' },
//   a: { text: 'a' },
//   real: { text: 'real' },
//   drag: { text: 'drag and drop' },
//   bb: { text: 'bb' },
//   cc: { text: 'cc' },
//   dd: { text: 'dd' },
//   ee: { text: 'ee' },
//   ff: { text: 'ff' },
//   gg: { text: 'gg' },
//   hh: { text: 'hh' },
//   ii: { text: 'ii' },
//   jj: { text: 'jj' },
//   kk: { text: 'kk' },
// }
//
// let order = Object.keys(data)

class QuickLog extends React.PureComponent<IProps, IState> {
  order: any // fixme any

  constructor() {
    super()
    this.state = {
      currentReps: null,
      currentWeight: null,
      currentExercise: null,
      dataLog: {'test': {text: 'test'}}
    }
  }

  componentDidMount() {
    this.order = Object.keys(this.state.dataLog)
  }

  render() {
    const {currentReps, currentWeight, currentExercise, dataLog} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.logView}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{width: 100}}>Exercise:</Text>
            <Picker
              style={{width: 100}}
              selectedValue={currentExercise}
              onValueChange={(itemValue) => this.setState({currentExercise: itemValue})}>
              <Picker.Item key="ttt" label="ttt" value="ttt"/>
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
          style={{flex: 1}}
          data={dataLog}
          order={this.order}
          onRowMoved={(e: any) => { // fixme any
            this.order.splice(e.to, 0, this.order.splice(e.from, 1)[0])
            this.forceUpdate()
          }}
          renderRow={(row: any) =>
            <TouchableHighlight
              underlayColor={'#eee'}
              style={{
                padding: 25,
                backgroundColor: '#F8F8F8',
                borderBottomWidth: 1,
                borderColor: '#eee'
              }}
              {...this.props.sortHandlers}
            >
              <Text>{row.text}</Text>
            </TouchableHighlight>
          }
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
    flex: 1,
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
