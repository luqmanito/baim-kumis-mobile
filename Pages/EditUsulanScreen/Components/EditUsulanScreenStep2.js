import React, {useState} from 'react';
import {
  HStack,
  Input,
  Box,
  Radio,
  CheckIcon,
  FormControl,
  Select,
  Button,
  AlertDialog,
  Stack,
  Center,
  Text,
  VStack,
  Flex,
} from 'native-base';
import {ScrollView} from 'react-native';
import {HeaderComponent} from '../../../Components/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const EditUsulanScreenStep2 = ({navigation}) => {
  const [service, setService] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const handleNavigation = value => {
    if (value === 'upload') {
      navigation.navigate('AddUsulanScreen');
    } else if (value === 'next') {
      navigation.navigate('EditUsulanScreenStep3');
    }
  };

  const propsHeader = {
    navigation: 'EditUsulanScreen',
    onMainList: true,
    title: 'Edit Usulan',
  };

  return (
    <>
      <HeaderComponent header={propsHeader} />
      <ScrollView>
        <Box pl={5} mt={5}>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Unggah Foto Pemilik</FormControl.Label>
            <HStack mt={2} space={3}>
              <VStack paddingLeft={2} alignItems={'flex-end'} flex={1}>
                <Flex>
                  <Ionicons
                    onPress={() => handleNavigation('upload')}
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
                <Text>Foto_rumah.png</Text>
              </VStack>
            </HStack>
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Diusulkan Kepada</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan tujuan usulan" />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>
              Luas Tanah M<Text fontSize={10}>²</Text>
            </FormControl.Label>
            <Input variant="rounded" placeholder="Masukan luas tanah" />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Luas Bangunan Per Kapita</FormControl.Label>
            <Input variant="rounded" placeholder="Masukan email" />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Status Kepemilikan</FormControl.Label>
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
              <Select.Item label="Sertifikat Hak Milik " value="ux" />
              <Select.Item label="Sertifikat Hak Guna Bangunan" value="web" />
              <Select.Item label="Sertifikat Hak Guna Usaha" value="cross" />
              <Select.Item label="Sertifikat Hak Pakai" value="ui" />
              <Select.Item
                label="Sertifikat Hak Atas Satuan Rumah Susun"
                value="backend"
              />
              <Select.Item label="Tanah Girik" value="backend" />
            </Select>
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>
              Luas Bangunan M<Text fontSize={10}>²</Text>
            </FormControl.Label>
            <Input variant="rounded" placeholder="Masukan luas bangunan" />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Tersedia Listrik</FormControl.Label>
            <Radio.Group
              name="exampleGroup"
              defaultValue="1"
              accessibilityLabel="pick a size">
              <Stack
                direction={'row'}
                alignItems={{
                  base: 'flex-start',
                  md: 'center',
                }}
                space={4}
                w="75%"
                maxW="300px">
                <Radio value="1" size="sm" my={1}>
                  Ya
                </Radio>
                <Radio value="2" size="sm" my={1}>
                  Tidak
                </Radio>
              </Stack>
            </Radio.Group>
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Memiliki Septic Tank</FormControl.Label>
            <Radio.Group
              name="exampleGroup"
              defaultValue="1"
              accessibilityLabel="pick a size">
              <Stack
                direction={'row'}
                alignItems={{
                  base: 'flex-start',
                  md: 'center',
                }}
                space={4}
                w="75%"
                maxW="300px">
                <Radio value="1" size="sm" my={1}>
                  Ya
                </Radio>
                <Radio value="2" size="sm" my={1}>
                  Tidak
                </Radio>
              </Stack>
            </Radio.Group>
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>
              Memiliki Izin Mendirikan Bangunan (IMB){' '}
            </FormControl.Label>
            <Radio.Group
              name="exampleGroup"
              defaultValue="1"
              accessibilityLabel="pick a size">
              <Stack
                direction={'row'}
                alignItems={{
                  base: 'flex-start',
                  md: 'center',
                }}
                space={4}
                w="75%"
                maxW="300px">
                <Radio value="1" size="sm" my={1}>
                  Ya
                </Radio>
                <Radio value="2" size="sm" my={1}>
                  Tidak
                </Radio>
              </Stack>
            </Radio.Group>
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
