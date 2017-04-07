/**
 * Created by SMART on 2017/3/29.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    ScrollView
} from 'react-native';

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var scale =  parseFloat(screenWidth/375);
var BannerSwiper = require('../Tools/BannerSwiper');

var contentH = 0;
class LivingIndexHeader extends Component {

    render() {
        contentH = 0;
        return (
            <View ref="FLAG" style={styles.container}>
               {this.renderContentView()}
            </View>
        );

    }
    renderContentView(){
        const {bannerInfo} = this.props;
        if(bannerInfo['block']!== undefined){
            var multi_block = bannerInfo['block'][0]['multi_block'];
            var itemArr = [];
            for(var i=0;i<multi_block.length;i++){
                var item =  multi_block[i];
                itemArr.push(
                    <View key={i}>
                        {this.renderShowStyle(item)}
                    </View>
                );
            }
            return itemArr;
        }
    }

    renderShowStyle(item){

        var block_type = item['block_type'];
        var show_type = item['show_type'];
        // console.log('show_type='+show_type +'  '+ 'block_type = '+block_type );
        if(show_type==1&&block_type==1){
            return this.renderShowType_1_1(item['data'])
        }

        if(show_type==1&&block_type==3){
            return this.renderShowType_1_3(item['data'])
        }

        if(show_type==1&&block_type==5){
            return this.renderShowType_1_5(item['data'])
        }

        if(show_type==1&&block_type==15){
            return this.renderShowType_1_15(item['data'])
        }

        if(show_type==1&&block_type==23){
            return this.renderShowType_1_23(item['data'])
        }

        if(show_type==6&&block_type==16){
            return this.renderShowType_6_16(item['data'])
        }

        if(show_type==10&&block_type==20){//顶部轮播图片
            return this.renderShowType_10_20(item['data'])
        }

        if(show_type==13&&block_type==23){
            return this.renderShowType_13_23(item['data'])
        }

        if(show_type==14&&block_type==24){
            return this.renderShowType_14_24(item['data'])
        }
    }

    renderShowType_1_15(dataArr){
        var itemArr = [];
        let COL = 4;
        var height = 100*scale;
        var width =  screenWidth/COL;

        for(var i=0;i<dataArr.length;i++){
            var item = dataArr[i]['child'][0];
            var pic = item.pic;
            itemArr.push(
                <Image key={i} source={{uri:pic}} style={{width:width,height:height,resizeMode:'contain'}}/>
            );

        }
        var viewH = 100*scale*parseInt((dataArr.length+COL-1)/COL);
        contentH += viewH;
        return <View style={styles.type_1_15_Style}>{itemArr}</View>
    }

    renderShowType_1_1(data){
        var pic = data[0]['child'][0]['pic'];
        var viewH = screenWidth*parseFloat(data[0]['height']);
        var width = screenWidth*parseFloat(data[0]['width']);
        contentH += viewH;
        return(
            <Image source ={{uri:pic}} style={{width:width,height:viewH,resizeMode:'contain',backgroundColor:'white'}}/>
        );
    }

    renderShowType_1_3(dataArr){

        var itemArr = [];
        for (var i=0;i<dataArr.length;i++){
            var item = dataArr[i];
            var height = screenWidth*parseFloat(item.height);
            var width = screenWidth*parseFloat(item.width);
            var info = item['child'][0];
            var pic = info['pic'];
            itemArr.push(
                <Image key={i} source={{uri:pic}} style={{width:width,height:height}}/>
            )
        }
        contentH += height;
        return <View style={{flexDirection:'row'}}>{itemArr}</View>
    }

    renderShowType_1_5(dataArr){
        var itemArr = [];
        for (var i=0;i<dataArr.length;i++){
            var item = dataArr[i];
            var height = screenWidth*parseFloat(item.height);
            var width = screenWidth*parseFloat(item.width);
            var info = item['child'][0];
            var pic = info['pic'];
            itemArr.push(
                <View key={i} style={{marginRight:0.5,borderRightColor:'#e8e8e8',borderRightWidth:0.5}}>
                    <Image key={i} source={{uri:pic}} style={{width:width,height:height}}/>
                </View>
            )
        }
        contentH += height+2*7*scale;
        return <View style={{flexDirection:'row',marginTop:7*scale,marginBottom:7*scale}}>{itemArr}</View>

    }

    ///////////////////////////////////////////////////////////////////////////
    //////////                        生活头条 - Start
    ///////////////////////////////////////////////////////////////////////////

    renderShowType_6_16(dataArr){
        var pic = dataArr[0]['pic'];
        //轮播文字
        var child =  dataArr[0]['child'];
        var textArr = [];
        for(var i=0;i<child.length;i++){
            var item = child[i];
            var text = item['text'];
            var title=item['title'];

            textArr.push(
                <View key={i} style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color:'red',marginRight:4,marginLeft:7,borderColor:'red',borderWidth:.5}}>{title}</Text>
                    <Text>{text}</Text>
                </View>
            );
        }
        var viewH = 40*scale;
        contentH += viewH;
        return(
            <View style={{width:screenWidth,height:viewH,flexDirection:'row',backgroundColor:'white'}}>
                <Image source ={{uri:pic}} style={{resizeMode:'contain',flex:3}}/>
                <View style={{flex:7}} ><BannerSwiper bannerHeight = {viewH} bannerArr={textArr}/></View>
            </View>
        );
    }
    //-----------------------------生活头条 - End-----------------------------//

    ///////////////////////////////////////////////////////////////////////////
    //////////                        首页轮播 - Start
    ///////////////////////////////////////////////////////////////////////////
    renderShowType_10_20(data){
        var child = data['child'];
        var itemArr = [];
        for(var i = 0;i<child.length;i++){
            var item = child[i];
            var pic = item.pic;
            itemArr.push(pic);
        }

        var viewH = 150*scale;
        contentH += viewH;
        return <BannerSwiper bannerArr ={itemArr}  bannerHeight={viewH}  swiperStyle='row'/>
    }
    //-----------------------------首页轮播 - End-----------------------------//


    ///////////////////////////////////////////////////////////////////////////
    //////////                        推荐专区内容 - Start
    ///////////////////////////////////////////////////////////////////////////

    renderShowType_1_23(data){
        var itemArr = [];
        var COL = 3;
        var itemWH = parseFloat(screenWidth/COL);
        for (var i=0; i<data.length;i++){
            var item = data[i];
            var info = item['child']['0'];
            var pic = info['pic'];
            itemArr.push(
                <Image key={i} source={{uri:pic}} style={{width:itemWH,height:itemWH,resizeMode:'contain'}}/>
            );
        }
        contentH += itemWH;
        return <View style={{flexDirection:'row',backgroundColor:'white'}}>{itemArr}</View>;
    }

    renderShowType_13_23(data){

        var child =  data['child'];
        var itemArr = [];
        var COL = 3;
        var margin = 10*scale;
        var width = parseFloat((screenWidth - (COL+1)*margin)/COL);
        var height = parseFloat(width*1.4);
        for(var i=0;i<child.length;i++){
            var item = child[i];
            var pic_url = item['pic_url'];
            var title = item['title'];
            var cprice = item['cprice'];
            itemArr.push(
              <View key ={i} style={{alignItems:'center',height:height,width:width}}>
                  <Image source={{uri:pic_url}} style={{width:width,height:width,resizeMode:'contain'}}/>
                  <View style={{alignItems:'center',justifyContent:'center',height:parseFloat(height*0.3),width:width}}>
                      <Text style={{color:'red',fontSize:13}}>{cprice}</Text>
                      <Text style={{fontSize:13,marginTop:4}}>{title}</Text>
                  </View>
              </View>
            );
        }
        contentH += height;
        return <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:margin,paddingRight:margin,backgroundColor:'white'}}>{itemArr}</View>
    }
    //-----------------------------推荐专区内容 —— End-----------------------------//

    ///////////////////////////////////////////////////////////////////////////
    //////////                热评榜 - 轮播文字内容 -Start
    ///////////////////////////////////////////////////////////////////////////
    renderShowType_14_24(dataArr){//文字轮播
        var bubble =  dataArr['child']['bubble'];
        var itemArr = [];
        var width =  200*scale;
        for(var i=0; i<bubble.length;i++){
            var item = bubble[i];
            var title = item['title'];
            var content = item['content'];
            itemArr.push(
              <View key={i} style={{justifyContent:'center'}}>
                  <Text style={{fontSize:10,color:'#BFBFBF'}}>{title}</Text>
                  <Text style={{flexWrap:'wrap',fontSize:12,marginTop:7}}>{content}</Text>
              </View>
            );
        }
        var pic_url = dataArr['child']['pic_url'];
        var viewH = 130*scale;
        contentH += viewH;
        return(
            <Image source ={{uri:pic_url}}
                   style={{width:screenWidth,
                   height:viewH,resizeMode:'cover',justifyContent:'center'
                   }}>
                <View style={{alignSelf:'flex-end',flexDirection:'row',alignItems:'center',marginRight:20*scale,}}>
                    <Image source={require('../image/bubble_trangle.png')} style={{width:12,height:16,marginRight:-2}}/>
                    <BannerSwiper
                        style={{backgroundColor:'white',width:width,padding:10,borderRadius:5}}
                        bannerHeight = {viewH*0.7}
                        bannerWidth={width}
                        bannerArr={itemArr}
                    />
                </View>
            </Image>
        );

    }
    //-----------------------------热评榜 - 轮播文字内容 -End-----------------------------//

    componentDidUpdate() {
        this.refs.FLAG.setNativeProps({
            style:{
                height: contentH,
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        width:screenWidth,
        backgroundColor: '#F5FCFF',
    },
    type_1_15_Style:{
        flexDirection:'row',
        width:screenWidth,
        flexWrap:'wrap',
        backgroundColor:'white'
    }
});

module.exports  = LivingIndexHeader;