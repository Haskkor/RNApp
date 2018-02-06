import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {ToasterInfo} from '../../core/enums/index'
import Animate from 'react-move/Animate'
import {easeQuadOut} from 'd3-ease'

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
    return (
      <View style={styles.feedbackLogView}>
        <Animate
          show={true}
          start={{
            opacityView: 0,
            opacityText: 0
          }}
          enter={{
            opacityView: [0.5],
            opacityText: [1],
            timing: {duration: 400, ease: easeQuadOut}
          }}
          leave={{
            opacityView: [0],
            opacityText: [0],
            timing: {duration: 400, ease: easeQuadOut}
          }}
        >
          {({opacityView, opacityText}) => {
            return<View
              style={[styles.feedbackLog, status === ToasterInfo.info ? styles.feedbackInfo : styles.feedbackWarning, {opacity: opacityView as number}]}>
              <TouchableOpacity
                style={styles.feedbackButton}
                onPress={() => {
                  clearTimeout(this.timer)
                  stopToaster(status)
                }}>
                <Icon name="close" size={22} color="#FFF" style={{opacity: opacityText as number}}/>
              </TouchableOpacity>
              <Text style={[styles.feedbackText, {opacity: opacityText as number}]}>{text}</Text>
            </View>
          }}
        </Animate>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  feedbackLogView: {
    position: 'absolute',
    top: 80,
    right: 10
  },
  feedbackLog: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
