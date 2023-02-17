import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFonts, Lobster_900Black } from '@expo-google-fonts/lobster'; 

export default function App() {

  const image = require('./assets/background3.png');

  et [fontsLoaded] = useFonts({
    Lobster_900Black,
  });

  return (
    <View style={{flex:1}}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.coverView}>
          <Text style={styles.textHeader}>Lista de Afazeres</Text>
        </View>
      </ImageBackground>
      
    </View>
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
  },
});
