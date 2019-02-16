import React, { Component } from 'react';
import {Modal,View,Text,TouchableOpacity} from'react-native'

export default class Mine extends Component {

    constructor(props){
      super(props);

      this.state = {
          flag:false
      }
    }

    click(){
        this.setState({
            flag:true
        })
    }

    render() {
      return (
        <View>
            <TouchableOpacity onPress={() => this.click()}>
                <Text>我的1</Text>
            </TouchableOpacity>
            {this.state.flag?(<Text>{this.props.text}</Text>):(null)}
        </View>
      )
  }
}