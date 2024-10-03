import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RecipeGenerate = () => {
    const navigation = useNavigation();
    const [value, setValue] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipeDetails, setRecipeDetails] = useState(null);

    const handleDelete = (ingredientToDelete) => {
        setIngredients(ingredients.filter((ingredient) => ingredient !== ingredientToDelete));
    };

    const handleChange = (newInputValue) => {
        if (ingredients.indexOf(newInputValue) === -1 && newInputValue !== '') {
            setIngredients([...ingredients, newInputValue]);
        }
        setValue('');
    };

    const getRecipesByIngredients = () => {
        let url = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
        url += ingredients.join(',') + "&apiKey=a5d95ac3b32a423c976648d39c99f694";

        axios.get(url)
            .then(response => {
                const newRecipes = response.data.map(res => ({
                    id: res.id,
                    title: res.title,
                    image: res.image
                }));
                setRecipes(newRecipes);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
        setModalVisible(true);
        const url = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=a5d95ac3b32a423c976648d39c99f694`;

        axios.get(url)
            .then(response => {
                setRecipeDetails(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedRecipe(null);
        setRecipeDetails(null);
    };

    // Function to remove HTML tags
    const stripHtmlTags = (html) => {
        return html.replace(/<\/?[^>]+(>|$)/g, ""); // Regular expression to remove HTML tags
    };

    return (
        <View style={styles.pageContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add your ingredient"
                    placeholderTextColor='gray'
                    value={value}
                    onChangeText={setValue}
                    onSubmitEditing={() => handleChange(value)}
                />
                <Button title="Add" onPress={() => handleChange(value)} />
                <Button title="Capture" onPress={() => navigation.navigate('Ditect_ingredient')} />
            </View>
            <View style={styles.chipsContainer}>
                {ingredients.map((item, index) => (
                    <View key={index} style={styles.chip}>
                        <Text style={styles.chipText}>{item}</Text>
                        <TouchableOpacity onPress={() => handleDelete(item)}>
                            <Text style={styles.deleteButton}>X</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <Button title="Search Recipes" onPress={getRecipesByIngredients} />
            <FlatList
                data={recipes}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.recipeItem} onPress={() => openModal(item)}>
                        <Image source={{ uri: item.image }} style={styles.recipeImage} />
                        <Text style={styles.recipeTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
            {selectedRecipe && recipeDetails && (
                <Modal
                    visible={modalVisible}
                    onRequestClose={closeModal}
                    animationType="slide"
                >
                    <View style={styles.modalContent}>
                        <Image source={{ uri: selectedRecipe.image }} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>{selectedRecipe.title}</Text>
                        <ScrollView>
                            <Text style={styles.modalDescription}>Summary: {stripHtmlTags(recipeDetails.summary)}</Text>
                            <Text style={styles.modalSubtitle}>Steps:</Text>
                            {recipeDetails.analyzedInstructions[0].steps.map((step, index) => (
                                <Text key={index} style={styles.stepText}>{index + 1}. {step.step}</Text>
                            ))}
                        </ScrollView>
                        <Button title="Close" onPress={closeModal} />
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8'
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'black'
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5
    },
    chipText: {
        color: 'black'
    },
    deleteButton: {
        marginLeft: 10,
        color: 'red',
        fontWeight: 'bold'
    },
    recipeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5
    },
    recipeImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    modalContent: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    modalImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black'
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20,
        color: 'black'
    },
    modalSubtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    },
    stepText: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black'
    }
});

export default RecipeGenerate;
