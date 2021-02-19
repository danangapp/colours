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
    };
  }
  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  handleBackButtonClick() {
    console.log(this.webview);
    return true;
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
    return (
      <View style={styles.container}>
        {/* {Platform.OS === 'android' ? null : this.header()} */}
        {show === 1 ? this.header() : null}
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
            ref={(r) => (this.webview = r)}
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
