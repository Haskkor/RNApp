import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {ToasterInfo} from '../../core/enums/index'

type IProps = {
  text: string
  status: ToasterInfo
  stopToaster: (status: ToasterInfo) => void
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
      this.props.stopToaster(this.props.status)
      clearTimeout(this.timer)
    }, 4000)
  }

  render() {
    const {text, status, stopToaster} = this.props
    console.log(status, status.toString())
    return (
      <View style={[styles.feedbackLog, status === ToasterInfo.info ? styles.feedbackInfo : styles.feedbackWarning]}>
        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={() => {
            clearTimeout(this.timer)
            stopToaster(status)
          }}>
          <Icon name="close" size={22} color="#FFF"/>
        </TouchableOpacity>
        <Text style={styles.feedbackText}>{text}</Text>
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
  feedbackWarning: {
    backgroundColor: 'rgba(255, 204, 0, 0.5)'
  },
  feedbackButton: {
    marginRight: 10
  },
  feedbackText: {
    fontFamily: 'Montserrat-Regular',
    color: '#FFF'
  }
})

export default Toaster
