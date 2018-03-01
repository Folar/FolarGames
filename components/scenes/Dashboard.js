import React from 'react';
import {
  Text,
  View,
  asset,
  Pano
} from 'react-vr';

import DashboardLayout from './layouts/DashboardLayout.js';

//Scene
class Dashboard extends React.Component {
  render() {
    return (
      <View>

        <DashboardLayout text={this.props.text} />
      </View>
    )
  }
}

module.exports = Dashboard;
