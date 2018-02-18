import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {ExerciseSet, Set} from '../../core/types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {colors} from '../../utils/colors'
import {grid} from '../../utils/grid'

type IProps = {
  data: ExerciseSet
  sortHandlers?: any
  action: (data: ExerciseSet) => void
}

type IState = {}

class RowListLog extends React.PureComponent<IProps, IState> {
  render() {
    const {exercise, muscleGroup, sets, recoveryTime} = this.props.data
    return (
      <TouchableOpacity
        underlayColor={colors.light}
        style={styles.container}
        onPress={() => this.props.action(this.props.data)}
        {...this.props.sortHandlers}>
        <View style={styles.viewContent}>
          <View style={styles.viewIcon}>
            <Icon name="reorder" size={grid.navIcon} color="rgba(0, 0, 0, 0.5)"/>
          </View>
          <View>
            <Text style={styles.setName}>{`${muscleGroup}, ${exercise.name}`}</Text>
            <Text style={styles.textMedium}>{`Recovery: ${recoveryTime}`}</Text>
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
    padding: grid.unit,
    backgroundColor: colors.lightAlternative,
    borderBottomWidth: grid.regularBorder,
    borderColor: colors.light
  },
  viewContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewIcon: {
    marginRight: grid.unit
  },
  setName: {
    fontFamily: grid.fontBold,
    color: colors.base
  },
  viewSets: {
    marginTop: grid.unit * 0.75,
    flexDirection: 'row'
  },
  set: {
    marginRight: grid.unit,
    color: colors.base
  },
  textContainer: {
    fontFamily: grid.font,
    marginRight: grid.unit * 2.5
  },
  textEquipment: {
    fontFamily: grid.font,
    color: colors.primary
  },
  textMedium: {
    fontFamily: grid.fontMedium,
    color: colors.base
  }
})

export default RowListLog
