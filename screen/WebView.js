/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Platform } from 'react-native';
import WebView from 'react-native-webview';
class MyWeb extends Component {

  header() {
    return (
      <View style={{ padding: 20, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.goBack();
          }}>
            <Image source={require('./assets/back.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10, fontSize: 15 }}>Garuda Colours</Text>
        </View>
      </View>
    );
  }

  render() {
    const { linkTo } = this.props.route.params;
    return (
      <View style={styles.container}>
        {Platform.OS === 'android' ? null : this.header()}
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
