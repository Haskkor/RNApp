import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import * as moment from 'moment'

type IProps = {}

type IState = {
  isRunning: boolean
  mainTimer: moment.Moment
}

class StopWatch extends React.PureComponent<IProps, IState> {
  interval: number
  startTimer: moment.Moment

  constructor() {
    super()
    this.handleReset = this.handleReset.bind(this)
    this.handleStartStop = this.handleStartStop.bind(this)
    this.state = {
      isRunning: false,
      mainTimer: null
    }
  }

  handleStartStop = () => {
    const {isRunning} = this.state
    if (isRunning) {
      this.startTimer = null
      clearInterval(this.interval)
      this.setState({isRunning: false})
    } else {
      this.startTimer = moment()
      this.setState({isRunning: true})
      this.interval = setInterval(() => {
        this.setState({
          mainTimer: moment()
        })
      }, 1000)
    }
  }

  handleReset = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState({
        mainTimer: null
      })
    }
  }

  formatTime = (mainTimer: moment.Moment): string => {
    if (mainTimer) {
      return `${mainTimer.diff(this.startTimer, 'minutes')}:${mainTimer.diff(this.startTimer, 'seconds')}`
    }
    return '00:00'
  }

  render() {
    const {isRunning, mainTimer} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.timer}>
          <View style={styles.header}>
            <Text style={styles.title}>Recovery StopWatch</Text>
          </View>
          <View style={styles.timerWrapper}>
            <Text style={styles.mainTimer}>{this.formatTime(mainTimer)}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity disabled={isRunning} onPress={this.handleReset} style={styles.button}>
              <Text>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleStartStop} style={styles.button}>
              <Text style={[styles.startButton, isRunning && styles.stopButton]}>
                {isRunning ? 'Stop' : 'Start'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#F9F9F9'
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600'
  },
  timerWrapper: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1
  },
  timer: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  buttons: {
    flex: 1,
    backgroundColor: '#F0EFF5',
    justifyContent: 'center'
  },
  mainTimer: {
    fontSize: 60,
    fontWeight: '100',
    alignSelf: 'flex-end'
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 30
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    color: '#00CC00'
  },
  stopButton: {
    color: '#FF0000'
  }
})

export default StopWatch
