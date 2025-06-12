import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {IErrorBox} from '../../types';
import {normalize} from '../../utils';
import EntypoIcon from 'react-native-vector-icons/Feather';

const ErrorBox: React.FC<IErrorBox> = ({error}) => {
  if (!!!error) return null;
  return (
    <View style={styles.container}>
      <EntypoIcon name="info" style={styles.infoIcon} />
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 8,
  },
  infoIcon: {
    color: 'red',
    fontSize: normalize(12),
  },
  errorText: {
    color: 'red',
  },
});

export default ErrorBox;
