/**
 * Created by SMART on 2017/4/1.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
} from 'react-native';

import WebViewBridge from 'react-native-webview-bridge';

const injectScript = `
      (function () {
            document.getElementsByClassName("fixtop").item(0).style.display="none";
            document.getElementsByClassName("bottom-menu").item(0).style.display="none";
            document.getElementsByClassName("tab").item(0).style.display="none";
            
      }());
`;

class FoundIndexContentView extends Component {

    render() {
        //加载链接
        var {link_api} = this.props;
        return (
            <View style={styles.container}>
                <WebViewBridge
                    ref="webviewbridge"
                    injectedJavaScript={injectScript}
                    source={{uri: link_api}}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

module.exports = FoundIndexContentView;

