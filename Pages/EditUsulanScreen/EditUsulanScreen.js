import React, {useState} from 'react';
import {
  HStack,
  Input,
  Box,
  CheckIcon,
  FormControl,
  Select,
  Button,
  AlertDialog,
  Center,
  Text,
  VStack,
} from 'native-base';
import {ScrollView} from 'react-native';
import {HeaderComponent} from '../../Components/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const EditUsulanScreen = ({navigation}) => {
  const [service, setService] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const handleNavigation = value => {
    if (value === 'usulan') {
      navigation.navigate('AddUsulanScreen');
    } else if (value === 'daftar-tunggu') {
      navigation.navigate('AddUsulanScreen');
    } else if (value === 'next') {
      navigation.navigate('EditUsulanScreenStep2');
    }
  };

  const propsHeader = {
    navigation: 'UsulanScreen',
    onMainList: true,
    title: 'Edit Usulan',
  };

  return (
    <>
      <HeaderComponent header={propsHeader} />
      <ScrollView>
        <HStack mt={4} space={3}>
          <VStack flex={3}>
            <Box alignItems="center">
              <FormControl
                // isInvalid
                pl={5}
                w="100%"
                maxW="300px">
                <FormControl.Label>Nomor Kartu Keluarga</FormControl.Label>
                <Input variant="rounded" placeholder="Enter password" />
              </FormControl>
            </Box>
          </VStack>
          <Ionicons
            onPress={() => handleNavigation('upload')}
            name="checkmark"
            size={30}
            color="#6FB6F9"
          />
          {/* <Icon
            onPress={() => handleNavigation('upload')}
            as={Ionicons}
            color={'#6FB6F9'}
            name="checkmark"
            size="xl"
            mt={10}
          /> */}
          <VStack justifyContent="center" flex={1}>
            <Button
              onPress={() => handleNavigation('check')}
              // isLoading
              isLoadingText="Loading"
              w={'80%'}
              marginTop={7}
              small
              bg={'#6FB6F9'}>
              <Text color="white" fontSize={'lg'}>
                Cek
              </Text>
            </Button>
          </VStack>
        </HStack>

        <Box pl={5} mt={5}>
          <FormControl w="100%" maxW="350px">
            <FormControl.Label>Nama Pemilik</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan nama pemilik" />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Tanggal Lahir</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan tgl lahir" />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Alamat Email</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan email" />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Pendapatan Keluarga</FormControl.Label>
            <Select
              variant="rounded"
              selectedValue={service}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Pilih Rentang"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setService(itemValue)}>
              <Select.Item label="0 - 1 Juta" value="ux" />
              <Select.Item label="1 - 3 Juta" value="web" />
              <Select.Item label="3 - 5 Juta" value="cross" />
              <Select.Item label="5 - 10 Juta" value="ui" />
              <Select.Item label="10 juta keatas" value="backend" />
            </Select>
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>No KTP</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan no ktp" />
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>No Telepon</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan no telepon" />
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Jumlah Keluarga</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan jumlah keluarga" />
          </FormControl>
        </Box>
        <Center>
          <Button
            onPress={() => handleNavigation('next')}
            mt={7}
            mb={5}
            size={'md'}
            w={200}
            bg={'#097A5E'}
            borderRadius={10}
            leftIcon={
              <MaterialIcons name="navigate-next" size={20} color="white" />
            }>
            <Text fontSize={'md'} color="white">
              Selanjutnya
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
