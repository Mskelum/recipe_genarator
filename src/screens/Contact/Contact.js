import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, TextInput, Alert, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';


const Contact = () => {

  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };


  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Action icon="menu" color="white" onPress={openDrawer}/>
        <Appbar.Content title="Contact" titleStyle={styles.appBarTitle} />
      </Appbar.Header>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    backgroundColor: 'green',
  },
  appBarTitle: {
    color: 'white',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: 'black',
    flex: 1,
  },
  flatList: {
    paddingBottom: 20,
  },
  recipeCard: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 150,
  },
  recipeTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  plusIcon: {
    margin: 15,
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
});

export default Contact
