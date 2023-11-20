import React, {useState} from 'react';
import {
  Button,
  AlertDialog,
  Center,
  useToast,
  Text,
  Alert,
  VStack,
  CloseIcon,
  IconButton,
  HStack,
} from 'native-base';
import {HeaderComponent} from '../../Components/Header/Header';
import {useSelector} from 'react-redux';
import {AddUsulanScreenStep1} from './Components/AddUsulanScreenStep1';
import {AddUsulanScreenStep2} from './Components/AddUsulanScreenStep2';
import {AddUsulanScreenStep3} from './Components/AddUsulanScreenStep3';
import {AddUsulanScreenStep4} from './Components/AddUsulanScreenStep4';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearState} from '../../redux/reducers/stepUsulan';
import {clearStateForm} from '../../redux/reducers/formSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import usulanNetwork from '../../network/lib/usulan';

export const AddUsulanScreen = () => {
  const activeStep = useSelector(state => state.stepSlice?.activeStep);
  const formState = useSelector(state => state.form);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  const propsHeader = {
    navigation: 'UsulanScreen',
    onMainList: true,
    title: 'Tambah Usulan',
    onStepList: activeStep,
  };

  const ToastDetails = [
    {
      title: 'Penambahan Usulan',
      variant: 'solid',
      description: 'Penambahan Usulan Berhasil.',
      isClosable: true,
    },
  ];

  const renderStepComponent = () => {
    switch (activeStep) {
      case 1:
        return <AddUsulanScreenStep1 />;
      case 2:
        return <AddUsulanScreenStep2 />;
      case 3:
        return <AddUsulanScreenStep3 />;
      case 4:
        return <AddUsulanScreenStep4 />;
      default:
        return null;
    }
  };

  const ToastAlert = ({
    id,
    status,
    variant,
    title,
    description,
    isClosable,
    ...rest
  }) => (
    <Alert
      maxWidth="80%"
      alignSelf="center"
      top={0}
      flexDirection="row"
      status={'success'}
      variant={variant}
      {...rest}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontSize="md"
              fontWeight="medium"
              flexShrink={1}
              color={'lightText'}>
              {title}
            </Text>
          </HStack>
          {isClosable ? (
            <IconButton
              icon={<CloseIcon size="3" />}
              _icon={'darkText'}
              onPress={() => toast.close(id)}
            />
          ) : null}
        </HStack>
        <Text px="6" color={'lightText'}>
          {description}
        </Text>
      </VStack>
    </Alert>
  );

  const handleNavigation = value => {
    if (value?.msg === 'save') {
      submitAll(value);
      setIsOpen(false);
    }
  };
  const submitAll = value => {
    handleSubmit(value);
    handleSubmitCreateUsulan();
    // handleSubmitEditUsulan();
  };

  const handleSubmit = async value => {
    setIsLoading(true);
    try {
      const response = await usulanNetwork.createUsulanUpdateHunian({
        id: formState?.id,
        no_kk_pemilik: formState?.no_kk_pemilik,
        nama_pemilik: formState?.nama_pemilik,
        tanggal_lahir_pemilik: formState?.tanggal_lahir_pemilik,
        email_pemilik: formState?.email_pemilik,
        pendapatan_keluarga_id: formState?.pendapatan_keluarga_id,
        nik_pemilik: formState?.nik_pemilik,
        no_telepon_pemilik: formState?.no_telepon_pemilik,
        jumlah_keluarga: formState?.jumlah_keluarga,
        foto_pemilik: formState?.foto_pemilik,
        nama_pengembang: formState?.nama_pengembang,
        luas_tanah: formState?.luas_tanah,
        desa_id: formState?.desa_id,
        luas_bangunan_perkapita: formState?.luas_bangunan_perkapita,
        status_kepemilikan_id: formState?.status_kepemilikan_id,
        luas_bangunan: formState?.luas_bangunan,
        tersedia_listrik: formState?.tersedia_listrik,
        septic_tank: formState?.septic_tank,
        memiliki_imb: formState?.memiliki_imb,
        kondisi_atap: formState?.kondisi_atap,
        kondisi_dinding: formState?.kondisi_dinding,
        kondisi_lantai: formState?.kondisi_lantai,
        kondisi_kamar_mandi: formState?.kondisi_kamar_mandi,
        kondisi_mck: formState?.kondisi_mck,
        kondisi_sumber_air_minum: formState?.kondisi_sumber_air_minum,
        alamat_detail: formState?.alamat_detail,
      });
      if (response) {
        setIsLoading(false);
        console.log(response);
        toast.show({
          render: ({id}) => {
            return <ToastAlert id={id} {...value?.item} />;
          },
        });
        dispatch(clearStateForm());
        dispatch(clearState());
        navigation.navigate('UsulanScreen');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleSubmitCreateUsulan = async value => {
    setIsLoading(true);
    try {
      const response = await usulanNetwork.usulanCreate({
        hunian_id: formState?.id,
        sumber_dana_bantuan_id: formState?.sumber_dana_bantuan_id,
      });
      if (response) {
        setIsLoading(false);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleSubmitEditUsulan = async value => {
    setIsLoading(true);
    try {
      const response = await usulanNetwork.usulanEdit({
        hunian_id: formState?.hunian_id,
        sumber_dana_bantuan_id: formState?.sumber_dana_bantuan_id,
      });
      if (response) {
        setIsLoading(false);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeaderComponent header={propsHeader} />
      {renderStepComponent()}
      {activeStep === 4 ? (
        <Center>
          <Button
            onPress={() => setIsOpen(!isOpen)}
            mt={7}
            isLoading={isLoading ? true : false}
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
                {ToastDetails.map((item, index) => (
                  <Button
                    colorScheme="red"
                    key={index}
                    ml={3}
                    onPress={() => handleNavigation({msg: 'save', item: item})}>
                    Lanjutkan
                  </Button>
                ))}
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Center>
      ) : null}
    </>
  );
};
