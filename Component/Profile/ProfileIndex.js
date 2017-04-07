/**
 * Created by SMART on 2017/3/27.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';

import CommonNavBar from '../Main/CommonNavBar';
var ProfileIndexCell = require('./ProfileIndexCell');
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var scale =  parseFloat(screenWidth/375);
let normalH = 164*scale;

class ProfileIndex extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            headerH:normalH,
        };
      }

    static defaultProps ={
        titleArrA: ['待付款','待发货','待收货','评价返现','退款/售后'],
        iconArrA:[
                    require('../image/userInfo_nopayOrder_logo.png'),
                    require('../image/userinfo_goodsToSend.png'),
                    require('../image/userInfo_yszOrder_logo.png'),
                    require('../image/userInfo_pingjia.png'),
                    require('../image/userInfo_saleService_logo.png')
        ],
        titleArrB:['推荐有奖','会员俱乐部','意见反馈','关于卷皮','签到领钱'],
        iconArrB:[
            require('../image/userInfo_Recommend.png'),
            require('../image/userInfo_club_logo.png'),
            require('../image/userInfo_msgBack_logo.png'),
            require('../image/userInfo_about_juanpi_logo.png'),
            require('../image/userInfo_qiandao_logo.png')
        ],
    }

    //监听滚动
    onScroll(e){

      // console.log('发生滚动');
      // console.log(e.nativeEvent.contentOffset.y);
      var offsetY = e.nativeEvent.contentOffset.y;
      var contentH = normalH -offsetY > 64 ?normalH -offsetY: 64;
      this.setState({
          headerH:contentH,
      });
    }
    render() {
        const NavData = {
            leftImage: require('../image/nav_userinfo_message_icon.png'),
            rightImage: require('../image/nav_userInfo_setting_icon.png'),
            color: 'transparent',
            titleView: this.renderTitleView(),
            noShadow:true,
        }
        return (
            <View style={styles.container}>

                {/*设置背景图片*/}
                <Image source={require('../image/sign_Bg_Big.png')} style={[styles.backgroundStyle,{height:this.state.headerH}]}/>

                {/*设置导航栏*/}
                <CommonNavBar {...NavData}/>

                {/*内容View*/}
                <ScrollView
                    style={{marginBottom:7*scale}}
                    onScroll={this.onScroll.bind(this)}
                    scrollEventThrottle={50}
                >

                    {/*HeaderView*/}
                    {this.renderHeaderView()}

                    {/*分组0*/}
                    <View style={{marginBottom:7*scale}}>
                        <ProfileIndexCell title="我的订单" isShow={true}/>
                        {this.renderSection_0_BottomView()}
                    </View>

                    {/*分组1*/}
                    <View style={{marginBottom:7*scale}}>
                        <ProfileIndexCell title="优惠券" isShow={true}/>
                        <ProfileIndexCell title="余额.积分" isShow={true}/>
                        <ProfileIndexCell title="客服中心" isShow={false}/>
                    </View>

                    {/*FooterView*/}
                    {this.renderFooterView()}

                </ScrollView>
            </View>
        );
    }

    //设置标题显示
    renderTitleView() {
        return <Text style={{fontSize:18*scale,color:'white',backgroundColor:'transparent'}}>个人中心</Text>
    }

    //设置头部View
    renderHeaderView() {

        var textStyle = {marginTop:7*scale,fontSize:14*scale};
        var imageStyle = {width:25*scale,height:25*scale,resizeMode:'contain'};

        return (
            <View style={styles.headerViewStyle}>
                    <View style={styles.header_topStyle}>
                        <Text style={{color:'white',fontSize:20*scale,marginRight:30*scale}}>登录</Text>
                        <View style={{backgroundColor:'white',height:20*scale,width:1}}/>
                        <Text style={{color:'white',fontSize:20*scale,marginLeft:30*scale}}>注册</Text>
                    </View>

                    {/*商品收藏/店铺收藏/浏览足迹*/}
                    <View style={styles.header_bottomStyle}>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <Image source ={require('../image/userInfo_favGoods_logo.png')} style={imageStyle}/>
                            <Text style={textStyle}>商品收藏</Text>
                        </View>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <Image source ={require('../image/userInfo_shop_logo.png')} style={imageStyle}/>
                            <Text style={textStyle}>店铺收藏</Text>
                        </View>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <Image source ={require('../image/userInfo_browse_logo.png')} style={imageStyle}/>
                            <Text style={textStyle}>浏览足迹</Text>
                        </View>
                    </View>
            </View>
        )
    }

    //分组0底部View
    renderSection_0_BottomView(){
        let iconWH = 30*scale;
        const {titleArrA,iconArrA} = this.props;
        let COL = 5;
        return this.renderBoxView(titleArrA,iconArrA,COL,iconWH);
    }

    //设置FooterView
    renderFooterView(){

        let iconWH = 30*scale;
        let COL = 4;
        const {titleArrB,iconArrB} = this.props;
        return this.renderBoxView(titleArrB,iconArrB,COL,iconWH)

    }

    //设置九宫格布局
    renderBoxView(titleArr,iconArr,COL,iconWH){
        var itemArr = [];
        let itemW = screenWidth/COL;
        let itemH = itemW*0.7;
        for(var i=0;i<titleArr.length;i++){
            var title = titleArr[i];
            var icon = iconArr[i];
            itemArr.push(
                <View key={i} style={{alignItems:'center',height:itemH,width:itemW,justifyContent:'center'}}>
                    <Image source={icon} style={{width:iconWH,height:iconWH,resizeMode:'contain'}}/>
                    <Text style={{paddingBottom:7*scale,marginTop:4*scale,fontSize:14*scale}}>{title}</Text>
                </View>
            );
        }
        return (
            <View style={{
            flexDirection:'row',
            backgroundColor:'white',
            paddingTop:7*scale,
            flexWrap:'wrap',
            width:screenWidth,
            }}>
                {itemArr}
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    backgroundStyle:{
        width:screenWidth,
        position:'absolute',
        right:0,
        top:0,
    },
    headerViewStyle:{
        height:150*scale,
        width:screenWidth,
        backgroundColor:'transparent',
        marginBottom:7*scale,
    },
    header_topStyle:{
        flexDirection:'row',
        width:screenWidth,
        height:80*scale,
        justifyContent:'center',
        alignItems:'center',
    },
    header_bottomStyle:{
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'space-around',
        height:70*scale,
    }
});

module.exports = ProfileIndex;
