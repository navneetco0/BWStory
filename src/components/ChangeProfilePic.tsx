import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Image as ImageCompressor} from 'react-native-compressor';
import { normalize } from '../utils';
import Icon from "react-native-vector-icons/MaterialIcons";

const ChangeProfilePic = ({
  hide,
  setLoading,
}: {
  hide: () => void;
  setLoading: any;
}) => {
  const uploadAndSet = async (form: any) => {
    setLoading(true);
    try {
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const handleCameraImageUpload = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
        cameraType: 'front',
        quality: 0.5,
      },
      async (image: any) => {
        const file = image?.assets?.[0];
        if (file?.uri && file.type && file.fileName) {
          const compressedImage = await ImageCompressor.compress(file.uri);
          if (compressedImage) {
            const form = {
              uri: compressedImage,
              type: file.type,
              name: file.fileName,
            };
            uploadAndSet(form);
          } else {
            ToastAndroid.show('Failed to compress image', ToastAndroid.SHORT);
          }
        }
        hide();
      },
    );
  };

  const handleImageUpload = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      presentationStyle: 'overFullScreen',
    }).then(async (image: any) => {
      const file = image?.assets?.[0];
      if (file?.uri && file.type && file.fileName) {
      }
      hide();
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Change Your Picture</Text>
      <Option
        icon={"camera-alt"}
        title="Take a photo"
        onPress={handleCameraImageUpload}
      />
      <Option
        icon={"folder"}
        title="Choose from your file"
        onPress={handleImageUpload}
      />
    </View>
  );
};

const Option = ({
  icon,
  title,
  color,
  onPress,
}: {
  icon: any;
  title: string;
  color?: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.optContainer} onPress={onPress}>
      <Icon
        name={icon}
        color={color}
        size={normalize(30)}
      />
      <Text style={[styles.optTitle, color && {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  heading: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    textAlign: 'center',
    borderBottomColor: '#E8E8E8',
    fontWeight: 600,
    fontSize: normalize(20),
    lineHeight: normalize(28),
    marginBottom: 10,
  },
  optContainer: {
    gap: 16,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
  },
  optTitle: {
    color: '#111111',
    fontWeight: 700,
    fontSize: normalize(14),
    lineHeight: normalize(22),
  },
});

export default ChangeProfilePic;
