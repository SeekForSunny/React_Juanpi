/**
 * Created by SMART on 2017/3/28.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import Dimensions from 'Dimensions';
var screenWidth = Dimensions.get('window').width;
var scale = screenWidth/375;

class ProfileIndexCell extends Component {
    
    render() {
        const {title,isShow} = this.props;
        return (
            <View >
                <View style={styles.container}>
                    <Text style={{fontSize:15}}>{title}</Text>
                    <Image source={require('../image/user_right_arrow.png')} style={{width:12,height:12,resizeMode:'contain'}}/>
                </View>
                {this.renderSeparatorLine(isShow)}
            </View>
        );
    }
    
    //分割线
    renderSeparatorLine(isShow){
        if(isShow){
            return<View style={{width:screenWidth,height:.5,backgroundColor:'#e8e8e8'}}/>
        }
    }



}

const styles = StyleSheet.create({
    container: {
        width:screenWidth,
        height:49*scale,
        backgroundColor: 'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:14*scale,
    },
});

module.exports = ProfileIndexCell;
