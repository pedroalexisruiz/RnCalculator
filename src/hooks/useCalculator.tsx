import {useState} from 'react';

export enum OperationTypes {
  ADD = 'ADD',
  SUBSTRACT = 'SUBSTRACT',
  DIVIDE = 'DIVIDE',
  MULTIPLY = 'MULTIPLY',
  CALCULATE_RESULT = 'CALCULATE_RESULT',
}

export const useCalculator = () => {
  const [previousValues, setPreviousValues] = useState<string[]>([]);
  const [value, setValue] = useState('0');
  const [activeOperation, setActiveOperation] = useState<
    | {
        funct: (firstNumber: number, secondNumber: number) => number;
        name: OperationTypes;
      }
    | undefined
  >(undefined);

  const add = (firstNumber: number, secondNumber: number) =>
    firstNumber + secondNumber;
  const substract = (firstNumber: number, secondNumber: number) =>
    firstNumber - secondNumber;
  const multiply = (firstNumber: number, secondNumber: number) =>
    firstNumber * secondNumber;
  const divide = (firstNumber: number, secondNumber: number) =>
    firstNumber / secondNumber;

  const pushOperation = (
    operation: (firstNumber: number, secondNumber: number) => number,
    operationName: OperationTypes,
  ) => {
    setActiveOperation({funct: operation, name: operationName});
    setPreviousValues(previousValuesState => {
      return [...previousValuesState, value];
    });
    setValue('0');
  };

  const calculateResult = () => {
    if (activeOperation && previousValues.length && value) {
      setValue(
        `${activeOperation.funct(
          Number(previousValues[previousValues.length - 1]),
          Number(value),
        )}`,
      );
      setActiveOperation(undefined);
    }
    return;
  };

  const clean = () => {
    setValue('0');
    setPreviousValues([]);
  };
  const deleteDigit = () => {
    setValue(previous => (previous.length > 1 ? previous.slice(0, -1) : '0'));
  };
  const changeAbsoluteValue = () => {
    setValue(previous => {
      if (previous === '0') {
        return previous;
      }
      return previous.includes('-')
        ? previous.replace('-', '')
        : `-${previous}`;
    });
  };

  const canStartWithCero = (number: string) =>
    number != '0' ||
    (!value.startsWith('0') && !value.startsWith('-0')) ||
    value.startsWith('0.');

  const canHaveDecimalPoint = (typedNumber: string) =>
    typedNumber != '.' || !value.includes('.');

  const buildNumber = (typedNumber: string) => {
    if (!canHaveDecimalPoint(typedNumber)) {
      return;
    }
    if (!canStartWithCero(typedNumber)) {
      return;
    }
    setValue(previous =>
      previous === '0' && typedNumber != '.'
        ? typedNumber
        : `${previous}${typedNumber}`,
    );
  };

  const OPERATIONS = {
    [OperationTypes.DIVIDE]: {
      onPress: () => pushOperation(divide, OperationTypes.DIVIDE),
      name: OperationTypes.DIVIDE,
    },
    [OperationTypes.MULTIPLY]: {
      onPress: () => pushOperation(multiply, OperationTypes.MULTIPLY),
      name: OperationTypes.MULTIPLY,
    },
    [OperationTypes.SUBSTRACT]: {
      onPress: () => pushOperation(substract, OperationTypes.SUBSTRACT),
      name: OperationTypes.SUBSTRACT,
    },
    [OperationTypes.ADD]: {
      onPress: () => pushOperation(add, OperationTypes.ADD),
      name: OperationTypes.ADD,
    },
  };

  return {
    previousValues,
    value,
    activeOperation,
    calculateResult,
    clean,
    deleteDigit,
    changeAbsoluteValue,
    buildNumber,
    OPERATIONS,
  };
};
