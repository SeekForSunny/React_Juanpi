/**
 * Created by SMART on 2017/3/27.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,

} from 'react-native';


class TabBar extends Component {

    render() {
        
        const {tabBarResources,tabLabels,activeTab,tabs,goToPage} = this.props;

        return (
            <View style={styles.container}>
                {
                    tabs.map((tab, index) => {
                        return (
                            <TouchableOpacity  key={index} onPress={() => {goToPage(index)}} activeOpacity={1}>
                                <View style={{alignItems:'center'}}>
                                    <Image style={styles.imageStyle} source={tabBarResources[index][activeTab === index ? 1 : 0]}/>
                                    <Text style={[styles.labelStyle,{color:activeTab === index ? 'red' : 'gray'}]}>{tabLabels[index]}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#e8e8e8',
        borderTopWidth: 1,
        justifyContent: 'space-around'
    },

    //图片
    imageStyle:{
        width:25,
        height:25,
        marginBottom:4,
    },
    //标题
    labelStyle:{
        fontSize:12
    }
});


module.exports = TabBar;
