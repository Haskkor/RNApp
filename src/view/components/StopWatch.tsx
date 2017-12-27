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
  isReset: boolean

  constructor() {
    super()
    this.handleReset = this.handleReset.bind(this)
    this.handleStartStop = this.handleStartStop.bind(this)
    this.state = {
      isRunning: false,
      mainTimer: null
    }
  }

  componentDidMount() {
    this.isReset = true
  }

  handleStartStop = () => {
    const {isRunning} = this.state
    if (isRunning) {
      this.isReset = true
      clearInterval(this.interval)
      this.setState({isRunning: false})
    } else {
      this.isReset = false
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
    this.isReset = true
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
            <Text style={styles.title}>Recovery Stopwatch</Text>
          </View>
          <View style={styles.timerWrapper}>
            <Text style={styles.mainTimer}>{this.formatTime(mainTimer)}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity disabled={!this.isReset} onPress={this.handleReset} style={styles.startButton}>
              <Text>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleStartStop} style={isRunning ? styles.stopButton : styles.startButton}>
              <Text style={isRunning ? styles.stopButtonText : styles.startButtonText}>
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
    flex: 1,
    backgroundColor: '#1B1B1C'
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
  timerWrapper: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1
  },
  timer: {
    flex: 2
  },
  buttons: {
    flex: 1,
    justifyContent: 'center'
  },
  mainTimer: {
    fontSize: 60,
    fontWeight: '200',
    alignSelf: 'flex-end',
    color: '#FFF'
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 30
  },
  startButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 112, 10, 0.5)'
  },
  startButtonText: {
    color: '#00CC00'
  },
  stopButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stopButtonText: {
    color: '#FF0000'
  }
})

export default StopWatch
