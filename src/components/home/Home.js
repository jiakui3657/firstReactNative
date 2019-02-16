import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native';
// 上拉加载下拉刷新插件
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
// 横向banner轮播图插件
import Carousel from 'react-native-looped-carousel';

import Swiper from 'react-native-swiper'
// 活动和心情组件
import DynamicList from "./DynamicList";
// 屏幕的宽高
const { width, height } = Dimensions.get('window');

// 组件样式
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#eee',
    },
    banner:{
        width: width,
        height: height*0.25
    },
    navigation:{
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: width*0.07,
        paddingRight: width*0.07,
        height: height*0.12,
        backgroundColor: '#fff'
    },
    item:{
        width: width,
        height: height*0.15,
    },
    icon:{
        width: width*0.098,
        height: width*0.098,
        marginTop: width*0.03,
        marginBottom: width*0.005,
    },
    text:{
        textAlign:'center'
    },
    TouchableOpacity:{
        width:'100%',
        height:'100%'
    },
    headlines:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: height*0.001,
        borderTopColor: '#e4e4e4',
        borderStyle: 'dashed',
        borderTopWidth: 1,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: '#fff',
        overflow:'hidden'
    },
    headlinesLeft: {
        paddingBottom: height*0.02,
        paddingTop: height*0.019,
        paddingRight: width*0.011,
        paddingLeft: width*0.011
    },
    headlinesRight:{
        paddingBottom: height*0.013,
        paddingTop: height*0.013,
        paddingRight: width*0.01,
        paddingLeft: width*0.01
    },
    headlinesCenter:{
        width: width*0.64,
        borderStyle: 'dashed',
        borderLeftColor: '#d0d0d0',
        borderLeftWidth: 1,
        overflow:'hidden',
        justifyContent:'flex-start',
        backgroundColor:'#ccc'
    },
    wrapper:{
        width:width*0.64,
        height:width*0.64,
        transform:[{rotate: "90deg"}],
        position:'absolute',
        top:0,
        left:0,
        backgroundColor:'#000'
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

export default class Home extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            bannerFlag:false,
            bannerList:[],
            list:[],
            titleFlag:false,
            titleList:[]
        };
    }

    componentWillMount() {
        Promise.all([
            fetch(
              "https://test.wangtang.com.cn/saas/rest/ad/list.htm?commerce=1"
            ).then(res => res.json()),
            fetch(
              "https://test.wangtang.com.cn/saas/rest/article/page.htm?commerce=1"
            ).then(res => res.json())
          ]).then(res => {
            console.log(res)
            this.setState({
                bannerList:res[0].list,
                titleList:res[1].list,
                bannerFlag:true,
                titleFlag:true
            })
            console.log(this.state.bannerList,res[1].list)
          }).catch(res =>{
            console.log(res)
        });
        fetch('https://test.wangtang.com.cn/saas/rest/feed/page.htm?commerce=1&no=1&size=10',)
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res)
            this.setState({
                list:res.list
            })
        })
        .catch(res =>{
            console.log(res)
        })
    }

    render() {
       return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.container]}>
            {/* 状态栏 */}
            <StatusBar
                animated={false}
                hidden={false}
                backgroundColor={'#e0210d'}
                translucent={false}
            />

            {/* banner轮播图 */}
            <View style={{width:width,height:height*0.25}}>
                <Carousel
                delay={5000}
                style={{width:width,height:height*0.25}}
                autoplay
                bullets
                >
                {this.state.bannerFlag?(this.state.bannerList.map((item,index)=>{
                        return <View key={index} style={[{ width:width,height:height*0.25 }]}>
                        <Image  style={[styles.banner]}
                            source={{uri:item.url}}
                        />
                    </View>
                    })):(<View style={[{ backgroundColor: '#fff',width:width,height:height*0.25 }]}></View>)
                }
                </Carousel>
            </View>

            {/* 自定义导航条 */}
            <View style={[styles.navigation]}>
                <View styles={[styles.item]}>
                    <TouchableOpacity
                        style={styles.TouchableOpacity}
                        activeOpacity={0.7}
                        onPress={()=>{
                            this.props.navigation.navigate('About',{text:'1111'})
                        }}
                    >
                        <Image style={[styles.icon]}
                            source={require('../../statics/images/home/homeIcon1.png')}
                        />
                        <Text onPress={()=>{
                            this.props.navigation.navigate('Introduce')
                        }} style={[styles.text]}>商会简介</Text>
                    </TouchableOpacity>
                </View>
                <View styles={[styles.item]}>
                    <TouchableOpacity
                        style={styles.TouchableOpacity}
                        onPress={()=>{
                            this.props.navigation.navigate('Home')
                        }}
                    >
                        <Image style={[styles.icon]}
                            source={require('../../statics/images/home/homeIcon2.png')}
                        />
                        <Text style={[styles.text]}>会员风采</Text>
                    </TouchableOpacity>
                </View>
                <View styles={[styles.item]}>
                    <TouchableOpacity
                        style={styles.TouchableOpacity}
                    >
                        <Image style={[styles.icon]}
                            source={require('../../statics/images/home/homeIcon3.png')}
                        />
                        <Text style={[styles.text]}>合作项目</Text>
                    </TouchableOpacity>
                </View>
                <View styles={[styles.item]}>
                    <TouchableOpacity
                        style={styles.TouchableOpacity}
                    >
                        <Image style={[styles.icon]}
                            source={require('../../statics/images/home/homeIcon4.png')}
                        />
                        <Text style={[styles.text]}>商会专供</Text>
                    </TouchableOpacity>
                </View>
            </View>
        
            {/* 头条 */}
            <View style={[styles.headlines]}>
                <View style={[styles.headlinesLeft]}>
                    <Image style={[styles.headlinesImage]} source={require('../../statics/images/home/headlinesImage.png')}></Image>
                </View>
                <View style={[styles.headlinesCenter]}>
                    <Swiper style={styles.wrapper} horizontal={false} autoplay showsPagination={false}>
                    {
                        this.state.titleList.map((item,index)=>{
                            return <View style={styles.slide} key={index}>
                            <View style={[styles.headlinesNews]}>
                                <Text ellipsizeMode={'tail'} numberOfLines={1} style={[styles.headlinesNewsText]}>{this.state.titleList[index*1].title}</Text>
                                <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
                            </View>
                            <View style={[styles.headlinesNews, styles.headlinesNewsPlural]}>
                                <Text ellipsizeMode={'tail'} numberOfLines={1} style={[styles.headlinesNewsText]}>{this.state.titleList[index*1].title}</Text>
                                <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
                            </View>
                        </View>
                        })
                    }
                    </Swiper>
                </View>
                <View style={[styles.headlinesRight]}>
                    <Image style={[styles.headlinesImage]} source={require('../../statics/images/home/homeIcon1.png')}></Image>
                </View>
            </View>

            {/* 新闻 */}
            <View>
                <DynamicList 
                    list={this.state.list}
                />
            </View>
        </View>
        </ScrollView>
       )
    }

    // home=({})=>{
    //     // if(){

    //     // }else{

    //     // }
    //     return(
    //         <ScrollView showsVerticalScrollIndicator={false}>
    //             <View style={[styles.container]}>
    //                 {/* 状态栏 */}
    //                 <StatusBar
    //                     animated={false}
    //                     hidden={false}
    //                     backgroundColor={'#e0210d'}
    //                     translucent={false}
    //                 />

    //                 {/* banner轮播图 */}
    //                 <View style={{width:width,height:height*0.25}}>
    //                     <Carousel
    //                     delay={5000}
    //                     style={{width:width,height:height*0.25}}
    //                     autoplay
    //                     bullets
    //                     >
    //                     <View style={[{ backgroundColor: '#BADA55',width:width,height:height*0.25 }]}>
    //                         <Image  style={[styles.banner]}
    //                             source={ require('../../statics/images/home/homeBanner.jpg') }
    //                         />
    //                     </View>
    //                     <View style={[{ backgroundColor: 'red',width:width,height:height*0.25 }]}>
    //                         <Image style={[styles.banner]}
    //                             source={require('../../statics/images/home/homeBanner.jpg')}
    //                         />
    //                     </View>
    //                     <View style={[{ backgroundColor: 'blue',width:width,height:height*0.25 }]}>
    //                         <Image style={[styles.banner]}
    //                             source={require('../../statics/images/home/homeBanner.jpg')}
    //                         />
    //                     </View>
    //                     </Carousel>
    //                 </View>

    //                 {/* 自定义导航条 */}
    //                 <View style={[styles.navigation]}>
    //                     <View styles={[styles.item]}>
    //                         <TouchableOpacity
    //                             style={styles.TouchableOpacity}
    //                             activeOpacity={0.7}
    //                             onPress={()=>{
    //                                 this.props.navigation.navigate('About',{text:'1111'})
    //                             }}
    //                         >
    //                             <Image style={[styles.icon]}
    //                                 source={require('../../statics/images/home/homeIcon1.png')}
    //                             />
    //                             <Text onPress={()=>{
    //                                 this.props.navigation.navigate('Introduce')
    //                             }} style={[styles.text]}>商会简介</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                     <View styles={[styles.item]}>
    //                         <TouchableOpacity
    //                             style={styles.TouchableOpacity}
    //                             onPress={()=>{
    //                                 this.props.navigation.navigate('Home')
    //                             }}
    //                         >
    //                             <Image style={[styles.icon]}
    //                                 source={require('../../statics/images/home/homeIcon2.png')}
    //                             />
    //                             <Text style={[styles.text]}>会员风采</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                     <View styles={[styles.item]}>
    //                         <TouchableOpacity
    //                             style={styles.TouchableOpacity}
    //                         >
    //                             <Image style={[styles.icon]}
    //                                 source={require('../../statics/images/home/homeIcon3.png')}
    //                             />
    //                             <Text style={[styles.text]}>合作项目</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                     <View styles={[styles.item]}>
    //                         <TouchableOpacity
    //                             style={styles.TouchableOpacity}
    //                         >
    //                             <Image style={[styles.icon]}
    //                                 source={require('../../statics/images/home/homeIcon4.png')}
    //                             />
    //                             <Text style={[styles.text]}>商会专供</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View>
                
    //                 {/* 头条 */}
    //                 <View style={[styles.headlines]}>
    //                     <View style={[styles.headlinesLeft]}>
    //                         <Image style={[styles.headlinesImage]} source={require('../../statics/images/home/headlinesImage.png')}></Image>
    //                     </View>
    //                     <View style={[styles.headlinesCenter]}>
    //                         <Swiper style={styles.wrapper} horizontal={false} autoplay showsPagination={false}>
    //                             <View style={styles.slide}>
    //                                 <View style={[styles.headlinesNews]}>
    //                                     <Text style={[styles.headlinesNewsText]}>几个几个合格合格合格合格后...1</Text>
    //                                     <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
    //                                 </View>
    //                                 <View style={[styles.headlinesNews, styles.headlinesNewsPlural]}>
    //                                     <Text style={[styles.headlinesNewsText]}>几个几个合格合格合格合格后...1</Text>
    //                                     <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
    //                                 </View>
    //                             </View>
    //                             <View style={styles.slide}>
    //                                 <View style={[styles.headlinesNews]}>
    //                                     <Text style={[styles.headlinesNewsText]}>几个几个合格合格合格合格后...2</Text>
    //                                     <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
    //                                 </View>
    //                                 <View style={[styles.headlinesNews, styles.headlinesNewsPlural]}>
    //                                     <Text style={[styles.headlinesNewsText]}>几个几个合格合格合格合格后...2</Text>
    //                                     <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
    //                                 </View>
    //                             </View>
    //                             <View style={styles.slide}>
    //                                 <View style={[styles.headlinesNews]}>
    //                                     <Text style={[styles.headlinesNewsText]}>几个几个合格合格合格合格后...3</Text>
    //                                     <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
    //                                 </View>
    //                                 <View style={[styles.headlinesNews, styles.headlinesNewsPlural]}>
    //                                     <Text style={[styles.headlinesNewsText]}>几个几个合格合格合格合格后...3</Text>
    //                                     <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
    //                                 </View>
    //                             </View>
    //                         </Swiper>
    //                         {/* <View style={[styles.headlinesNews]}>
    //                             <Text style={[styles.headlinesNewsText]}>几个几个合格合格合格合格后</Text>
    //                             <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
    //                         </View>
    //                         <View style={[styles.headlinesNews, styles.headlinesNewsPlural]}>
    //                             <Text style={[styles.headlinesNewsText]}>几个几个合格合格合格合格后</Text>
    //                             <Image style={[styles.headlinesNewsImage]} source={require('../../statics/images/home/fire.png')}></Image>
    //                         </View> */}
    //                     </View>
    //                     <View style={[styles.headlinesRight]}>
    //                         <Image style={[styles.headlinesImage]} source={require('../../statics/images/home/homeIcon1.png')}></Image>
    //                     </View>
    //                 </View>
                    
    //                 {/* 新闻 */}
    //                 <View>
    //                     <DynamicList 
    //                         list={this.state.list}
    //                     />
    //                 </View>
    //             </View>
    //         </ScrollView>
    //     )
    // }
}