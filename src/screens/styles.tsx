import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  resultContainer: {
    paddingHorizontal: 20,
    flex: 2,
    justifyContent: 'flex-end',
  },
  buttonsContainer: {flex: 3, paddingHorizontal: 10, flexDirection: 'row'},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  previousResult: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 30,
    textAlign: 'right',
  },
  result: {
    color: 'white',
    fontSize: 80,
    textAlign: 'right',
  },
  operatorsColumn: {flex: 1, marginLeft: 20},
  numbersSection: {flex: 3},
  twoColumnsContainer: {flexGrow: 2, marginRight: 10},
  twoColumnsButton: {width: '100%'},
});
