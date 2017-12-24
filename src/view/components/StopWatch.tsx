import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

type IProps = {}

type IState = {
  isRunning: boolean
  mainTimer: Date
}

class StopWatch extends React.PureComponent<IProps, IState> {
  interval: number
  startTimer: Date

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
      clearInterval(this.interval)
      this.setState({isRunning: false})
    } else {
      if (!this.startTimer) this.startTimer = new Date()
      this.setState({isRunning: true})
      this.interval = setInterval(() => {
        this.setState({
          mainTimer: new Date()
        })
      }, 100)
    }
  }

  handleReset = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.startTimer = null
      this.setState({mainTimer: null})
    }
  }

  formatTime = (mainTimer: Date): string => {
    if (mainTimer) {
      const diff = +mainTimer - +this.startTimer
      const milliseconds = Math.floor((diff % 1000) / 10)
      const seconds = Math.floor(diff / 1000) % 60
      const minutes = Math.floor((diff / 1000) / 60)
      if (minutes === 59 && seconds === 59 && milliseconds >= 99) {
        this.handleStartStop()
        return '59:59:99'
      }
      return `${minutes < 10 ? '0' : '0'}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`
    }
    return '00:00:00'
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
