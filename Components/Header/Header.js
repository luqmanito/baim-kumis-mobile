import React from 'react';
import {Image, Stack, View, Center, Text, VStack} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import profilePict from '../../Public/Assets/prof-pic.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setActiveStep, clearState} from '../../redux/reducers/stepUsulan';
import {clearStateForm} from '../../redux/reducers/formSlice';
import {clearStateUpload} from '../../redux/reducers/isActiveUpload';

export const HeaderComponent = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const activeStep = useSelector(state => state.stepSlice?.activeStep);
  const handleNavigation = value => {
    if (value === 'usulan') {
      navigation.navigate('UsulanScreen');
    } else if (value === 'daftar-tunggu') {
      navigation.navigate('DaftarTungguScreen');
    } else if (value === 'hasil-pelaksanaan') {
      navigation.navigate('HasilPelaksanaanScreen');
    } else if (value === 'akun') {
      navigation.navigate('AkunScreen');
    } else if (value === 'back') {
      if (props?.header?.onStepList > 1) {
        dispatch(setActiveStep(activeStep - 1));
        if (props?.header?.onStepList === 3) {
          dispatch(clearStateUpload());
        }
      } else {
        // if (navigation.canGoBack()) {
        navigation.goBack();
        // }
        dispatch(clearState());
        dispatch(clearStateForm());
        // navigation.navigate(props?.header?.navigation);
      }
    }
  };

  return (
    <View>
      <View style={styles.header} />
      <Center>
        <Text
          position={'absolute'}
          top="-110"
          color={'#FFF000'}
          bold={20}
          fontSize={20}>
          BAIM KUMIS
        </Text>
        {props?.header?.onMainList ? (
          <Text
            position={'absolute'}
            top="-80"
            color={'#FFF000'}
            bold={20}
            fontSize={20}>
            {props?.header?.title}
          </Text>
        ) : null}
      </Center>

      {props?.header?.onMainList ? (
        <VStack space="2.5" position="absolute" mt="12" left={0} px="8">
          <Stack direction="row" mb="2.5" mt="1.5" space={12}>
            <TouchableOpacity onPress={() => handleNavigation('back')}>
              <View mt={-2} justifyContent="center" alignItems={'center'}>
                <Ionicons name="arrow-back" size={40} color="#FFF000" />
                <Text color={'white'}>Kembali</Text>
              </View>
            </TouchableOpacity>
          </Stack>
        </VStack>
      ) : (
        <VStack space="2.5" position="absolute" mt="12" right={0} px="8">
          <TouchableOpacity onPress={() => handleNavigation('akun')}>
            <Stack
              direction="row"
              mb="2.5"
              mt="1.5"
              space={props?.header?.space ? props?.header?.space : 3}>
              {props?.header?.navigation ? (
                <TouchableOpacity onPress={() => handleNavigation('back')}>
                  <View
                    marginRight={25}
                    mt={-2}
                    justifyContent="center"
                    alignItems={'center'}>
                    <Ionicons name="arrow-back" size={40} color="#FFF000" />
                    <Text color={'white'}>Kembali</Text>
                  </View>
                </TouchableOpacity>
              ) : null}
              {/* <View
                marginRight={
                  props?.header?.margin ? props?.header?.margin : null
                }
                justifyContent="flex-end"
                alignItems={'flex-end'}>
                <Text color={'white'}>Shindu Viraj</Text>
                <Text color={'white'}>Account Representative</Text>
                <Text color={'white'}>Kecamatan Regol</Text>
              </View> */}

              <Text mr={12} color={'white'}>
                Nama Pengguna
              </Text>

              <Center
                size="16"
                _text={{
                  color: 'warmGray.50',
                  fontWeight: 'medium',
                }}>
                {/* <Image
                  source={profilePict}
                  style={styles.image}
                  alt="logo-pemkab"
                /> */}
              </Center>
            </Stack>
          </TouchableOpacity>
        </VStack>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 128,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#A72185',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 71,
    height: 71,
    borderRadius: 35,
  },
});
