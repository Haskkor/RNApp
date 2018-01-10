import * as React from 'react'
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Set} from './QuickLog'
import Icon from 'react-native-vector-icons/MaterialIcons'

type IProps = {
  data: any
  sortHandlers?: any
}

type IState = {}

class RowListLog extends React.PureComponent<IProps, IState> {
  render() {
    const {exercise, muscleGroup, sets} = this.props.data
    return (
      <TouchableOpacity
        underlayColor={'#EEE'}
        style={styles.container}
        onPress={() => {
          Alert.alert(
            `${muscleGroup}, ${exercise.name}`,
            `${exercise.equipment}`,
            [
              {text: 'Edit', onPress: () => console.log('Ask me later pressed')},
              {text: 'Delete', onPress: () => console.log('Cancel Pressed'), style: 'destructive'},
              {text: 'Cancel', onPress: () => console.log('OK Pressed'), style: 'cancel'}
            ],
            { cancelable: true }
          )
        }}
        {...this.props.sortHandlers}>
        <View style={styles.viewContent}>
          <View style={styles.viewIcon}>
            <Icon name="reorder" size={20} color="rgba(0, 0, 0, 0.5)"/>
          </View>
          <View>
            <Text style={styles.setName}>{`${muscleGroup}, ${exercise.name}`}</Text>
            <Text numberOfLines={1} style={styles.textContainer}>
              <Text style={styles.textEquipment}>{`${exercise.equipment}   `}</Text>
              {sets.map((set: Set, index: number) =>
                <Text key={set.toString() + index} style={styles.set}>{`${set.reps} x ${set.weight}kg   `}</Text>
              )}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#DFDFDF',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  viewContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewIcon: {
    marginRight: 15
  },
  setName: {
    fontWeight: 'bold'
  },
  viewSets: {
    marginTop: 10,
    flexDirection: 'row'
  },
  set: {
    marginRight: 20
  },
  textContainer: {
    marginRight: 40
  },
  textEquipment: {
    color: '#6666FF'
  }
})

export default RowListLog
