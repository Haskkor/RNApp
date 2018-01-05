import * as React from 'react'
import {Picker, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
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
  isReset: boolean

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

  componentDidMount() {
    this.isReset = false
  }

  handleStartStop = (endTimer: boolean) => {
    const {isRunning, selectedSecond, selectedMinute} = this.state
    if (selectedMinute === 0 && selectedSecond === 0) return
    if (isRunning) {
      if (!endTimer) this.isReset = true
      clearInterval(this.interval)
      this.setState({isRunning: false})
    } else {
      this.isReset = false
      if (this.state.totalTime === null) this.setState({totalTime: selectedMinute * 60 + selectedSecond})
      this.setState({isRunning: true})
      this.interval = setInterval(() => {
        this.setState({totalTime: this.state.totalTime - 1})
      }, 1000)
    }
  }

  handleReset = () => {
    this.isReset = false
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
        this.handleStartStop(false)
        return '00:00'
      }
      return `${minutes < 10 ? '0' : '0'}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    this.handleStartStop(true)
    return '00:00'
  }

  render() {
    const {isRunning, selectedMinute, selectedSecond, totalTime} = this.state
    const isResetDisabled = !this.isReset
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
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
                style={styles.picker}
                selectedValue={selectedMinute}
                onValueChange={(itemValue) => this.setState({selectedMinute: itemValue})}>
                {loDash.range(10).map((value) => {
                  return <Picker.Item color="#FFF" key={value} label={value.toString()} value={value}/>
                })}
              </Picker>
              <Text style={styles.resetButtonText}>minutes</Text>
            </View>
            <View style={styles.pickerSeconds}>
              <Picker
                style={styles.picker}
                selectedValue={selectedSecond}
                onValueChange={(itemValue) => this.setState({selectedSecond: itemValue})}>
                {loDash.range(0, 60, 5).map((value) => {
                  return <Picker.Item color="#FFF" key={value} label={value.toString()} value={value}/>
                })}
              </Picker>
              <Text style={styles.resetButtonText}>seconds</Text>
            </View>
          </View>}
        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              disabled={isResetDisabled}
              onPress={this.handleReset}
              style={[styles.button, isResetDisabled ? styles.resetButtonDisabled : styles.resetButton]}>
              <Text style={isResetDisabled ? styles.resetButtonTextDisabled : styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleStartStop(false)}
              style={[styles.button, isRunning ? styles.stopButton : styles.startButton]}>
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
    fontWeight: 'normal',
    alignSelf: 'flex-end',
    color: '#FFF',
    fontFamily: 'courier'
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    backgroundColor: 'rgba(0, 112, 10, 0.5)'
  },
  startButtonText: {
    color: '#00CC00'
  },
  stopButton: {
    backgroundColor: 'rgba(153, 0, 0, 0.5)'
  },
  stopButtonText: {
    color: '#FF0000'
  },
  resetButton: {
    backgroundColor: 'rgba(179, 179, 179, 0.5)'
  },
  resetButtonText: {
    color: '#FFF'
  },
  resetButtonDisabled: {
    backgroundColor: 'rgba(65, 65, 67, 0.5)'
  },
  resetButtonTextDisabled: {
    color: '#7A7A7B'
  },
  pickerWrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  pickerMinutes: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center'
  },
  pickerSeconds: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center'
  },
  picker: {
    width: 50
  }
})

export default Timer
