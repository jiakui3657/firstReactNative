import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const styles = {
  container: {
    flex: 1
  },
  wrapper: {
    height:width,
    transform:[{rotate: "90deg"}],
    position:'absolute',
    top:0,
    left:0,
    width:width,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    transform:[{rotate: "-90deg"}]
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  jk: {
    flex:1,
    height:1500,
    backgroundColor:'#ccc'
  },
  main:{
    flex:1,
    backgroundColor:"red",
    width:width,
    height:200,
    // position:'relative'
  }
}

export default class Phone extends Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.jk}></View>
        <View style={[styles.main]}>
          <Swiper style={styles.wrapper} horizontal={false} autoplay showsPagination={false}>
            <View style={styles.slide}>
              <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swiper>
        </View>
      </ScrollView>
    )
  }
}