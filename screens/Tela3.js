import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';


export function CadastroScreen({route,navigation }) {
  const { nome } = route.params;
  const { idade } = route.params;
 
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tela Screen</Text>
      <Text>Meu nome é {nome} e tenho {idade} anos de idade</Text>
      <Button
        title="Ir para Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}