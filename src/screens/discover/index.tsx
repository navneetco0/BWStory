import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../../states';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import {FeedPostCard} from '../../components';
import { PRIMARY_COLOR } from '../../configs';

const Discover = () => {
  const {posts} = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Entertainment', 'Lifestyle', 'Sports', 'Technology', 'Government', 'Business'];

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader showSearch showMenu />
      <View style={styles.categoryTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                selectedCategory === category && styles.activeCategoryTab,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === category && styles.activeCategoryTabText,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.feedContainer}
        showsVerticalScrollIndicator={false}>
        {posts.map(post => (
          <FeedPostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
    paddingBottom: 80
  },
  categoryTabs: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeCategoryTab: {
    backgroundColor: PRIMARY_COLOR,
  },
  categoryTabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeCategoryTabText: {
    color: '#fff',
  },
  feedContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
});

export default Discover;
