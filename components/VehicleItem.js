import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class VehicleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <TouchableOpacity
        style={{
          height: 90,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={this.props.onPress}
      >
        <Image
          style={{
            height: 90,
            width: 90,
            resizeMode: 'contain',
            marginRight: 10,
            marginLeft: 20,
          }}
          source={{
            uri: this.props.image,
          }}
          //
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 22, color: '#333', fontWeight: '400' }}>
            {this.props.model}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name={'ios-calendar'}
              size={15}
              style={{ marginRight: 5 }}
              color={'#666'}
            />
            <Text style={{ fontSize: 12, color: '#333', fontWeight: '300' }}>
              {this.props.manufacturer}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 12,
                color: '#666',
                fontWeight: '400',
              }}
            >
              {this.props.year}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default VehicleItem;
