/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import CalculatorScreen from './src/screens/CalculatorScreen';
import {appStyles} from './src/theme/appTheme';

const App = () => {
  return (
    <SafeAreaView style={appStyles.mainSection}>
      <StatusBar backgroundColor="black" barStyle='light-content'/>
      <CalculatorScreen />
    </SafeAreaView>
  );
};

export default App;
