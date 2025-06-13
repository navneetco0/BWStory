import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CustomHeader, If, PostCard} from '../../components';
import {useStore} from '../../states';
import {PRIMARY_COLOR, UPDATE_ACCOUNT} from '../../configs';

const Profile = ({navigation}: any) => {
  const {user, posts} = useStore();
  const userPosts = posts.filter(post => post.author === user.name);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader showMenu showSearch />
      <ScrollView
        contentContainerStyle={styles.profileContainer}
        showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <View style={styles.profileAvatar}>
              <Icon name="person" size={40} color="#6B7280" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <If c={!!user.location}>
                <View style={styles.userDetails}>
                  <Icon name="location-on" size={16} color="#6B7280" />
                  <Text style={styles.userLocation}>{user.location}</Text>
                </View>
              </If>
              <If c={!!user.profession}>
                <View style={styles.userDetails}>
                  <Icon name="work" size={16} color="#6B7280" />
                  <Text style={styles.userProfession}>{user.profession}</Text>
                </View>
              </If>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate(UPDATE_ACCOUNT)}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.trashButton}>
              <Text style={styles.trashButtonText}>Trash</Text>
            </TouchableOpacity>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>1</Text>
                <Text style={styles.statLabel}>Feed</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Blocked Profiles</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About Me */}
        <View style={styles.aboutSection}>
          <View style={styles.aboutHeader}>
            <Text style={styles.aboutTitle}>About me</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Drafts</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>History</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.aboutText}>{user.bio}</Text>
        </View>

        {/* Posts */}
        {userPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
    // paddingBottom: 80
  },
  profileContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  profileHeader: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  userProfession: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trashButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 16,
  },
  trashButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  aboutSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  aboutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  aboutText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default Profile;
