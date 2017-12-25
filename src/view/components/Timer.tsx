import * as React from 'react'
import {Picker, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import * as loDash from 'lodash'

type IProps = {}

type IState = {
  isRunning: boolean
  selectedMinute: number
  selectedSecond: number
  totalTime: number
}

class Timer extends React.PureComponent<IProps, IState> {
  interval: number

  constructor() {
    super()
    this.handleReset = this.handleReset.bind(this)
    this.handleStartStop = this.handleStartStop.bind(this)
    this.state = {
      isRunning: false,
      selectedMinute: 1,
      selectedSecond: 30,
      totalTime: null
    }
  }

  handleStartStop = () => {
    const {isRunning, selectedSecond, selectedMinute} = this.state
    if (isRunning) {
      clearInterval(this.interval)
      this.setState({isRunning: false})
    } else {
      if (this.state.totalTime === null) this.setState({totalTime: selectedMinute * 60 + selectedSecond})
      this.setState({isRunning: true})
      this.interval = setInterval(() => {
        this.setState({totalTime: this.state.totalTime - 1})
      }, 1000)
    }
  }

  handleReset = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState({totalTime: null})
    }
  }

  formatTime = (totalTime: number): string => {
    if (totalTime > 0) {
      const seconds = totalTime % 60
      const minutes = Math.floor(totalTime / 60)
      if (minutes === 0 && seconds === 0) {
        this.handleStartStop()
        return '00:00'
      }
      return `${minutes < 10 ? '0' : '0'}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    return '00:00'
  }

  render() {
    const {isRunning, selectedMinute, selectedSecond, totalTime} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.timer}>
          <View style={styles.header}>
            <Text style={styles.title}>Recovery StopWatch</Text>
          </View>
          {(isRunning || this.state.totalTime > 0) &&
          <View style={styles.timerWrapper}>
            <Text style={styles.mainTimer}>{this.formatTime(totalTime)}</Text>
          </View> ||
          <View style={styles.pickerWrapper}>
            <View style={styles.pickerMinutes}>
              <Picker
                selectedValue={selectedMinute}
                onValueChange={(itemValue) => this.setState({selectedMinute: itemValue})}>
                {loDash.range(10).map((value) => {
                  return <Picker.Item key={value} label={value.toString()} value={value}/>
                })}
              </Picker>
              <Text>minutes</Text>
            </View>
            <View style={styles.pickerSeconds}>
              <Picker
                selectedValue={selectedSecond}
                onValueChange={(itemValue) => this.setState({selectedSecond: itemValue})}>
                {loDash.range(0, 60, 5).map((value) => {
                  return <Picker.Item key={value} label={value.toString()} value={value}/>
                })}
              </Picker>
              <Text>seconds</Text>
            </View>
          </View>}
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
    paddingBottom: 20,
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
  pickerWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center'
  },
  pickerMinutes: {
    width: 70,
    marginRight: 30
  },
  pickerSeconds: {
    width: 70,
    marginLeft: 30
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

export default Timer
