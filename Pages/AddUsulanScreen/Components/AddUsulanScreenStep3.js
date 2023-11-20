import React from 'react';
import {Box, Button, Center, Text} from 'native-base';
import {ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setActiveStep} from '../../../redux/reducers/stepUsulan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UploadComponent} from '../../../Components/Upload/Upload';
import UsulanUpload from '../../../Data/UsulanUpload.json';

export const AddUsulanScreenStep3 = ({navigation}) => {
  const dispatch = useDispatch();
  const activeStep = useSelector(state => state.stepSlice?.activeStep);

  return (
    <>
      <ScrollView>
        <Box pl={5} mt={5}>
          {UsulanUpload?.map(item => {
            return <UploadComponent key={item?.id} param={item} />;
          })}
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
