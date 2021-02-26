/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Text, Platform, BackHandler } from 'react-native';
import WebView from 'react-native-webview';
class MyWeb extends Component {

  constructor(props) {
    super(props);
    this.backCount = 0;
    this.state = {
      show: 0,
      url: '',
    };
    this.webview = React.createRef();
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
  }


  handleBackButton = () => {
    var urlHome = 'https://versoview.com/openview/airlines/garuda-indonesia/colours/';
    const { url } = this.state;
    if (url === urlHome) {
      this.props.navigation.goBack();
    }
    else {
      var str = this.state.url;
      var arr = str.split('#');
      var str2 = arr[0].split('/');
      var page = str2[str2.length - 1];
      var action = '';
      if (page === 'index.html') {
        action = 'window.location = "' + urlHome + '"';
      } else {
        action = '$(".ov-back").click()';
      }

      this.webview.current.injectJavaScript(action);
    }
    // this.webview.current.goBack();
    return true;
  }

  onNavigationStateChange(navState) {
    if (navState.url === 'https://versoview.com/') {
      this.props.navigation.goBack();
    }
    this.setState({
      url: navState.url,
    });

    // console.log(navState.url);
    this.setState({ back: 0 });
  }

  header() {
    return (
      <View style={{ padding: 10, backgroundColor: '#222D5E' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.goBack();
          }}>
            <Image source={require('./assets/back.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10, fontSize: 15, color: 'white' }}>Back</Text>
        </View>
      </View>
    );
  }

  render() {
    const { linkTo } = this.props.route.params;
    var { show } = this.state;
    const html = `
      <html>
      <head></head>
      <body>
        <script>
          setTimeout(function () {
            window.ReactNativeWebView.postMessage("Hello!")
          }, 2000)
        </script>
      </body>
      </html>
    `;
    return (
      <View style={styles.container} onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        if (width > height) {
          if (show === 1) {
            this.setState({ show: 0 });
          }
        }
      }}>
        {/* {Platform.OS === 'android' ? null : show === 1 ? this.header() : null} */}
        {/* {show === 1 ? this.header() : null} */}
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => {
          this.backCount++;
          if (this.backCount === 2) {
            this.backCount = 0;
            clearTimeout(this.backTimer);
          } else {
            this.backTimer = setTimeout(() => {
              this.backCount = 0;
              this.setState({ show: show === 1 ? 0 : 1 });
            }, 300);
          }
        }}>
          <WebView
            source={{ uri: linkTo }}
            ref={this.webview}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            onMessage={(event) => {
              alert(event.nativeEvent.data);
            }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default MyWeb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
