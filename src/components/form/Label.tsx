import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ILabel} from '../../types';
import {If} from '../blocks';
import { normalize } from '../../utils';
import { TEXT_SECONDARY_COLOR } from '../../configs';

const Label: React.FC<ILabel> = ({label, required = false, style}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <If c={required}>
        <Text style={styles.required}>*</Text>
      </If>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  text: {
    fontSize: normalize(14),
    lineHeight: normalize(20),
    color: TEXT_SECONDARY_COLOR,
    fontWeight: "500"
  },
  required: {
    fontWeight: 600,
    fontSize: normalize(14),
    lineHeight: normalize(20),
    color: 'red'
  }
});

export default Label;
