import {Animated, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {normalize} from '../../utils';
import {TEXT_PRIMARY_COLOR} from '../../configs';
import Feather from 'react-native-vector-icons/Feather';

const directions = ['left', 'right', 'top', 'bottom'];

interface ChevronProps {
  direction?: 'bottom' | 'right' | 'left' | 'top';
  size?: number;
  tintColor?: string;
}

const Chevron: React.FC<ChevronProps> = ({
  size = 12,
  tintColor = TEXT_PRIMARY_COLOR,
  direction = 'bottom',
}) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(rotateValue, {
      toValue: directions.findIndex(d => d === direction),
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [direction]);

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ['90deg', '270deg', '180deg', '0deg'],
  });
  return (
    <Animated.View style={[{transform: [{rotate: rotation}]}]}>
      <Feather
        name="chevron-down"
        style={{
          fontSize: normalize(size),
          color: tintColor,
        }}
      />
    </Animated.View>
  );
};

export default Chevron;
