// RootNavigator.js

import React, { useEffect } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './home';
import Profile from './profile';
import Discover from './discover';
import {DISCOVER_SCREEN, HOME_SCREEN, PRIMARY_COLOR, PROFILE_SCREEN, UPDATE_ACCOUNT} from '../configs';
import UpdateAccountScreen from './update-account';
import { useStatusBarColor } from '../hooks';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 🧭 Bottom Tabs
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === DISCOVER_SCREEN) iconName = 'explore';
          else if (route.name === 'Local') iconName = 'location-on';
          else if (route.name === 'Add') iconName = 'add-circle';
          else if (route.name === 'Alert') iconName = 'notifications';
          else if (route.name === PROFILE_SCREEN) iconName = 'person';

          return <Icon name={iconName || ''} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name={DISCOVER_SCREEN} component={Discover} />
      <Tab.Screen name="Local" component={Home} />
      <Tab.Screen name="Add" component={Home} />
      <Tab.Screen name="Alert" component={Home} />
      <Tab.Screen name={PROFILE_SCREEN} component={Profile} />
    </Tab.Navigator>
  );
}

// 📦 Drawer that wraps Bottom Tabs
function DrawerWithBottomTabs() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f0f0f0',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        headerShown: false,
        drawerType: 'front',
      }}>
      <Drawer.Screen name="MainTabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

// 🚀 Root Navigator
export default function RootNavigator() {
  useStatusBarColor("white", "dark-content")
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={HOME_SCREEN} component={DrawerWithBottomTabs} />
      <Stack.Screen name={UPDATE_ACCOUNT} component={UpdateAccountScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 8,
    paddingTop: 8,
    height: 70,
  },
});
