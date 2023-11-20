import {useState, useEffect, React} from 'react';
import {Input, Box, FormControl} from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector, useDispatch} from 'react-redux';
import {setFormValue} from '../../../redux/reducers/formSlice';
import usulanNetwork from '../../../network/lib/usulan';

export const AddUsulanScreenStep4 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState('');
  const [length, setLength] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const formState = useSelector(state => state.form);
  const dispatch = useDispatch();
  const handleInputChange = (name, value) => {
    // console.log(name, value);
    dispatch(setFormValue({name, value}));
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await usulanNetwork.listDesa({
          search: search,
          page: page,
          length: 256,
        });
        if (response) {
          const sortedData = response?.data.sort((a, b) =>
            a.nama.localeCompare(b.nama),
          );
          setItems(
            sortedData.map(item => {
              return {label: item?.nama, value: item?.id, key: item?.id};
            }),
          );

          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [length, search, page]);

  return (
    <>
      <Box pl={5} mt={5}>
        <FormControl w="100%" maxW="350px">
          Desa
          <DropDownPicker
            open={open}
            value={value ? value : formState?.desa_id || ''}
            style={{
              backgroundColor: 'transparent',
            }}
            searchable={true}
            placeholder="Pilih Desa"
            onChangeValue={valueId => {
              handleInputChange('desa_id', valueId);
            }}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
          {/* <Select
            isDisabled={formState?.isAvailable ? false : true}
            variant="rounded"
            selectedValue={formState?.desa_id || ''}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Pilih Desa"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue =>
              handleInputChange('desa_id', itemValue)
            }>
            {sortedData.map(item => {
              return (
                <Select.Item
                  key={item?.id}
                  label={item?.nama}
                  value={item?.id}
                />
              );
            })}
          </Select> */}
        </FormControl>

        <FormControl mt={3} w="100%" maxW="350px">
          <FormControl.Label>Alamat</FormControl.Label>
          <Input
            value={formState?.alamat_detail || ''}
            onChangeText={value => handleInputChange('alamat_detail', value)}
            variant="rounded"
            placeholder="Masukan alamat"
          />
        </FormControl>
      </Box>
    </>
  );
};
