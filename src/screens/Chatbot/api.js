// api.js
import axios from 'axios';

const API_KEY = 'AIzaSyAceU2ykibv__mfcNddmJGnZxh4gy4QtDw';

export const fetchChatbotResponse = async (message) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        role: "model",
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    throw error;
  }
};
