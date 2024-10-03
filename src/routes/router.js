import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Splash from '../components/Splash/Splash';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Home from '../screens/Home/Home';
import Chatbot from '../screens/Chatbot/Chatbot';
import RecipeGenerate from '../screens/RecipeGenerate/RecipeGenerate';
import RecipeDetails from '../screens/Home/RecipeDetails';
import About from '../screens/About/About';
import Contact from '../screens/Contact/Contact';
import Forgot from '../screens/Auth/Forgot';
import Ditect_ingedient from '../components/ditect_ingredient/Ditect_ingredient';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>

            <View>
                <Image source={require('../assests/images/cover.png')}
                    style={{ margin: 1, marginTop: -10, width: 280, height: 210, borderBottomRightRadius: 40 }} resizeMode="stretch" />
                <View style={{ margin: 10 }} />
            </View>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const AppHome = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
                <Stack.Screen name="RecipeDetails" component={RecipeDetails} options={{ headerShown: false }} />
                <Stack.Screen name="Chatbot" component={Chatbot} options={{ headerShown: false }} />
                <Stack.Screen name="Ditect_ingredient" component={Ditect_ingedient} options={{ headerShown: false }} />
                <Stack.Screen name="RecipeGenerate" component={RecipeGenerate} options={{ headerShown: false }} />
                <Stack.Screen name="Home" options={{ headerShown: false, backBehavior: 'none' }}>

                        {() => (
                            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
                                screenOptions={{
                                    drawerActiveBackgroundColor: '#7b2cbf',
                                    drawerInactiveTintColor: '#333',
                                    drawerActiveTintColor: '#fff',
                                    headerShown: false,
                                }}>

                                <Drawer.Screen name="Dashboard " component={Home}
                                    options={({ navigation }) => ({
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 10 }}>
                                                <Icon
                                                    name="home"
                                                    size={30}
                                                    color={'white'}
                                                    backgroundColor="#000"
                                                />
                                            </View>
                                        ),
                                        headerTitleStyle: { color: 'white' },
                                        headerStyle: { backgroundColor: 'black' },
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 4 }}>
                                                <Icon.Button
                                                    name="menu"
                                                    size={30}
                                                    backgroundColor="#000"
                                                    onPress={() => navigation.openDrawer()}
                                                />
                                            </View>
                                        ),
                                    })} />

                                <Drawer.Screen name="About" component={About}
                                    options={({ navigation }) => ({
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 20 }}>
                                                <Icon.Button
                                                    name="menu"
                                                    size={25}
                                                    backgroundColor="#000"
                                                    onPress={() => navigation.openDrawer()}
                                                />
                                            </View>
                                        ),
                                        headerTitleStyle: { color: 'white' },
                                        headerStyle: { backgroundColor: 'black' },
                                    })} />

                                <Drawer.Screen name="Contact Us" component={Contact}
                                    options={({ navigation }) => ({
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 20 }}>
                                                <Icon.Button
                                                    name="menu"
                                                    size={25}
                                                    backgroundColor="#000"
                                                    onPress={() => navigation.openDrawer()}
                                                />
                                            </View>
                                        ),
                                        headerTitleStyle: { color: 'white' },
                                        headerStyle: { backgroundColor: 'black' },
                                    })} />

                            </Drawer.Navigator>
                        )}
                    </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default AppHome;
