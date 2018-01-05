import * as React from 'react'
import {Text, TouchableOpacity, View, Modal, StyleSheet} from 'react-native'
import * as SortableListView from 'react-native-sortable-listview'
import RowListLog from './RowListLog'
import {ExerciseSet, Set} from './QuickLog'

type IProps = {
  dataLog: ExerciseSet[]
  order: string[]
  closeModal: () => void
}

type IState = {}

type DataRow = {
  muscleGroup: string,
  exercise: string,
  sets: Set[]
}

class ModalListLog extends React.PureComponent<IProps, IState> {

  render() {
    const {dataLog, order, closeModal} = this.props
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
            renderRow={(row: DataRow) => <RowListLog data={row}/>}
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
    marginRight: 20,
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
