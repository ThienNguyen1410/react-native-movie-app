import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { DropSearch } from '../components/DropSearch';
import { MovieCard } from '../components/card/movie-card';


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/icons/logo.png')}/>
      </View>

      <DropSearch />

      <ScrollView style={styles.movieList}>
        <MovieCard
          title="Barbie"
          date="19 July 2023"
          description="Barbie and Ken are having the time of their lives in the colorful and..."
          image={require('../assets/icons/home.png')}
        />
        <MovieCard
          title="The Flash"
          date="13 June 2023"
          description="When his attempt to save his family inadvertently alters the future, Barr..."
          image={require('../assets/icons/home.png')}
        />
        <MovieCard
          title="The Little Mermaid"
          date="18 May 2023"
          description="The youngest of King Triton's daughters, and the most defiant..."
          image={require('../assets/icons/home.png')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#01b4e4',
  },
  movieList: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen; 