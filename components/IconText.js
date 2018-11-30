import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function IconText(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        width: '50%',
      }}
    >
      <Ionicons
        name={props.iconName}
        size={props.size ? props.size + 5 : 20}
        color={props.color || '#bbb'}
        style={{ marginRight: 10 }}
      />
      <Text
        style={{
          fontSize: props.size ? props.size : 15,
          color: props.color || '#333',
        }}
      >
        {props.children}
      </Text>
    </View>
  );
}

export default IconText;
