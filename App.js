/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createBottomTabNavigator,createAppContainer,createStackNavigator } from 'react-navigation';
import { Image, Text, View } from 'react-native';

// TabBar相关组件
import HomeScreep from './src/components/home/Home.js'
import PhoneScreep from './src/components/phone/Phone.js'
import MineScreep from './src/components/mine/Mine.js'
import About from './src/components/home/About.js'

//创建首页的Navigation
const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreep,
    navigationOptions:{
      headerTitle:'首 页',
      headerTintColor:'#fff',
      headerStyle:{
        backgroundColor:'#e0210d'
      },
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  },
  About: {
    screen: About,
    navigationOptions:{
      headerTitle:'商会简介',
      headerTintColor:'#fff',
      headerStyle:{
        backgroundColor:'#e0210d'
      },
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  }
});

//创建通讯录的Navigation
const PhoneStack = createStackNavigator({
  Phone: {
    screen: PhoneScreep,
    // 如果是静态的，就可以写死在这里，如果是动态的，不要在这里写，应该在每个组件中进行设置
    navigationOptions:{
      headerTitle:'通讯录',
      headerTintColor:'#fff',
      headerStyle:{
        backgroundColor:'#e0210d'
      },
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  }
});

// //创建我的的Navigation
const MineStack = createStackNavigator({
  Mine: {
    screen: MineScreep,
    // 如果是静态的，就可以写死在这里，如果是动态的，不要在这里写，应该在每个组件中进行设置
    navigationOptions:{
      headerTitle:'我 的',
      headerTintColor:'#fff',
      headerStyle:{
        backgroundColor:'#e0210d'
      },
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      },
    }
  }
});

// 设置底部导航
const TabBar = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: "首页",
      tabBarIcon: ({ focused, tintColor }) => {
        return <Image 
        source={
          focused
            ? require("./src/statics/images/tarBar/homeActive.png")
            : require("./src/statics/images/tarBar/home.png")
        }
        style={{tintColor:tintColor, width: 25,height: 25}}
          />
      }
    }
  },
  Phone: {
    screen: PhoneStack,
    navigationOptions: {
      tabBarLabel: "通讯录",
      tabBarIcon: ({ focused, tintColor }) => {
        return <Image 
        source={
          focused
            ? require("./src/statics/images/tarBar/addressActive.png")
            : require("./src/statics/images/tarBar/address.png")
        }
        style={{tintColor:tintColor, width: 25,height: 25}}
          />
      }
    }
  },
  Mine: {
    screen: MineStack,
    navigationOptions: {
      tabBarLabel: "我的",
      tabBarIcon: ({ focused, tintColor }) => {
        return <Image 
        source={
          focused
            ? require("./src/statics/images/tarBar/weActive.png")
            : require("./src/statics/images/tarBar/we.png")
        }
        style={{tintColor:tintColor, width: 25,height: 25}}
          />
      }
    }
  },
},{
  tabBarOptions:{
    activeTintColor: '#f75544',
    inactiveTintColor: '#666',
  }
});

export default createAppContainer(TabBar)