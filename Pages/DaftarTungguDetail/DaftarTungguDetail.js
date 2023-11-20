import React, {useState, useEffect} from 'react';
import {
  HStack,
  Input,
  Box,
  Select,
  CheckIcon,
  FormControl,
  Badge,
  VStack,
} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';
import {HeaderComponent} from '../../Components/Header/Header';
import usulanNetwork from '../../network/lib/usulan';
import {useSelector} from 'react-redux';

export const DaftarTungguDetailScreen = ({navigation}) => {
  const dataDetail = useSelector(state => state.daftarTunggu?.daftarTunggu);
  const [isLoading, setIsLoading] = useState([]);
  const [sumberDana, setSumberDana] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await usulanNetwork.usulanDropdown();
        if (response) {
          setSumberDana(response?.sumber_dana);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const propsHeader = {
    navigation: 'DaftarTungguScreen',
    onMainList: true,
    title: 'Detail Daftar Tunggu',
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
                  variant="rounded"
                  value={dataDetail?.hunian?.no_kk_pemilik}
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
              value={dataDetail?.hunian?.nama_pemilik}
              placeholder="Masukan nama pemilik"
            />
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

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Verifikator</FormControl.Label>
            <Input
              editable={false}
              variant="rounded"
              value={dataDetail?.verifikator?.name}
              placeholder="Masukan email"
            />
          </FormControl>

          <FormControl mt={3} w="100%" maxW="350px">
            <FormControl.Label>Status Verifikasi</FormControl.Label>
            {dataDetail?.hunian?.status === 1 ? (
              <Input
                variant="filled"
                editable={false}
                textAlign={'center'}
                color="white"
                fontSize={'lg'}
                bg={'#097A5E'}
                borderRadius={20}
                value={'Approved'}
              />
            ) : (
              <Input
                variant="filled"
                editable={false}
                textAlign={'center'}
                color="black"
                fontSize={'lg'}
                bg={'#FFF000'}
                borderRadius={20}
                value={'Pending'}
              />
            )}
          </FormControl>

          <FormControl mt={3} mb={3} w="100%" maxW="350px">
            <FormControl.Label>Pesan</FormControl.Label>
            <Input
              editable={false}
              variant="rounded"
              value={dataDetail?.hunian?.pesan}
            />
          </FormControl>
        </Box>
      </ScrollView>
    </>
  );
};
