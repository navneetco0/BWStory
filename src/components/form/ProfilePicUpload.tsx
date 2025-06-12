import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  BACKGROUND_PRIMARY_COLOR,
  TEXT_PRIMARY_COLOR,
} from '../../configs';
import {normalize} from '../../utils';
import {If} from '../blocks';
import {AnimatedModal} from '../ui';
import FA5 from 'react-native-vector-icons/FontAwesome';
import ChangeProfilePic from '../ChangeProfilePic';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const ProfilePicUpload = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const handlePickingMethod = () => {
    setVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <FA5 name="user-circle-o" size={normalize(200)} />
        <If c={loading}>
          <ActivityIndicator
            color={BACKGROUND_PRIMARY_COLOR}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </If>
        <TouchableOpacity
          onPress={handlePickingMethod}
          style={{
            width: normalize(50),
            height: normalize(50),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 32,
            backgroundColor: "white",
            bottom: -20,
            right: 16,
            position: 'absolute',
          }}>
          <SimpleLineIcons name="camera" size={normalize(30)} />
        </TouchableOpacity>
      </View>
      <AnimatedModal
        isVisible={visible}
        open={() => setVisible(true)}
        onHide={() => setVisible(false)}>
        <ChangeProfilePic
          setLoading={setLoading}
          hide={hideDialog}
        />
      </AnimatedModal>
    </>
  );
};

export default ProfilePicUpload;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(172, 172, 172, 0.5)',
    width: '100%',
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    position: 'absolute',
    bottom: 45,
    right: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 50,
  },
  chooseContainer: {
    width: '100%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    color: TEXT_PRIMARY_COLOR,
    marginBottom: 20,
  },
});

interface ProfileUploadProps {
  value: any;
  onChange: (value: any) => void;
}
