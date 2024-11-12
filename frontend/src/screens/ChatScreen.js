import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Animated, PanResponder, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { globalStyles } from '../styles/globalStyles'; // Import global styles

const formatTime = (date) => {
  return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
};

const Message = ({ text, timestamp, imageUri, fromCurrentUser }) => {
  const [swiped, setSwiped] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx } = gestureState;
        return Math.abs(dx) > 30;
      },
      onPanResponderGrant: () => {
        Animated.spring(translateX, {
          toValue: -100,
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

  // Dynamic styling based on sender
  const messageBubbleStyle = fromCurrentUser
    ? [globalStyles.messageBubble, globalStyles.currentUserBubble]
    : [globalStyles.messageBubble, globalStyles.otherUserBubble];

  return (
    <Animated.View 
      {...panResponder.panHandlers} 
      style={[globalStyles.messageContainer, { transform: [{ translateX }] }]}
    >
      <View style={messageBubbleStyle}>
        <Text style={globalStyles.messageText}>{text}</Text>
        {imageUri && <Image source={{ uri: imageUri }} style={globalStyles.image} />}
      </View>
      {swiped && <Text style={globalStyles.timestamp}>{timestamp}</Text>}
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
        imageUri: selectedImage || null, 
        userId: 1, // Assuming userId 1 is the current user
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setText('');
      setSelectedImage(null);
      flatListRef.current.scrollToEnd({ animated: true });
      saveMessages(updatedMessages);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null); 

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response) => {
        if (!response.didCancel && !response.error && response.assets) {
          setSelectedImage(response.assets[0].uri);
        }
      }
    );
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Message 
            text={item.text} 
            timestamp={item.timestamp} 
            imageUri={item.imageUri} 
            fromCurrentUser={item.userId === 1} // Dynamically determine if from current user
          />
        )}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end', 
          paddingBottom: 15, 
        }}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      <View style={globalStyles.inputContainer}>
        <TouchableOpacity onPress={pickImage} style={globalStyles.attachButton}>
          <Text style={globalStyles.attachButtonText}>📎</Text>
        </TouchableOpacity>
        <TextInput
          style={globalStyles.input}
          placeholder="Type a message"
          value={text}
          onChangeText={setText}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={globalStyles.sendButton}>
          <Text style={globalStyles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
