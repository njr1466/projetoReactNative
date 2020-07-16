import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem,Header, Button} from 'react-native-elements' 
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

export default function Home({route,navigation}){

  const [getdata,setData] = useState([]);

  
      useEffect(()=>{
        
        async function resgatarDados(){
            const result = await axios(
                'http://professornilson.com/testeservico/clientes',
              );
              setData(result.data);
        }
        resgatarDados();
    })


return(
    <View>
  <Header
            
            centerComponent={{ text: 'Lista', style: { color: '#fff', fontSize:20 } }}
            rightComponent={
                <Button  
                title="+"
                onPress={()=>navigation.navigate('Crud')}
                ></Button>}
   />

       {
    getdata.map((linha, i) => (
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
        title={linha.nome}
        subtitle={linha.cpf}
        bottomDivider
        chevron
        onPress={()=>navigation.navigate('Crud',{
           nome:linha.nome,
           telefone:linha.telefone,
           cpf:linha.cpf,
           id:linha.id,
           alterar:true 
        })}
      />
    ))
  } 
    </View>
)

}