import * as React from 'react'
import {View, Modal, Picker, StyleSheet, Dimensions, Text} from 'react-native'
import {Grid, Row, Col} from 'react-native-easy-grid'
import * as loDash from 'lodash'

type IProps = {
  showModal: boolean
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
    const {showModal} = this.props
    const {currentReps, currentWeight} = this.state
    return (
      <View style={styles.container}>
        <Modal
          onRequestClose={() => console.log('close')}
          visible={showModal}
          animationType="slide">
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
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height / 2
  },
  picker: {
    width: 300,
    height: 400
  }
})

export default ModalSets
