import React, {useState, useEffect} from 'react';
import {
  Input,
  Box,
  Radio,
  CheckIcon,
  FormControl,
  Modal,
  Select,
  Button,
  Stack,
  Center,
  Text,
} from 'native-base';
import {ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setActiveStep} from '../../../redux/reducers/stepUsulan';
import {setFormValue} from '../../../redux/reducers/formSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import usulanNetwork from '../../../network/lib/usulan';
import {UploadComponent} from '../../../Components/Upload/Upload';

export const AddUsulanScreenStep2 = () => {
  const formState = useSelector(state => state.form);
  const dispatch = useDispatch();
  const activeStep = useSelector(state => state.stepSlice?.activeStep);

  const [sumberDana, setSumberDana] = useState([]);
  const [statusMilik, setStatusMilik] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const handleInputChange = (name, value) => {
    dispatch(setFormValue({name, value}));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await usulanNetwork.usulanDropdown();
        if (response) {
          setSumberDana(response?.sumber_dana);
          setStatusMilik(response?.status_kepemilikan);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const propsUpload = {
    id: 100,
    title: 'Pemilik',
    str: 'pemilik',
    nonStrValue1: 'lantai',
    nonStrValue2: 'dinding',
    nonStrValue3: 'mandi',
    nonStrValue4: 'mck',
    nonStrValue5: 'minum',
    upload: 'upload-pemilik',
    submit: 'foto_pemilik',
  };

  return (
    <>
      <ScrollView>
        <Box pl={5} mt={5}>
          <UploadComponent param={propsUpload} />
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Diusulkan Kepada</FormControl.Label>
            <Select
              variant="rounded"
              selectedValue={formState?.sumber_dana_bantuan_id || ''}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Pilih Tujuan"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue =>
                handleInputChange('sumber_dana_bantuan_id', itemValue)
              }>
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

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>
              Luas Tanah M<Text fontSize={10}>²</Text>
            </FormControl.Label>
            <Input
              keyboardType="numeric"
              value={formState?.luas_tanah ? `${formState?.luas_tanah}` : ''}
              onChangeText={value => handleInputChange('luas_tanah', value)}
              variant="rounded"
              placeholder="Masukan luas tanah"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Luas Bangunan Per Kapita</FormControl.Label>
            <Input
              keyboardType="numeric"
              value={
                formState?.luas_bangunan_perkapita
                  ? `${formState?.luas_bangunan_perkapita}`
                  : ''
              }
              onChangeText={value =>
                handleInputChange('luas_bangunan_perkapita', value)
              }
              variant="rounded"
              placeholder="Masukan luas bangunan perkapita"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Status Kepemilikan</FormControl.Label>
            <Select
              variant="rounded"
              selectedValue={formState?.status_kepemilikan_id || ''}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Pilih Status"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue =>
                handleInputChange('status_kepemilikan_id', itemValue)
              }>
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
              keyboardType="numeric"
              value={
                formState?.luas_bangunan ? `${formState?.luas_bangunan}` : ''
              }
              onChangeText={value => handleInputChange('luas_bangunan', value)}
              variant="rounded"
              placeholder="Masukan luas bangunan"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Tersedia Listrik</FormControl.Label>
            <Radio.Group
              name="exampleGroup"
              defaultValue={formState?.tersedia_listrik || ''}
              onChange={value => handleInputChange('tersedia_listrik', value)}
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
                <Radio value="y" size="sm" my={1}>
                  Ya
                </Radio>
                <Radio value="t" size="sm" my={1}>
                  Tidak
                </Radio>
              </Stack>
            </Radio.Group>
          </FormControl>
          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Memiliki Septic Tank</FormControl.Label>
            <Radio.Group
              name="exampleGroup"
              defaultValue={formState?.septic_tank || ''}
              onChange={value => handleInputChange('septic_tank', value)}
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
                <Radio value="y" size="sm" my={1}>
                  Ya
                </Radio>
                <Radio value="t" size="sm" my={1}>
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
              defaultValue={formState?.memiliki_imb || ''}
              onChange={value => handleInputChange('memiliki_imb', value)}
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
                <Radio value="y" size="sm" my={1}>
                  Ya
                </Radio>
                <Radio value="t" size="sm" my={1}>
                  Tidak
                </Radio>
              </Stack>
            </Radio.Group>
          </FormControl>
        </Box>
        <Center>
          <Button
            onPress={() => dispatch(setActiveStep(activeStep + 1))}
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
    </>
  );
};
