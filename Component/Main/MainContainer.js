/**
 * Created by SMART on 2017/3/27.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import HomeIndex from '../Home/HomeIndex';
import LivingIndex from '../Living/LivingIndex';
import FoundIndex from '../Found/FoundIndex';
import CartIndex from '../Cart/CartIndex';
import ProfileIndex from '../Profile/ProfileIndex';

import TabBar  from './TabBar';


//TabBar图片资源
const TAB_BAR_RESOURCES = [
    [require('../image/home_Normal.png'), require('../image/home_Highlighted.png')],
    [require('../image/living_Normal.png'), require('../image/living_Highlighted.png')],
    [require('../image/straight_Normal.png'), require('../image/straight_Highlighted.png')],
    [require('../image/cart_Normal.png'), require('../image/cart_Highlighted.png')],
    [require('../image/usercenter_Normal.png'), require('../image/usercenter_Highlighted.png')],
];

const TAB_BAR_LABELS = ["今日上新","直发仓","团购发现","购物车","我的卷皮"];

class MainContainer extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            
        };
      }
    render() {

        return (
            <ScrollableTabView
                tabBarPosition="bottom"
                scrollWithoutAnimation={true}
                locked={true}
                initialPage={0}
                renderTabBar={() => <TabBar tabBarResources = {TAB_BAR_RESOURCES} tabLabels={TAB_BAR_LABELS}/>}
            >

                <HomeIndex style={styles.subViewStyle} {...this.props}/>

                <LivingIndex style={styles.subViewStyle} {...this.props}/>

                <FoundIndex style={styles.subViewStyle} {...this.props}/>
                
                <CartIndex style={styles.subViewStyle} {...this.props}/>

                <ProfileIndex {...this.props}/>
            </ScrollableTabView>
        );
    }

    //获取配置信息
    componentWillMount() {
        var config_api ='https://api.juanpi.com/setting/leaf?apisign=cd07a70e3d8c5d72e5348663ba47a7fa&app_name=zhe&app_version=4.4.2&location=广东省&platform=iPhone&to_switch=0&ugroup=241_565_377_285_198_453_653&utm=101431&utype=C3&zy_ids=18_40_51_61_5_25';
        fetch(config_api)
            .then((response)=>response.json())
            .then((responseData)=>{
                console.log('加载配置信息:');

                {this.dealWithData(responseData['data'])}
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    dealWithData(data){

        var app_menu = data['app_menu'];
        var full_ads = data['full_ads'];
        var pre_app_menu = data['pre_app_menu'];
        var preload_list = data['preload_list'];
        var pull_ads = data['pull_ads'];
        var sidebar_ads = data['sidebar_ads'];
        var time_line = data['time_line'];
        var url_list = data['url_list'];


        console.log(app_menu);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    subViewStyle:{
        overflow:'hidden'
    }
});

module.exports = MainContainer;
