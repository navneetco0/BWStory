import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import {PostsType} from '../../types';
import {useStore} from '../../states';
import {If} from '../blocks';

const FeedPostCard = ({post}: {post: PostsType}) => {
  const {user} = useStore();
  return (
    <View style={styles.feedPostCard}>
      <View style={styles.feedPostHeader}>
        <View style={styles.authorInfo}>
          <View style={styles.authorAvatar}>
            <Icon name="person" size={20} color="#6B7280" />
          </View>
          <View>
            <Text style={styles.authorName}>{post.author}</Text>
            <Text style={styles.authorLocation}>
              {post.location.split(',')[0]}
            </Text>
          </View>
        </View>
        <If c={user.name !== post.author}>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </If>
      </View>
      <View style={styles.feedPostMedia}>
        {post.type === 'image' ? (
          <Image
            source={{uri: post.media_link}}
            style={styles.mediaContent}
            resizeMode="cover"
          />
        ) : (
          <Video
            source={{uri: post.media_link}}
            style={styles.mediaContent}
            resizeMode="cover"
            paused={true} // Start paused; tap to control
          />
        )}
      </View>
      <View style={styles.feedPostInfo}>
        <View style={styles.feedPostMeta}>
          <Text style={styles.feedPostDate}>{post.date}</Text>
          <Text style={styles.feedPostCategory}>Arts | {post.views} Views</Text>
        </View>
        <Text style={styles.feedPostTitle}>{post.title}</Text>

        <View style={styles.feedPostActions}>
          <TouchableOpacity style={styles.feedPostAction}>
            <Icon name="favorite-border" size={20} color="#6B7280" />
            {post.likes > 0 && (
              <Text style={styles.actionCount}>{post.likes}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedPostAction}>
            <Icon name="share" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedPostAction}>
            <Icon name="chat-bubble-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.feedPostLocation}>
          <Icon name="location-on" size={16} color="#6B7280" />
          <Text style={styles.locationText}>{post.location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedPostCard: {
    backgroundColor: '#fff',
    marginBottom: 8,
    elevation: 4,
    borderRadius: 10,
  },
  feedPostHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 2,
  },
  authorLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  followButton: {
    borderWidth: 1,
    borderColor: '#6B7280',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  followButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  feedPostMedia: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaContent: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  videoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  feedPostInfo: {
    padding: 16,
  },
  feedPostMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  feedPostDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  feedPostCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  feedPostTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  feedPostActions: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  feedPostAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionCount: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  feedPostLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FeedPostCard;
