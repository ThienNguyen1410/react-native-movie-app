import { TouchableOpacity, Image, View, Text, StyleSheet, ImageSourcePropType } from "react-native";

export const MovieCard = ({ title, date, description, image }: { title: string, date: string, description: string, image: ImageSourcePropType }) => (
    <TouchableOpacity style={styles.movieCard}>
      <Image source={image} style={styles.movieImage} />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{title}</Text>
        <Text style={styles.movieDate}>{date}</Text>
        <Text numberOfLines={2} style={styles.movieDescription}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({

    movieList: {
      flex: 1,
      padding: 16,
    },
    movieCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    movieImage: {
      width: 100,
      height: 150,
      resizeMode: 'cover',
    },
    movieInfo: {
      flex: 1,
      padding: 12,
    },
    movieTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    movieDate: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
    },
    movieDescription: {
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
    },
  });