import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, IconButton } from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const LeftContent = props => (
    <Avatar.Icon
        {...props}
        size={40} // Increased size
        icon={() => <FontAwesomeIcon name="user-circle" size={32} color="black" />}
        style={styles.avatarIcon}
    />
);

const Cards = () => {
    const [isHeartActive, setIsHeartActive] = useState(false);

    const handleHeartPress = () => {
        setIsHeartActive(!isHeartActive);
    };

    return (
        <Card mode="contained" style={{ margin: 5 }}>
            <Card.Title title="Milan Sandakelum" subtitle="2024.05.21" left={LeftContent} />
            <Card.Content>
                <Text variant="titleMedium">Recipe title : Mango juice</Text>
                <Text variant="bodyMedium">Ingredients : Mangoes, salt, sugar, milk</Text>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
                <View style={{ flexDirection: 'row', marginRight:'70%' }}>
                    <IconButton
                        icon={() => (
                            <FontAwesomeIcon
                                name="heart"
                                size={30}
                                color={isHeartActive ? 'red' : 'black'} // Changed to toggle between red and black
                            />
                        )}
                        onPress={handleHeartPress}
                    />
                    <IconButton
                        icon={() => <FontAwesomeIcon name="comment" size={35} color="black" />}
                        onPress={() => {}}
                    />
                </View>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    avatarIcon: {
        backgroundColor: '#e0e0e0',
    },
});

export default Cards;
