
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,TouchableHighlight } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem,Header, Button} from 'react-native-elements' 
import { ScrollView } from 'react-native-gesture-handler';

export default function CadastroScreen({route,navigation}) {
  
  const [getData, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const result = await axios(
            'http://professornilson.com/testeservico/os',
          );
          setData(result.data);
    }

    
    fetchData();
  });

  return (
    <View>
            <Header
            leftComponent={
            <Button  
            title="< Voltar"
            onPress={()=>navigation.navigate('Home')}
            ></Button>}
            centerComponent={{ text: 'Lista', style: { color: '#fff', fontSize:20 } }}
            rightComponent={
                <Button  
                title="+"
                onPress={()=>navigation.navigate('Tela')}
                ></Button>}
/>
        <ScrollView>
        {
    getData.map((l, i) => (
     
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
        title={l.nome}
        subtitle={l.cpf}
        bottomDivider
        chevron
        onPress={()=>navigation.navigate('Tela',{
            nome:l.nome,
            cpf:l.cpf,
            telefone:l.telefone,
            id:l.id,
            botao:true,
        
        }
        
        )}
      />
    
    ))
  }
  </ScrollView>
    </View>
  );
}

