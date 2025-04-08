import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  NOW_PLAYING, 
  UPCOMING, 
  POPULAR, 
  SORT_BY_ALPHABETICAL_ORDER, 
  SORT_BY_RATING, 
  SORT_BY_RELEASE_DATE 
} from '../utils/constants';

interface MovieContextType {
  movieFilter: string;
  sortFilter: string;
  setMovieFilter: (filter: string) => void;
  setSortFilter: (filter: string) => void;
  menuItems: string[];
  sortItems: string[];
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movieFilter, setMovieFilter] = useState(NOW_PLAYING);
  const [sortFilter, setSortFilter] = useState(SORT_BY_ALPHABETICAL_ORDER);
  
  const menuItems = [NOW_PLAYING, UPCOMING, POPULAR];
  const sortItems = [SORT_BY_ALPHABETICAL_ORDER, SORT_BY_RATING, SORT_BY_RELEASE_DATE];

  // Load saved filters from AsyncStorage
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const savedMovieFilter = await AsyncStorage.getItem('movieFilter');
        const savedSortFilter = await AsyncStorage.getItem('sortFilter');
        
        if (savedMovieFilter) setMovieFilter(savedMovieFilter);
        if (savedSortFilter) setSortFilter(savedSortFilter);
      } catch (error) {
        console.error('Error loading filters:', error);
      }
    };
    
    loadFilters();
  }, []);

  // Save filters to AsyncStorage when they change
  const handleMovieFilterChange = async (filter: string) => {
    try {
      await AsyncStorage.setItem('movieFilter', filter);
      setMovieFilter(filter);
    } catch (error) {
      console.error('Error saving movie filter:', error);
    }
  };

  const handleSortFilterChange = async (filter: string) => {
    try {
      await AsyncStorage.setItem('sortFilter', filter);
      setSortFilter(filter);
    } catch (error) {
      console.error('Error saving sort filter:', error);
    }
  };

  return (
    <MovieContext.Provider 
      value={{
        movieFilter,
        sortFilter,
        setMovieFilter: handleMovieFilterChange,
        setSortFilter: handleSortFilterChange,
        menuItems,
        sortItems,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
}; 