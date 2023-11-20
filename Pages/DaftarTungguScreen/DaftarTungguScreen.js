import React, {useState, useEffect} from 'react';
import {
  HStack,
  Input,
  Box,
  Skeleton,
  Spinner,
  List,
  Heading,
  Divider,
  AlertDialog,
  Button,
  Badge,
  Stack,
  Center,
  Text,
  VStack,
  View,
} from 'native-base';
import {TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HeaderComponent} from '../../Components/Header/Header';
import daftarTungguNetwork from '../../network/lib/daftar-tunggu';
import {useDispatch} from 'react-redux';
import _ from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {setDaftarTunggu} from '../../redux/reducers/daftar-tunggu';

export const DaftarTungguScreen = ({navigation}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [listDaftarTunggu, setListDaftarTunggu] = useState([]);
  const [length, setLength] = useState(10);
  const [fetchData, setFetchData] = useState(false);
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState('');
  const [search, setSearch] = useState('');
  const [msgTitle, setMsgTitle] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const dispatch = useDispatch();

  const handleAction = value => {
    if (value === 'edit') {
      setIsOpen(!isOpen);
      setMsgTitle('Konfirmasi Edit');
      setMsgBody('Apakah Anda Ingin Mengubah Data ?');
    } else {
      setIsOpen(!isOpen);
      setMsgTitle('Konfirmasi Hapus');
      setMsgBody('Apakah Anda Yakin Akan Menghapus Data ?');
    }
  };
  const handleConfirm = value => {
    if (value === 'yes') {
      setIsOpen(false);
      navigation.navigate('EditDaftarTungguScreen');
    } else if (value === 'cancel') {
      setIsOpen(false);
    }
  };
  const handleNavigation = value => {
    if (value?.nav === 'detail') {
      navigation.navigate('DaftarTungguDetailScreen');
      dispatch(setDaftarTunggu(value?.item));
    }
  };

  const propsHeader = {
    // space: 12,
    margin: -37,
    // navigation: 'HomeScreen',
  };

  useEffect(() => {
    const fetchDataPage = async () => {
      setIsLoading(true);
      try {
        const response = await daftarTungguNetwork.daftarTungguList({
          search: searchResults,
          page: page,
          length: length,
        });
        if (response) {
          setRefreshing(false);
          setIsLoading(false);
          setListDaftarTunggu(response?.data);
          console.log(response?.data);
        }
      } catch (error) {
        setRefreshing(false);
        setIsLoading(false);
      }
    };

    fetchDataPage();
  }, [page, length, searchResults, fetchData]);

  const handleClick = () => {
    setFetchData(prevToggle => !prevToggle);
  };
  const loadMoreItems = () => {
    setRefreshing(true);
    setLength(prevLength => prevLength + 10);
  };

  const renderItem = ({item}) => (
    <List>
      <TouchableOpacity
        key={item?.id}
        onPress={() => handleNavigation({nav: 'detail', item: item})}>
        <View p={3}>
          <Stack borderRadius={10} p={4} bg={'#D9D9D9'} space={3}>
            <HStack space={3}>
              <VStack flex={1}>
                <Text>Nama</Text>
                <Text mt={1}>Nomor KK</Text>
                <Text mt={1}>Status</Text>
              </VStack>
              <VStack flex={3}>
                <Text>: {item?.hunian?.nama_pemilik}</Text>
                <Text mt={1}>: {item?.hunian?.no_kk_pemilik}</Text>
                <Text mt={1}>
                  :{' '}
                  {item?.hunian?.status === 1 ? (
                    <Badge
                      colorScheme="success"
                      alignSelf="flex-start"
                      variant={'solid'}>
                      Approved
                    </Badge>
                  ) : (
                    <Badge
                      colorScheme="warning"
                      alignSelf="flex-start"
                      variant={'solid'}>
                      Pending
                    </Badge>
                  )}
                </Text>
              </VStack>
              <VStack>
                <AntDesign
                  onPress={() => handleAction('edit')}
                  name="edit"
                  size={20}
                  color="#6FB6F9"
                />
                <View mt={2}>
                  <AntDesign
                    onPress={() => handleAction('delete')}
                    name="delete"
                    size={20}
                    color="#DA0D0D"
                  />
                </View>
              </VStack>
            </HStack>
          </Stack>
        </View>
      </TouchableOpacity>
    </List>
  );
  const handleChangeText = text => {
    setSearch(text);
    handleSearch(text);
  };

  const handleSearch = _.debounce(text => {
    setSearchResults(text);
  }, 2000);

  const renderFooter = () => {
    if (isLoading) {
      return (
        <HStack mt={5} space={2} justifyContent="center">
          <Spinner color={'#A72185'} accessibilityLabel="Loading posts" />
          <Heading color="#A72185" fontSize="md">
            Loading
          </Heading>
        </HStack>
      );
    }
    return null;
  };

  const skeletonCount = 10;
  const renderSkeletonItems = () => {
    return Array.from({length: skeletonCount}, (unused, index) => (
      <View key={index}>
        <Skeleton h="0.5" />
        <Skeleton mt={2} p={4} h="135" rounded={'full'} />
      </View>
    ));
  };

  return (
    <>
      <HeaderComponent header={propsHeader} />

      <Center mt={2}>
        <Text bold color={'#4D4444'} fontSize={20}>
          DAFTAR TUNGGU
        </Text>

        <VStack
          my="4"
          space={5}
          w="100%"
          maxW="300px"
          divider={
            <Box px="2">
              <Divider />
            </Box>
          }>
          <VStack w="100%" space={5} alignSelf="center">
            <Input
              bg={'#D9D9D9'}
              placeholder="Silakan ketik nama untuk pencarian"
              placeholderTextColor={'white'}
              variant="filled"
              value={search}
              onChangeText={handleChangeText}
              width="100%"
              borderRadius="10"
              py="1"
              px="2"
              InputLeftElement={
                <Ionicons
                  marginLeft="4"
                  name="search"
                  size={20}
                  color="gray.400"
                />
              }
            />
          </VStack>
        </VStack>
      </Center>

      {isLoading ? (
        <>{renderSkeletonItems()}</>
      ) : listDaftarTunggu.length === 0 ? (
        <Center>
          <Text bold color={'#4D4444'}>
            Tidak Ada Data Ditemukan
          </Text>
        </Center>
      ) : listDaftarTunggu.length === 1 ? (
        renderItem({item: listDaftarTunggu[0]})
      ) : (
        <FlatList
          data={listDaftarTunggu}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onRefresh={handleClick}
          refreshing={refreshing}
          onEndReached={listDaftarTunggu.length > 3 ? loadMoreItems : false}
          onEndReachedThreshold={0}
        />
      )}

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
            <AlertDialog.Body>{msgBody}</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button ref={cancelRef} onPress={() => handleConfirm('cancel')}>
                Batalkan
              </Button>
              <Button
                colorScheme="red"
                onPress={() => handleConfirm('yes')}
                ml={3}>
                Ya
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </>
  );
};
