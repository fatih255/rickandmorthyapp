
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardProvider } from './CardContext';

const Stack = createNativeStackNavigator();

const RickAndMortyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#e9f5f5',
    text: 'black',
    title: '#282726',
    notification: '#0E7C7B',
    primary: '#17BEBB',
    smokeGray: '#404040',
    backgroundPrimary: '#92F2F0',
  },
  styles: {
    title: {
      //marginLeft: 15,
      marginBottom: 11,
      fontSize: 31,
      fontWeight: '500',
    },
    standartTopPadding: {
      paddingTop: 35
    }
  }
};


function App() {

  return (
    <CardProvider>
      <NavigationContainer theme={RickAndMortyTheme} >
        <StatusBar backgroundColor={RickAndMortyTheme.colors.primary} style="light" />
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </CardProvider>
  );
}

export default App;