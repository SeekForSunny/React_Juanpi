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
    ListView,
    TouchableOpacity,
} from 'react-native';

import CommonNavBar from '../Main/CommonNavBar';

//本地数据
var HomeIndexAPI = require('../LocalData/HomeIndexAPI.json');
var  banner_apis = HomeIndexAPI.banner_api;
var goods_apis = HomeIndexAPI.goods_api;

var HomeIndexContentView = require('./HomeIndexContentView');
import ScrollableTabView , { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

class HomeIndex extends Component {

    static defaultProps={
        titleArr:['上新','女装','鞋包','母婴','全球购','居家','数码','男士','美妆','美食',"最后疯抢","即将上新"],
    }

    render() {
        const NavData = {
            leftImage:require('../image/nav_message_normal.png'),
            rightImage:require('../image/nav_category_normal.png'),
            color:'white',
            titleView:this.renderTitleView()
        };
        return (
            <View style={styles.container}>
                {/*设置导航栏*/}
                <CommonNavBar {...NavData}/>

                {/**设置内容View*/}
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

    renderContentView(){
        const {titleArr} = this.props;
        var itemArr = [];
        for(var i=0;i<titleArr.length;i++){
            var title = titleArr[i];
            var banner_api=banner_apis[i];
            var goods_api = goods_apis[i];
            itemArr.push(
                <HomeIndexContentView key={i} banner_api={banner_api} goods_api={goods_api} {...this.props} tabLabel={title}/>
            )
        }
        return itemArr;

    }
    //设置导航栏标题View
    renderTitleView(){
        return (
            <View style={styles.titleViewStyle}>
                <Image source ={require('../image/search_keyword_icon.png')} style={{width:15,height:15,marginRight:3}}/>
                <Text style={{fontSize:12,color:'gray'}}>休闲套装女</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    titleViewStyle:{
        flexDirection:'row',
        justifyContent:'flex-start',
        backgroundColor:'#F4F4F4',
        width:270,
        height:30,
        alignItems:'center',
        paddingLeft:7,
        borderRadius:5,
    }
});

module.exports = HomeIndex;
