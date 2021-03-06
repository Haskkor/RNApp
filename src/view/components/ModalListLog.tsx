import * as React from 'react'
import {Text, TouchableOpacity, View, Modal, StyleSheet, ActionSheetIOS} from 'react-native'
import * as SortableListView from 'react-native-sortable-listview'
import RowListLog from './RowListLog'
import * as loDash from 'lodash'
import {colors} from '../../utils/colors'
import {grid} from '../../utils/grid'
import RowSortableList from './RowSortableList'

type IProps = {
  dataLog: ServerEntity.ExerciseSet[]
  deleteExercise: (newDataLog: ServerEntity.ExerciseSet[]) => void
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

  showActionSheet(data: ServerEntity.ExerciseSet) {
    ActionSheetIOS.showActionSheetWithOptions({
        title: data.exercise.name,
        message: data.exercise.equipment,
        options: ['Edit', 'Delete', 'Cancel'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2
      },
      (buttonIndex) => {
        const indexRow = loDash.findIndex(this.props.dataLog, (row: ServerEntity.ExerciseSet) => {
          return row === data
        })
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
            renderRow={(row: ServerEntity.ExerciseSet) => row &&
                <RowSortableList data={row} action={this.showActionSheet} component={<RowListLog data={row}/>}/> ||
                <View/>}
          />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightAlternative
  },
  viewButtons: {
    borderBottomWidth: grid.smallBorder,
    borderColor: colors.base,
    paddingTop: grid.unit * 2,
    paddingBottom: grid.unit * 1.25,
    backgroundColor: colors.headerLight
  },
  buttonDismiss: {
    alignSelf: 'flex-end',
    marginRight: grid.unit * 1.25
  },
  textButton: {
    fontFamily: grid.fontBold,
    color: colors.base
  },
  sortableList: {
    flex: 1
  }
})

export default ModalListLog
