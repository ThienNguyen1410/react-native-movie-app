import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';

const DetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{uri: 'https://via.placeholder.com/400x600'}}
          style={styles.poster}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Movie Title</Text>
          <Text style={styles.rating}>Rating: 8.5/10</Text>
          <Text style={styles.year}>Release Year: 2024</Text>
          <Text style={styles.genre}>Genre: Action, Adventure</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  year: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  genre: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default DetailScreen;
