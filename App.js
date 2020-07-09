import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import {HomeScreen} from './screens/Tela1';
import {TelaScreen} from './screens/Tela2';
import {CadastroScreen} from './screens/Tela3';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" mode="modal">
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'Tela Home 1'}} />
        <Stack.Screen name="Tela" component={TelaScreen} options={{title:'Tela Inicial 2'}}/>
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{title:'Tela Cadastro 3'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
