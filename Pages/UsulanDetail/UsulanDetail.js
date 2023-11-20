import React, {useState, useEffect} from 'react';
import {
  HStack,
  Input,
  Box,
  Radio,
  CheckIcon,
  FormControl,
  Select,
  Badge,
  Button,
  AlertDialog,
  Image,
  Stack,
  Center,
  Text,
  VStack,
} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';
import noImage from '../../Public/Assets/no-Image.jpg';
import {HeaderComponent} from '../../Components/Header/Header';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import usulanNetwork from '../../network/lib/usulan';
import DropDownPicker from 'react-native-dropdown-picker';

export const UsulanDetailScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msgTitle, setMsgTitle] = useState('');
  const [sumberDana, setSumberDana] = useState([]);
  const [statusMilik, setStatusMilik] = useState([]);
  const [fotoUsulan, setFotoUsulan] = useState('');
  const [isLoading, setIsLoading] = useState([]);
  const [pendapatanDropdown, setPendapatanDropdown] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const dataDetail = useSelector(state => state.usulanSlice?.usulan);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const handleAction = value => {
    if (value === 'atap') {
      setIsOpen(!isOpen);
      setMsgTitle('Foto Atap');
      setFotoUsulan(
        'http://128.199.207.49/' + dataDetail?.hunian?.kondisi_atap,
      );
    } else if (value === 'pemilik') {
      setIsOpen(!isOpen);
      setMsgTitle('Foto Pemilik');
      setFotoUsulan(
        'http://128.199.207.49/' + dataDetail?.hunian?.foto_pemilik,
      );
    } else if (value === 'dinding') {
      setIsOpen(!isOpen);
      setMsgTitle('Foto Dinding');
      setFotoUsulan(
        'http://128.199.207.49/' + dataDetail?.hunian?.kondisi_dinding,
      );
    } else if (value === 'lantai') {
      setIsOpen(!isOpen);
      setMsgTitle('Foto Lantai');
      setFotoUsulan(
        'http://128.199.207.49/' + dataDetail?.hunian?.kondisi_lantai,
      );
    } else if (value === 'mandi') {
      setIsOpen(!isOpen);
      setMsgTitle('Foto Kamar Mandi');
      setFotoUsulan(
        'http://128.199.207.49/' + dataDetail?.hunian?.kondisi_kamar_mandi,
      );
    } else if (value === 'mck') {
      setIsOpen(!isOpen);
      setMsgTitle('Foto MCK');
      setFotoUsulan('http://128.199.207.49/' + dataDetail?.hunian?.kondisi_mck);
    } else if (value === 'minum') {
      setIsOpen(!isOpen);
      setMsgTitle('Foto Sumber Air Minum');
      setFotoUsulan(
        'http://128.199.207.49/' + dataDetail?.hunian?.kondisi_sumber_air_minum,
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await usulanNetwork.usulanDropdown();
        if (response) {
          setSumberDana(response?.sumber_dana);
          setStatusMilik(response?.status_kepemilikan);
          setPendapatanDropdown(response?.pendapatan_keluarga);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    const fetchDataDesa = async () => {
      setIsLoading(true);
      try {
        const response = await usulanNetwork.listDesa({
          search: '',
          page: '',
          length: 256,
        });
        if (response) {
          const sortedData = response?.data.sort((a, b) =>
            a.nama.localeCompare(b.nama),
          );
          setItems(
            sortedData.map(item => {
              return {label: item?.nama, value: item?.id, key: item?.id};
            }),
          );

          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchDataDesa();
    fetchData();
  }, []);

  const propsHeader = {
    // navigation: 'UsulanScreen',
    onMainList: true,
    title: 'Detail Usulan',
  };

  return (
    <>
      <HeaderComponent header={propsHeader} />
      <ScrollView>
        <HStack mt={4} space={3}>
          <VStack flex={4}>
            <Box alignItems="center">
              <FormControl pl={5} w="100%" maxW="320px">
                <FormControl.Label>Nomor Kartu Keluarga</FormControl.Label>
                <Input
                  editable={false}
                  variant="rounded"
                  value={dataDetail?.hunian?.no_kk_pemilik}
                />
              </FormControl>
            </Box>
          </VStack>
          <VStack
            justifyContent={'center'}
            alignItems={'center'}
            mt={6}
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
              value={dataDetail?.hunian?.nama_pemilik}
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Tanggal Lahir</FormControl.Label>
            <Input
              editable={false}
              value={dataDetail?.hunian?.tanggal_lahir_pemilik}
              variant="rounded"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Alamat Email</FormControl.Label>
            <Input
              editable={false}
              value={dataDetail?.hunian?.email_pemilik}
              variant="rounded"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Pendapatan Keluarga</FormControl.Label>
            <Select
              variant="rounded"
              selectedValue={dataDetail?.hunian?.pendapatan_keluarga_id}
              minWidth="200"
              accessibilityLabel="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}>
              {pendapatanDropdown.map(item => {
                return (
                  <Select.Item
                    key={item?.id}
                    label={item?.nama}
                    value={item?.id}
                  />
                );
              })}
            </Select>
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>No KTP</FormControl.Label>
            <Input
              editable={false}
              value={dataDetail?.hunian?.nik_pemilik}
              variant="rounded"
            />
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>No Telepon</FormControl.Label>
            <Input
              editable={false}
              value={dataDetail?.hunian?.no_telepon_pemilik}
              variant="rounded"
            />
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Jumlah Keluarga</FormControl.Label>
            <Input
              editable={false}
              value={`${dataDetail?.hunian?.jumlah_keluarga} `}
              variant="rounded"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label> Foto Pemilik</FormControl.Label>
            <Button
              leftIcon={<FontAwesome name="photo" size={20} color="white" />}
              onPress={() => handleAction('pemilik')}>
              Lihat Foto
            </Button>
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Diusulkan Kepada</FormControl.Label>
            <Select
              variant="rounded"
              selectedValue={dataDetail?.sumber_dana_bantuan_id || ''}
              minWidth="200"
              accessibilityLabel="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}>
              {sumberDana.map(item => {
                return (
                  <Select.Item
                    key={item?.id}
                    label={item?.nama}
                    value={item?.id}
                  />
                );
              })}
            </Select>
          </FormControl>

          {/* <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Kecamatan</FormControl.Label>
            <Input
              editable={false}
              // value={`${dataDetail?.hunian?.jumlah_keluarga} `}
              variant="rounded"
            />
          </FormControl> */}
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Desa</FormControl.Label>
            <DropDownPicker
              open={open}
              value={dataDetail?.hunian?.desa_id}
              style={{
                backgroundColor: 'transparent',
              }}
              disabled={true}
              items={items}
              placeholder="kosong"
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Alamat</FormControl.Label>
            <Input
              editable={false}
              value={`${dataDetail?.hunian?.alamat_detail} `}
              variant="rounded"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>
              Luas Tanah M<Text fontSize={10}>²</Text>
            </FormControl.Label>
            <Input
              editable={false}
              value={`${dataDetail?.hunian?.luas_tanah} `}
              variant="rounded"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Luas Bangunan Per Kapita</FormControl.Label>
            <Input
              editable={false}
              value={`${dataDetail?.hunian?.luas_bangunan_perkapita} `}
              variant="rounded"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Status Kepemilikan</FormControl.Label>
            <Select
              variant="rounded"
              selectedValue={dataDetail?.hunian?.status_kepemilikan_id}
              minWidth="200"
              accessibilityLabel="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}>
              {statusMilik.map(item => {
                return (
                  <Select.Item
                    key={item?.id}
                    label={item?.nama}
                    value={item?.id}
                  />
                );
              })}
            </Select>
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>
              Luas Bangunan M<Text fontSize={10}>²</Text>
            </FormControl.Label>
            <Input
              editable={false}
              value={`${dataDetail?.hunian?.luas_bangunan} `}
              variant="rounded"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Tersedia Listrik</FormControl.Label>
            <Radio.Group
              name="exampleGroup"
              defaultValue={dataDetail?.hunian?.tersedia_listrik}
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
                <Radio isDisabled value="y" size="sm" my={1}>
                  Ya
                </Radio>
                <Radio isDisabled value="t" size="sm" my={1}>
                  Tidak
                </Radio>
              </Stack>
            </Radio.Group>
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Memiliki Septic Tank</FormControl.Label>
            <Radio.Group
              name="exampleGroup"
              defaultValue={dataDetail?.hunian?.septic_tank}
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
                <Radio isDisabled value="y" size="sm" my={1}>
                  Ya
                </Radio>
                <Radio isDisabled value="t" size="sm" my={1}>
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
              defaultValue={dataDetail?.hunian?.memiliki_imb}
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
                <Radio isDisabled value="y" size="sm" my={1}>
                  Ya
                </Radio>
                <Radio isDisabled value="t" size="sm" my={1}>
                  Tidak
                </Radio>
              </Stack>
            </Radio.Group>
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label> Foto Atap</FormControl.Label>

            <Button
              leftIcon={<FontAwesome name="photo" size={20} color="white" />}
              onPress={() => handleAction('atap')}>
              Lihat Foto
            </Button>
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label> Foto Dinding</FormControl.Label>

            <Button
              leftIcon={<FontAwesome name="photo" size={20} color="white" />}
              onPress={() => handleAction('dinding')}>
              Lihat Foto
            </Button>
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label> Foto Lantai</FormControl.Label>

            <Button
              leftIcon={<FontAwesome name="photo" size={20} color="white" />}
              onPress={() => handleAction('lantai')}>
              Lihat Foto
            </Button>
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label> Foto Kamar Mandi</FormControl.Label>

            <Button
              leftIcon={<FontAwesome name="photo" size={20} color="white" />}
              onPress={() => handleAction('mandi')}>
              Lihat Foto
            </Button>
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label> Foto MCK</FormControl.Label>

            <Button
              leftIcon={<FontAwesome name="photo" size={20} color="white" />}
              onPress={() => handleAction('mck')}>
              Lihat Foto
            </Button>
          </FormControl>
          <FormControl mt={3} mb={4} w="100%" maxW="350px">
            <FormControl.Label> Foto Sumber Air Minum</FormControl.Label>

            <Button
              leftIcon={<FontAwesome name="photo" size={20} color="white" />}
              onPress={() => handleAction('minum')}>
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
                  source={{uri: fotoUsulan}}
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
  header: {
    height: 128,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#A72185',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
});
