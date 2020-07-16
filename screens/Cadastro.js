import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,TouchableHighlight ,StyleSheet} from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem,Header, Button,Image} from 'react-native-elements' 
import { ScrollView } from 'react-native-gesture-handler';
import FlashMessage from "react-native-flash-message"; 
import {showMessage, hideMessage } from "react-native-flash-message";


export default function ListaScreen({route,navigation}){

const [getNome,setNome] = useState();
const [getCpf,setCpf] = useState();
const [getTelefone,setTelefone] = useState();
const [getId,setId] = useState();
const [getAlterar,setAlterar] = useState();

useEffect(()=>{
    if(route.params){
        const { nome } =  route.params 
        const { telefone } =  route.params 
        const { cpf } =  route.params 
        const { id } =  route.params
        const { alterar } =  route.params

        setNome(nome)
        setTelefone(telefone)
        setCpf(cpf)
        setId(id)
        setAlterar(alterar)
    }

},[]) 

async function inserirDados(){
        
    axios.post('http://professornilson.com/testeservico/clientes', {
        nome: getNome,
        telefone: getTelefone,
        cpf: getCpf
      })
      .then(function (response) {
        setNome('');
        setCpf('');
        setTelefone(''); 
        showMessage({
            message: "Registro Cadastrado com sucesso",
            type: "success",
          }); 
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });     
    
}

function alterarDados(){
    axios.put('http://professornilson.com/testeservico/clientes/'+getId, {
        nome: getNome,
        telefone: getTelefone,
        cpf: getCpf
      })
      .then(function (response) {
        setNome('');
        setCpf('');
        setTelefone(''); 
        showMessage({
            message: "Registro Alterado com sucesso",
            type: "success",
          }); 
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });    
}

function excluirDados(){

    
    Alert.alert(
        "Atenção",
        "Deseja excluir o registro?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => (
            axios.delete('http://professornilson.com/testeservico/clientes/'+getId)
            .then(function (response) {
              setNome('');
              setCpf('');
              setTelefone(''); 
              showMessage({
                  message: "Registro Excluido com sucesso",
                  type: "danger",
                }); 
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            }) 
          ) }
        ],
        { cancelable: false }
      );


    
}

return (
    
    <View style={{ flex: 1}}>
        <Header
        leftComponent={
            <Button  
            title="< Voltar"
            onPress={()=>navigation.navigate('Listar')}
            ></Button>}
            centerComponent={{ text: 'Cadastro de Clientes', style: { color: '#fff' } }}
        
        />
        <ScrollView>

             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>  
                <Image
                source={{ uri: 'https://pngimage.net/wp-content/uploads/2018/05/cadastro-icon-png-3.png' }}
                style={{ width: 200, height: 200 }}
             />


            <Text style={styles.titulo}>Digite seu Nome</Text>
            <TextInput
            style={{ height: 40,width:300, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setNome(text)}
            value={getNome}
            />    

            <Text style={styles.titulo}>Digite seu Cpf</Text>
            <TextInput
            style={{ height: 40,width:300, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setCpf(text)}
            value={getCpf}
            /> 

            <Text style={styles.titulo}>Digite seu Telefone</Text>
            <TextInput
            style={{ height: 40,width:300, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setTelefone(text)}
            value={getTelefone}
            />     

            { !getAlterar ? (
            <Button style={{paddingTop:20}}
            title="Salvar"
            style={styles.botao}
            onPress={() => inserirDados()}
            />
            ):null}

            { getAlterar ? (
            <Button style={{paddingTop:20}}
            title="Alterar"
            style={styles.botao}
            onPress={() => alterarDados()}
            />
            ):null}
            
            { getAlterar ? (
            <Button style={{paddingTop:20}}
            title="Excluir"
            color="red"
            linearGradientProps={{
                colors: ['red','red', 'red'],
                }}
            style={styles.botaoExcluir}
            onPress={() => excluirDados()}
            />
            ):null}

           
           <FlashMessage position="top" />
        </View>
        
        </ScrollView>
    </View>

     
)
}

const styles = StyleSheet.create({

    botao:{
      paddingTop:20,
      width:300
    },
    botaoExcluir:{
        paddingTop:20,
        width:300,
        
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