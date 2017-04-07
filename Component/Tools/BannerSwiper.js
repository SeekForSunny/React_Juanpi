/**
 * Created by SMART on 2017/3/27.
 */

import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'

const { screenWidth } = Dimensions.get('window').width;

const styles = {

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },


    image: {
        width:screenWidth,
        flex: 1
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    text: {
        color: 'gray',
        fontSize: 13,
    },

};

class BannerSwiper extends Component {



    render () {
        if(this.props.swiperStyle === "row"){//水平滚动
            return(
                <View style={{backgroundColor:'#e8e8e8'}}>
                    <Swiper height={this.props.bannerHeight}
                            dot={<View style={{backgroundColor: 'rgba(255,255,255,1)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            activeDot={<View style={{backgroundColor: 'red', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            paginationStyle={{ bottom: 10, left: 0, right: 10}}
                    autoplay>
                        {this.renderImageArr()}
                    </Swiper>
                </View>
            );
        }else{//垂直滚动
            const {bannerWidth,bannerHeight} = this.props;
            return (
                <View >
                    <Swiper height={bannerHeight} width={bannerWidth} dotColor="transparent" activeDotColor="transparent" horizontal={false} autoplay>
                        {this.renderTextArr()}
                    </Swiper>
                </View>
            )
        }
        
    }
    //图片信息数组
    renderImageArr(){

        var itemArr = [];
        var {bannerArr} = this.props;
        if(bannerArr == undefined){return;}
        for (var i=0;i<bannerArr.length;i++){
            var image_url =  bannerArr[i];
            itemArr.push(
                <View key = {i} style={styles.slide}>
                    <Image resizeMode='cover' style={styles.image} source={{uri:image_url}} />
                </View>
            );
        }
        return itemArr;
    }

    //文字信息数组
    renderTextArr(){
        var itemArr = [];
        var {bannerArr, style} = this.props;
        if(bannerArr == undefined){return;}
        
        for (var i=0;i<bannerArr.length;i++){
            var info =  bannerArr[i];
                itemArr.push(
                    <View key = {i} style={[styles.slide3,style]}>
                        {info}
                    </View>
            );
        }
        return itemArr;
    }


}

module.exports = BannerSwiper;