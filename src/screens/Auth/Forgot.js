import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Alert, 
    Platform 
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../../Firebase';

const Forgot = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const forgotPassword = () => {
        auth
            .sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Password reset email sent");
            })
            .catch((error) => {
                Alert.alert(error.message); 
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={100} // Adjust this offset as needed
            >
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <View style={styles.section1}>
                        <View style={styles.txtinput}>
                            <MaterialIcons name='password' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                            <TextInput
                                placeholderTextColor='black'
                                fontWeight='bold'
                                color='black'
                                placeholder='Enter email'
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={{ flex: 1, paddingVertical: 0 }} 
                            />
                        </View>

                        <TouchableOpacity onPress={forgotPassword}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Reset password</Text>
                        </TouchableOpacity>

                        <View style={styles.rememberContainer}>
                            <Text style={styles.rememberText}>Remember password?  </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.rememberText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Forgot;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343369'
    },
    txtinput: {
        height: 50,
        flexDirection: 'row',
        marginHorizontal: 30,
        marginVertical: 12,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        elevation: 3,
    },
    section1: {
        height: 430,
        marginTop: 100, // Adjust this based on your layout
        padding: 19,
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'black', 
        padding: 12, 
        borderRadius: 16, 
        marginBottom: 30, 
        marginTop: 20
    },
    buttonText: {
        textAlign: 'center', 
        fontWeight: '700', 
        fontSize: 18, 
        color: 'white'
    },
    rememberContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginBottom: 30 
    },
    rememberText: {
        color: 'white', 
        fontWeight: '700'
    },
});
