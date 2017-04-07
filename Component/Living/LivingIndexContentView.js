/**
 * Created by SMART on 2017/3/29.
 * 单个类目容器View
 */


import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';

import CommonBlockTypeCell from '../Main/CommonBlockTypeCell';
import LivingIndexHeader  from  './LivingIndexHeader';

 class LivingIndexContentView extends Component {
     // 构造
       constructor(props) {
         super(props);
         // 初始状态
         this.state = {
             dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>(r1!=r2)}),
             bannerInfo:{},
         };
       }
    render() {
        return (
            <ListView
                contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}}
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                renderHeader={this.renderHeader.bind(this)}
            />
        );
    }

     renderHeader(){
         return <LivingIndexHeader bannerInfo ={this.state.bannerInfo} {...this.props}/>
     }

     renderRow(rowData){
         return <CommonBlockTypeCell rowData={rowData}/>
     }

     componentDidMount() {
         const {banner_api,goods_api}= this.props;

         //加载头部数据
         fetch(banner_api)
         .then((response)=>response.json())
         .then((responseData)=>{
                 {this.dealWithBannerData(responseData['data'])}
         })
         .catch((error)=>{
             // console.error(error);
         });

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

module.exports = LivingIndexContentView;