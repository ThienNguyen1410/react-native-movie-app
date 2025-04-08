import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { BookmarkIcon, HomeIcon } from '../components/icons/icons';
import { HomeNavigator } from './home-navigator';
import { WatchListNavigator } from './watch-list-navigator';



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
        component={HomeNavigator}
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
        name="WatchList"
        component={WatchListNavigator}
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