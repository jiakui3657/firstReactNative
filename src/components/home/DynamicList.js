import React from 'react'

import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Modal,
    ActivityIndicator
} from 'react-native'
import  ImageViewer  from 'react-native-image-zoom-viewer';
const { width, height } = Dimensions.get('window');

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        paddingRight:width*0.02,
        paddingLeft:width*0.02,
        paddingTop:height*0.02,
        width: '100%',
        marginTop: width*0.03
    },
    top:{
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '100%'
    },
    avatar:{
        width:width*0.08,
        height:width*0.08,
        marginRight:width*0.02,
        borderRadius: width*0.08,
        overflow: 'hidden'
    },
    personalInformation:{
        fontSize: width*0.03,
        color: '#333'
    },
    company:{
        fontSize: width*0.022,
        color: '#8d8d8d'
    },
    about:{
        fontSize: width*0.028,
        color: '#333',
        marginTop: width*0.01,
        lineHeight: 100,
        width: width*0.8,
        paddingRight: width*0.05
    },
    bottom:{
        borderTopColor: '#e3e3e3',
        borderStyle: 'solid',
        borderTopWidth: 1,
        paddingLeft: width*0.1,
        paddingRight: width*0.04,
        paddingTop: width*0.032,
        paddingBottom: width*0.032,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    },
    money:{
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    moneyImg:{
        width:width*0.04,
        height:width*0.04,
        marginRight:width*0.015
    },
    commentsImg:{
        width:width*0.04,
        height:width*0.033,
        marginRight:width*0.015
    },
    comments:{
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    praise:{
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    praiseImg:{
        width:width*0.035,
        height:width*0.035,
        marginRight:width*0.015
    },
    address:{
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom:height*0.015
    },
    addressImg:{
        width:width*0.023,
        height:width*0.031,
    },
    addressText:{
        marginLeft:width*0.023
    },
    moodImgList:{
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingRight:width*0.3,
        marginTop:width*0.02
    },
    moodImgItem:{
        width: width*0.2,
        height:  width*0.2,
        marginRight:width*0.02,
        marginBottom:width*0.02
    }
})

export default class DynamicList extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                width: new Animated.Value(width*0.035),  // 透明度初始值设为0
                index: 0,
                flag:false,
                isImageShow:false,
                imageIndex:0,
                dataArry:[]
            }
        }
        

        // 点赞
        praise=(id)=>{
            console.log(id);
            let userToken = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSMjQ2N1GqBQCna2qgDgAAAA.LHzFP66kmMr8Tcq1J96zaSGUDy3SAtMPIbkEnfA9lo5xjusjYejvCZo4nVnW7X942AIaC3giOG9CvaGWmKDdlQ'
            fetch('https://test.wangtang.com.cn/rest/feed/like.htm?commerce=1&userToken='+userToken+'&id='+id,)
            .then(res => {
                return res.json()
            })
            .then(res => {
                console.log(res)
            })
            .catch(res =>{
                console.log(res)
            });
        }

        // 评论
        comments=()=>{
            console.log('1111');
            Animated.timing(                  // 随时间变化而执行动画
                this.state.width,             // 动画中的变量值
                {
                  toValue: width*0.05,        // 透明度最终变为1，即完全不透明
                  duration: 1000,             // 让动画持续一段时间
                }
              ).start();
        }

        // 预览图片
        maxImg=(url,index)=>{
            console.log(url,index);
            this.setState({ 
                isImageShow: true,
                imageIndex: index,
                dataArry:url
            })
            console.log()
        }

        render(){
            return <View>
            {
                this.props.list.map((item,index)=>{
                    return <View style={[styles.container]} key={index}>
                    <View style={[styles.top]}>
                        <Image style={[styles.avatar]} source={{uri:item.member.avatar}}></Image>
                        <View style={[styles.dynamicInformation]}>
                            <View><Text style={[styles.personalInformation]}>{item.member.name} - {item.member.job}</Text></View>
                            <View><Text style={[styles.company]}>{item.member.companyName}</Text></View>
                            {item.catalog==1 ?(<View style={[styles.mood]}>
                                <View style={[styles.about]}><Text>{item.note}</Text></View>
                                <View style={[styles.moodImgList]}>
                                    {
                                        item.images.map((itemImg,indexImg)=>{
                                            return <TouchableOpacity onPress={() => this.maxImg(item.images,indexImg)} style={[styles.moodImgItem]} key={indexImg}><Image source={{uri:itemImg.url}} style={{width:'100%',height:'100%'}}></Image></TouchableOpacity>          
                                        })
                                    }
                                    <Modal visible={this.state.isImageShow} transparent={true}
                                   onRequestClose={()=> {
                                       this.setState({
                                           isImageShow: false,
                                       });
                                   }}>
                                <ImageViewer enableImageZoom={true} imageUrls={this.state.dataArry}
                                             onClick={()=> {
                                                 console.log('1111');
                                                 this.setState({
                                                     isImageShow: false,
                                                 });
                                             }}
                                             index={this.state.imageIndex}
                                             saveToLocalByLongPress={true}/>
                            </Modal>
                                </View>
                            </View>):(<View style={[styles.activity]}>
                                <View style={[styles.about]}><Text>{item.activity.note}</Text></View>
                                <View style={[styles.time]}><Text>活动时间：{item.date}</Text></View>
                                <View style={[styles.activityTime]}><Text>集合地点：{item.activity.address}</Text></View>
                            </View>)}
                            <View style={[styles.address]}>
                                <Image style={[styles.addressImg]} source={require('../../statics/images/home/location.png')}></Image>
                                <Text style={[styles.addressText]}>{item.address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.bottom]}>
                        {item.catalog==1 ?(item.haveRedPacket==1 ? (<TouchableOpacity style={[styles.money]}>
                            <Image style={[styles.moneyImg]} source={require("../../statics/images/home/max-money.png")}></Image>
                            <Text style={[styles.moneyText]}>抢红包</Text>
                        </TouchableOpacity>) : (null)) : (<TouchableOpacity style={[styles.money]}>
                            <Image style={[styles.moneyImg]} source={require("../../statics/images/home/max-money.png")}></Image>
                            <Text style={[styles.moneyText]}>5/10人</Text>
                        </TouchableOpacity>) }
                        <TouchableOpacity style={[styles.comments]} onPress={() => this.comments()}>
                            <Animated.Image style={[styles.commentsImg,{width: this.state.width,height: this.state.height}]} source={require("../../statics/images/home/commentsImg.png")}></Animated.Image>
                            {/* <Image style={[styles.commentsImg]} source={require("../../statics/images/home/commentsImg.png")}></Image> */}
                            <Text style={[styles.commentsText]}>{item.comments}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.praise]} onPress={() => this.praise(item.id)}>
                            {item.liked?(<Image style={[styles.praiseImg]} source={require("../../statics/images/home/yespraiseImg.png")}></Image>):(<Image style={[styles.praiseImg]} source={require("../../statics/images/home/nopraiseImg.png")}></Image>)}
                            <Text style={[styles.praiseText]}>{item.likes}</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
                })
            }
        </View>
        }
        
}