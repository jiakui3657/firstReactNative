import React from 'react'

import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native'
// 纵向轮播图插件
import Swiper from 'react-native-swiper'
const { width, height } = Dimensions.get('window');

const styles=StyleSheet.create({
    wrapper:{
        width:width*0.64,
        height:width*0.64,
        transform:[{rotate: "90deg"}],
        position:'absolute',
        top:0,
        left:0
    },
    slide: {
        width:width*0.64,
        height:width*0.64,
        transform:[{rotate: "-90deg"}]
    },
    headlinesNews: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: height*0.022,
        paddingBottom:  height*0.022,
        borderStyle: 'dashed',
        borderColor: '#d0d0d0',
        paddingLeft: width*0.03,
        paddingRight: width*0.03
    },
    headlinesNewsImage: {
        width: width*0.03,
        height: width*0.036
    },
    headlinesNewsPlural: {
        borderTopWidth: 1
    },
    headlinesNewsText:{
        width:width*0.5
    }
})

export default class Swiper extends React.Component{
        constructor(props){
            super(props);
        }

        render(){
            return <Swiper style={styles.wrapper} horizontal={false} autoplay showsPagination={false}>
            {
                this.props.titleList.map((item,index)=>{
                    return <View style={styles.slide} key={index}>
                    <View style={[styles.headlinesNews]}>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={[styles.headlinesNewsText]}>{this.props.titleList[index*1].title}</Text>
                        <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
                    </View>
                    <View style={[styles.headlinesNews, styles.headlinesNewsPlural]}>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={[styles.headlinesNewsText]}>{this.props.titleList[index*1].title}</Text>
                        <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
                    </View>
                </View>
                })
            }
            </Swiper>
        }
        
}