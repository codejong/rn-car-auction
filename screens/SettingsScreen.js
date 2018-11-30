import React, { Component } from 'react';
import { View, Button } from 'react-native';

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Button
          title="Logout"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}

export default SettingsScreen;
