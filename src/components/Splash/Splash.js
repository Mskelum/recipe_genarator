import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../Firebase';
import FastImage from 'react-native-fast-image';

const Splash = () => {
  const [isGo, setIsGo] = useState(true);
  const Navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const emailString = await AsyncStorage.getItem('email');
      const email = JSON.parse(emailString);
      const passwordString = await AsyncStorage.getItem('password');
      const password = JSON.parse(passwordString);

      if (email) {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(async () => {
            setTimeout(() => {
              Navigation.replace('Home', { email });
              setIsGo(false);
            }, 2000);
          })
          .catch(() => {
            setTimeout(() => {
              Navigation.replace('Login');
              setIsGo(false);
            }, 2000);
          });
      } else {
        setTimeout(() => {
          Navigation.replace('Login');
          setIsGo(false);
        }, 2000);
      }
    };

    checkToken();
  }, [Navigation]);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={require('../../assests/loading.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />

      <Text style={styles.title}>Smart Recipe</Text>
      <Text style={styles.subtitle}>Your personalized cooking assistant</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#343a40',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default Splash;
