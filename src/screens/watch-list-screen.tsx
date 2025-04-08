import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useWatchlist } from '../contexts/watch-list-context';
import { MovieList } from '../components/MovieList';
import { SORT_BY_RELEASE_DATE, SORT_BY_RATING, SORT_BY_ALPHABETICAL_ORDER, SORT_BY } from '../utils/constants';
import { DropDownMenu } from '../components/menu/drop-down-menu';

type SortOrder = 'asc' | 'desc';

interface WatchListScreenProps {
  navigation: any;
}

const WatchListScreen: React.FC<WatchListScreenProps> = ({ navigation }) => {
  const [filterType, setFilterType] = useState(SORT_BY_RATING);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const menuItems = [SORT_BY_ALPHABETICAL_ORDER, SORT_BY_RATING, SORT_BY_RELEASE_DATE];
  const { watchlist } = useWatchlist();

  const onSortFilterChange = (filter: string) => {
    setFilterType(filter);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>J</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>John Lee</Text>
          <Text style={styles.memberSince}>Member since August 2023</Text>
        </View>
      </View>

      {/* Watchlist Header */}
      <Text style={styles.watchlistTitle}>My Watchlist</Text>

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filter by:</Text>
          <DropDownMenu 
            title={SORT_BY} 
            menuItems={menuItems} 
            onFilterChange={onSortFilterChange}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            dropdownStyle={styles.dropdownStyle}
            dropdownItemStyle={styles.dropdownItemStyle}
            dropdownItemTextStyle={styles.dropdownItemTextStyle}
            chevronStyle={styles.chevronStyle}
          />
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.filterLabel}>Order:</Text>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          >
            <Text style={styles.orderButtonText}>
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Movie List */}
      <MovieList movies={watchlist} sortFilter={filterType} searchQuery={''} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D253F',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0D253F',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: 12,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  memberSince: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  watchlistTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    color: '#9CA3AF',
    marginRight: 8,
  },

  buttonStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  dropdownStyle: {
    backgroundColor: '#0D253F',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 4,
  },
  dropdownItemStyle: {
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownItemTextStyle: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  chevronStyle: {
    color: '#FFFFFF',
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderButton: {
    padding: 8,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  removeButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#9CA3AF',
    fontSize: 24,
  },
});

export default WatchListScreen; 