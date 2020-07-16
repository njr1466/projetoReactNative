import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,TouchableHighlight,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem,Header, Button,Image} from 'react-native-elements' 
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

export default function Crud({route,navigation}){

    [getNome,setNome] = useState();
    [getCpf,setCpf] = useState();
    [getTelefone,setTelefone] = useState();
    [getId,setId] = useState();
    [getAlterar,setAlterar] = useState();


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
        await axios.post('http://professornilson.com/testeservico/clientes',{
         nome:getNome,
         cpf:getCpf,
         telefone:getTelefone,  
        }
        )
        .then(function (response) {
            setNome('')
            setTelefone('')
            setCpf('')
            showMessage({
                message: "Registro cadastrado com sucesso!",
                type: "success",
              });
          console.log(response);
        })
        .catch(function (error) {
            showMessage({
                message: "Algum erro aconteceu!",
                type: "info",
              });
          console.log(error);
        });
    }

     function excluirDados(){
         axios.delete('http://professornilson.com/testeservico/clientes/'+getId
        )
        .then(function (response) {
            setNome('')
            setTelefone('')
            setCpf('')
            showMessage({
                message: "Registro excluído com sucesso!",
                type: "success",
              });
          console.log(response);
        })
        .catch(function (error) {
            showMessage({
                message: "Algum erro aconteceu!",
                type: "info",
              });
            console.log(error);
        });
    }

    async function alterarDados(){
        await axios.put('http://professornilson.com/testeservico/clientes/'+getId,{
         nome:getNome,
         cpf:getCpf,
         telefone:getTelefone,  
        }
        )
        .then(function (response) {
            showMessage({
                message: "Registro alterado com sucesso!",
                type: "success",
              });
          console.log(response);
        })
        .catch(function (error) {
            showMessage({
                message: "Algum erro aconteceu!",
                type: "info",
              });
            console.log(error);
        });
    }

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          
            <Header
        leftComponent={
            <Button  
            title="< Voltar"
            onPress={()=>navigation.navigate('Home')}
            ></Button>}
            centerComponent={{ text: 'Cadastro de Clientes', style: { color: '#fff' } }}
        
        />
 <FlashMessage position="top" /> 
            <ScrollView >

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
            linearGradientProps={{
              colors: ['red','red', 'red'],
              }}
            style={styles.botao}
            onPress={() => excluirDados()}
            /> 
            ):null} 

             
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