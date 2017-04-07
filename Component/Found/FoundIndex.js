/**
 * Created by SMART on 2017/3/27.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
    TouchableOpacity,
} from 'react-native';

import CommonNavBar from '../Main/CommonNavBar';
import  FoundIndexContentView from './FoundIndexContentView';
import ScrollableTabView , { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import  link_apis from '../LocalData/FoundIndexLinkAPI.json';

class FoundIndex extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selected:'item1'
        };
      }

    static defaultProps={
        titleArr:['上新','美食','居家','手机数码','母婴','美妆','服饰'],
    };

    render() {
        //导航栏
        const NavData = {
            leftImage:require('../image/nav_message_normal.png'),
            rightImage:require('../image/nav_category_normal.png'),
            color:'white',
            titleView:this.renderTitleView(),
        };

        return (
            <View style={styles.container}>

                {/*设置导航栏*/}
                <CommonNavBar {...NavData}/>

                {/*设置滚动内容*/}
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

    //设置导航栏标题View
    renderTitleView(){

        return (
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={()=>{this.setState({selected:'item1'})}}
                >
                    <View style={{padding:7}}><Text style={{color:this.state.selected=='item1'?'black':'gray',fontSize:15}}>团购</Text></View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>{this.setState({selected:'item2'})}}
                >
                    <View style={{padding:7}}><Text style={{color:this.state.selected=='item2'?'black':'gray',fontSize:15}}>发现</Text></View>
                </TouchableOpacity>
            </View>
        );
    }

    renderContentView(){
        const {titleArr} = this.props;
        var itemArr = [];
        for(var i=0;i<titleArr.length;i++){
            var title = titleArr[i];
            var link_api=link_apis[i];
            itemArr.push(
                <FoundIndexContentView key={i} link_api={link_api} {...this.props} tabLabel={title}/>
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

module.exports = FoundIndex;
