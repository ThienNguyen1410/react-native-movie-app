import React, {useState} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';

interface DropDownMenuProps {
  title: string;
  menuItems: string[];
  onFilterChange?: (selectedItem: string) => void;
}

export const DropDownMenu = ({ title, menuItems, onFilterChange }: DropDownMenuProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(title);

    const handleFilterSelect = (item: string) => {
      setSelectedFilter(item);
      setIsDropdownOpen(false);
      onFilterChange?.(item);
    };

    return (
    <View>
          <TouchableOpacity 
            style={[
              styles.filterButton,
              isDropdownOpen && styles.filterButtonActive
            ]}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={styles.filterButtonText}>{selectedFilter}</Text>
            <Text style={styles.chevron}>{isDropdownOpen ? '⌄' : '›'}</Text>
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdown}>
              {menuItems.map((item) => (
                <TouchableOpacity 
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => handleFilterSelect(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
  )
}

const styles = StyleSheet.create({
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
    filterButtonActive: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    dropdown: {
      backgroundColor: '#fff',
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderTopWidth: 0,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    dropdownItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    filterButtonText: {
      fontSize: 16,
      color: '#000',
    },
    chevron: {
      fontSize: 20,
      color: '#000',
    },
  });