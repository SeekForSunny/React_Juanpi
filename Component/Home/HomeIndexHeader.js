/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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
var BannerSwiper = require('../Tools/BannerSwiper');

var contentH = 0;

class HomeIndexHeader extends Component {

    render() {
        const {bannerInfo} = this.props;
        var ads = bannerInfo['slide_ads'];
        var block = bannerInfo['block'];
        contentH =0;
        return (
            <View ref="FLAG" style={styles.container}>
                {this.renderBannerView(ads)}
                {this.renderBottomView(block)}
            </View>
        );
    }

    //设置轮播Banner
    renderBannerView(ads){

        if (ads){

            if(ads['config'] === undefined){ return; }

            var slide = ads['config']['slide'];
            var itemArr = [];
            for(var i=0;i<slide.length;i++){
                var info = slide[i];
                var pic = info['pic'];
                itemArr.push(pic);
            }
            if(itemArr.length){
                var viewH = 135*scale;
                contentH += viewH;
                return <BannerSwiper bannerArr ={itemArr}  bannerHeight={viewH}  swiperStyle='row'/>
            }

        }
    }

    //设置轮播Banner以外部分
    renderBottomView(block){
        if(block){
            var itemArr = [];
            var multi_block = block[0]['multi_block'];
            for(var i=0;i<multi_block.length;i++){
                var info = multi_block[i];
                itemArr.push(
                    <View key={i}>
                        {this.renderShowStyle(info)}
                    </View>
                );
            }

            return itemArr;
        }
    }

    componentDidUpdate() {
        this.refs.FLAG.setNativeProps({
            style:{
                height: contentH,
            }
        });
    }


    //解析展示样式
    renderShowStyle(info){
        var block_type = info['block_type'];
        var show_type = info['show_type'];
        var data = info['data'];
        // console.log('show_type='+show_type + '  ' + 'block_type=' + block_type);


        if (show_type==1&&block_type ==1) {
           return this.renderShowType_1_1(data)
        }
        if (show_type==1&&block_type ==2) {
           return this.renderShowType_1_2(data)
        }
        if (show_type==1&&block_type ==3) {
            return this.renderShowType_1_3(data)
        }
        if (show_type==1&&block_type ==4) {
            return this.renderShowType_1_4(data)
        }
        if (show_type==1&&block_type ==5) {
           return this.renderShowType_1_5(data)
        }
        if (show_type==1&&block_type ==6) {
            return this.renderShowType_1_6(data)
        }
        if (show_type==1&&block_type ==11) {
            return this.renderShowType_1_11(data)
        }
        if (show_type==5&&block_type ==9) {
            return  this.renderShowType_5_9(data)
        }
        if (show_type==7&&block_type ==17) {
            return  this.renderShowType_7_17(data)
        }
        if (show_type==12&&block_type ==22) {
           return this.renderShowType_12_22(data)
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    //////////                        ShowType_1_11
    ///////////////////////////////////////////////////////////////////////////
    renderShowType_1_11(dataArr){

        var itemArr = [];
        var height = 0;
        for(var i=0; i<dataArr.length;i++){
            var data = dataArr[i];
            height = parseFloat(screenWidth*data['height']);
            var width = parseFloat(screenWidth*data['width']);
            itemArr.push(
                <View key={i}>{this.render_1_11_ItemView(data,width,height)}</View>
            );

        }
        contentH += height;
        return <View style={{flexDirection:'row'}}>{itemArr}</View>
    }

    render_1_11_ItemView(data,width,height){
        var child = data['child'];
        var itemArr = [];
        for(var i=0;i<child.length;i++){
            var item = child[i];
            var pic = item.pic;
            var itemH = parseFloat(height*item['height']);
            var itemW = parseFloat(width*item['width']);
            itemArr.push(
                <Image key={i}  source={{uri:pic}} style={{width:itemW,height:itemH,resizeMode:'contain'}}/>
            );
        }

        return itemArr;

    }
    //-----------------------------ShowType_1_11 - End-----------------------------//



    ///////////////////////////////////////////////////////////////////////////
    //////////                        ShowType_7_17 - 顶部单张大图
    ///////////////////////////////////////////////////////////////////////////
    renderShowType_7_17(dataArr){
        var data = dataArr[0];
        var width = screenWidth*parseFloat(data['width']);
        var height = screenWidth*parseFloat(data['height']);
        var item = data['child'][0];
        var itemH = screenWidth*parseFloat(data['height']);
        var itemW = screenWidth*parseFloat(data['width']);
        var pic = item['pic'];
        contentH+= height;
        return(
            <View style={{width:width,height:height}}>
                <Image source={{uri:pic}} style={{width:itemW,height:itemH}}/>
            </View>
        );

    }
    //-----------------------------ShowType_7_17 - End-----------------------------//


    ///////////////////////////////////////////////////////////////////////////
    //////////                        ShowType_1_4 - Start:左一,右二(上下)
    ///////////////////////////////////////////////////////////////////////////
    renderShowType_1_4(data){
        var itemArr = [];
        var height = 0;
        var width = 0;
        for(i=0;i<data.length;i++){
            var item = data[i];
            height = screenWidth*parseFloat(item['height']);
            width = screenWidth*parseFloat(data['width']);
            itemArr.push(
                <View key={i} style={{flex:1,marginRight:0.5,borderRightColor:'#f5f5f5',borderRightWidth:.5}}>{this.renderShowType_1_4_item(item)}</View>
            );
        }
        contentH += height + 2*7*scale;
        return <View style={{flexDirection:'row',marginBottom:7*scale,marginTop:7*scale,width:width,height:height}}>{itemArr}</View>
    }

    renderShowType_1_4_item(data){
        var child = data['child'];
        if(child.length>1){
            var itemArr = [];
            for(var i=0;i<child.length;i++){
                var item= child[i];
                var image_url = item['pic'];
                itemArr.push(
                    <Image key={i} source ={{uri:image_url}} style={{flex:1,resizeMode:'contain'}}/>
                );
            }
            return itemArr;
        }else{
            var image_url = child[0]['pic'];
            return (
            <Image source={{uri:image_url}} style={{flex:1}}/>
            );
        }
    }
    //-----------------------------ShowType_1_4 - End-----------------------------//



    ///////////////////////////////////////////////////////////////////////////
    //////////                        ShowType_1_6 - Start:一行4列图标
    ///////////////////////////////////////////////////////////////////////////
    renderShowType_1_6(data){
       var itemArr = [];
       var height = 0;
        for(var i=0;i<data.length;i++){
            var item = data[i];
            var child = item['child'];
            var width= screenWidth*parseFloat(item['width']);
            height= screenWidth*parseFloat(item['height']);
            var info =child[0];
            var pic = info.pic;
            itemArr.push(
              <Image key={i} source={{uri:pic}} style={{width:width,height:height,resizeMode:'contain'}}/>
            );

        }
        contentH += height;
        return <View style={{flexDirection:'row',justifyContent:'space-between'}}>{itemArr}</View>
    }
    //-----------------------------ShowType_1_6 - End-----------------------------//



    ///////////////////////////////////////////////////////////////////////////
    //////////     ShowType_1_1 - Start:单行标题图片:必BUYS清单,每天早8点.晚8点上新等
    ///////////////////////////////////////////////////////////////////////////
    //1—1
    renderShowType_1_1(data){
        var pic = data[0]['child'][0]['pic'];
        var height = screenWidth*parseFloat(data[0]['height']);
        var width = screenWidth*parseFloat(data[0]['width']);
        contentH += height;
        return(
            <Image source ={{uri:pic}} style={{width:width,height:height,resizeMode:'contain',backgroundColor:'white'}}/>
        );
    }
    //-----------------------------ShowType_1_1 - End-----------------------------//




    ///////////////////////////////////////////////////////////////////////////
    //////////                        ShowType_1_2 - Start:单行大图标立即抢购
    ///////////////////////////////////////////////////////////////////////////
    renderShowType_1_2(data){
        var pic =  data[0]['child'][0]['pic'];
        var viewH = 100*scale;
        contentH += viewH;
       return(
           <Image source ={{uri:pic}} style={{width:screenWidth,height:viewH,resizeMode:'contain'}}/>
       );
    }
    //-----------------------------ShowType_1_2 - End-----------------------------//




    ///////////////////////////////////////////////////////////////////////////
    //////////                        ShowType_1_3 - Start:左一右一
    ///////////////////////////////////////////////////////////////////////////
    renderShowType_1_3(data){//TODO 特定情况下添加上下间距?
        var itemArr = [];
        var viewH = 0;
        for (var i=0;i<data.length;i++){
            var item = data[i];
            var width = parseFloat(item['width'])*screenWidth;
            viewH = parseFloat(item['height'])*screenWidth;
            var child = item['child'];
            var image_url = child[0]['pic'];
            itemArr.push(
                <View key={i}  style={styles.type_1_3_Style}>
                    <Image source = {{uri:image_url}} style={{width:width,height:viewH,resizeMode:'contain'}}/>
                </View>
            );
        }
        contentH += viewH;
        return <View style={{flexDirection:'row',height:viewH}}>{itemArr}</View>;

    }
    //-----------------------------ShowType_1_3 - End-----------------------------//




    ///////////////////////////////////////////////////////////////////////////
    //////////                        ShowType_1_5 - Start
    ///////////////////////////////////////////////////////////////////////////
    renderShowType_1_5(data){

        var itemArr = [];
        for (var i=0;i<data.length;i++){
            var item = data[i];
            var child = item['child'];
            var width = screenWidth*parseFloat(item['width']);
            var height = screenWidth*parseFloat(item['height']);
            var image_url = child[0]['pic'];
            itemArr.push(
                <View key={i}  style={styles.type_1_5_Style}>
                    <Image source = {{uri:image_url}} style={{width,height:height,resizeMode:'contain'}}/>
                </View>
            );
        }
        contentH += height;
        return <View style={{flexDirection:'row',height:height}}>{itemArr}</View>;
    }
    //-----------------------------ShowType_1_5 - End-----------------------------//




    ///////////////////////////////////////////////////////////////////////////
    ///////    ShowType_5_9 - Start:五列小图标:推荐有礼,新品试用,每日抽奖,直播,微信红包等
    ///////////////////////////////////////////////////////////////////////////
    renderShowType_5_9(data){
        var  child = data[0]['child'];
        let  COL = 5;
        let itemWH = screenWidth/COL;
        var itemArr = [];
        for(var i= 0;i<child.length;i++){
            let dict = child[i];
            let pic = dict['pic'];
            let title = dict['words'];
            itemArr.push(
                <View key={i} style={{alignItems:'center',justifyContent:'center',width:itemWH,height:itemWH}}>
                    <Image source={{uri:pic}} style={{width:40*scale,height:40*scale}}/>
                    <Text style={{marginTop:7,fontSize:13*scale}}>{title}</Text>
                </View>
            );
        }
        var viewH = (itemWH+7)*parseInt((child.length+COL-1)/COL);
        contentH += viewH;
        return <View style={[styles.type_5_9_Style,{height:viewH}]}>{itemArr}</View>;
    }
    //-----------------------------ShowType_5_9 - End-----------------------------//




    ///////////////////////////////////////////////////////////////////////////
    //////////                        ShowType_12_22 - Start:水平滑动类目
    ///////////////////////////////////////////////////////////////////////////
    renderShowType_12_22(data){
        var child = data['child'];
        var itemArr = [];
        var viewH = 130*scale;
        for(var i=0;i<child.length;i++){
            var item=child[i];
            var pic_url = item['pic_url'];
            itemArr.push(
                <Image key={i} source = {{uri:pic_url}} style={{width:screenWidth/3.7,height:viewH}}/>
            )
        }

        contentH += viewH+7*scale+7*scale;
        return <ScrollView
            style={{marginBottom:7*scale,marginTop:7*scale}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {itemArr}
        </ScrollView>
    }
    //-----------------------------ShowType_12_22 - End-----------------------------//



}

const styles = StyleSheet.create({
    container: {

        width:screenWidth,
        backgroundColor: '#F5FCFF',
    },
    type_5_9_Style:{
        width:screenWidth,
        flexDirection:'row',
        paddingTop:7*scale,
        flexWrap:'wrap',
        backgroundColor:'white'
    },
    type_1_3_Style:{
        flexDirection:'row',
        borderRightColor:'#e8e8e8',
        borderRightWidth:0.5,
    },
    type_1_5_Style:{
        alignItems:'center',
        justifyContent:'center',
    },
});

module.exports = HomeIndexHeader;
