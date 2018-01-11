import * as React from 'react'
import {Text, TouchableOpacity, View, Modal, StyleSheet, ActionSheetIOS} from 'react-native'
import * as SortableListView from 'react-native-sortable-listview'
import RowListLog from './RowListLog'
import {ExerciseSet, Set} from './QuickLog'
import * as loDash from 'lodash'

type IProps = {
  dataLog: ExerciseSet[]
  order: string[]
  closeModal: () => void
}

type IState = {
  dataLog: ExerciseSet[]
}

class ModalListLog extends React.PureComponent<IProps, IState> {

  // REMOVE IF PROPS MODIFICATION TRIGGERS RENDER
  constructor() {
    super()
    this.state = {dataLog: []}
    this.showActionSheet = this.showActionSheet.bind(this)
  }

  // REMOVE IF PROPS MODIFICATION TRIGGERS RENDER
  componentWillMount() {
    this.setState({dataLog: this.props.dataLog.slice()})
  }

  showActionSheet(data: ExerciseSet) {
    ActionSheetIOS.showActionSheetWithOptions({
        title: data.exercise.name,
        message: data.exercise.equipment,
        options: ['Edit', 'Delete', 'Cancel'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2
      },
      (buttonIndex) => {
        if (buttonIndex === 0) console.log('test')
        else if (buttonIndex === 1) {
          const indexRow = loDash.findIndex(this.state.dataLog, (row: ExerciseSet) => {return row === data})
          let dataLogCopy = this.state.dataLog.slice()
          dataLogCopy.splice(indexRow, 1)
          this.setState({dataLog: dataLogCopy})
        }
      })
  }

  render() {
    const {order, closeModal} = this.props
    const {dataLog} = this.state
    return (
      <View style={styles.container}>
        <Modal
          onRequestClose={() => console.log('close')}
          visible={true}
          animationType="slide">
          <View style={styles.viewButtons}>
            <TouchableOpacity
              style={styles.buttonDismiss}
              onPress={() => closeModal()}>
              <Text style={styles.textButton}>Dismiss</Text>
            </TouchableOpacity>
          </View>
          <SortableListView
            style={styles.sortableList}
            data={dataLog}
            order={order}
            onRowMoved={(e: any) => {
              order.splice(e.to, 0, order.splice(e.from, 1)[0])
              this.forceUpdate()
            }}
            renderRow={(row: ExerciseSet) => <RowListLog data={row} action={this.showActionSheet}/>}
          />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  },
  viewButtons: {
    borderBottomWidth: 0.5,
    borderColor: '#000',
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#F7F7F8'
  },
  buttonDismiss: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  textButton: {
    fontWeight: '600',
    color: '#000'
  },
  sortableList: {
    flex: 1
  }
})

export default ModalListLog
