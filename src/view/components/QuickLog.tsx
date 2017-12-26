import * as React from 'react'
import {Dimensions, Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'

type IProps = {}

type IState = {
  currentReps: string
  currentWeight: string
  currentExercise: string
}

class QuickLog extends React.PureComponent<IProps, IState> {

  constructor() {
    super()
    this.state = {
      currentReps: null,
      currentWeight: null,
      currentExercise: null
    }
  }

  render() {
    const {currentReps, currentWeight, currentExercise} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.logView}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{width: 100}}>Exercise:</Text>
            <Picker
              style={{width: 100}}
              selectedValue={currentExercise}
              onValueChange={(itemValue) => this.setState({currentExercise: itemValue})}>
              <Picker.Item key='ttt' label='ttt' value='ttt'/>
              <Picker.Item key='aaa' label='aaa' value='aaa'/>
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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text>Test1</Text>
          <Text>Test2</Text>
          <Text>Test3</Text>
        </ScrollView>
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
