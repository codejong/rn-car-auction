import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
class RoundButton extends Component {
  static defaultProps = {
    title: 'Button',
    onPress: () => {},
    color: 'white',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.touchWrap, this.props.style]}
        onPress={this.props.onPress}
      >
        <View style={[styles.container]}>
          {this.props.iconName && (
            <Ionicons
              style={{ marginRight: 10 }}
              name={this.props.iconName}
              color={this.props.color}
              size={25}
            />
          )}
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchWrap: { flexDirection: 'row', height: 50 },
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    backgroundColor: 'tomato',
    justifyContent: 'center',
    borderRadius: 5,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
});

export default RoundButton;
