import React, {useEffect, useState} from 'react';
import {
  Button,
  HStack,
  Center,
  Box,
  Card,
  Skeleton,
  VStack,
  Divider,
  Text,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {View, Alert, BackHandler, StyleSheet} from 'react-native';
import {HeaderComponent} from '../../Components/Header/Header.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UsulanScreen} from '../../Pages/UsulanScreen/UsulanScreen';
import {DaftarTungguScreen} from '../../Pages/DaftarTungguScreen/DaftarTungguScreen';
import {HasilPelaksanaanScreen} from '../../Pages/HasilPelaksanaanScreen/HasilPelaksanaanScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CardComponent} from '../../Components/Cards/Card.js';

export const HomeScreen = ({navigation}) => {
  const handleNavigation = value => {
    if (value === 'usulan') {
      navigation.navigate('UsulanScreen');
    } else if (value === 'daftar-tunggu') {
      navigation.navigate('DaftarTungguScreen');
    } else if (value === 'hasil-pelaksanaan') {
      navigation.navigate('HasilPelaksanaanScreen');
    } else if (value === 'akun') {
      navigation.navigate('AkunScreen');
    } else if (value === 'logout') {
      navigation.navigate('LoginScreen');
    }
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabSelect = index => {
    setSelectedIndex(index);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        exitAction();
        return true; // Return true to prevent going back
        // You can also show a custom message or perform any other actions here
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove(); // Clean up the event listener on screen unmount
    }, []),
  );

  const exitAction = () => {
    Alert.alert(
      'Keluar Aplikasi ?',
      'Apakah Anda yakin keluar dari aplikasi?',
      [
        {
          text: 'Tidak',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Ya', onPress: () => removeItemFromStorage()},
      ],
    );
    return true;
  };

  const removeItemFromStorage = async key => {
    try {
      handleNavigation('logout');
      await AsyncStorage.removeItem('authToken');
      BackHandler.exitApp();
    } catch (error) {
      console.log('Error removing item from AsyncStorage:', error);
    }
  };
  const Tab = createBottomTabNavigator();
  const dashboard = [
    {
      id: 1,
      title: 'Jumlah Penghuni',
      jumlah: 225,
    },
    {
      id: 2,
      title: 'Jumlah Hunian',
      jumlah: 25,
    },
    {
      id: 3,
      title: 'Tidak Layak Huni',
      jumlah: 50,
    },
    {
      id: 4,
      title: 'Total Kawasan Kumuh',
      jumlah: 22,
    },
    {
      id: 5,
      title: 'Luas Wilayah Kumuh',
      jumlah: 52,
    },
    {
      id: 6,
      title: 'Kawasan Rawan Bencana',
      jumlah: 25,
    },
  ];

  return (
    <>
      <View>
        <HeaderComponent />
        {/* <Center mt={50}>
        <Button
          onPress={() => handleNavigation('usulan')}
          w={300}
          bg={'#FFF000'}
          borderRadius={15}
          leftIcon={
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={40}
              color="#097A5E"
            />
          }>
          <Text fontSize={25} color="#4D4444">
            Usulan
          </Text>
        </Button>

        <Button
          onPress={() => handleNavigation('daftar-tunggu')}
          mt={7}
          w={300}
          bg={'#FFF000'}
          borderRadius={15}
          leftIcon={
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              size={40}
              color="#097A5E"
            />
          }>
          <Text fontSize={25} color="#4D4444">
            Daftar Tunggu
          </Text>
        </Button>

        <Button
          onPress={() => handleNavigation('hasil-pelaksanaan')}
          mt={7}
          w={300}
          bg={'#FFF000'}
          borderRadius={15}
          leftIcon={<Octicons name="checklist" size={40} color="#097A5E" />}>
          <Text fontSize={25} color="#4D4444">
            Hasil Pelaksanaan
          </Text>
        </Button>

        <Button
          onPress={() => exitAction()}
          mt={7}
          w={250}
          bg={'#DA3838'}
          borderRadius={15}
          leftIcon={<Ionicons name="exit-outline" size={40} color="white" />}>
          <Text fontSize={25} color="white">
            Keluar
          </Text>
        </Button>

        <Text mt={10}>Dinas Perumahan dan Pemukiman</Text>
        <Text>Kabupaten Ciamis</Text>
      </Center> */}
        <Center>
          {isLoading ? (
            <>
              <Skeleton mt={2} p={2} h="20" rounded="full" w={300} />
              <Skeleton p={2} h="20" rounded="full" w={300} />
              <Skeleton p={2} h="20" rounded="full" w={300} />
              <Skeleton p={2} h="20" rounded="full" w={300} />
              <Skeleton p={2} h="20" rounded="full" w={300} />
              <Skeleton p={2} h="20" rounded="full" w={300} />
            </>
          ) : (
            <VStack>
              {dashboard.map(item => {
                return (
                  <CardComponent
                    key={item?.id}
                    id={item?.id}
                    title={item?.title}
                    qty={`${item?.jumlah}`}
                  />
                );
              })}
            </VStack>
          )}
        </Center>
      </View>
    </>
  );
};
