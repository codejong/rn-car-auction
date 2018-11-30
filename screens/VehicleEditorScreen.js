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
import IconText from '../components/IconText';

class VehicleEditorScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <IconText iconName={'ios-car'} size={20}>
          차 등록
        </IconText>
      ),
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
            <Text style={{ color: '#aaa' }}>
              <Ionicons name={'ios-warning'} /> 등록하시려는 차의 정보를 정확히
              입력해주세요.
            </Text>
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={'ios-barcode'}
              placeholder={'VIN'}
              autoFocus={true}
            />
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={'ios-construct'}
              placeholder={'제조사'}
            />
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={'ios-car'}
              placeholder={'모델명'}
            />
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={'ios-calendar'}
              placeholder={'연식'}
              keyboardType={'number-pad'}
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

export default VehicleEditorScreen;
