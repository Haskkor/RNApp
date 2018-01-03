import * as React from 'react'
import {Text, TouchableOpacity, View, Modal} from 'react-native'
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
      <View>
        <Modal
          onRequestClose={() => console.log('close')}
          visible={true}
          animationType="slide">
          <TouchableOpacity
            onPress={() => closeModal()}>
            <Text>Dismiss</Text>
          </TouchableOpacity>
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

export default ModalListLog
