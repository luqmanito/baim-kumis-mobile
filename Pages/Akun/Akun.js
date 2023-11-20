import React, {useState} from 'react';
import {
  HStack,
  Input,
  Modal,
  FormControl,
  Button,
  Image,
  Stack,
  Center,
  Text,
  VStack,
  View,
  Heading,
} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import profilePict from '../../Public/Assets/prof-pic.jpeg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const AkunScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);

  const changePassword = () => {
    setOldPassword(true);
  };

  const submitPassword = () => {
    setModalVisible(false);
    setOldPassword(false);
  };

  const handleNavigation = value => {
    if (value === 'exit') {
      navigation.navigate('HomeScreen');
    } else if (value === 'edit') {
      navigation.navigate('EditProfileScreen');
    }
  };

  return (
    <>
      <View style={styles.header} />
      <Center>
        <Text
          position={'absolute'}
          top="-80"
          color={'#FFF000'}
          bold={20}
          fontSize={30}>
          E-RUTILAHU
        </Text>
      </Center>
      <Center mt={5}>
        <Heading color={'#4D4444'}>Akun</Heading>
      </Center>

      <Stack
        // bg={'darkBlue.700'}
        p={7}
        direction="row"
        mb="2.5"
        mt="1.5"
        space={12}>
        <TouchableOpacity onPress={() => handleNavigation('edit')}>
          <View
            marginRight={25}
            // mt={-2}
            justifyContent="center"
            alignItems={'center'}>
            <AntDesign name="edit" size={40} color="#4D4444" />
            {/* <Icon as={Ionicons} color={'#FFF000'} name="create" size="5xl" /> */}
            <Text color={'black'}>Edit</Text>
          </View>
        </TouchableOpacity>
        <View
          marginRight={-7}
          // bg={'amber.600'}
          justifyContent="flex-end"
          alignItems={'flex-end'}>
          <Text color={'black'}>Shindu Viraj</Text>
          <Text color={'black'}>Account Representative</Text>
          <Text color={'black'}>Kecamatan Regol</Text>
        </View>
        <Center
          // bg={'amber.300'}
          size="16"
          _text={{
            color: 'warmGray.50',
            fontWeight: 'medium',
          }}>
          <Image source={profilePict} style={styles.image} alt="logo-pemkab" />
        </Center>
      </Stack>

      <View p={3}>
        <Center>
          <Stack borderRadius={10} p={4} bg="#D9D9D9" w={370} space={3}>
            <HStack space={3}>
              <VStack flex={2}>
                <Text bold>Nama Lengkap</Text>
                <Text bold>Domisili</Text>
                <Text bold>Alamat Email</Text>
                <Text bold>Jabatan</Text>
              </VStack>
              <VStack flex={2}>
                <Text bold>: Ernawati Sri Rahayu</Text>
                <Text bold>: Kecamatan Regol</Text>
                <Text bold>: ernawati@mail.com</Text>
                <Text bold>: Officer</Text>
              </VStack>
            </HStack>
          </Stack>

          <Button
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            mt={7}
            w={250}
            bg={'#6FB6F9'}
            borderRadius={15}
            leftIcon={
              <MaterialCommunityIcons
                name="key-change"
                size={30}
                color="white"
              />
            }>
            <Text fontSize={20} color="white">
              Ubah Password
            </Text>
          </Button>
          <Button
            onPress={() => handleNavigation('exit')}
            mt={7}
            w={250}
            bg={'#DA3838'}
            borderRadius={15}
            leftIcon={
              <MaterialCommunityIcons name="logout" size={30} color="white" />
            }>
            <Text fontSize={20} color="white">
              Keluar
            </Text>
          </Button>
        </Center>
      </View>

      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        // justifyContent="flex-end"
        bottom="4"
        size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Ubah Password?</Modal.Header>
          {oldPassword === false ? (
            <Modal.Body>
              Masukan Password Lama Anda.
              <FormControl mt="3">
                <FormControl.Label>Password Lama</FormControl.Label>
                <Input avoidKeyboard />
              </FormControl>
            </Modal.Body>
          ) : (
            <Modal.Body>
              Masukan Password Baru Anda.
              <FormControl mt="3">
                <FormControl.Label>Password Baru</FormControl.Label>
                <Input avoidKeyboard placeholder="password baru" />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Konfirmasi Password Baru</FormControl.Label>
                <Input placeholder="konfirmasi password baru" />
              </FormControl>
            </Modal.Body>
          )}
          <Modal.Footer>
            <Button
              flex="1"
              onPress={oldPassword === false ? changePassword : submitPassword}>
              {oldPassword === false ? 'Lanjut' : 'Konfirmasi'}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
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
