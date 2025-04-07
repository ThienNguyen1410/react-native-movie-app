import React, {useState} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
  } from 'react-native';

export const DropSearch = () => {
  return (
    <View style={styles.filterSection}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Now Playing</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Sort by</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
    filterSection: {
      padding: 16,
      gap: 12,
    },
    filterButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    filterButtonText: {
      fontSize: 16,
      color: '#000',
    },
    chevron: {
      fontSize: 20,
      color: '#000',
    },
    searchContainer: {
      gap: 12,
    },
    searchInput: {
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    searchButton: {
      padding: 16,
      backgroundColor: '#E5E5E5',
      borderRadius: 8,
      alignItems: 'center',
    },
    searchButtonText: {
      color: '#000',
      fontSize: 16,
    },
  });