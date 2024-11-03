import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Animated, PanResponder, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const formatTime = (date) => {
  return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
};

const Message = ({ text, timestamp, imageUri }) => {
  const [swiped, setSwiped] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx } = gestureState;
        return Math.abs(dx) > 30; // Threshold for swipe
      },
      onPanResponderGrant: () => {
        Animated.spring(translateX, {
          toValue: -100, // Adjust this value for the swipe distance
          useNativeDriver: true,
        }).start(() => setSwiped(true));
      },
      onPanResponderRelease: () => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start(() => setSwiped(false));
      },
    })
  ).current;

  return (
    <Animated.View 
      {...panResponder.panHandlers} 
      style={[styles.messageContainer, { transform: [{ translateX }] }]}
    >
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{text}</Text>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
      {swiped && <Text style={styles.timestamp}>{timestamp}</Text>}
    </Animated.View>
  );
}

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const flatListRef = useRef();

  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error("Error loading messages", error);
    }
  };

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
    } catch (error) {
      console.error("Error saving messages", error);
    }
  };

  const sendMessage = () => {
    if (text.trim() || selectedImage) {
      const newMessage = {
        id: Date.now().toString(),
        text: text.trim(),
        timestamp: formatTime(new Date()),
        imageUri: selectedImage || null, // Include the image URI if one is selected
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setText('');
      setSelectedImage(null); // Reset the selected image after sending
      flatListRef.current.scrollToEnd({ animated: true });
      saveMessages(updatedMessages); // Save messages whenever they change
    }
  };

  const [selectedImage, setSelectedImage] = useState(null); // State for selected image

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response) => {
        if (!response.didCancel && !response.error && response.assets) {
          setSelectedImage(response.assets[0].uri); // Set the selected image URI
        }
      }
    );
  };

  useEffect(() => {
    loadMessages(); // Load messages when component mounts
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Message text={item.text} timestamp={item.timestamp} imageUri={item.imageUri} />
        )}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.attachButton}>
          <Text style={styles.attachButtonText}>📎</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={text}
          onChangeText={setText}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f1ef',
  },
  messagesContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    flexDirection: 'row', // Keep the message and timestamp in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'flex-end', // Align items to the end (right)
    marginVertical: 5, // Space between messages
  },
  messageBubble: {
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 5,
    maxWidth: '75%', // Less stretched message width
    marginRight: 10, // Space between message bubble and timestamp
    alignSelf: 'flex-end', // Align the message bubble to the right
  },
  messageText: {
    fontSize: 16,
    flex: 1, // Allow text to grow
  },
  image: {
    width: 150, // Set width for images
    height: 150, // Set height for images
    borderRadius: 5,
    marginTop: 5, // Space between text and image
  },
  timestamp: {
    fontSize: 12,
    color: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1DB954',
    borderRadius: 5,
    marginLeft: 5,
  },
  attachButton: {
    padding: 5, // Adjust padding for a subtle look
  },
  attachButtonText: {
    fontSize: 15,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
