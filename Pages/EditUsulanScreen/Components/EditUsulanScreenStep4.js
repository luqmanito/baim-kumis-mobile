import React, {useState} from 'react';
import {
  Input,
  Box,
  FormControl,
  Button,
  AlertDialog,
  Center,
  Text,
} from 'native-base';
import {ScrollView} from 'react-native';
import {HeaderComponent} from '../../../Components/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const EditUsulanScreenStep4 = ({navigation}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  // const handleNavigation = value => {
  //   if (value === 'usulan') {
  //     navigation.navigate('AddUsulanScreen');
  //   } else if (value === 'daftar-tunggu') {
  //     navigation.navigate('AddUsulanScreen');
  //   }
  // };

  const propsHeader = {
    navigation: 'EditUsulanScreenStep3',
    onMainList: true,
    title: 'Edit Usulan',
  };

  return (
    <>
      <HeaderComponent header={propsHeader} />
      <ScrollView>
        <Box pl={5} mt={5}>
          <FormControl w="100%" maxW="350px">
            <FormControl.Label>Kecamatan</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan kecamatan" />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Alamat</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan alamat" />
          </FormControl>
        </Box>
        <Center>
          <Button
            onPress={() => setIsOpen(!isOpen)}
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
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          motionPreset={'fade'}>
          <AlertDialog.Content>
            <AlertDialog.Header fontSize="lg" fontWeight="bold">
              Konfirmasi Submit
            </AlertDialog.Header>
            <AlertDialog.Body>
              Pastikan Seluruh Data Telah Terisi ?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button ref={cancelRef} onPress={onClose}>
                Batalkan
              </Button>
              <Button colorScheme="red" onPress={onClose} ml={3}>
                Lanjutkan
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </>
  );
};
