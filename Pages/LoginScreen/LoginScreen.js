import React, {useState} from 'react';
import {
  Box,
  WarningOutlineIcon,
  Image,
  Input,
  useToast,
  Button,
  Text,
  HStack,
  VStack,
  Stack,
  FormControl,
  Center,
  View,
} from 'native-base';
import {StyleSheet, Dimensions} from 'react-native';
import logoPemkab from '../../Public/Assets/logo-pemkab-ciamis.png';
import AuthNetwork from '../../network/lib/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');
export const LoginScreen = ({navigation}) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleChangePassword = text => setPassword(text);
  const handleChangeEmail = text => setEmail(text);
  const screenHeight = Dimensions.get('window').height;
  const toastAlert = value => {
    toast.show({
      placement: 'bottom',
      render: () => {
        return (
          <Box
            bg={
              value === 'blank'
                ? 'red.500'
                : value === 'User does not exist'
                ? 'red.500'
                : value === 'sukses'
                ? 'emerald.500'
                : 'red.500'
            }
            px="2"
            py="1"
            rounded="sm"
            mb={5}>
            <Text bold color={'white'}>
              {value === 'blank'
                ? 'Lengkapi email atau password terlebih dahulu'
                : value === 'User does not exist'
                ? 'User Tidak Terdaftar'
                : value === 'sukses'
                ? 'Login Sukses'
                : value === 'serverErr'
                ? 'Terjadi Kesalahan pada Server'
                : 'Password atau Email Salah'}
            </Text>
          </Box>
        );
      },
    });
  };

  const handleSubmit = async e => {
    // navigation.navigate('HomeScreen');
    if (email === '' || password === '') {
      toastAlert('blank');
    } else {
      setIsLoading(true);
      try {
        const response = await AuthNetwork.login({
          email: email,
          password: password,
        });
        if (response) {
          setIsLoading(false);
          navigation.navigate('Dashboard');
          toastAlert('sukses');
          await AsyncStorage.setItem('authToken', response?.token);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        const msg = error?.response?.data?.message;
        error?.response?.status >= 500
          ? toastAlert('serverErr')
          : toastAlert(msg);
      }
    }
  };

  return (
    <Center style={{height: screenHeight}}>
      <Image
        source={logoPemkab}
        style={styles.image}
        width={130}
        height={200}
        alt="logo-pemkab"
      />
      <Text marginTop={90} fontSize="md" bold>
        E-RUTILAHU
      </Text>
      <Text marginTop={4} fontSize="sm">
        Masuk dengan akun anda
      </Text>
      <Text fontSize="sm">untuk melanjutkan</Text>
      <Box w="73%" marginTop={5} alignItems="center">
        <FormControl isRequired>
          <Stack mx="4">
            <Input
              onChangeText={handleChangeEmail}
              type="text"
              placeholder="Email"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Silakan Isi Email Anda.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
      </Box>
      <Box w="73%" marginTop={5} alignItems="center">
        <FormControl isRequired>
          <Stack mx="4">
            <Input
              onChangeText={handleChangePassword}
              type="password"
              placeholder="Password"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
      </Box>
      <Button
        onPress={handleSubmit}
        isLoading={isLoading ? true : false}
        isLoadingText="Loading"
        w={'60%'}
        marginTop={5}
        small
        bg={'#A72185'}>
        <Text color="white">
          {' '}
          <AntDesignIcon name="login" size={15} color="white" /> Masuk
        </Text>
      </Button>
      <Text style={styles.text}>Dinas Perumahan dan Pemukiman</Text>
      <Text style={styles.textCiamis}>Kabupaten Ciamis</Text>
    </Center>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 10,
  },
  circleButton: {
    marginTop: -150,
    width: 427,
    height: 437,
    borderRadius: 230,
    backgroundColor: '#A72185',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    bottom: 0,
    fontSize: 14,
    color: 'black',
    height: height * 0.13,
  },
  textCiamis: {
    position: 'absolute',
    bottom: 0,
    fontSize: 14,
    color: 'black',
    height: height * 0.1,
  },

  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  circleBottomButton: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#A72185',
    transform: [{scaleX: 2}],
  },
});

// v3 version
