import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class IconTextInput extends Component {
  static defaultProps = {
    iconName: 'ios-person',
    placeholder: '입력해주세요',
    type: 'text',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  focus() {
    this.textInput.focus();
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Ionicons
          style={styles.icon}
          name={this.props.iconName}
          size={20}
          color={'gray'}
        />
        <TextInput
          ref={r => {
            this.textInput = r;
          }}
          autoFocus={this.props.autoFocus}
          returnKeyType={this.props.returnKeyType}
          keyboardType={this.props.keyboardType}
          defaultValue={this.props.defaultValue}
          editable={this.props.editable}
          blurOnSubmit={this.props.blurOnSubmit}
          onSubmitEditing={this.props.onSubmitEditing}
          onChangeText={text => {
            this.props.onChange && this.props.onChange(text);
          }}
          style={{
            flex: 1,
            height: '100%',
          }}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default IconTextInput;
