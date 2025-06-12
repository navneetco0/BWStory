import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, { useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStore} from '../states';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {leaf} from '../assets';
import {If} from './blocks';
import {DISCOVER_SCREEN, PRIMARY_COLOR, PROFILE_SCREEN} from '../configs';
import Profile from '../screens/profile';

const CustomDrawerContent = ({navigation}: any) => {
  const {user} = useStore();
  const [active, setActive] = useState("");

  const menuItems = [
    {icon: 'home', label: 'Home', screen: DISCOVER_SCREEN, tab: 'MainTabs'},
    {icon: 'notifications', label: 'Notification'},
    {icon: 'person', label: 'Profile', screen: PROFILE_SCREEN, tab: 'MainTabs'},
    {icon: 'person-add', label: 'Invite Friends'},
    {icon: 'info', label: 'About us'},
    {icon: 'headset', label: 'Support'},
    {icon: 'help', label: 'FAQ'},
    {icon: 'settings', label: 'Settings'},
  ];

  const activeDrawerMenu = (screen:string) => {
    if(screen===active){
      return styles.activeDrawerMenuItem;
    }
    return {}
  }

  return (
    <SafeAreaView style={styles.drawerContainer}>
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <Image source={leaf} style={styles.leafImg} />
        <View style={styles.drawerAvatar}>
          <Icon name="person" size={30} color="#fff" />
        </View>
        <Text style={styles.drawerUserName}>{user.name}</Text>
        <If c={!!user.location}>
          <View style={styles.drawerUserLocation}>
            <Icon name="location-on" size={16} color="#fff" />
            <Text style={styles.drawerLocationText}>{user.location}</Text>
          </View>
        </If>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.drawerMenu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.drawerMenuItem, item.screen&&{...activeDrawerMenu(item.screen)}]}
            onPress={() =>{
              if(item.tab){
                navigation.navigate(item.tab, {screen: item.screen});
                setActive(item.screen);
              }
            }
            }>
            <Icon name={item.icon} size={24} color={item.screen===active?"white":PRIMARY_COLOR} />
            <Text style={[styles.drawerMenuText, {color: item.screen===active?"white": PRIMARY_COLOR}]}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.drawerMenuItem}>
          <Icon name="logout" size={24} color={PRIMARY_COLOR} />
          <Text style={styles.drawerMenuText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerHeader: {
    backgroundColor: PRIMARY_COLOR,
    // padding: 20,
    // paddingTop: 40,
    position: 'relative',
  },
  leafImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  drawerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 15,
    marginLeft: 20,
  },
  drawerUserName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginLeft: 20,
  },
  drawerUserLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 20,
  },
  drawerLocationText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
    opacity: 0.9,
  },
  drawerMenu: {
    flex: 1,
    paddingTop: 20,
  },
  activeDrawerMenuItem:{
    backgroundColor: PRIMARY_COLOR,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomColor: PRIMARY_COLOR,
  },
  drawerMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginLeft: 5
  },
  drawerMenuText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 16,
    fontWeight: '500',
  },
});

export default CustomDrawerContent;
