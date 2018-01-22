import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

type IProps = {
  text: string
  stopToaster: () => void
}

type IState = {}

class Toaster extends React.PureComponent<IProps, IState> {
  timer: NodeJS.Timer

  constructor() {
    super()
    this.feedbackTimer = this.feedbackTimer.bind(this)
  }

  componentDidMount() {
    this.feedbackTimer()
  }

  feedbackTimer = () => {
    this.timer = setTimeout(() => {
      this.props.stopToaster()
      clearTimeout(this.timer)
    }, 4000)
  }

  render() {
    return (
      <View style={[styles.feedbackLog, styles.feedbackInfo]}>
        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={() => {
            clearTimeout(this.timer)
            this.props.stopToaster()
          }}>
          <Icon name="close" size={22} color="#FFF"/>
        </TouchableOpacity>
        <Text style={styles.feedbackText}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  feedbackLog: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    top: 80,
    right: 10,
    padding: 10
  },
  feedbackInfo: {
    backgroundColor: 'rgba(0, 183, 0, 0.5)'
  },
  feedbackButton: {
    marginRight: 10
  },
  feedbackText: {
    color: '#FFF'
  }
})

export default Toaster
