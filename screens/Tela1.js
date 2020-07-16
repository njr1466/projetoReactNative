import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';



export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      
      <Text style={styles.titulo}>Digite seu Nome</Text>
            <TextInput
            style={{ height: 40,width:300, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setNome(text)}
            value={getNome}
            />   
      
      
      <Button
        title="Ir para Tela Screen"
        onPress={() => navigation.navigate('Cadastro')}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  botao:{
    paddingTop:20,
    width:300
  },

  titulo:{
    paddingTop:20,
    fontSize:18
  },

  Screen:{
    paddingTop:20,
    fontSize:28
  }

})