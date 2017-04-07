/**
 * Created by SMART on 2017/3/30.
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

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var scale =  parseFloat(screenWidth/375);

class Common_A_StyleCell extends Component {

    render() {

        const {rowData} = this.props;
        var block_type = rowData.block_type;

        if(block_type == 4){
            // console.log('block_type='+block_type);
            return this.renderBlockType_4(rowData)
        }else if(block_type == 10){
            return this.renderBlockType_10(rowData)
        }else if(block_type == 13){
            return this.renderBlockType_13(rowData)
        }else if(block_type == 14){
            return this.renderBlockType_14(rowData)
        }else{//未识别类型
            return (
                <View
                    style={{width:screenWidth,height:40*scale,backgroundColor:'yellow',alignItems:'center',justifyContent:'center'}}
                ><Text>block_type={block_type}</Text></View>
            );
        }

    }


    //////////////////////////////////////////////////////////////////////
    //////////////       block_type_14 - Start  无LOGO专题折扣信息居中
    //////////////////////////////////////////////////////////////////////
    renderBlockType_14(rowData){

        //折扣信息
        var coupon_tips = rowData.coupon_tips;
        //标题描述
        var title = rowData.title;
        //时间
        var time_left =  rowData.time_left;
        //描述图片
        var image_url =  rowData.pic_url;
        return (
            <View style={styles.container}>
                <Image source={{uri:image_url}} style={{flex:8}}/>
                <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                    <Text style={styles.tipsStyle}>{coupon_tips}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text  style={{fontSize:13*scale}}>{title}</Text>
                        <Text style={{color:'gray',fontSize:12*scale}}>{time_left}</Text>
                    </View>
                </View>
            </View>
        );
    }
    //-------------------------- block_type_14-End --------------------------//

    //////////////////////////////////////////////////////////////////////
    //////////////       block_type_4 - Start
    //////////////////////////////////////////////////////////////////////
    renderBlockType_4(rowData){

        //描述图片
        var image_url =  rowData.pic_url;
        return (
            <View style={styles.container}>
                <Image source={{uri:image_url}} style={{flex:8}}/>
                {this.renderType_4_bottom(rowData)}
            </View>
        );

    }
    renderType_4_bottom(rowData){

        // console.log('title='+rowData.title);
        // console.log(rowData);

        //折扣信息
        var coupon_tips = rowData.coupon_tips;
        //标题描述
        var title = rowData.title;
        //品牌LOGO
        var logo_url = rowData.logo_url;
        //时间
        var time_left =  rowData.time_left;
        //折扣价
        var cprice = rowData.cprice;
        //原价
        var oprice = rowData.oprice;
        //直发
        var delivery_name = rowData.delivery_name;

        if(coupon_tips){

                if(logo_url.match('s2.juancdn.com')==null){
                    return (
                        <View style={{flex:2,justifyContent:'center',padding: 7}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={styles.tipsStyle}>{coupon_tips}</Text>
                                <Image source={require('../image/firstLook.png')} style={{width:48*scale,height:16*scale,resizeMode:'contain'}}/>
                            </View>
                            <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                                <Text style={{flex:8,fontSize:13*scale}} numberOfLines={1}>{title}</Text>
                                <Text style={{color:'#D9D9D9',flex:2,fontSize:12*scale,textAlign:'right'}}>{time_left}</Text>
                            </View>
                        </View>
                    );
                }else {
                    return (
                        <View style={{flex:2,justifyContent:'center',padding: 7*scale}}>
                            <Text style={styles.tipsStyle}>{coupon_tips}</Text>
                            <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                                <Text style={{flex:8,fontSize:13*scale}} numberOfLines={1}>{title}</Text>
                                <Text style={{color:'#D9D9D9',flex:2,fontSize:12*scale,textAlign:'right'}}>{time_left}</Text>
                            </View>
                            <Image source={{uri:logo_url}} style={styles.logoStyle}/>
                        </View>
                    );
                }

        }else{

            if(delivery_name!==undefined){//直发
            return(
                <View style={{flex:2,justifyContent:'center',padding: 7}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:'#F4585C',fontSize:13*scale,marginRight:4*scale}}>¥{cprice}</Text>
                            <Text style={{color:'#D9D9D9',fontSize:12*scale,textDecorationLine:'line-through'}}>¥{oprice}</Text>
                        </View>
                        <Text style={{color:'#D9D9D9',fontSize:12*scale}}>{time_left}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:4*scale}}>
                        <Text style={{paddingLeft:2*scale,paddingRight:2*scale,color:'#F88F93',fontSize:10*scale,marginRight:4*scale,borderColor:'red',borderWidth:0.5}}>{delivery_name}</Text>
                        <Text style={{fontSize:13*scale}}>{title}</Text>
                    </View>
                </View>
            )
           }else{

                if(logo_url){//品牌LOGO
                        return(
                            <View style={{flex:2,justifyContent:'center',padding: 7*scale}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:'red',fontSize:13*scale}} numberOfLines={1}>¥{cprice}</Text>
                                    <Text style={{fontSize:12*scale,marginLeft:4*scale,textDecorationLine:'line-through',color:'gray'}}>¥{oprice}</Text>
                                </View>
                                <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{flex:8,fontSize:13*scale}} numberOfLines={1}>{title}</Text>
                                    <Text style={{color:'#D9D9D9',flex:2,fontSize:12*scale,textAlign:'right'}}>{time_left}</Text>
                                </View>
                                <Image source={{uri:logo_url}} style={styles.logoStyle}/>
                            </View>
                        );
                }else{

                    return(
                        <View style={{flex:2,justifyContent:'center',padding: 7*scale}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:'red',fontSize:13*scale}} numberOfLines={1}>¥{cprice}</Text>
                                    <Text style={{fontSize:12*scale,marginLeft:4*scale,textDecorationLine:'line-through',color:'gray'}}>¥{oprice}</Text>
                                </View>
                                <Text style={{color:'#D9D9D9',fontSize:12*scale,textAlign:'right'}}>{time_left}</Text>
                            </View>
                            <Text style={{fontSize:13*scale}} numberOfLines={1}>{title}</Text>
                        </View>
                    );

                }

           }

        }


    }
    //-------------------------- block_type_4-End --------------------------//



    //////////////////////////////////////////////////////////////////////
    //////////////       block_type_13 - Start:抢先看-即将上线
    //////////////////////////////////////////////////////////////////////
    renderBlockType_13(rowData) {

        var tabname = rowData.tabname;
        if (tabname) {
            console.log(tabname);
            return (
                <View style={{height:40*scale,width:screenWidth,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'gray'}}>- {tabname} -</Text>
                </View>
            );

        } else {

            //标题
            var title = rowData.title;
            //剩余时间
            var time_left = rowData.time_left;
            //原价
            var oprice = rowData.oprice;
            //折扣价
            var cprice = rowData.cprice;
            //活动描述
            var coupon_tips = rowData.coupon_tips;
            //描述图片
            var pic_url = rowData.pic_url;

            var width = parseFloat(screenWidth / 2) - 4*scale;
            var height = parseFloat(screenWidth /2 * 1.4);
            return (
                <View style={styles.container}>
                    <Image source={{uri:pic_url}} style={{flex:10}}/>
                    <View  style={{flex:4,justifyContent:'center',padding:7*scale}}>
                        <Text style={{color:'#F4585C',flex:1}}>{coupon_tips}</Text>
                        <Text style={{flex:1}}>{title}</Text>
                        <View  style={{borderColor:'red',borderWidth:0.5,flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#F4585C'}}>抢先看</Text>
                        </View>
                    </View>
                </View>
            );

        }
    }
    //-------------------------- block_type_13-End --------------------------//


    //////////////////////////////////////////////////////////////////////
    //////////////       block_type_10 - Start:顶部描述图片底部内容滚动显示-全球购
    //////////////////////////////////////////////////////////////////////
    renderBlockType_10(rowData){
        // console.log(rowData);

        //标题
        var title = rowData.title;
        //剩余时间
        var time_left= rowData.time_left;
        //活动内容
        var mkt_info = rowData.mkt_info;
        //原价
        var oprice = rowData.oprice;
        //折扣价
        var cprice= rowData.cprice;
        //专场图片
        var goods_cover = rowData.goods_cover;
        //滚动内容
        var sub_data = rowData.sub_data;
        //内容高度
        var height =  parseFloat(screenWidth/2);

        return(
            <View style={{width:screenWidth,height:screenWidth,marginTop:7,backgroundColor:'white'}}>
                <Image source={{uri:goods_cover}} style={{flex:1}}/>
                <View style={{flex:1}}>{this.renderBottomView(sub_data)}</View>
            </View>

        );
    }

    //滚动内容
    renderBottomView(data){
        var itemArr = [];
        for(var i=0;i<data.length;i++){
            var item = data[i];

            itemArr.push(
                <View key ={i}>{this.renderBottomItemView(item)}</View>
            );
        }
        return <ScrollView
            horizontal={true}
        >{itemArr}</ScrollView>;
    }

    renderBottomItemView(item){

        //专场图片
        var pic = item.pic;
        var cp = item.cp;
        var op = item.op;

        var title = item.title;
        var itemW = parseFloat(screenWidth/3.5);
        var itemH = parseFloat(screenWidth/2);
        if(title){
            return (
                <View style={{width:itemW,height:itemH,marginLeft:7*scale,marginTop:7*scale}}>
                    <Image source={{uri:pic}} style={{flex:6}}/>
                    <View style={{flex:4,justifyContent:'center'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'red',marginRight:4*scale}}>{op}</Text>
                            <Text style={{textDecorationLine:'line-through',color:'gray'}}>{cp}</Text>
                        </View>
                        <Text>{title}</Text>
                    </View>
                </View>
            );
        }else{
            return (
                <View style={{width:itemW,height:itemH,marginLeft:7*scale,marginTop:7*scale}}>
                    <Image source={{uri:pic}} style={{flex:1}}/>
                </View>
            );
        }

    }
    //-------------------------- block_type_10-End --------------------------//

}

const styles = StyleSheet.create({
    container: {
        height:screenWidth/2*1.3 -3*scale,
        width:screenWidth/2-4*scale,
        backgroundColor: 'white',
        marginRight:4*scale,
        marginTop:3*scale,
    },
    tipsStyle:{
        color:'#F4585C',
        marginBottom:4*scale,
        fontSize:14*scale
    },
    logoStyle:{
        width:70*scale,
        height:30*scale,
        position:'absolute',
        right:7*scale,
        top:-15*scale,
        resizeMode:Image.resizeMode.contain,
        backgroundColor: 'white',
        borderColor:'#e8e8e8',
        borderWidth:.3,
    }
});

module.exports =  Common_A_StyleCell;
