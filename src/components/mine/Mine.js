import React, { Component } from 'react';
import {Modal,View,Text} from'react-native'

import MineList from './MineList'

export default class Mine extends Component {

    constructor(props){
      super(props);

      this.state = {}
    }

    render() {
      return (
        <View>
          <MineList text='{我的444}'></MineList>
        </View>
      )
  }
}