import React, {useState, useEffect} from 'react';
import {
  HStack,
  Input,
  Box,
  CheckIcon,
  AlertDialog,
  FormControl,
  Select,
  Button,
  Center,
  View,
  WarningOutlineIcon,
  Text,
  VStack,
} from 'native-base';
import {ScrollView} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import {setActiveStep} from '../../../redux/reducers/stepUsulan';
import {setFormValue, clearStateForm} from '../../../redux/reducers/formSlice';
import usulanNetwork from '../../../network/lib/usulan';

export const AddUsulanScreenStep1 = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector(state => state.stepSlice?.activeStep);
  const formState = useSelector(state => state.form);
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [open, setOpen] = useState(false);
  const [pendapatanDropdown, setPendapatanDropdown] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState({
    birth_date: new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
      .format(date)
      .split(' ')
      .join('-'),
  });

  const handleInputChange = (name, value) => {
    dispatch(setFormValue({name, value}));
  };

  const createNew = async e => {
    dispatch(clearStateForm());
    setIsOpen(false);
    setIsLoading(true);
    try {
      const response = await usulanNetwork.usulanHunianCreate({
        no_kk_pemilik: formState?.no_kk_pemilik,
      });
      if (response) {
        setIsLoading(false);
        // console.log(response);
        handleInputChange('isAvailable', true);
        Object.keys(response?.data).map(key => {
          const value = response?.data[key];
          if (value !== '' && value !== null) {
            handleInputChange(`${key}`, value);
          }
        });
        handleInputChange('hunian_id', response?.data2[0]?.id);
        handleInputChange(
          'sumber_dana_bantuan_id',
          response?.data2[0]?.sumber_dana_bantuan_id,
        );
      }
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async e => {
    setIsLoading(true);
    try {
      const response = await usulanNetwork.cekKK({
        no_kk: formState?.no_kk_pemilik,
      });
      if (response) {
        setIsLoading(false);
        // console.log(response?.data2[0]);
        handleInputChange('isAvailable', true);
        Object.keys(response?.data).map(key => {
          const value = response?.data[key];
          if (value !== '' && value !== null) {
            handleInputChange(`${key}`, value);
          }
        });
        handleInputChange('hunian_id', response?.data2[0]?.id);
        handleInputChange(
          'sumber_dana_bantuan_id',
          response?.data2[0]?.sumber_dana_bantuan_id,
        );
      }
    } catch (error) {
      // dispatch(clearStateForm());
      setIsOpen(true);
      // console.log(error);
      handleInputChange('isAvailable', false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await usulanNetwork.usulanDropdown();
        if (response) {
          setPendapatanDropdown(response?.pendapatan_keluarga);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        // console.log(error);
      }
    };

    fetchData();
  }, []);
  const cancelRef = React.useRef();
  const handleNavigation = value => {
    if (value === 'check') {
      handleSubmit();
    }
  };

  return (
    <>
      <ScrollView>
        <HStack mt={4} space={3}>
          <VStack flex={3}>
            <Box alignItems="center">
              <FormControl
                isInvalid={formState?.isAvailable === false ? true : false}
                pl={5}
                w="100%"
                maxW="300px">
                <FormControl.Label>Nomor Kartu Keluarga</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  value={formState?.no_kk_pemilik || ''}
                  onChangeText={value =>
                    handleInputChange('no_kk_pemilik', value)
                  }
                  variant="rounded"
                  placeholder="Masukan No KK"
                />
                {formState?.isAvailable === false ? (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    NKK Tidak Tersedia.
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
            </Box>
          </VStack>
          <View mt={10}>
            {formState?.isAvailable === true ? (
              <Ionicons name="checkmark" size={30} color="#1CA180" />
            ) : formState?.isAvailable === false ? (
              <Entypo name="cross" size={30} color="red" />
            ) : null}
          </View>
          <VStack justifyContent="center" flex={1}>
            <Button
              isDisabled={formState?.no_kk_pemilik ? false : true}
              onPress={() => handleNavigation('check')}
              isLoading={isLoading}
              isLoadingText="Loading"
              w={'80%'}
              marginTop={
                formState?.isAvailable === true
                  ? 7
                  : formState?.isAvailable === false
                  ? null
                  : 7
              }
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
            <Input
              isDisabled={formState?.isAvailable ? false : true}
              value={formState?.nama_pemilik || ''}
              keyboardType="default"
              onChangeText={value => handleInputChange('nama_pemilik', value)}
              variant="rounded"
              placeholder="Masukan nama pemilik"
            />
          </FormControl>

          <HStack mt={5} space={3}>
            <VStack w="75%" flex={3}>
              <Box>
                <FormControl maxW="300px">
                  <FormControl.Label>Tanggal Lahir </FormControl.Label>
                  <Input
                    editable={false}
                    isDisabled={formState?.isAvailable ? false : true}
                    value={formState?.tanggal_lahir_pemilik || ''}
                    variant="rounded"
                    placeholder="Pilih tanggalnya"
                  />
                </FormControl>
              </Box>
            </VStack>
            <VStack flex={2}>
              <Button
                title="Open"
                isDisabled={formState?.isAvailable ? false : true}
                onPress={() => setOpen(true)}
                isLoadingText="Loading"
                w={'80%'}
                marginTop={7}
                small
                bg={'#6FB6F9'}>
                <Text color="white" fontSize={'md'}>
                  Pilih Tanggal
                </Text>
              </Button>
            </VStack>
          </HStack>
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={targetDate => {
              setOpen(false);
              setDates({
                birth_date: new Intl.DateTimeFormat('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })
                  .format(targetDate)
                  .split(' ')
                  .join('-'),
              });
              handleInputChange(
                'tanggal_lahir_pemilik',
                targetDate.toISOString().split('T')[0],
              );
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Alamat Email</FormControl.Label>
            <Input
              isDisabled={formState?.isAvailable ? false : true}
              value={formState?.email_pemilik || ''}
              onChangeText={value => handleInputChange('email_pemilik', value)}
              variant="rounded"
              placeholder="Masukan email"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Pendapatan Keluarga</FormControl.Label>
            <Select
              isDisabled={formState?.isAvailable ? false : true}
              variant="rounded"
              selectedValue={formState?.pendapatan_keluarga_id || ''}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Pilih Rentang"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue =>
                handleInputChange('pendapatan_keluarga_id', itemValue)
              }>
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
              keyboardType="numeric"
              isDisabled={formState?.isAvailable ? false : true}
              value={formState?.nik_pemilik || ''}
              onChangeText={value => handleInputChange('nik_pemilik', value)}
              variant="rounded"
              placeholder="Masukan no ktp"
            />
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>No Telepon</FormControl.Label>
            <Input
              keyboardType="numeric"
              isDisabled={formState?.isAvailable ? false : true}
              value={formState?.no_telepon_pemilik || ''}
              onChangeText={value =>
                handleInputChange('no_telepon_pemilik', value)
              }
              variant="rounded"
              placeholder="Masukan no telepon"
            />
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Jumlah Keluarga</FormControl.Label>
            <Input
              keyboardType="numeric"
              isDisabled={formState?.isAvailable ? false : true}
              value={
                formState?.jumlah_keluarga
                  ? `${formState?.jumlah_keluarga}`
                  : ''
              }
              onChangeText={value =>
                handleInputChange('jumlah_keluarga', value)
              }
              variant="rounded"
              placeholder="Masukan jumlah keluarga"
            />
          </FormControl>
        </Box>
        <Center>
          <Button
            onPress={() => dispatch(setActiveStep(activeStep + 1))}
            mt={7}
            isDisabled={formState?.isAvailable ? false : true}
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
              No KK Tidak Ditemukan
            </AlertDialog.Header>
            <AlertDialog.Body>
              Buat usulan baru dengan no KK tersebut ?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button ref={cancelRef} onPress={() => setIsOpen(false)}>
                Batalkan
              </Button>
              <Button colorScheme="red" onPress={createNew} ml={3}>
                Ya
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </>
  );
};
