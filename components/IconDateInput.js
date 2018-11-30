import React, { Component } from 'react';
// import {  } from 'react-native';
import IconTextInput from './IconTextInput';

class IconDateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <IconTextInput {...this.props} />;
  }
}

export default IconDateInput;
