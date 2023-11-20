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
  Badge,
  Center,
  Text,
  VStack,
  View,
} from 'native-base';
import {ScrollView} from 'react-native';
import {HeaderComponent} from '../../Components/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const EditDaftarTungguScreen = ({navigation}) => {
  const [service, setService] = useState('ux');

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const handleNavigation = value => {
    if (value === 'detail') {
      navigation.navigate('DaftarTungguDetailScreen');
    } else if (value === 'back') {
      navigation.navigate('DaftarTungguScreen');
    }
  };

  const propsHeader = {
    navigation: 'DaftarTungguScreen',
    onMainList: true,
    title: 'Ubah Daftar Tunggu',
  };

  return (
    <>
      <HeaderComponent header={propsHeader} />

      <ScrollView>
        <HStack mt={4} space={3}>
          <VStack flex={4}>
            <Box alignItems="center">
              <FormControl
                // isInvalid
                pl={5}
                w="100%"
                maxW="320px">
                <FormControl.Label>Nomor Kartu Keluarga</FormControl.Label>
                <Input variant="rounded" value="3234682230234238" />
              </FormControl>
            </Box>
          </VStack>
          <VStack
            // w={20}
            justifyContent={'center'}
            alignItems={'center'}
            mt={6}
            // bg={'red.500'}
            flex={1}>
            <Badge
              colorScheme="success"
              alignSelf="flex-start"
              variant={'solid'}>
              Verified
            </Badge>
          </VStack>
        </HStack>

        <Box pl={5} mt={5}>
          <FormControl w="100%" maxW="350px">
            <FormControl.Label>Nama Pemilik</FormControl.Label>
            <Input
              variant="rounded"
              value={'Sukirman'}
              placeholder="Masukan nama pemilik"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Diusulkan Kepada</FormControl.Label>
            <Input
              variant="rounded"
              value={'DPRKPLH'}
              placeholder="Masukan tgl lahir"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Verifikator</FormControl.Label>
            <Input
              variant="rounded"
              value={'Dinas Sosial'}
              placeholder="Masukan email"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Status Verifikasi</FormControl.Label>
            <Select
              variant="rounded"
              selectedValue={service}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Pilih Status"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setService(itemValue)}>
              <Select.Item label="Pending" value="ux" />
              <Select.Item label="Approved" value="web" />
            </Select>
          </FormControl>

          <FormControl mt={3} mb={3} w="100%" maxW="350px">
            <FormControl.Label>Pesan</FormControl.Label>
            <Input variant="rounded" value={'-'} placeholder="Masukan pesan" />
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
              Konfirmasi Simpan
            </AlertDialog.Header>
            <AlertDialog.Body>
              Pastikan Data yang Diisi Telah Benar ?
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
