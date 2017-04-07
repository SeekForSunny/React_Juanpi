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
    ScrollView
} from 'react-native';

import CommonNavBar from '../Main/CommonNavBar';
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var scale =  parseFloat(screenWidth/375);

import CommonBlockTypeCell from '../Main/CommonBlockTypeCell';

class CartIndex extends Component {
      // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            showHeader:false,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2}),
        };
      }

    render() {
        
        const NavData = {
            titleView:this.renderTitleView(),
            color:'white'     
        };
        
        return (
            <View style={styles.container}>
                <CommonNavBar {...NavData}/>
                <ScrollView>
                    {/*登录缺省*/}
                    {this.renderLoginDefaultView()}
                    
                    {/*猜你喜欢*/}
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        renderHeader={this.renderHeader.bind(this)}
                        contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}}
                    />
                </ScrollView>
            </View>
        );
    }
    
    //设置导航栏标题View
    renderTitleView(){
        return <Text style={{fontSize:18*scale}}>购物车</Text>
    }

    //登录缺省
    renderLoginDefaultView(){
        return (
            <View style={{width:screenWidth,height:230*scale,backgroundColor:'white',alignItems:'center'}}>
                   <Image source={require('../image/empty_ShoppingCart.png')} style={{width:140*scale,height:140*scale,marginTop:20*scale}}/>
                   <Text style={{fontSize:18*scale}}>看到喜欢的带回家吧</Text>
                   <View style={{marginTop:10*scale,borderColor:'red',borderWidth:1,width:100*scale,height:30*scale,alignItems:'center',justifyContent:'center'}}><Text style={{color:'red',fontSize:16}}>去登录</Text></View>
            </View>
        );
    }

    renderHeader(){


        if(this.state.showHeader){
            return(
                <View style={{width:screenWidth,height:40*scale,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'gray'}}>- 猜你喜欢 -</Text>
                </View>
            );
        }
    }
    renderRow(rowData){
        return <CommonBlockTypeCell rowData={rowData}/>
    }

    //加载网络
    componentDidMount() {
        var api_url = 'https://mapi.juanpi.com/goodsintro/cart/goods?apisign=5661243ce67106a7c2b596269b2d8ed4&app_version=4.4.0&did=A725E6CC-7F9A-460B-9142-F9F470665DF4&platform=iPhone&uid=0';
        fetch(api_url)
            .then((response)=>response.json())
            .then((responseData)=>{
                console.log(responseData);
                var dataArr =  responseData['data']['goods'];
                this.setState({dataSource:this.state.dataSource.cloneWithRows(dataArr),showHeader:true});
            })
            .catch((error)=>{
                console.error(error);
            })
    }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
},
});

module.exports = CartIndex;
