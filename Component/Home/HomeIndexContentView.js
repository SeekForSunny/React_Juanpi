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
    ListView,
    TouchableOpacity,
} from 'react-native';

import CommonNavBar from '../Main/CommonNavBar';

import CommonBlockTypeCell from '../Main/CommonBlockTypeCell';
import HomeIndexHeader from './HomeIndexHeader';
import BrandDetail from './BrandDetail' ;//品牌详情

class HomeIndexContentView extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
            bannerInfo:{}
        };
    }

    render() {

        return (
            <View style={styles.container}>

                {/**设置内容View*/}
                <ListView
                    contentContainerStyle={{flexWrap: 'wrap',flexDirection:'row'}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderHeader={this.renderHeader.bind(this)}
                    removeClippedSubviews={false}
                />
            </View>
        );
    }

    renderHeader(){
        return <HomeIndexHeader bannerInfo = {this.state.bannerInfo}/>;
    }

    renderRow(rowData){
        // return (
        //     <TouchableOpacity
        //         onPress={()=>this.popToShowDetail(rowData)}>
        //         <HomeIndexCell rowData={rowData} />
        //     </TouchableOpacity>
        // );
        return <CommonBlockTypeCell rowData={rowData}/>;
    }

    //展示详情页
    popToShowDetail(rowData){
        let {navigator}=this.props;
        console.log(navigator);
        if(navigator){
            navigator.push({
                component:BrandDetail,
                params:{title:rowData.title,rowData:rowData},
            });
        }
    }

    componentDidMount() {
        //加载头部数据
        const {banner_api,goods_api}= this.props;
        fetch(banner_api)
            .then((response)=>response.json())
            .then((responseData)=>{
                {this.dealWithBannerData(responseData['data'])}
            })
            .catch((error)=>{
            })
        //加载商品列表
        fetch(goods_api)
            .then((response)=>response.json())
            .then((responseData)=>{
                {this.dealWithJsonData(responseData)}
            })
            .catch((error)=>{
                // console.error(error);
            })

    }
    //数据处理
    dealWithBannerData(jsonData){
        this.setState({bannerInfo:jsonData});
    }
    dealWithJsonData(jsonData){
        var dataArr = jsonData['data']['goods'];
        this.setState({dataSource:this.state.dataSource.cloneWithRows(dataArr)});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

module.exports = HomeIndexContentView;