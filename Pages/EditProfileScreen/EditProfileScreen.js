import React, {useState} from 'react';
import {
  HStack,
  Input,
  Box,
  FormControl,
  Heading,
  Button,
  Center,
  Text,
  VStack,
  View,
  Flex,
} from 'native-base';
import {StyleSheet, ScrollView, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const EditProfileScreen = ({navigation}) => {
  // const [service, setService] = useState('');
  // const [textAreaValue, setTextAreaValue] = useState(
  //   'Masukan alamat rumah saat ini',
  // );

  const uploadPhoto = () => {
    navigation.navigate('AddUsulanScreen');
  };
  const submitConfirm = () => {
    navigation.navigate('AkunScreen');
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
        <Heading mt={5} color={'#4D4444'}>
          Edit Akun
        </Heading>
      </Center>

      <ScrollView>
        <Box pl={5} mt={5}>
          <FormControl w="100%" maxW="350px">
            <FormControl.Label>Nama Lengkap</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan nama Anda" />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Domisili</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan domisili kecamatan" />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Jabatan</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan jabatan Anda" />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Unggah Foto Akun</FormControl.Label>
            <HStack mt={2} space={3}>
              <VStack paddingLeft={2} alignItems={'flex-end'} flex={1}>
                <Flex>
                  <Ionicons
                    onPress={() => uploadPhoto()}
                    name="add-circle"
                    size={45}
                    color="#6FB6F9"
                  />
                </Flex>
              </VStack>
              <VStack
                // justifyContent="center"
                alignItems="flex-start"
                // bg={'red.500'}
                flex={3}>
                <Text bold>Pastikan Foto berukuran Maks 200Kb</Text>
                <Text>Foto_akun.png</Text>
              </VStack>
            </HStack>
          </FormControl>
        </Box>
        <Center>
          <Button
            onPress={submitConfirm}
            mt={7}
            mb={5}
            size={'md'}
            w={200}
            bg={'#097A5E'}
            borderRadius={10}
            leftIcon={<Ionicons name="save-outline" size={20} color="white" />}>
            <Text fontSize={'md'} color="white">
              Simpan
            </Text>
          </Button>
        </Center>
      </ScrollView>
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
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
