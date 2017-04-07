/**
 * Created by SMART on 2017/3/27.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import CommonNavBar from '../Main/CommonNavBar';
class BrandDetail extends Component {
// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

    render() {
        const {title,rowData,navigator}=this.props;
        console.log('X---');
        console.log(title);
        const params = {
            leftImage:require('../image/gray_back_normal.png'),
            rightImage:require('../image/detail_sharebtn_normal.png'),
            color:'white',
            leftAction:()=>this.props.navigator.pop(),
            titleView:this.renderTitleView(title)
        }
        return (
            <View style={styles.container}>
                <CommonNavBar {...params}/>
            </View>
        );
    }

    renderTitleView(title){
        return <Text>{title}</Text>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

module.exports = BrandDetail;
