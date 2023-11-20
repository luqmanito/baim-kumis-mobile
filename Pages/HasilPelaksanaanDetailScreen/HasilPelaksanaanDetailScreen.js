import React, {useState} from 'react';
import {
  HStack,
  Input,
  Image,
  Button,
  Box,
  FormControl,
  Center,
  Badge,
  AlertDialog,
  VStack,
} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';
import RupiahFormatter from '../../Components/RupiahFormat/RupiahFormat.js';
import {HeaderComponent} from '../../Components/Header/Header';
import {useSelector} from 'react-redux';
import noImage from '../../Public/Assets/no-Image.jpg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const HasilPelaksanaanDetailScreen = ({navigation}) => {
  const dataDetail = useSelector(
    state => state.hasilPelaksanaan?.hasilPelaksanaan,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [msgTitle, setMsgTitle] = useState('');
  const [fotoHasil, setFotoHasil] = useState('');
  const [price, setPrice] = useState(RupiahFormatter(50000));
  const [isLoading, setIsLoading] = useState([]);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const propsHeader = {
    navigation: 'HasilPelaksanaanScreen',
    onMainList: true,
    title: 'Detail Hasil Pelaksanaan',
  };
  const handleAction = value => {
    if (value === 'sebelum') {
      setIsOpen(!isOpen);
      setMsgTitle('Foto Hunian Sebelum');
      setFotoHasil('http://128.199.207.49/' + dataDetail?.foto_hunian);
    } else if (value === 'sesudah') {
      setIsOpen(!isOpen);
      setMsgTitle('Foto Hunian Sesudah');
      setFotoHasil('http://128.199.207.49/' + dataDetail?.foto_rumah);
    } else if (value === 'mck-sebelum') {
      setIsOpen(!isOpen);
      setMsgTitle('Foto MCK Sebelum');
      setFotoHasil('http://128.199.207.49/' + dataDetail?.kondisi_mck);
    } else if (value === 'mck-sesudah') {
      setIsOpen(!isOpen);
      setMsgTitle('Foto MCK Sesudah');
      setFotoHasil('http://128.199.207.49/' + dataDetail?.foto_mck);
    }
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
                <Input
                  editable={false}
                  value={dataDetail?.no_kk_pemilik}
                  variant="rounded"
                />
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
              editable={false}
              variant="rounded"
              value={dataDetail?.nama_pemilik}
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Sumber Dana</FormControl.Label>
            <Input
              editable={false}
              variant="rounded"
              value={dataDetail?.nama}
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Tahun</FormControl.Label>
            <Input
              editable={false}
              variant="rounded"
              value={dataDetail?.rencana_tahun_penanganan}
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Nominal</FormControl.Label>
            <Input
              editable={false}
              variant="rounded"
              value={RupiahFormatter(dataDetail?.nominal)}
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Foto Hunian Sebelum</FormControl.Label>
            <Button
              leftIcon={<FontAwesome name="photo" size={20} color="white" />}
              onPress={() => handleAction('sebelum')}>
              Lihat Foto
            </Button>
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Foto Hunian Sesudah</FormControl.Label>
            <Button
              leftIcon={<FontAwesome name="photo" size={20} color="white" />}
              onPress={() => handleAction('sesudah')}>
              Lihat Foto
            </Button>
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Foto MCK Sebelum</FormControl.Label>
            <Button
              leftIcon={<FontAwesome name="photo" size={20} color="white" />}
              onPress={() => handleAction('mck-sebelum')}>
              Lihat Foto
            </Button>
          </FormControl>

          <FormControl mt={3} mb={3} w="100%" maxW="350px">
            <FormControl.Label>Foto MCK Sesudah</FormControl.Label>
            <Button
              leftIcon={<FontAwesome name="photo" size={20} color="white" />}
              onPress={() => handleAction('mck-sesudah')}>
              Lihat Foto
            </Button>
          </FormControl>
        </Box>
      </ScrollView>
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          motionPreset={'fade'}>
          <AlertDialog.Content>
            <AlertDialog.Header fontSize="lg" fontWeight="bold">
              {msgTitle}
            </AlertDialog.Header>
            <Center>
              <AlertDialog.Body>
                <Image
                  source={{uri: fotoHasil}}
                  style={styles.image}
                  alt="logo-pemkab"
                  fallbackSource={noImage}
                />
              </AlertDialog.Body>
            </Center>

            <AlertDialog.Footer>
              <Button colorScheme="red" onPress={onClose} ml={3}>
                Tutup
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 350,
  },
});
