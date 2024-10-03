import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../Firebase';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(async (userCredentials) => {
                const user = userCredentials.user;
                const userEmail = user.email || '';

                try {
                    await AsyncStorage.setItem('userdata', JSON.stringify(user));
                    await AsyncStorage.setItem('email', JSON.stringify(email));
                    await AsyncStorage.setItem('password', JSON.stringify(password));
                } catch (error) {
                    console.error('Error storing user data:', error);
                }

                navigation.replace('Home', { userEmail });
            })
            .catch((error) => alert(error.message));
    };

    return (
        <View style={styles.container}>

            <View style={styles.innerContainer}>
                <View style={styles.inputSection}>
                    <View style={styles.txtinput}>
                        <MaterialIcons name='email' size={20} color="#666" style={styles.icon} />
                        <TextInput
                            placeholderTextColor='black'
                            fontWeight='bold'
                            color='black'
                            placeholder='E-mail'
                            value={email}
                            onChangeText={handleEmailChange}
                            style={styles.input}
                            keyboardType="email-address" />
                    </View>

                    <View style={styles.txtinput}>
                        <MaterialIcons name='lock' size={20} color="#666" style={styles.icon} />
                        <TextInput
                            placeholderTextColor='black'
                            fontWeight='bold'
                            color='black'
                            placeholder='Password'
                            value={password}
                            onChangeText={handlePasswordChange}
                            style={styles.input}
                            secureTextEntry={true} />
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Forgot')} >
                        <Text style={styles.forgotPasswordText}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogin}
                        style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't you have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                            <Text style={styles.registerText}> Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343369',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '30%',
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'center',
    },
    inputSection: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    txtinput: {
        height: 50,
        width: '80%',
        flexDirection: 'row',
        marginVertical: 12,
        backgroundColor: 'white',
        opacity: 0.9,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
    },
    icon: {
        paddingTop: 5,
        marginRight: 5,
    },
    input: {
        flex: 1,
        paddingVertical: 0,
    },
    forgotPasswordText: {
        color: 'white',
        fontWeight: '700',
        marginBottom: 30,
        marginTop: 20,
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 16,
        marginBottom: 10,
        width: 150,
        alignItems: 'center',
    },
    loginButtonText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
        color: 'white',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    footerText: {
        color: 'white',
        fontWeight: '700',
    },
    registerText: {
        color: '#6200ea',
        fontWeight: '700',
        marginLeft: 5,
    },
});
