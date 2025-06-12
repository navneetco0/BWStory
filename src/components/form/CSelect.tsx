import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  Easing,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {If} from '../blocks';
import {normalize, toTitleCase} from '../../utils';
import {
  BACKGROUND_PRIMARY_COLOR,
  BORDER_PRIMARY_COLOR,
  PRIMARY_COLOR,
  TEXT_PRIMARY_COLOR,
} from '../../configs';
import Label from './Label';
import ErrorBox from './ErrorBox';
import { Chevron } from '../ui';
import { Typography } from './Typography';

const {height} = Dimensions.get('window');

const CSelect = ({
  label,
  placeholder,
  required,
  leftIcon,
  error,
  items,
  selectedItem,
  onChange,
}: CSelectProps) => {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const openModal = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 400,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };
  const handleSelect = (item: any) => {
    onChange(item.value);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Label label={label || ''} required={required} />
      <TouchableOpacity
        style={[
          styles.input,
          visible
            ? {borderColor: PRIMARY_COLOR}
            : {borderColor: BORDER_PRIMARY_COLOR},
        ]}
        onPress={openModal}>
        <If c={!!leftIcon}>
          <View style={[styles.Icon, styles.leftIcon]}>{leftIcon}</View>
        </If>
        <Text
          style={[styles.placeholder, !selectedItem && {opacity: 0.4}]}>
          {selectedItem?toTitleCase(selectedItem) : placeholder}
        </Text>
        <View style={[styles.Icon, styles.rightIcon]}>
          <Chevron direction={visible ? 'top' : 'bottom'} size={20} />
        </View>
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={closeModal}>
        <View style={styles.overlay}>
          <TouchableOpacity
            onPressOut={closeModal}
            activeOpacity={1}
            style={styles.blankOverlay}
          />
          <Animated.View
            style={[
              styles.modalContainer,
              {transform: [{translateY: slideAnim}]},
            ]}>
            <Typography variant="H2" style={styles.title}>
              {toTitleCase(placeholder || '')}
            </Typography>
            <ScrollView contentContainerStyle={{gap: 10}}>
              {items.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    key={index}
                    style={[styles.item]}
                    onPress={() => handleSelect(item)}>
                    <View
                      style={[
                        styles.gradientBackground,
                        selectedItem === item?.value && {
                          backgroundColor: PRIMARY_COLOR,
                        },
                      ]}>
                      <Typography
                        variant="H3"
                        color={
                          selectedItem === item?.value
                            ? BACKGROUND_PRIMARY_COLOR
                            : TEXT_PRIMARY_COLOR
                        }
                        style={styles.itemText}>
                        {item.label}
                      </Typography>
                      <CustomRadio selected={selectedItem === item?.value} />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
      <ErrorBox error={error} />
    </View>
  );
};

const CustomRadio: React.FC<CustomRadioProps> = ({selected}) => {
  return (
    <View
      style={[
        styles.radioOuter,
        selected && {borderColor: BACKGROUND_PRIMARY_COLOR},
      ]}>
      <If c={!!selected}>
        <View style={styles.radioInner} />
      </If>
    </View>
  );
};

interface CustomRadioProps {
  selected?: boolean;
}

export default CSelect;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    rowGap: 8,
    width: '100%',
    position: 'relative',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blankOverlay: {
    backgroundColor: 'rgba(0, 8, 25, .6)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
  },
  modalContainer: {
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    paddingHorizontal: normalize(16),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    maxHeight: height / 1.2,
    backgroundColor: BACKGROUND_PRIMARY_COLOR,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: TEXT_PRIMARY_COLOR,
    fontFamily: 'Inter 18pt Medium',
    fontSize: normalize(16),
    lineHeight: normalize(19),
    justifyContent: 'center',
  },
  Icon: {
    position: 'absolute',
    top: 0,
    paddingRight: 16,
    bottom: 0,
    justifyContent: 'center',
  },
  rightIcon: {
    right: 0,
  },
  leftIcon: {
    left: 0,
  },
  placeholder: {
    color: TEXT_PRIMARY_COLOR,
    fontFamily: 'Inter 18pt Medium',
    fontSize: normalize(16),
    lineHeight: normalize(19),
  },
  title: {
    lineHeight: normalize(31),
    fontFamily: 'Inter 18pt SemiBold',
    marginBottom: 12,
    color: TEXT_PRIMARY_COLOR,
    textAlign: 'center',
  },
  item: {},
  itemText: {
    lineHeight: normalize(24.2),
  },
  radioOuter: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: 18,
    borderWidth: normalize(1.5),
    borderColor: BORDER_PRIMARY_COLOR,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: normalize(13),
    height: normalize(13),
    borderRadius: 13,
    backgroundColor: BACKGROUND_PRIMARY_COLOR,
  },
  gradientBackground: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

interface CSelectProps {
  items: any[];
  selectedItem: string | undefined;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  keyboardType?: 'default' | 'number-pad';
  multiline?: boolean;
  error?: string;
  inputStyle?: {};
  labelStyle?: {};
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onChange: (item: any) => void;
}
