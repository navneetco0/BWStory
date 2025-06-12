import {useState} from 'react';
import {useStore} from '../../states';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomHeader} from '../../components';
import {CInput, CSelect, Label, ProfilePicUpload} from '../../components/form';
import {toTitleCase} from '../../utils';
import { PRIMARY_COLOR } from '../../configs';

const {width} = Dimensions.get('window');

const UpdateAccountScreen = ({navigation}: any) => {
  const {user, updateUser} = useStore();
  const [formData, setFormData] = useState(user);

  const handleSubmit = () => {
    updateUser(formData);
    navigation.goBack();
  };

  const handleChange = (name: string) => (value: string) => {
    setFormData({...formData, [name]: value});
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader needLogo={false} backButton title="Update Account" />
      <ScrollView
        style={styles.updateForm}
        showsVerticalScrollIndicator={false}>
        <ProfilePicUpload />

        {/* Form Fields */}
        <View style={styles.formSection}>
          <CInput
            label="Name"
            value={formData.name}
            placeholder="Enter Your Name"
            onChangeText={handleChange('name')}
          />

          <CSelect
            items={['male', 'female', 'other'].map(_ => ({
              label: toTitleCase(_),
              value: _,
            }))}
            label="Gender"
            placeholder="Select Gender"
            selectedItem={formData.gender}
            onChange={handleChange('gender')}
          />

          <CInput
            label="Location"
            value={formData.location}
            placeholder="Enter Your Location"
            onChangeText={handleChange('location')}
          />

          <CInput
            label="Profession"
            value={formData.profession}
            placeholder="Enter Your Profession"
            onChangeText={handleChange('profession')}
          />

          <Label label="Bio" />
          <TextInput
            style={[styles.textInput, styles.bioInput]}
            value={formData.bio}
            onChangeText={handleChange('bio')}
            placeholder="Tell us about yourself"
            multiline
            maxLength={120}
          />
          <Text style={styles.charCount}>2/120</Text>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  updateForm: {
    flex: 1,
  },
  profilePictureSection: {
    alignItems: 'center',
    paddingVertical: 24,
    position: 'relative',
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 24,
    right: width / 2 - 80,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  formSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#111827',
  },
  dropdown: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#111827',
  },
  locationInput: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 24,
    marginHorizontal: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateAccountScreen;
