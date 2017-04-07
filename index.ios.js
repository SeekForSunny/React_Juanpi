/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Navigator,
} from 'react-native';


var  MainContainer = require('./Component/Main/MainContainer');

export default class React_Juanpi extends Component {
  render() {
    return (
        <View style={{flex:1}}>
          {this.renderNavigator('主页',MainContainer)}
        </View>
    )
  }

  renderNavigator(title,component){
    return(
        <Navigator
            ref='navigator'
            style={{flex:1}}
            initialRoute={{ name: title, component: component }}
            configureScene={(route) => {
                             return Navigator.SceneConfigs.FloatFromRight;
                    }}

            renderScene={(route, navigator) => {
                        let Component = route.component;
                        //route={route} 
                        return <Component {...route.params} navigator={navigator}/>
                    }
            }

        />
    );
  }
}

AppRegistry.registerComponent('React_Juanpi', () => React_Juanpi);
