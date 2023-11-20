import React, {useState, useEffect} from 'react';
import {
  HStack,
  Input,
  Box,
  Divider,
  Stack,
  Spinner,
  Heading,
  Center,
  Text,
  Skeleton,
  VStack,
  List,
  View,
  ScrollView,
} from 'native-base';
import {StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {HeaderComponent} from '../../Components/Header/Header';
import hasilPelaksanaanNetwork from '../../network/lib/hasil-pelaksanaan';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import _ from 'lodash';
import {setHasilPelaksanaanDetail} from '../../redux/reducers/hasil-pelaksanaan';

export const HasilPelaksanaanScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasilPelaksanaan, setHasilPelaksanaan] = useState([]);
  const [page, setPage] = useState(1);
  const [fetchData, setFetchData] = useState(false);
  const [searchResults, setSearchResults] = useState('');
  const [search, setSearch] = useState('');
  const [length, setLength] = useState(10);
  const dispatch = useDispatch();
  const handleNavigation = value => {
    if (value.nav === 'detail') {
      navigation.navigate('HasilPelaksanaanDetailScreen');
      dispatch(setHasilPelaksanaanDetail(value?.item));
    }
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
                <Text>Nomor KK</Text>
              </VStack>
              <VStack flex={3}>
                <Text>: {item?.nama_pemilik}</Text>
                <Text>: {item?.no_kk_pemilik}</Text>
              </VStack>
              <VStack alignItems="center" justifyContent={'center'}>
                <AntDesign name="infocirlceo" size={25} color="#097A5E" />
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

  const handleClick = () => {
    setFetchData(prevToggle => !prevToggle);
  };

  const handleSearch = _.debounce(text => {
    setSearchResults(text);
  }, 2000);

  const propsHeader = {
    // space: 12,
    margin: -37,
    // navigation: 'HomeScreen',
  };

  useEffect(() => {
    const fetchDataPage = async () => {
      setIsLoading(true);
      try {
        const response = await hasilPelaksanaanNetwork.hasilPelaksanaanList({
          search: searchResults,
          page: page,
          length: length,
        });
        if (response) {
          setRefreshing(false);
          setIsLoading(false);
          setHasilPelaksanaan(response?.data);
        }
      } catch (error) {
        setRefreshing(false);
        setIsLoading(false);
      }
    };

    fetchDataPage();
  }, [page, length, searchResults, fetchData]);

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
          HASIL PELAKSANAAN
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
              value={search}
              onChangeText={handleChangeText}
              placeholderTextColor={'grey'}
              variant="filled"
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
      ) : hasilPelaksanaan.length === 0 ? (
        <Center>
          <Text bold color={'#4D4444'}>
            Tidak Ada Data Ditemukan
          </Text>
        </Center>
      ) : hasilPelaksanaan.length === 1 ? (
        renderItem({item: hasilPelaksanaan[0]})
      ) : (
        <FlatList
          data={hasilPelaksanaan}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onRefresh={handleClick}
          refreshing={refreshing}
          onEndReached={hasilPelaksanaan.length > 3 ? loadMoreItems : false}
          onEndReachedThreshold={0}
        />
      )}
    </>
  );
};
