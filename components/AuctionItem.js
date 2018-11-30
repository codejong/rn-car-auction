import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

const DEMO_IMG =
  Math.round(Math.random() * 10) % 2
    ? 'https://www.tesla.com/tesla_theme/assets/img/compare/model_s--side_profile.png?20170524'
    : 'https://www.tesla.com/sites/default/files/images/model-3/model_3--side_profile.png?20170801';
class AuctionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // const { vehicle } = this.props;
    const vehicle = {
      model: 'Model 3',
      manufacturer: 'Tesla',
      year: 2018,
    };
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
            uri: vehicle.image || DEMO_IMG,
          }}
          //
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 22, color: '#333', fontWeight: '400' }}>
            {vehicle.model}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name={'ios-calendar'} size={15} color={'#666'} />
            <Text style={{ fontSize: 12, color: '#333', fontWeight: '300' }}>
              &nbsp;{vehicle.manufacturer}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 12,
                color: '#666',
                fontWeight: '400',
              }}
            >
              {vehicle.year}
            </Text>
            <Ionicons
              name={'ios-trending-up'}
              size={15}
              style={{ marginLeft: 10, marginRight: 5 }}
              color={'#666'}
            />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 12,
                color: '#666',
                fontWeight: '400',
              }}
            >
              {this.props.offers.length}
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: '#666', fontWeight: '300' }}>
            {this.props.description}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            paddingRight: 10,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: '300', color: '#333' }}>
            $&nbsp;
            {this.props.offers.length
              ? _.maxBy(this.props.offers, o => o.bidPrice).bidPrice
              : '-'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default AuctionItem;
