import * as React from 'react'
import {Picker, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import * as loDash from 'lodash'

type IProps = {}

type IState = {}

class QuickLog extends React.PureComponent<IProps, IState> {

  render() {
    return (
      <View style={styles.container}>
        <Text>TEST</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default QuickLog
