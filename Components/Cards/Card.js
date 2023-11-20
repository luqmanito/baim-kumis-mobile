import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Box,
  Heading,
  VStack,
  Stack,
  AspectRatio,
  Center,
  Image,
  HStack,
  Text,
} from 'native-base';

export const CardComponent = props => {
  return (
    <>
      <Box p={2}>
        {/* <Skeleton.Text px="4" /> */}
        {/* <Skeleton px="4" my="4" rounded="md" startColor="primary.100" /> */}
        <Box
          w={300}
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <VStack>
            <Stack p="3" w={180}>
              <HStack space={4}>
                <VStack w={220}>
                  <Text fontSize={'md'}>{props?.title}</Text>
                  <Text bold fontSize={'xs'}>
                    {props?.qty}{' '}
                    {props?.id === 1
                      ? 'Orang'
                      : props?.id === 2
                      ? 'Hunian'
                      : props?.id === 3
                      ? 'Hunian'
                      : props?.id === 4
                      ? 'Kawasan'
                      : props?.id === 5
                      ? 'm²'
                      : 'Kawasan'}
                  </Text>
                </VStack>
                <VStack alignItems="center" justifyContent={'center'}>
                  <Ionicons
                    name={
                      props?.id === 1
                        ? 'md-people-circle'
                        : props?.id === 2
                        ? 'home'
                        : props?.id === 3
                        ? 'warning'
                        : props?.id === 4
                        ? 'location'
                        : props?.id === 5
                        ? 'map'
                        : 'pin'
                    }
                    size={25}
                    color={
                      props?.id === 1
                        ? '#12a1e1'
                        : props?.id === 2
                        ? '#14d08a'
                        : props?.id === 3
                        ? '#f9316b'
                        : props?.id === 4
                        ? '#f3ca5d'
                        : props?.id === 5
                        ? '#8560db'
                        : '#e2457b'
                    }
                  />
                </VStack>
              </HStack>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </>
  );
};
