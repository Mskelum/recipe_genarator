import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchChatbotResponse } from './api';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    try {
      const botResponse = await fetchChatbotResponse(input);
      const botMessage = { role: 'model', content: botResponse };
      setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatbot</Text> 
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.role === 'user' ? styles.userMessageContainer : styles.botMessageContainer}>
            <Text style={item.role === 'user' ? styles.userMessage : styles.botMessage}>
              {item.content}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor='gray'
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: 'black',
  },
  sendButton: {
    backgroundColor: '#007aff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    maxWidth: '75%',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    marginVertical: 5,
    maxWidth: '75%',
  },
  userMessage: {
    padding: 10,
    backgroundColor: '#dcf8c6',
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    color: '#000',
  },
  botMessage: {
    padding: 10,
    backgroundColor: '#ececec',
    borderRadius: 15,
    borderBottomRightRadius: 0,
    color: '#000',
  },
});

export default Chatbot;
