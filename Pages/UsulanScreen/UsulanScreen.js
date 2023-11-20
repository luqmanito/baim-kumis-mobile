import React, {useState, useEffect} from 'react';
import {
  HStack,
  Input,
  Fab,
  Box,
  Divider,
  AlertDialog,
  Button,
  Stack,
  Heading,
  Center,
  Spinner,
  Skeleton,
  List,
  Text,
  VStack,
  View,
  Flex,
} from 'native-base';
import {TouchableOpacity, FlatList} from 'react-native';
import UsulanNetwork from '../../network/lib/usulan';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {HeaderComponent} from '../../Components/Header/Header';
import {useDispatch} from 'react-redux';
import _ from 'lodash';
import {setUsulan} from '../../redux/reducers/usulan';

export const UsulanScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [isOpen, setIsOpen] = useState(false);
  const [msgTitle, setMsgTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [msgBody, setMsgBody] = useState('');
  const [search, setSearch] = useState('');
  const [id, setId] = useState(null);
  const [end_date, setEnd_date] = useState('');
  const [length, setLength] = useState(10);
  const [start_date, setStart_date] = useState('');
  const [dataUsulan, setDataUsulan] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const dispatch = useDispatch();

  const handleAction = value => {
    if (value?.msg === 'edit') {
      setIsOpen(!isOpen);
      setMsgTitle('Konfirmasi Edit');
      setMsgBody('Apakah Anda Ingin Mengubah Data ?');
    } else {
      setId(value?.id);
      setIsOpen(!isOpen);
      setMsgTitle('Konfirmasi Hapus');
      setMsgBody('Apakah Anda Yakin Akan Menghapus Data ?');
    }
  };
  const handleConfirm = value => {
    if (value === 'yes') {
      handleSubmitDelete('');
      setIsOpen(false);
    } else if (value === 'cancel') {
      setIsOpen(false);
    }
  };
  const handleNavigation = value => {
    if (value === 'add') {
      navigation.navigate('AddUsulanScreen');
    } else if (value === 'back') {
      navigation.navigate('HomeScreen');
    } else if (value?.nav === 'detail') {
      navigation.navigate('UsulanDetailScreen');
      dispatch(setUsulan(value?.item));
    }
  };

  const handleSubmitDelete = async value => {
    setIsLoading(true);
    try {
      const response = await UsulanNetwork.deleteList({
        usulan_id: id,
      });
      if (response) {
        setIsLoading(false);
        setFetchData(prevToggle => !prevToggle);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSearch = _.debounce(text => {
    setSearchResults(text);
  }, 2000);

  const handleChangeText = text => {
    setSearch(text);
    handleSearch(text);
  };

  const handleClick = () => {
    setFetchData(prevToggle => !prevToggle);
  };
  const loadMoreItems = () => {
    setRefreshing(true);
    setLength(prevLength => prevLength + 10);
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
        const response = await UsulanNetwork.usulanList({
          search: searchResults,
          start_date: start_date,
          end_date: end_date,
          length: length,
        });
        if (response) {
          setRefreshing(false);
          setIsLoading(false);
          setDataUsulan(response?.data);
          // console.log(dataUsulan[0]);
        }
      } catch (error) {
        setRefreshing(false);
        setIsLoading(false);
        // const msg = error?.response?.data?.message;
        // setErrorMsg(msg);
        // setIsError(true);
      }
    };

    fetchDataPage();
  }, [searchResults, start_date, end_date, length, fetchData]);

  const renderItem = ({item}) => (
    <List>
      <TouchableOpacity
        key={item?.id}
        onPress={() => handleNavigation({nav: 'detail', item: item})}>
        <View p={3}>
          <Stack borderRadius={10} p={4} bg={'#D9D9D9'} space={3}>
            <HStack space={3}>
              <VStack flex={1}>
                <Text>Nama </Text>
                <Text>Nomor KK</Text>
              </VStack>
              <VStack flex={3}>
                <Text>: {item?.hunian?.nama_pemilik}</Text>
                <Text>: {item?.hunian?.no_kk_pemilik}</Text>
              </VStack>
              <VStack>
                <AntDesign
                  onPress={() => handleAction({msg: 'delete', id: item?.id})}
                  name="delete"
                  size={20}
                  color="#DA0D0D"
                />
              </VStack>
            </HStack>
          </Stack>
        </View>
      </TouchableOpacity>
    </List>
  );

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
        <Skeleton mt={2} p={3} h="95" rounded={'full'} />
      </View>
    ));
  };

  return (
    <>
      <HeaderComponent header={propsHeader} />
      <Center mt={2}>
        <Text bold color={'#4D4444'} fontSize={20}>
          USULAN
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
              placeholderTextColor={'grey'}
              variant="filled"
              value={search}
              onChangeText={handleChangeText}
              width="100%"
              borderRadius="10"
              py="1"
              px="1"
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
      ) : dataUsulan.length === 0 ? (
        <Center>
          <Text bold color={'#4D4444'}>
            Tidak Ada Data Ditemukan
          </Text>
        </Center>
      ) : dataUsulan.length === 1 ? (
        renderItem({item: dataUsulan[0]})
      ) : (
        <FlatList
          data={dataUsulan}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onRefresh={handleClick}
          refreshing={refreshing}
          onEndReached={dataUsulan.length > 4 ? loadMoreItems : false}
          onEndReachedThreshold={0}
        />
      )}

      {isLoading ? (
        ''
      ) : isFocused && !isLoading ? (
        <Fab
          mb={4}
          mr={-6}
          placement="bottom-right"
          colorScheme="none"
          shadow={'none'}
          icon={
            <Ionicons
              onPress={() => handleNavigation('add')}
              name="add-circle"
              size={45}
              color="#A72185"
            />
          }
        />
      ) : null}

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
