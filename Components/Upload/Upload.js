import React, {useState} from 'react';
import {
  HStack,
  Box,
  FormControl,
  Button,
  Badge,
  Modal,
  Center,
  useToast,
  Text,
  VStack,
  Flex,
} from 'native-base';
import {ScrollView} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import usulanNetwork from '../../network/lib/usulan';
import {setFormValue} from '../../redux/reducers/formSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  setActiveStep,
  clearStateUpload,
} from '../../redux/reducers/isActiveUpload';

export const UploadComponent = props => {
  const activeStep = useSelector(state => state.uploadSlice.activeStep);
  const [imageCamera, setImageCamera] = useState({});
  const [fileName, setFileName] = useState({
    atap: '',
    dinding: '',
    pemilik: '',
    lantai: '',
    mandi: '',
    mck: '',
    minum: '',
  });
  const [uploadDone, setUploadDone] = useState({
    atap: false,
    dinding: false,
    pemilik: false,
    lantai: false,
    mandi: false,
    mck: false,
    minum: false,
  });
  const [photoName, setPhotoName] = useState('');
  const [valueName, setValueName] = useState('');
  const [body, setBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleNavigation = value => {
    if (value === 'upload-atap') {
      setIsOpen(true);
      setPhotoName('Atap');
      setValueName('kondisi_atap');
    } else if (value === 'upload-dinding') {
      setIsOpen(true);
      setPhotoName('Dinding');
      setValueName('kondisi_dinding');
    } else if (value === 'upload-lantai') {
      setIsOpen(true);
      setPhotoName('Lantai');
      setValueName('kondisi_lantai');
    } else if (value === 'upload-bathroom') {
      setIsOpen(true);
      setPhotoName('Kamar Mandi');
      setValueName('kondisi_kamar_mandi');
    } else if (value === 'upload-mck') {
      setIsOpen(true);
      setPhotoName('MCK');
      setValueName('kondisi_mck');
    } else if (value === 'upload-minum') {
      setIsOpen(true);
      setPhotoName('Sumber Air Minum');
      setValueName('kondisi_sumber_air_minum');
    } else if (value === 'upload-pemilik') {
      setIsOpen(true);
      setPhotoName('Pemilik');
      setValueName('pemilik');
    }
  };

  const openCamera = value => {
    setIsOpen(false);
    const option = {
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.8,
      maxFileSize: 1024 * 1024,
    };
    launchCamera(option, res => {
      if (res.didCancel) {
        // console.log('user cancelled taking photo');
      } else if (res.errorCode) {
        // console.log(res.errorMessage);
      } else {
        const data = res.assets[0];
        setImageCamera(data);
        if (valueName === 'kondisi_atap') {
          dispatch(setActiveStep('atap'));
          setFileName(prevState => ({
            ...prevState,
            atap: data?.fileName,
          }));
        } else if (valueName === 'kondisi_dinding') {
          dispatch(setActiveStep('dinding'));
          setFileName(prevState => ({
            ...prevState,
            dinding: data?.fileName,
          }));
        } else if (valueName === 'kondisi_lantai') {
          dispatch(setActiveStep('lantai'));
          setFileName(prevState => ({
            ...prevState,
            lantai: data?.fileName,
          }));
        } else if (valueName === 'kondisi_kamar_mandi') {
          dispatch(setActiveStep('mandi'));
          setFileName(prevState => ({
            ...prevState,
            mandi: data?.fileName,
          }));
        } else if (valueName === 'kondisi_mck') {
          dispatch(setActiveStep('mck'));
          setFileName(prevState => ({
            ...prevState,
            mck: data?.fileName,
          }));
        } else if (valueName === 'pemilik') {
          dispatch(setActiveStep('pemilik'));
          setFileName(prevState => ({
            ...prevState,
            pemilik: data?.fileName,
          }));
        } else {
          dispatch(setActiveStep('minum'));
          setFileName(prevState => ({
            ...prevState,
            minum: data?.fileName,
          }));
        }
        setBody({
          ...body,
          image: data,
        });
      }
    });
  };
  const openGallery = () => {
    setIsOpen(false);
    const option = {
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.8,
      maxFileSize: 1024 * 1024,
    };
    launchImageLibrary(option, res => {
      if (res.didCancel) {
        // console.log('user cancelled choosing photo');
      } else if (res.errorCode) {
        // console.log(res.errorMessage);
      } else {
        const data = res.assets[0];
        setImageCamera(data);
        if (valueName === 'kondisi_atap') {
          dispatch(setActiveStep('atap'));
          setFileName(prevState => ({
            ...prevState,
            atap: data?.fileName,
          }));
        } else if (valueName === 'kondisi_dinding') {
          dispatch(setActiveStep('dinding'));
          setFileName(prevState => ({
            ...prevState,
            dinding: data?.fileName,
          }));
        } else if (valueName === 'kondisi_lantai') {
          dispatch(setActiveStep('lantai'));
          setFileName(prevState => ({
            ...prevState,
            lantai: data?.fileName,
          }));
        } else if (valueName === 'kondisi_kamar_mandi') {
          dispatch(setActiveStep('mandi'));
          setFileName(prevState => ({
            ...prevState,
            mandi: data?.fileName,
          }));
        } else if (valueName === 'kondisi_mck') {
          dispatch(setActiveStep('mck'));
          setFileName(prevState => ({
            ...prevState,
            mck: data?.fileName,
          }));
        } else if (valueName === 'pemilik') {
          dispatch(setActiveStep('pemilik'));
          setFileName(prevState => ({
            ...prevState,
            pemilik: data?.fileName,
          }));
        } else {
          dispatch(setActiveStep('minum'));
          setFileName(prevState => ({
            ...prevState,
            minum: data?.fileName,
          }));
        }
        setBody({
          ...body,
          image: data,
        });
      }
    });
  };
  const toast = useToast();
  const toastAlert = value => {
    toast.show({
      placement: 'bottom',
      render: () => {
        return (
          <Box bg={'emerald.500'} px="2" py="1" rounded="sm" mb={5}>
            <Text bold color={'white'}>
              {'Upload Sukes'}
            </Text>
          </Box>
        );
      },
    });
  };
  const handleInputChange = (name, value) => {
    dispatch(setFormValue({name, value}));
  };

  const handleSubmit = async value => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('jenis', value);
      formData.append('file', {
        uri: imageCamera?.uri,
        name: imageCamera?.fileName,
        size: imageCamera?.fileSize,
        type: imageCamera?.type,
      });
      const response = await usulanNetwork.usulanCreateImage2({
        data: formData,
      });
      if (response) {
        dispatch(clearStateUpload());
        setIsLoading(false);
        if (value === 'kondisi_atap') {
          setUploadDone(prevState => ({
            ...prevState,
            atap: true,
          }));
          handleInputChange('kondisi_atap', response?.filename);
          setFileName(prevState => ({
            ...prevState,
            // atap: '',
          }));
        } else if (value === 'kondisi_dinding') {
          setUploadDone(prevState => ({
            ...prevState,
            dinding: true,
          }));
          handleInputChange('kondisi_dinding', response?.filename);
          setFileName(prevState => ({
            ...prevState,
            // dinding: '',
          }));
        } else if (value === 'kondisi_lantai') {
          setUploadDone(prevState => ({
            ...prevState,
            lantai: true,
          }));
          handleInputChange('kondisi_lantai', response?.filename);
          setFileName(prevState => ({
            ...prevState,
            // lantai: '',
          }));
        } else if (value === 'kondisi_kamar_mandi') {
          setUploadDone(prevState => ({
            ...prevState,
            mandi: true,
          }));
          handleInputChange('kondisi_kamar_mandi', response?.filename);
          setFileName(prevState => ({
            ...prevState,
            // mandi: '',
          }));
        } else if (value === 'kondisi_mck') {
          setUploadDone(prevState => ({
            ...prevState,
            mck: true,
          }));
          handleInputChange('kondisi_mck', response?.filename);
          setFileName(prevState => ({
            ...prevState,
            // mck: '',
          }));
        } else if (value === 'foto_pemilik') {
          setUploadDone(prevState => ({
            ...prevState,
            pemilik: true,
          }));
          handleInputChange('foto_pemilik', response?.filename);
          setFileName(prevState => ({
            ...prevState,
            // dinding: '',
          }));
        } else {
          setUploadDone(prevState => ({
            ...prevState,
            minum: true,
          }));
          handleInputChange('kondisi_sumber_air_minum', response?.filename);
          setFileName(prevState => ({
            ...prevState,
            // minum: '',
          }));
        }

        toastAlert();
        // console.log(response);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollView>
        <FormControl mt={3} w="100%" maxW="350px">
          <FormControl.Label>
            Unggah Foto {props?.param?.title}
          </FormControl.Label>
          <HStack mt={2} space={3}>
            <VStack paddingLeft={2} alignItems={'flex-end'} flex={1}>
              <Flex>
                {uploadDone?.[props?.param?.str] === true ? (
                  <Ionicons
                    name="checkmark-circle-sharp"
                    size={45}
                    color="#16a34a"
                  />
                ) : null}
                {uploadDone?.[props?.param?.str] === false ? (
                  <Ionicons
                    disabled={
                      activeStep === '' && props?.param?.str ? false : true
                    }
                    onPress={() => handleNavigation(props?.param?.upload)}
                    name="add-circle"
                    size={45}
                    color="#6FB6F9"
                  />
                ) : null}
              </Flex>
            </VStack>
            <VStack alignItems="flex-start" flex={3}>
              {uploadDone?.[props?.param?.str] === true ? (
                <Badge mt={2} variant={'solid'} colorScheme="success">
                  <Text color={'white'}>Unggah Sukses</Text>
                </Badge>
              ) : (
                <Text bold>Pastikan Foto berukuran Maks 200Kb</Text>
              )}
              <Text>{fileName?.[props?.param?.str]}</Text>
            </VStack>
          </HStack>
          {fileName?.[props?.param?.str] &&
          uploadDone?.[props?.param?.str] !== true ? (
            <Button
              leftIcon={
                <MaterialCommunityIcons
                  name="file-upload-outline"
                  size={20}
                  color="white"
                />
              }
              isLoading={isLoading ? true : false}
              onPress={() => handleSubmit(props?.param?.submit)}
              mt={2}>
              Upload
            </Button>
          ) : null}
        </FormControl>
      </ScrollView>
      <Center>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>{`Upload Foto ${photoName}`}</Modal.Header>
            <Modal.Body>
              <Button
                leftIcon={
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={20}
                    color="white"
                  />
                }
                onPress={() => openCamera(valueName)}>
                Ambil Foto Kamera
              </Button>
              <Button
                leftIcon={
                  <MaterialCommunityIcons
                    name="view-gallery-outline"
                    size={20}
                    color="white"
                  />
                }
                onPress={openGallery}
                mt={4}>
                Via Gallery
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  leftIcon={
                    <MaterialCommunityIcons
                      name="cancel"
                      size={20}
                      color="white"
                    />
                  }
                  colorScheme="danger"
                  onPress={() => {
                    setIsOpen(false);
                  }}>
                  Batalkan
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
};
