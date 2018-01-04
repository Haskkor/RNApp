import * as React from 'react'
import {Text, TouchableOpacity, View, Modal, StyleSheet} from 'react-native'
import * as SortableListView from 'react-native-sortable-listview'
import RowComponent from './RowListLog'

type IProps = {
  dataLog: any
  order: string[]
  closeModal: () => void
}

type IState = {}

type DataRow = { text: string }

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
              <Text>Dismiss</Text>
            </TouchableOpacity>
          </View>
          <SortableListView
            style={{flex: 1}}
            data={dataLog}
            order={order}
            onRowMoved={(e: any) => {
              order.splice(e.to, 0, order.splice(e.from, 1)[0])
              this.forceUpdate()
            }}
            renderRow={(row: DataRow) => <RowComponent data={row}/>}
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
    fontWeight: '600',
    color: '#000'
  }
})

export default ModalListLog
