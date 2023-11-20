import React, {useState} from 'react';
import {
  HStack,
  Box,
  FormControl,
  Button,
  AlertDialog,
  Center,
  Text,
  VStack,
  Flex,
} from 'native-base';
import {ScrollView} from 'react-native';
import {HeaderComponent} from '../../../Components/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const EditUsulanScreenStep3 = ({navigation}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const handleNavigation = value => {
    if (value === 'usulan') {
      navigation.navigate('AddUsulanScreen');
    } else if (value === 'next') {
      navigation.navigate('EditUsulanScreenStep4');
    }
  };

  const propsHeader = {
    navigation: 'EditUsulanScreenStep2',
    onMainList: true,
    title: 'Edit Usulan',
  };

  return (
    <>
      <HeaderComponent header={propsHeader} />
      <ScrollView>
        <Box pl={5} mt={5}>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Unggah Foto Atap</FormControl.Label>
            <HStack mt={2} space={3}>
              <VStack paddingLeft={2} alignItems={'flex-end'} flex={1}>
                <Flex>
                  {/* <Icon
                    onPress={() => handleNavigation('upload')}
                    as={Ionicons}
                    color={'#6FB6F9'}
                    name="add-circle"
                    size="5xl"
                  /> */}
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
            <FormControl.Label>Unggah Foto Dinding</FormControl.Label>
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
            <FormControl.Label>Unggah Foto Lantai</FormControl.Label>
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
            <FormControl.Label>Unggah Foto Kamar Mandi</FormControl.Label>
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
            <FormControl.Label>Unggah Foto MCK</FormControl.Label>
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
            <FormControl.Label>Unggah Foto Sumber Air Minum</FormControl.Label>
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
