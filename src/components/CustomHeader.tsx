import {DrawerActions, useNavigation} from '@react-navigation/native';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import {logo} from '../assets';
import {normalize} from '../utils';
import {useStatusBarColor} from '../hooks';
import {If} from './blocks';
import { PRIMARY_COLOR } from '../configs';

// Type the navigation correctly if you want
type RootDrawerParamList = {
  Main: undefined;
  Profile: undefined;
  // Add more if needed
};

interface CustomHeaderType {
  showMenu?: boolean;
  showSearch?: boolean;
  title?: string;
  backButton?: boolean;
  needLogo?: boolean;
}

const CustomHeader: React.FC<CustomHeaderType> = ({
  showMenu = false,
  showSearch = false,
  title,
  backButton = false,
  needLogo = true,
}) => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  const onMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // ✅ Clean & Typed
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
      <If c={backButton}>
        <TouchableOpacity onPress={goBack} style={styles.menuButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </If>
      <If c={showMenu}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      </If>
      <If c={needLogo}>
        <Image source={logo} style={styles.logo} />
      </If>
      <If c={!!title}>
        <Text style={styles.headerTitle}>{title}</Text>
      </If>
      {showSearch && (
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: PRIMARY_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logo: {
    width: normalize(120),
    aspectRatio: 1027 / 243,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  menuButton: {
    padding: 4,
  },
  searchButton: {
    padding: 4,
  },
});

export default CustomHeader;
