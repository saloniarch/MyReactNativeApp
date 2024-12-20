# Create Event App

A mobile application for creating and managing events. Users can register themselves, explore events, and upload event details.

## Features

- User registration and login.
- Edit profile.
- Explore events and their details.
- Create and manage events with details like name, category, description, date, and location.
- Upload event pictures.
- Cross-platform support for iOS and Android.

## Main Technologies Used

### React Native

- Used for building the mobile app with cross-platform support for both iOS and Android.

### JavaScript

- The core language used for both the app’s frontend (React Native) and backend (Node.js/Express.js).
- Node.js powers the backend
- Express.js handles the API for event creation, user authentication, and interactions with the database.

### Expo

- Simplifies development with built-in libraries like `expo-image-picker` for image selection and other essential features.

### AsyncStorage

- Stores user session data (e.g., authentication tokens) locally on the device for seamless login experience.

### MongoDB

- NoSQL database used to store event details, user data, and other related information.
