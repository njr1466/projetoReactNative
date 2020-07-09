import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button,SearchBar } from 'react-native-elements';


export function TelaScreen({ route,navigation }) {
  const { nome } = route.params;
  const { idade } = route.params;
  
  const [getNome,setNome] = React.useState();
  const [getIdade,setIdade] = React.useState();
  
 
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tela Screen</Text>
      <Text>Meu nome é {nome} e tenho {idade} anos</Text>
      
      <Text>Digite seu novo Nome</Text>
      <TextInput
      style={{ height: 40,width:400, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => setNome(text)}
      value={getNome}
    />
<Text>Digite sua nova Idade novo Nome</Text>
<TextInput
      style={{ height: 40,width:400, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => setIdade(text)}
      value={getIdade}
    />
      <Button
        title="Ir para Home Screen"
        onPress={() => navigation.navigate('Cadastro',{
          nome:getNome,
          idade:getIdade
        })}
      />
    </View>
  );
}