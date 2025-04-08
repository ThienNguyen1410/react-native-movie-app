import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
} from 'react-native';

interface DropDownMenuProps {
  title: string;
  menuItems: string[];
  onFilterChange?: (selectedItem: string) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  buttonActiveStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  dropdownStyle?: ViewStyle;
  dropdownItemStyle?: ViewStyle;
  dropdownItemTextStyle?: TextStyle;
  chevronStyle?: TextStyle;
}

export const DropDownMenu = ({ 
  title, 
  menuItems, 
  onFilterChange,
  containerStyle,
  buttonStyle,
  buttonActiveStyle,
  buttonTextStyle,
  dropdownStyle,
  dropdownItemStyle,
  dropdownItemTextStyle,
  chevronStyle,
}: DropDownMenuProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(title);

    const handleFilterSelect = (item: string) => {
      setSelectedFilter(item);
      setIsDropdownOpen(false);
      onFilterChange?.(item);
    };

    return (
    <View style={containerStyle}>
          <TouchableOpacity 
            style={[
              styles.filterButton,
              buttonStyle,
              isDropdownOpen && styles.filterButtonActive,
              isDropdownOpen && buttonActiveStyle,
            ]}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={[styles.filterButtonText, buttonTextStyle]}>
              {selectedFilter}
            </Text>
            <Text style={[styles.chevron, chevronStyle]}>
              {isDropdownOpen ? '⌄' : '›'}
            </Text>
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={[styles.dropdown, dropdownStyle]}>
              {menuItems.map((item) => (
                <TouchableOpacity 
                  key={item}
                  style={[styles.dropdownItem, dropdownItemStyle]}
                  onPress={() => handleFilterSelect(item)}
                >
                  <Text style={dropdownItemTextStyle}>{item}</Text>
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