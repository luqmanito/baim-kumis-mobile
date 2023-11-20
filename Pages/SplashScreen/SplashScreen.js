import React, {useEffect} from 'react';
import {Button, Text, Image, View} from 'native-base';
import {StyleSheet, ImageBackground} from 'react-native';
import logoPemkab from '../../Public/Assets/logo-pemkab-ciamis.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SplashScreen = ({navigation}) => {
  // const checkTokenExists = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('authToken');
  //     return !!token; // Returns true if token exists, false otherwise
  //   } catch (error) {
  //     console.log('Error reading token from AsyncStorage:', error);
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('LoginScreen');
  //   }, 5000);
  //   // Check if token exists
  //   // const checkToken = async () => {
  //   //   const tokenExists = await checkTokenExists();
  //   //   if (tokenExists) {
  //   //     setTimeout(() => {
  //   //       navigation.navigate('HomeScreen');
  //   //     }, 5000);
  //   //     console.log('Token exists');
  //   //   } else {
  //   //     navigation.navigate('LoginScreen');
  //   //     console.log('Token does not exist');
  //   //   }
  //   // };

  //   // checkToken();
  // }, [navigation]);

  return (
    // <View>
    //   <Button varaint="outline" onPress={onPressLogin}>
    //     Navigate to Login Screen
    //   </Button>
    //   <Text>Login Screen</Text>
    // </View>
    <ImageBackground
      // source={logoPemkab}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.logoContainer}>
        {/* Your logo image component goes here */}
        <Image source={logoPemkab} alt={'logo-pemkab'} style={styles.logo} />
      </View>
      <Text mt={4} fontSize={'lg'} bold color={'white'}>
        Dinas Perumahan dan Pemukiman
      </Text>
      <Text fontSize={'lg'} bold color={'white'}>
        Kabupaten Ciamis
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#A72185',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
