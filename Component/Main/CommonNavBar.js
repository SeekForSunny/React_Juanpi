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
    Platform,
    TouchableOpacity
} from 'react-native';

var  Dimensions =require('Dimensions');

var screenWidth = Dimensions.get('window').width;

class CommonNavBar extends Component {

    render() {
        
        const {leftImage,leftAction,rightImage,rightAction,color,titleView,noShadow} = this.props;
        return (
            <View style={[styles.container,{backgroundColor:color}]}>
                <View style={styles.contentStyle}>
                    {this.renderLeftItem(leftImage)}
                    {this.renderMiddleItem(titleView)}
                    {this.renderRightItem(rightImage)}
                    {this.renderShadowView()}
                </View>
            </View>
        );
    }
    renderLeftItem(leftImage){

        if(this.props.leftAction){
            return (
                <View>
                    <TouchableOpacity onPress={()=>this.props.leftAction()}>
                        <Image source={leftImage} style={styles.imageStyle}/>
                    </TouchableOpacity>
                </View>
            );
        }else {

            return (
                <View>
                        <Image source={leftImage} style={styles.imageStyle}/>
                </View>
            );
        }

    }

    renderMiddleItem(titleView){
        if(titleView){ return titleView; }
    }
    
    renderRightItem(rightImage){
        return (
            <View>
                <Image source={rightImage} style={styles.imageStyle}/>
            </View>
        );
    }

    renderShadowView(){
        //默认是false
        if(!this.props.noShadow){
            return (
                <View style={{width:screenWidth,height:.3,backgroundColor:'gray',position:'absolute',bottom:0,left:0}}/>
            );
        }
    }
}

const styles = StyleSheet.create({

    container: {
        width:screenWidth,
        height:Platform.OS == "ios"?64:44,
    },
    contentStyle:{
        width:screenWidth,
        marginTop:Platform.OS == "ios"?20:0,
        height:44,
        marginBottom:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:7,
        paddingRight:7,
    },
    imageStyle:{
        width:40,
        height:40,
    },
    titleStyle:{
        fontSize:18
    }
});

module.exports = CommonNavBar;
