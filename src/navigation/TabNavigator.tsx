import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { BookmarkIcon, HomeIcon } from '../components/icons/icons';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#042541',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <HomeIcon />,
          tabBarShowLabel: false,
          tabBarItemStyle: {
            alignItems: 'center',
            marginTop: 10,
          }
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailScreen}
        options={{
          tabBarIcon: () => <BookmarkIcon/>,
          tabBarShowLabel: false,
          tabBarItemStyle: {
            alignItems: 'center',
            marginTop: 10,
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 