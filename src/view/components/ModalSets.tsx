import * as React from 'react'
import {View, Modal, Picker, StyleSheet, Dimensions, Text} from 'react-native'
import {Grid, Row, Col} from 'react-native-easy-grid'
import * as loDash from 'lodash'

type IProps = {
  index: number
  modifySet: (weight: number, reps: number) => void
  reps: number
  weight: number
}

type IState = {
  currentReps: number
  currentWeight: number
}


class ModalSets extends React.PureComponent<IProps, IState> {

  componentWillMount() {
    this.state = {currentReps: this.props.reps, currentWeight: this.props.weight}
  }

  render() {
    const {currentReps, currentWeight} = this.state
    return (
      <View>
      <Modal
        onRequestClose={() => console.log('close')}
        visible={true}
        transparent={true}
        animationType="slide">
        <View style={styles.container}>
          <View style={styles.viewOpacity}/>
          <View style={styles.viewPickers}>
            <Grid>
              <Col>
                <Row>
                  <Text>Reps:</Text>
                </Row>
                <Row>
                  <Picker
                    style={styles.picker}
                    selectedValue={currentReps}
                    onValueChange={(itemValue) => this.setState({currentReps: itemValue})}>
                    {loDash.range(1, 30).map((value: number) => {
                      return <Picker.Item key={value} label={value.toString()} value={value}/>
                    })}
                  </Picker>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Text>Weight:</Text>
                </Row>
                <Row>
                  <Picker
                    style={styles.picker}
                    selectedValue={currentWeight}
                    onValueChange={(itemValue) => this.setState({currentWeight: itemValue})}>
                    {loDash.range(1, 500).map((value: number) => {
                      return <Picker.Item key={value} label={value.toString()} value={value}/>
                    })}
                  </Picker>
                </Row>
              </Col>
            </Grid>
          </View>
        </View>
      </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  picker: {
    width: 250,
    height: 'auto'
  },
  container: {
    flex: 1
  },
  viewOpacity: {
    backgroundColor: 'black',
    opacity: 0.5,
    flex: 2
  },
  viewPickers: {
    flex: 1,
    backgroundColor: '#F7F7F8'
  }
})

export default ModalSets
