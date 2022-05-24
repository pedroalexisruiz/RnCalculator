import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import Button, {ButtonTypes} from '../components/Button';
import {OperationTypes, useCalculator} from '../hooks/useCalculator';
import {styles} from './styles';

const NUMBERS_PER_ROW = 3;

interface OperationButtonProp {
  text: string;
  operation: {onPress: () => void; name?: OperationTypes};
}

const CalculatorScreen = () => {
  const {
    previousValues,
    value,
    activeOperation,
    calculateResult,
    clean,
    deleteDigit,
    changeAbsoluteValue,
    buildNumber,
    OPERATIONS,
  } = useCalculator();

  const mathOperators: Record<string, OperationButtonProp> = {
    [OperationTypes.DIVIDE]: {
      text: '/',
      operation: OPERATIONS[OperationTypes.DIVIDE],
    },
    [OperationTypes.MULTIPLY]: {
      text: 'x',
      operation: OPERATIONS[OperationTypes.MULTIPLY],
    },
    [OperationTypes.SUBSTRACT]: {
      text: '-',
      operation: OPERATIONS[OperationTypes.SUBSTRACT],
    },
    [OperationTypes.ADD]: {
      text: '+',
      operation: OPERATIONS[OperationTypes.ADD],
    },
    [OperationTypes.CALCULATE_RESULT]: {
      text: '=',
      operation: {onPress: calculateResult},
    },
  };
  const mathOperatorsButtons = Object.keys(mathOperators).map(key => {
    const {
      text,
      operation: {onPress},
    } = mathOperators[key];
    return (
      <Button
        text={text}
        type={
          key === activeOperation?.name
            ? ButtonTypes.ACTIVE
            : ButtonTypes.TERTIARY
        }
        key={`mathOperator-${text}`}
        onPress={onPress}
      />
    );
  });

  const specialOperatorsButtons = useMemo(() => {
    const specialOperators = [
      {text: 'C', onPress: clean},
      {text: '+/-', onPress: changeAbsoluteValue},
      {text: 'del', onPress: deleteDigit},
    ];
    return specialOperators.map(({text, onPress}) => (
      <Button
        text={text}
        type={ButtonTypes.PRIMARY}
        key={`mathOperator-${text}`}
        onPress={onPress}
      />
    ));
  }, []);

  const numberButtonRows = useMemo(() => {
    const numbers = Array.from({length: 9}, (_, index) => index + 1);
    const rows = [];
    while (numbers.length) {
      rows.push(
        numbers.splice(numbers.length - NUMBERS_PER_ROW, NUMBERS_PER_ROW),
      );
    }
    return rows.map((row, rowIndex) => {
      return (
        <View style={styles.row} key={`row-${rowIndex}`}>
          {row.map((value, index) => (
            <Button
              text={`${value}`}
              type={ButtonTypes.SECONDARY}
              key={`numberButton-${index}`}
              onPress={() => buildNumber(`${value}`)}
            />
          ))}
        </View>
      );
    });
  }, []);
  const zeroRow = (
    <View style={styles.row} key="zeroRow">
      <View style={styles.twoColumnsContainer}>
        <Button
          text="0"
          style={styles.twoColumnsButton}
          type={ButtonTypes.SECONDARY}
          onPress={() => buildNumber('0')}
        />
      </View>
      <Button
        text="."
        type={ButtonTypes.SECONDARY}
        style={{marginRight: 5}}
        onPress={() => buildNumber('.')}
      />
    </View>
  );

  return (
    <>
      <View style={styles.resultContainer}>
        {previousValues.length ? (
          previousValues.map((previousValue, index) => (
            <Text
              style={styles.previousResult}
              key={`previousValue-${index}-${previousValue}`}>
              {previousValue}
            </Text>
          ))
        ) : (
          <Text style={styles.previousResult}>{''}</Text>
        )}
        <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
          {value}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.numbersSection}>
          <View style={styles.row}>{specialOperatorsButtons}</View>
          {numberButtonRows}
          {zeroRow}
        </View>
        <View style={styles.operatorsColumn}>
          <View style={[styles.column]}>{mathOperatorsButtons}</View>
        </View>
      </View>
    </>
  );
};

export default CalculatorScreen;
