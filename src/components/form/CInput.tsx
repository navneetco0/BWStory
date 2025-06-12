import {View, TextInput, StyleSheet, Platform} from 'react-native';
import React, {useState} from 'react';
import {ICInput} from '../../types';
import {If} from '../blocks';
import {
  BORDER_PRIMARY_COLOR,
  PRIMARY_COLOR,
} from '../../configs';
import {normalize} from '../../utils';
import Label from './Label';
import ErrorBox from './ErrorBox';

const CInput: React.FC<ICInput> = ({
  label,
  required = false,
  placeholder,
  error,
  editable=true,
  ...others
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <If c={!!label}>
        <Label label={label} required={required} />
      </If>
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          error
            ? styles.errorInput
            : isFocused
            ? styles.activeInput
            : styles.inActiveInput,
          !editable&&{opacity: 0.5}
        ]}
        autoComplete="off"
        importantForAutofill="no"
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor={Platform.OS === 'ios' ? '#8e8e93' : '#6c757d'}
        textAlignVertical="center"
        {...others}
        autoCapitalize="none"
      />
      <ErrorBox error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 6,
    fontSize: normalize(16),
    height: normalize(44),
  },
  activeInput: {
    borderColor: PRIMARY_COLOR,
  },
  inActiveInput: {
    borderColor: BORDER_PRIMARY_COLOR,
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default CInput;
