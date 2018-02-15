import * as React from 'react'
import {Text, TouchableOpacity, View, Modal, StyleSheet, ActionSheetIOS} from 'react-native'
import * as SortableListView from 'react-native-sortable-listview'
import RowListLog from './RowListLog'
import {ExerciseSet} from  '../../core/types'
import * as loDash from 'lodash'

type IProps = {
  dataLog: ExerciseSet[]
  deleteExercise: (newDataLog: ExerciseSet[]) => void
  editExercise: (index: number) => void
  order: string[]
  closeModal: () => void
}

type IState = {}

class ModalListLog extends React.PureComponent<IProps, IState> {

  constructor() {
    super()
    this.showActionSheet = this.showActionSheet.bind(this)
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
        const indexRow = loDash.findIndex(this.props.dataLog, (row: ExerciseSet) => {return row === data})
        if (buttonIndex === 0) {
          this.props.editExercise(indexRow)
        } else if (buttonIndex === 1) {
          let dataLogCopy = this.props.dataLog.slice()
          dataLogCopy.splice(indexRow, 1)
          this.props.deleteExercise(dataLogCopy)
        }
      })
  }

  render() {
    const {order, closeModal, dataLog} = this.props
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
            renderRow={(row: ExerciseSet) => row && <RowListLog data={row} action={this.showActionSheet}/> || <View/>}
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
    borderColor: '#445878',
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#F7F7F8'
  },
  buttonDismiss: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  textButton: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    color: '#445878'
  },
  sortableList: {
    flex: 1
  }
})

export default ModalListLog
