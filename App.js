import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistedStore} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {SplashScreen} from './Pages/SplashScreen/SplashScreen';
import {LoginScreen} from './Pages/LoginScreen/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './Pages/HomeScreen/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UsulanScreen} from './Pages/UsulanScreen/UsulanScreen';
import {AddUsulanScreen} from './Pages/AddUsulanScreen/AddUsulanScreen';
import {UsulanDetailScreen} from './Pages/UsulanDetail/UsulanDetail';
import {EditUsulanScreen} from './Pages/EditUsulanScreen/EditUsulanScreen';
import {DaftarTungguScreen} from './Pages/DaftarTungguScreen/DaftarTungguScreen';
import {DaftarTungguDetailScreen} from './Pages/DaftarTungguDetail/DaftarTungguDetail';
import {EditDaftarTungguScreen} from './Pages/EditDaftarTungguScreen/EditDaftarTungguScreen';
import {HasilPelaksanaanScreen} from './Pages/HasilPelaksanaanScreen/HasilPelaksanaanScreen';
import {HasilPelaksanaanDetailScreen} from './Pages/HasilPelaksanaanDetailScreen/HasilPelaksanaanDetailScreen';
import {AkunScreen} from './Pages/Akun/Akun';
import {EditProfileScreen} from './Pages/EditProfileScreen/EditProfileScreen';
import {HeaderComponent} from './Components/Header/Header';
import {AddUsulanScreenStep4} from './Pages/AddUsulanScreen/Components/AddUsulanScreenStep4';
import {EditUsulanScreenStep2} from './Pages/EditUsulanScreen/Components/EditUsulanScreenStep2';
import {EditUsulanScreenStep3} from './Pages/EditUsulanScreen/Components/EditUsulanScreenStep3';
import {EditUsulanScreenStep4} from './Pages/EditUsulanScreen/Components/EditUsulanScreenStep4';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = ({route}) => {
  const Tab = createBottomTabNavigator();
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    const getUserToken = async () => {
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      try {
        const token = await AsyncStorage.getItem('authToken');
        await sleep(2000);
        if (token) {
          setUserToken(token);
          setIsSignedIn(true);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    getUserToken();
  }, [userToken]);

  if (isLoading) {
    return (
      <NativeBaseProvider>
        <SplashScreen />
      </NativeBaseProvider>
    );
  }

  function Dashboard() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#097A5E',
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons
                name={'ios-home-outline'}
                size={30}
                color={focused ? color : '#999999'}
              />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <MaterialCommunityIcons
                name="lightbulb-on-outline"
                size={30}
                color={focused ? '#097A5E' : '#999999'}
              />
            ),
          }}
          name="Usulan"
          component={SeparateScreenLoggedIn}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <MaterialCommunityIcons
                name="clipboard-list-outline"
                size={30}
                color={focused ? '#097A5E' : '#999999'}
              />
            ),
          }}
          name="Daftar Tunggu"
          component={DaftarTungguScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Octicons
                name="checklist"
                size={27}
                color={focused ? '#097A5E' : '#999999'}
              />
            ),
          }}
          name="Hasil Pelaksanaan"
          component={HasilPelaksanaanScreen}
        />
      </Tab.Navigator>
    );
  }

  const UnauthenticatedFlow = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddUsulanScreen" component={AddUsulanScreen} />
        <Stack.Screen
          name="AddUsulanScreenStep4"
          component={AddUsulanScreenStep4}
        />
        <Stack.Screen name="EditUsulanScreen" component={EditUsulanScreen} />
        <Stack.Screen
          name="EditUsulanScreenStep2"
          component={EditUsulanScreenStep2}
        />
        <Stack.Screen
          name="EditUsulanScreenStep3"
          component={EditUsulanScreenStep3}
        />
        <Stack.Screen
          name="EditUsulanScreenStep4"
          component={EditUsulanScreenStep4}
        />
        <Stack.Screen
          name="UsulanDetailScreen"
          component={UsulanDetailScreen}
        />
        <Stack.Screen
          name="DaftarTungguDetailScreen"
          component={DaftarTungguDetailScreen}
        />
        <Stack.Screen
          name="EditDaftarTungguScreen"
          component={EditDaftarTungguScreen}
        />

        <Stack.Screen
          name="HasilPelaksanaanDetailScreen"
          component={HasilPelaksanaanDetailScreen}
        />
        <Stack.Screen name="AkunScreen" component={AkunScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="HeaderComponent" component={HeaderComponent} />
      </Stack.Navigator>
    );
  };

  const SeparateScreenLoggedIn = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UsulanScreen" component={UsulanScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="AddUsulanScreenStep4"
        component={AddUsulanScreenStep4}
      />
      <Stack.Screen name="EditUsulanScreen" component={EditUsulanScreen} />
      <Stack.Screen
        name="EditUsulanScreenStep2"
        component={EditUsulanScreenStep2}
      />
      <Stack.Screen
        name="EditUsulanScreenStep3"
        component={EditUsulanScreenStep3}
      />
      <Stack.Screen
        name="EditUsulanScreenStep4"
        component={EditUsulanScreenStep4}
      />
      <Stack.Screen name="DaftarTungguScreen" component={DaftarTungguScreen} />
      <Stack.Screen
        name="DaftarTungguDetailScreen"
        component={DaftarTungguDetailScreen}
      />
      <Stack.Screen
        name="EditDaftarTungguScreen"
        component={EditDaftarTungguScreen}
      />
      <Stack.Screen
        name="HasilPelaksanaanScreen"
        component={HasilPelaksanaanScreen}
      />
      <Stack.Screen
        name="HasilPelaksanaanDetailScreen"
        component={HasilPelaksanaanDetailScreen}
      />
      <Stack.Screen name="AkunScreen" component={AkunScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="HeaderComponent" component={HeaderComponent} />
    </Stack.Navigator>
  );

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <NavigationContainer>
          <NativeBaseProvider>
            {isSignedIn ? (
              <>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                  <Stack.Screen name="Dashboard" component={Dashboard} />
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen
                    name="AddUsulanScreen"
                    component={AddUsulanScreen}
                  />
                  <Stack.Screen
                    name="AddUsulanScreenStep4"
                    component={AddUsulanScreenStep4}
                  />
                  <Stack.Screen
                    name="EditUsulanScreen"
                    component={EditUsulanScreen}
                  />
                  <Stack.Screen
                    name="EditUsulanScreenStep2"
                    component={EditUsulanScreenStep2}
                  />
                  <Stack.Screen
                    name="EditUsulanScreenStep3"
                    component={EditUsulanScreenStep3}
                  />
                  <Stack.Screen
                    name="EditUsulanScreenStep4"
                    component={EditUsulanScreenStep4}
                  />
                  <Stack.Screen
                    name="UsulanDetailScreen"
                    component={UsulanDetailScreen}
                  />
                  <Stack.Screen
                    name="DaftarTungguDetailScreen"
                    component={DaftarTungguDetailScreen}
                  />
                  <Stack.Screen
                    name="EditDaftarTungguScreen"
                    component={EditDaftarTungguScreen}
                  />
                  <Stack.Screen
                    name="HasilPelaksanaanDetailScreen"
                    component={HasilPelaksanaanDetailScreen}
                  />
                  <Stack.Screen name="AkunScreen" component={AkunScreen} />
                  <Stack.Screen
                    name="EditProfileScreen"
                    component={EditProfileScreen}
                  />
                  <Stack.Screen
                    name="HeaderComponent"
                    component={HeaderComponent}
                  />
                </Stack.Navigator>
              </>
            ) : (
              <UnauthenticatedFlow />
            )}
          </NativeBaseProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
