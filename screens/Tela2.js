import React, { useState,useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button,SearchBar,Header,Image} from 'react-native-elements';
import axios from 'axios';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

export default function TelaScreen({ route,navigation }) {

  const [getNome,setNome] = React.useState();
  const [getCpf,setCpf] = React.useState();
  const [getTelefone,setTelefone] = React.useState();
  const [getId,setId] = React.useState();
  const [getBotao,setBotao] = React.useState();

  

  var primeiro = 0
  
  useEffect(()=>{
  if(route.params){
    const { nome } =  route.params 
    const { cpf } = route.params 
    const { telefone } = route.params
    const { id } = route.params
    const { botao } = route.params

      setNome(nome);
      setTelefone(telefone);
      setCpf(cpf);
      setId(id);
      setBotao(botao);
  }
      
  }, [])
        



function inserirDados(){

    const result =  axios.post('http://professornilson.com/testeservico/clientes', {
        nome: getNome,
        cpf: getCpf,
        telefone: getTelefone
      })
      .then(function (response) {
        setNome('');
        setCpf('');
        setTelefone('');
        setId('');
        showMessage({
          message: "Registro Adicionado com Sucesso!!",
          type: "success",
        });
        //navigation.navigate('Cadastro')
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
     
}

function editarDados(){

  const result =  axios.put('http://professornilson.com/testeservico/os/'+getId, {
      nome: getNome,
      cpf: getCpf,
      telefone: getTelefone
    })
    .then(function (response) {
      setNome('');
      setCpf('');
      setTelefone('');
      setId('');
      showMessage({
        message: "Registro Alterado com Sucesso!!",
        type: "success",
      });
      //navigation.navigate('Cadastro')
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
   
}

function excluirDados(){

  const result =  axios.delete('http://professornilson.com/testeservico/os/'+getId, {
      nome: getNome,
      cpf: getCpf,
      telefone: getTelefone
    })
    .then(function (response) {
      setNome('');
      setCpf('');
      setTelefone('');
      setId('');
      showMessage({
        message: "Registro Excluido com Sucesso!!",
        type: "danger",
      });
      //navigation.navigate('Cadastro')
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
   
}

function listarDados(){

  navigation.navigate('Cadastro')
   
}

  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  
        <Image
        source={{ uri: 'https://www.tce.pi.gov.br/wp-content/uploads/2019/04/cadastro.jpg' }}
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
     
     { !getId ? (
      <Button style={{paddingTop:20}}
        title="Salvar"
        style={styles.botao}
        onPress={() => inserirDados()}
      />
      ):null}

      { getId ? (
      <Button style={{paddingTop:20}}
        title="Editar"
        onPress={() => editarDados()}
  
      />
      ):null}

      { getId ? (
      <Button style={{paddingTop:20}}
        title="Excluir"
        onPress={() => excluirDados()}
      />
      ):null}

     <FlashMessage position="top" />
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