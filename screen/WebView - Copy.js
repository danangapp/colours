/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isi: 'isi aja lah',
    };
  }
  render() {
    const run = `
      function myFunction() {
        document.getElementById("demo").innerHTML = "` + this.state.isi + `";
      }
      true;
    `;

    setTimeout(() => {
      this.webref.injectJavaScript(run);
    }, 400);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 600 }}>
          <WebView
            ref={(r) => (this.webref = r)}
            javaScriptEnabled
            source={{
              uri: 'http://192.168.0.2/alo.html',
            }}
          />
        </View>
        <TouchableOpacity style={{ padding: 20, backgroundColor: 'red' }} onPress={() => {
          if (this.state.isi === 'danang ya') {
            this.setState({ isi: 'kokon ya ya' });
          } else {
            this.setState({ isi: 'danang ya' });
          }
        }} >
          <Text>yaya</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
