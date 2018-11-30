import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconTextInput from '../components/IconTextInput';
import RoundButton from '../components/RoundButton';
import VehicleItem from '../components/VehicleItem';

class ListingEditorScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Auction Listing',
      //navigation.getParam('otherParam', 'A Nested Details Screen'),
      headerLeft: (
        <TouchableOpacity
          style={{ paddingLeft: 15 }}
          onPress={() => {
            navigation.goBack(null);
          }}
        >
          <Ionicons name={'ios-close'} size={44} color={'#aaa'} />
        </TouchableOpacity>
      ),
    };
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        behavior="padding"
        keyboardVerticalOffset={64}
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column',

            justifyContent: 'center',
          }}
        >
          <View style={styles.container}>
            {/* <VehicleItem /> */}
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={'ios-list'}
              placeholder={'Description'}
              autoFocus={true}
            />
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={'ios-pricetag'}
              placeholder={'Reserve Price'}
            />

            <RoundButton
              iconName={'ios-add'}
              style={{ marginTop: 10 }}
              title={'등록 하기'}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'column',
    padding: 30,
    alignItems: 'center',
  },
});

export default ListingEditorScreen;
