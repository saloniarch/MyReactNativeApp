import { StyleSheet } from 'react-native'; 
import colors from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,  // Set background to black
  },
  title: {
    fontSize: 24,
    fontFamily: 'Anton-Regular',
    color: colors.primary,  // Green color for text
  },
  button: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,  // Green button background
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,  // White text on the button
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: colors.white,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    backgroundColor: colors.beige,
    borderRadius: 20,
    paddingHorizontal: 15,
    borderColor: colors.white,
  },
  attachButton: {
    padding: 5,
    marginRight: 10,
  },
  attachButtonText: {
    fontSize: 15,
    color: colors.primary,
  },
  sendButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  messageContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flewGrow: 1,
    flexDirection: 'row', // Keep the message and timestamp in a row
    justifyContent: 'flex-end', // Align messages to the right
  },
  messageBubble: {
    backgroundColor: colors.primary, // Greenish bubble color for messages
    padding: 10,
    borderRadius: 20,
    maxWidth: '75%',  // Limit the max width of the message bubble
    marginRight: 10,  // Space between message bubble and timestamp
    alignSelf: 'flex-end',  // Align messages to the right
  },
  currentUserBubble: {
    backgroundColor: colors.primary,   // Color for current user messages
    padding: 10,
    borderRadius: 20,
    maxWidth: '75%',
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  otherUserBubble: {
    backgroundColor: colors.yellow,           // Color for other user's messages
    padding: 10,
    borderRadius: 20,
    maxWidth: '75%',
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    flex: 1,  // Allow the text to take up remaining space
    color: colors.white,
  },
  image: {
    width: 150,  // Set width for images
    height: 150,  // Set height for images
    borderRadius: 5,
    marginTop: 5,  // Space between text and image
  },
  timestamp: {
    fontSize: 12,
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.yellow,
    borderRadius: 25,        // Rounded edges
    marginHorizontal: 10,
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
  },
    toggleText: {
    marginTop: 20,
    color: '#1DB954',
    textDecorationLine: 'underline',
  },
});
