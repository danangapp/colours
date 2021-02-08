/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
class MyWeb extends Component {
  render() {
    const { linkTo } = this.props.route.params;
    return (
      <View style={styles.container}>
        <WebView source={{ uri: linkTo }} />
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
