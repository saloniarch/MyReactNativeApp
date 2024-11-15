import React, { useState, useEffect } from 'react';
import { globalStyles } from '../styles/globalStyles';
import SearchBarComponent from '../components/SearchBarComponent.js'
import { View, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]); // State to hold event data
  const [searchQuery, setSearchQuery] = useState(''); // Search query input

  useEffect(() => {
    // Mock data fetching
    const fetchEvents = async () => {
      const mockEvents = [
        { id: '1', title: 'Music Festival', date: 'Nov 20', location: 'NYC', image: 'https://via.placeholder.com/150' },
        { id: '2', title: 'Tech Conference', date: 'Dec 5', location: 'San Francisco', image: 'https://via.placeholder.com/150' },
        { id: '3', title: 'Art Exhibition', date: 'Nov 30', location: 'Paris', image: 'https://via.placeholder.com/150' },
      ];
      setEvents(mockEvents);
    };

    fetchEvents();
  }, []);

  // Filter events based on the search query
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render each event card
  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetails', { event: item })}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.eventImageBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.overlay} />
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDate}>{item.date}</Text>
          <Text style={styles.eventLocation}>{item.location}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      {/* Search Bar Component */}
      <SearchBarComponent onSearchChange={setSearchQuery} />

      {/* Event List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderEventCard}
        contentContainerStyle={styles.eventList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    width: '90%',
    alignSelf: 'center',
  },
  eventImageBackground: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  eventInfo: {
    padding: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: 'white',
    marginBottom: 3,
  },
  eventLocation: {
    fontSize: 14,
    color: 'white',
  },
});

export default HomeScreen;
