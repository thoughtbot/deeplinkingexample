/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Button, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/**
 * Data
 */
const groceryItems = [
  {id: 1, name: 'Apples'},
  {id: 2, name: 'Bananas'},
  {id: 3, name: 'Oranges'},
  {id: 4, name: 'Milk'},
  {id: 5, name: 'Bread'},
];

/**
 * Screens
 */
function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Grocery List</Text>
      {/* FlatList to render the list of grocery items */}
      <FlatList
        style={{width: '100%'}}
        data={groceryItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{padding: 10, borderBottomWidth: 1}}
            onPress={() => navigation.navigate('Details', {id: item.id})}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function DetailsScreen({route, navigation}) {
  console.log(route);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>
        Item:
        {` ${
          groceryItems.find(item => item.id === Number(route.params.id))
            ?.name ?? 'Not Found'
        }`}
      </Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

/**
 * Stack Navigator
 */
const Stack = createNativeStackNavigator();

/**
 * Linking Configuration
 */
const linking = {
  // Prefixes accepted by the navigation container, should match the added schemes
  prefixes: ['myapp://'],
  // Route config to map uri paths to screens
  config: {
    // Initial route name to be added to the stack before any further navigation,
    // should match one of the available screens
    initialRouteName: 'Home' as const,
    screens: {
      // myapp://home -> HomeScreen
      Home: 'home',
      // myapp://details/1 -> DetailsScreen with param id: 1
      Details: 'details/:id',
    },
  },
};

function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
