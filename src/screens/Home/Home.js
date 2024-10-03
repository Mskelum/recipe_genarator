import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, TextInput, Alert, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { auth } from '../../Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiKey = 'a5d95ac3b32a423c976648d39c99f694'; // Your API key
const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch'; // API endpoint for searching recipes

const Home = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axios.get(`${apiUrl}?apiKey=${apiKey}&number=100`); // Fetch up to 100 recipes
        setRecipes(response.data.results);
        setFilteredRecipes(response.data.results);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchAllRecipes();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query) {
      const filteredData = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(filteredData);
    } else {
      setFilteredRecipes(recipes); // Reset to all recipes if search is cleared
    }
  };

  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetails', { recipeId: item.id })}
    >
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
    </TouchableOpacity>
  );


  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout canceled"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await auth.signOut();
              console.log('User signed out!');
              navigation.replace('Login');
  
              await AsyncStorage.clear();
              console.log('AsyncStorage data cleared successfully');
            } catch (error) {
              console.error('Error handling logout:', error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };


  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Action icon="menu" color="white" onPress={openDrawer}/>
        <Appbar.Content title="Dashboard" titleStyle={styles.appBarTitle} />
        <MaterialCommunityIcons
          name="plus-circle"
          size={30}
          color="white"
          style={styles.plusIcon}
          onPress={() => navigation.navigate('RecipeGenerate')}
        />
        <Appbar.Action icon="logout" color="white" onPress={handleLogout}/>
      </Appbar.Header>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Recipes"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipe}
        contentContainerStyle={styles.flatList}
      />

      <MaterialCommunityIcons
        name="chat-outline"
        size={30}
        color="white"
        style={styles.chatbotButton}
        onPress={() => navigation.navigate('Chatbot')}
      />
    </SafeAreaView>
  );
};

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

export default Home;
