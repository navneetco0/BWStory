import React, {useEffect} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const AnimatedModal = ({
  isVisible,
  open,
  onHide,
  children,
  style,
  animationappearance = 'bottom',
  fullWidth = false,
  alignment = 'center',
}: {
  isVisible: boolean;
  open: () => void;
  onHide?: () => void;
  children: React.ReactNode;
  style?: any;
  animationappearance?: 'bottom' | 'top';
  fullWidth?: boolean;
  alignment?: 'center' | 'top' | 'bottom';
}) => {
  const animatedValue = new Animated.Value(0);

  const showModal = () => {
    open();
    Platform.OS === 'ios' &&
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
  };

  const hideModal = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(onHide);
  };

  useEffect(() => {
    if (isVisible) {
      showModal();
    } else {
      hideModal();
    }
  }, [isVisible]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [animationappearance === 'top' ? -500 : 500, 0],
  });

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <View
        style={[
          styles.backdrop,
          alignment === 'bottom' && {justifyContent: 'flex-end'},
          style,
        ]}>
        <TouchableOpacity
          disabled={!!!onHide}
          onPress={Platform.OS === 'ios'?hideModal:onHide}
          style={styles.overlay}
        />
        <SafeAreaView
          style={{width: '100%', paddingHorizontal: fullWidth ? 0 : 24}}>
          {Platform.OS === 'ios' ? (
            <Animated.View
              style={[
                styles.modalContainer,
                alignment === 'bottom' && {
                  borderBottomEndRadius: 0,
                  borderBottomLeftRadius: 0,
                },
                {transform: [{translateY: translateY}]},
              ]}>
              {children}
            </Animated.View>
          ) : (
            <View
              style={[
                styles.modalContainer,
                alignment === 'bottom' && {
                  borderBottomEndRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              ]}>
              {children}
            </View>
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    overflow: 'hidden',
  },
});

export default AnimatedModal;
