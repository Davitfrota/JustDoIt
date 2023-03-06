import { StatusBar } from 'expo-status-bar';
import React , {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  StyleSheet, Text, View, ImageBackground, TouchableOpacity,TouchableHighlight ,Modal ,ScrollView, TextInput, Alert} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useFonts, Lato_400Regular_Italic } from '@expo-google-fonts/lato'; 
import {LogBox} from 'react-native';
import ConfirmationPopup from './components/ConfirmationPopup';


console.disableYellowBox = true;

export default function App() {


  const image = require('./assets/background3.png');
  const [modal,setModal] = useState(false); 
  const [comfirm,setComfirm] = useState(false); 
  const [NewTask,setNewTask] = useState('');
  const [tasks, setTask] = useState([]);
  console.disableYellowBox = true;
  LogBox.ignoreAllLogs();



  let [fontsLoaded] = useFonts({
    Lato_400Regular_Italic,
  });


  useEffect(()=>{
    //alert('app carregado...');
    
    (async () => {
      try {
        let NewsTasks = await AsyncStorage.getItem('tasks');
        if(NewsTasks == null)
          setTask([]);
        else
          setTask(JSON.parse(NewsTasks));
      } catch (error) {
        // Error saving data
      }
    })();
    
},[]);

  if (!fontsLoaded) {
    return null;
  }

    function DelTask(id) {
      
      let newsTask= tasks.filter(function(val){
        return val.id != id;
      });
      setTask(newsTask);

      (async () => {
        try {
          await AsyncStorage.setItem('tasks', JSON.stringify(newsTask));
          //console.log('chamado');
        } catch (error) {
          // Error saving data
        }
      })();
    }

    function AddTask(){

      setModal(!modal)

      let id = 0;
      if(tasks.length > 0){
        id = tasks[tasks.length-1].id + 1;
      }

      let task = {
        id: id,
        description: NewTask
      }

      setTask([...tasks,task]);

      (async () => {
        try {
          await AsyncStorage.setItem('tasks', JSON.stringify([...tasks,task]));
          //console.log('chamado');
        } catch (error) {
          // Error saving data
        }
      })();
      
    }

    function Confirm(id, title, description) {  
    
      {(
        Alert.alert( 
          title,
          description,
          [
            {text: 'Cancel',style: 'cancel'},
            {text: 'Confirm', onPress:() => DelTask(id)}
          ]
        )
      )}
  }  

    function DaCerto(){
      return(
      <Modal
      animationType="slide"
      transparent={true}
      visible={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{alignItems:'flex-end'}}>
            <TouchableOpacity  onPress={() => setModal(false)}><AntDesign name="close" size={24} color="black" /></TouchableOpacity>
          </View>

            <TextInput style={styles.inputText} onChangeText={text => setNewTask(text)} multiline placeholder="Escreva sua tarefa aqui..." ></TextInput>
          
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => AddTask()}
          >
            <Text style={styles.textStyle}>Add Tasks</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>)

    }


  return (
    <ScrollView style={{flex:1 ,backgroundColor:'#a9a656'}}>
      <StatusBar hidden/>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignItems:'flex-end'}}>
              <TouchableOpacity  onPress={() => setModal(false)}><AntDesign name="close" size={24} color="black" /></TouchableOpacity>
            </View>

              <TextInput style={styles.inputText} onChangeText={text => setNewTask(text)} multiline placeholder="Escreva sua tarefa aqui..." ></TextInput>
            
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => AddTask()}
            >
              <Text style={styles.textStyle}>Add Task</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

        
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.coverView}>
            <Text style={styles.textHeader}>To-do list</Text>
          </View>
        </ImageBackground>
      <View style = {{paddingHorizontal:10}}>
      {
        tasks.map(function(task) {
          return(<View style={styles.taskSingle}>

            <View style={{flex:1, padding:10}}>
              <Text >{task.description}</Text>
            </View>

            <View style={{flex:0, alignItems: 'flex-end', padding:10}}>
                <TouchableOpacity onPress={() => Confirm(task.id, 'Confirm','Are you sure that want delete this task',)}><AntDesign name="minus" size={24} color="black" /></TouchableOpacity>
            </View>

        </View>);
        
        })
      }
      </View>

        <View styles={styles.taskSingle}>
          <TouchableOpacity style={{flex:1 , alignItems: 'flex-end'}} onPress={() => setModal(true)}>
            <Entypo name="plus" size={24} color="black" />
          </TouchableOpacity>

          {
            (tasks.length > 5)
             ?
              <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => setTask([])}
              >
              <Text style={styles.textStyle}>Clear up all</Text>
              </TouchableHighlight>
              :
              <View></View>
          }
         
        </View>
     

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'conver',
  },
  coverView: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(0, 0,0,0.5)'
  },
  textHeader: {
    color: 'white',
    textAlign: 'center',
    fontSize: 36,
    marginTop: 20,
    fontFamily: 'Lato_400Regular_Italic'
  },
  textTask: {
    color: 'Black',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Lato_400Regular_Italic'
  },
  taskSingle: {
    marginTop: 20,
    width: '100%',
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 25,
    flexDirection: 'row',
    padding: 5

  },
  //Estilos para nossa modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex:5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    margin: 20,
    elevation: 2,
    marginTop:10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  inputText:{
    marginTop:15,
    marginHorizontal: 40,
    borderBottomColor: "salmon",
    borderBottomWidth:1,

  }
});
