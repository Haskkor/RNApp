import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

type IProps = {
  data: any
  sortHandlers?: any
}

type IState = {}

class RowComponent extends React.PureComponent<IProps, IState> {
  render() {
    return (
      <TouchableOpacity
        underlayColor={'#eee'}
        style={styles.container}
        {...this.props.sortHandlers}
      >
        <Text>{this.props.data.text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#eee'
  }
})

export default RowComponent
