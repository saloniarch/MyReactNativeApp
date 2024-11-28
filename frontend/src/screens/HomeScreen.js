import React, { useState, useEffect } from 'react';
import { globalStyles } from '../styles/globalStyles';
import SearchBarComponent from '../components/SearchBarComponent.js';
import { View, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [events, setEvents] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://192.168.0.36:8081/api/events"); // Replace IP with your laptop's IP
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data.events);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderEventCard = ({ item }) => (
        <TouchableOpacity
            style={styles.eventCard}
            onPress={() => navigation.navigate('EventDetails', { event: item })}
        >
            <ImageBackground
                source={{ uri: `http://192.168.0.36:8081/${item.picture}` }} // Use proper path
                style={styles.eventImageBackground}
                imageStyle={{ borderRadius: 10 }}
            >
                <View style={styles.overlay} />
                <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>{item.name}</Text>
                    <Text style={styles.eventDate}>{new Date(item.date).toDateString()}</Text>
                    <Text style={styles.eventLocation}>{item.address}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={globalStyles.container}>
            <SearchBarComponent onSearchChange={setSearchQuery} />
            <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item._id}
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
