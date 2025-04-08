import React, {useState} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
  } from 'react-native';

import { DropDownMenu } from './menu/drop-down-menu';
import { NOW_PLAYING, UPCOMING, POPULAR, SORT_BY_ALPHABETICAL_ORDER, SORT_BY_RATING, SORT_BY_RELEASE_DATE } from '../utils/constants';

interface DropSearchProps {
  onMovieFilterChange?: (filter: string) => void;
  onSortFilterChange?: (filter: string) => void;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export const DropSearch = ({ onMovieFilterChange, onSortFilterChange, onSearch, searchQuery }: DropSearchProps) => {
  const menuItems = [NOW_PLAYING, UPCOMING, POPULAR];
  const sortItems = [SORT_BY_ALPHABETICAL_ORDER, SORT_BY_RATING, SORT_BY_RELEASE_DATE];

  const handleSearch = (query: string) => {
    onSearch?.(query);
  };

  return (
    <View style={styles.filterSection}>
      <DropDownMenu menuItems={menuItems} onFilterChange={onMovieFilterChange} />
      <DropDownMenu menuItems={sortItems} onFilterChange={onSortFilterChange} />

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
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