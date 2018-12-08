import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuctionItem from '../components/AuctionItem';

class MyCarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      vehicleListing: [],
    };
  }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Auction',
    };
  };

  refreshData = () => {
    this.setState({
      refreshing: true,
    });

    setTimeout(() => {
      this.setState({
        vehicleListing: MOCK_LISTING,
        refreshing: false,
      });
    }, 1000);
    // fetch(
    //   'http://localhost:3000/api/VehicleListing?filter={"include":"resolve"}'
    // )
    //   .then(r => r.json())
    //   .then(result => {
    //     console.log(result);
    //     this.setState({
    //       vehicleListing: result,
    //       refreshing: false,
    //     });
    //   });
  };
  renderItem = ({ item }) => {
    return (
      <AuctionItem
        {...item}
        onPress={() => {
          this.props.navigation.push('VehicleDetail', {
            vehicle: {
              vin: 'abc',
              manufacturer: 'Tesla',
              model: 'Model 3',
              year: 2018,
              image:
                'https://www.tesla.com/sites/default/files/images/model-3/model_3--side_profile.png?20170801',
            },
            listing: item,
            title: 'Model 3',
          }); //TODO: 실제 데이터로 변경
        }}
      />
    );
  };

  componentDidMount() {
    this.refreshData();
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        <FlatList
          style={{ flexGrow: 1 }}
          data={this.state.vehicleListing}
          renderItem={this.renderItem}
          onRefresh={this.refreshData}
          refreshing={this.state.refreshing}
          keyExtractor={(item, index) => item.listingId}
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={{
                height: StyleSheet.hairlineWidth,
                marginLeft: 20,
                width: '100%',
                backgroundColor: 'gray',
              }}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default MyCarsScreen;

const MOCK_LISTING = [
  {
    $class: 'org.acme.vehicle.auction.VehicleListing',
    listingId: 'listingId:ABCD',
    reservePrice: 3500,
    description: 'Arium Nova',
    state: 'FOR_SALE',
    offers: [
      {
        $class: 'org.acme.vehicle.auction.Offer',
        bidPrice: 2000,
        listing: {
          $class: 'org.acme.vehicle.auction.VehicleListing',
          listingId: 'listingId:ABCD',
          reservePrice: 3800,
          description: 'Arium Nova',
          state: 'FOR_SALE',
          offers: [
            {
              $class: 'org.acme.vehicle.auction.Offer',
              bidPrice: 2000,
              listing:
                'resource:org.acme.vehicle.auction.VehicleListing#listingId:ABCD',
              member: {
                $class: 'org.acme.vehicle.auction.Member',
                balance: 5000,
                email: 'memberA@acme.org',
                firstName: 'Amy',
                lastName: 'Williams',
              },
              transactionId:
                '1a170ac75b8cf59180dfd0b8fbfbb066dbc4a755cdfca387497db58df852ecd9',
              timestamp: '2018-12-04T15:32:30.207Z',
            },
            {
              $class: 'org.acme.vehicle.auction.Offer',
              bidPrice: 3800,
              listing:
                'resource:org.acme.vehicle.auction.VehicleListing#listingId:ABCD',
              member: {
                $class: 'org.acme.vehicle.auction.Member',
                balance: 5000,
                email: 'memberB@acme.org',
                firstName: 'Billy',
                lastName: 'Thompson',
              },
              transactionId:
                'bf43d1ddbb2ccc9b7a6d7f9dcddeae9a66193fece4c3f51f122f348f7cd65c3b',
              timestamp: '2018-12-04T15:32:41.705Z',
            },
          ],
          vehicle: {
            $class: 'org.acme.vehicle.auction.Vehicle',
            vin: 'vin:1234',
            owner: {
              $class: 'org.acme.vehicle.auction.Member',
              balance: 5000,
              email: 'memberA@acme.org',
              firstName: 'Amy',
              lastName: 'Williams',
            },
          },
        },
        member: {
          $class: 'org.acme.vehicle.auction.Member',
          balance: 5000,
          email: 'memberA@acme.org',
          firstName: 'Amy',
          lastName: 'Williams',
        },
        transactionId:
          '1a170ac75b8cf59180dfd0b8fbfbb066dbc4a755cdfca387497db58df852ecd9',
        timestamp: '2018-12-04T15:32:30.207Z',
      },
      {
        $class: 'org.acme.vehicle.auction.Offer',
        bidPrice: 3800,
        listing: {
          $class: 'org.acme.vehicle.auction.VehicleListing',
          listingId: 'listingId:ABCD',
          reservePrice: 3500,
          description: 'Arium Nova',
          state: 'FOR_SALE',
          offers: [
            {
              $class: 'org.acme.vehicle.auction.Offer',
              bidPrice: 2000,
              listing:
                'resource:org.acme.vehicle.auction.VehicleListing#listingId:ABCD',
              member: {
                $class: 'org.acme.vehicle.auction.Member',
                balance: 5000,
                email: 'memberA@acme.org',
                firstName: 'Amy',
                lastName: 'Williams',
              },
              transactionId:
                '1a170ac75b8cf59180dfd0b8fbfbb066dbc4a755cdfca387497db58df852ecd9',
              timestamp: '2018-12-04T15:32:30.207Z',
            },
            {
              $class: 'org.acme.vehicle.auction.Offer',
              bidPrice: 3900,
              listing:
                'resource:org.acme.vehicle.auction.VehicleListing#listingId:ABCD',
              member: {
                $class: 'org.acme.vehicle.auction.Member',
                balance: 5000,
                email: 'memberB@acme.org',
                firstName: 'Billy',
                lastName: 'Thompson',
              },
              transactionId:
                'bf43d1ddbb2ccc9b7a6d7f9dcddeae9a66193fece4c3f51f122f348f7cd65c3b',
              timestamp: '2018-12-04T15:32:41.705Z',
            },
          ],
          vehicle: {
            $class: 'org.acme.vehicle.auction.Vehicle',
            vin: 'vin:1234',
            owner: {
              $class: 'org.acme.vehicle.auction.Member',
              balance: 5000,
              email: 'memberA@acme.org',
              firstName: 'Amy',
              lastName: 'Williams',
            },
          },
        },
        member: {
          $class: 'org.acme.vehicle.auction.Member',
          balance: 5000,
          email: 'memberB@acme.org',
          firstName: 'Billy',
          lastName: 'Thompson',
        },
        transactionId:
          'bf43d1ddbb2ccc9b7a6d7f9dcddeae9a66193fece4c3f51f122f348f7cd65c3b',
        timestamp: '2018-12-04T15:32:41.705Z',
      },
    ],
    vehicle: {
      $class: 'org.acme.vehicle.auction.Vehicle',
      vin: 'vin:1234',
      owner: {
        $class: 'org.acme.vehicle.auction.Member',
        balance: 5000,
        email: 'memberA@acme.org',
        firstName: 'Amy',
        lastName: 'Williams',
      },
    },
  },
  {
    $class: 'org.acme.vehicle.auction.VehicleListing',
    listingId: 'listingId:ABCDXX',
    reservePrice: 3500,
    description: 'Arium Nova',
    state: 'FOR_SALE',
    offers: [
      {
        $class: 'org.acme.vehicle.auction.Offer',
        bidPrice: 2000,
        listing: {
          $class: 'org.acme.vehicle.auction.VehicleListing',
          listingId: 'listingId:ABCD',
          reservePrice: 3500,
          description: 'Arium Nova',
          state: 'FOR_SALE',
          offers: [
            {
              $class: 'org.acme.vehicle.auction.Offer',
              bidPrice: 2000,
              listing:
                'resource:org.acme.vehicle.auction.VehicleListing#listingId:ABCD',
              member: {
                $class: 'org.acme.vehicle.auction.Member',
                balance: 5000,
                email: 'memberA@acme.org',
                firstName: 'Amy',
                lastName: 'Williams',
              },
              transactionId:
                '1a170ac75b8cf59180dfd0b8fbfbb066dbc4a755cdfca387497db58df852ecd9',
              timestamp: '2018-12-04T15:32:30.207Z',
            },
            {
              $class: 'org.acme.vehicle.auction.Offer',
              bidPrice: 3500,
              listing:
                'resource:org.acme.vehicle.auction.VehicleListing#listingId:ABCD',
              member: {
                $class: 'org.acme.vehicle.auction.Member',
                balance: 5000,
                email: 'memberB@acme.org',
                firstName: 'Billy',
                lastName: 'Thompson',
              },
              transactionId:
                'bf43d1ddbb2ccc9b7a6d7f9dcddeae9a66193fece4c3f51f122f348f7cd65c3b',
              timestamp: '2018-12-04T15:32:41.705Z',
            },
          ],
          vehicle: {
            $class: 'org.acme.vehicle.auction.Vehicle',
            vin: 'vin:1234',
            owner: {
              $class: 'org.acme.vehicle.auction.Member',
              balance: 5000,
              email: 'memberA@acme.org',
              firstName: 'Amy',
              lastName: 'Williams',
            },
          },
        },
        member: {
          $class: 'org.acme.vehicle.auction.Member',
          balance: 5000,
          email: 'memberA@acme.org',
          firstName: 'Amy',
          lastName: 'Williams',
        },
        transactionId:
          '1a170ac75b8cf59180dfd0b8fbfbb066dbc4a755cdfca387497db58df852ecd9',
        timestamp: '2018-12-04T15:32:30.207Z',
      },
      {
        $class: 'org.acme.vehicle.auction.Offer',
        bidPrice: 3500,
        listing: {
          $class: 'org.acme.vehicle.auction.VehicleListing',
          listingId: 'listingId:ABCD',
          reservePrice: 3800,
          description: 'Arium Nova',
          state: 'FOR_SALE',
          offers: [
            {
              $class: 'org.acme.vehicle.auction.Offer',
              bidPrice: 2000,
              listing:
                'resource:org.acme.vehicle.auction.VehicleListing#listingId:ABCD',
              member: {
                $class: 'org.acme.vehicle.auction.Member',
                balance: 5000,
                email: 'memberA@acme.org',
                firstName: 'Amy',
                lastName: 'Williams',
              },
              transactionId:
                '1a170ac75b8cf59180dfd0b8fbfbb066dbc4a755cdfca387497db58df852ecd9',
              timestamp: '2018-12-04T15:32:30.207Z',
            },
            {
              $class: 'org.acme.vehicle.auction.Offer',
              bidPrice: 3800,
              listing:
                'resource:org.acme.vehicle.auction.VehicleListing#listingId:ABCD',
              member: {
                $class: 'org.acme.vehicle.auction.Member',
                balance: 5000,
                email: 'memberB@acme.org',
                firstName: 'Billy',
                lastName: 'Thompson',
              },
              transactionId:
                'bf43d1ddbb2ccc9b7a6d7f9dcddeae9a66193fece4c3f51f122f348f7cd65c3b',
              timestamp: '2018-12-04T15:32:41.705Z',
            },
          ],
          vehicle: {
            $class: 'org.acme.vehicle.auction.Vehicle',
            vin: 'vin:1234',
            owner: {
              $class: 'org.acme.vehicle.auction.Member',
              balance: 5000,
              email: 'memberA@acme.org',
              firstName: 'Amy',
              lastName: 'Williams',
            },
          },
        },
        member: {
          $class: 'org.acme.vehicle.auction.Member',
          balance: 5000,
          email: 'memberB@acme.org',
          firstName: 'Billy',
          lastName: 'Thompson',
        },
        transactionId:
          'bf43d1ddbb2ccc9b7a6d7f9dcddeae9a66193fece4c3f51f122f348f7cd65c3b',
        timestamp: '2018-12-04T15:32:41.705Z',
      },
    ],
    vehicle: {
      $class: 'org.acme.vehicle.auction.Vehicle',
      vin: 'vin:1234',
      owner: {
        $class: 'org.acme.vehicle.auction.Member',
        balance: 5000,
        email: 'memberA@acme.org',
        firstName: 'Amy',
        lastName: 'Williams',
      },
    },
  },
];
