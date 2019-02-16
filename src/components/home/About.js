import React, { Component } from 'react';
import {
    WebView
  } from 'react-native';

export default class About extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log(this.props.navigation.getParam("text"))
    }

    render() {
        return <WebView
        source={{uri: 'https://test.wangtang.com.cn/saas/commerce/1.htm'}}
    />
    }
}