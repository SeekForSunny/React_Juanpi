/**
 * Created by SMART on 2017/3/27.
 * 直发仓
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import CommonNavBar from '../Main/CommonNavBar';
import ScrollableTabView , { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import  LivingIndexContentView from './LivingIndexContentView';

var LivingIndexAPI = require('../LocalData/LivingIndexAPI.json');
var  banner_list_apis = LivingIndexAPI.banner_list_apis;
var goods_list_apis = LivingIndexAPI.goods_list_apis;

class LivingIndex extends Component {

    static defaultProps={
        titleArr:['精选','日用','餐厨','清洁收纳','数码家电','起居','洗护卫浴','妆扮','美食','母婴健康'],
    };

    render() {
        const NavData = {
            leftImage:require('../image/nav_message_normal.png'),
            rightImage:require('../image/nav_category_normal.png'),
            color:'white',
            titleView:this.renderTitleView(),
        }
        const {titleArr} = this.props;
        // renderTabBar={() => <TitleBar tabLabels={titleArr}/>}
        return (
            <View style={styles.container}>
                <CommonNavBar {...NavData}/>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarActiveTextColor='#FC5962'
                    tabBarBackgroundColor='white'
                    tabBarUnderlineStyle={{height:1,backgroundColor:'red'}}
                >
                    {this.renderContentView()}
                </ScrollableTabView>

            </View>
        );
    }
    renderTitleView(){
        
        var pic = 'https://s1.juancdn.com/bao/170401/2/1/58df6032a43d1f3b9f46e8a4_198x132.png';
        return<Image source={{uri:pic}} style={{resizeMode:'contain',height:44,width:200}}/>
    }

    //设置内容View
    renderContentView(){
        const {titleArr} = this.props;
        var itemArr = [];
        for(var i=0;i<titleArr.length;i++){
            var title = titleArr[i];
            var banner_api=banner_list_apis[i];
            var goods_api = goods_list_apis[i];
            itemArr.push(
                <LivingIndexContentView key={i} banner_api={banner_api} goods_api={goods_api} {...this.props} tabLabel={title}/>
            )
        }
        return itemArr;
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

module.exports = LivingIndex;
