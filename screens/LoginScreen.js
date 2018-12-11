import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconTextInput from '../components/IconTextInput';
import RoundButton from '../components/RoundButton';

class LoginScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: 'column',
          // backgroundColor: 'tomato',
          justifyContent: 'center',
        }}
        behavior="padding"
      >
        <View style={styles.container}>
          {/* <Ionicons name={'md-car'} size={100} color={'tomato'} /> */}
          <Text
            style={{
              fontSize: 30,
              color: 'tomato',
              marginTop: -20,
              fontWeight: '200',
            }}
          >
            CAR AUCTION
          </Text>
          <IconTextInput
            style={{ marginTop: 10 }}
            iconName={'ios-person'}
            placeholder={'이름'}
          />
          <IconTextInput
            style={{ marginTop: 10 }}
            iconName={'ios-mail'}
            placeholder={'이메일'}
          />
          <RoundButton
            style={{ marginTop: 10 }}
            title={'회원가입 / 로그인'}
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          />
        </View>
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

export default LoginScreen;
