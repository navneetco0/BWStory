import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import {PostsType} from '../../types';

const PostCard = ({post}: {post: PostsType}) => (
  <View style={styles.postCard}>
    <View style={styles.postMedia}>
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
    <View style={styles.postInfo}>
      <View style={styles.postHeader}>
        <Text style={styles.postDate}>{post.date}</Text>
        <Text style={styles.postViews}>ACT | {post.views} Views</Text>
      </View>
      <Text style={styles.postTitle}>{post.title}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.postAction}>
          <Icon name="favorite-border" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.postAction}>
          <Icon name="share" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.postAction}>
          <Icon name="chat-bubble-outline" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
      <View style={styles.postLocation}>
        <Icon name="location-on" size={16} color="#6B7280" />
        <Text style={styles.locationText}>{post.location}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: '#fff',
    marginBottom: 8,
    marginHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postMedia: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaContent: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postInfo: {
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  postDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  postViews: {
    fontSize: 12,
    color: '#6B7280',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  postAction: {
    marginRight: 16,
  },
  postLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
});

export default PostCard;
