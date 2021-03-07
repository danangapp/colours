/* eslint-disable eqeqeq */
/* eslint-disable react/no-string-refs */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Platform,
  BackHandler,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const bck = require('./assets/bg.png');
const f = require('../screen/Function');

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      last: [],
      TopImage: '',
      TopTitle: '',
      TopDesc: '',
      TopUrl: '',
      isDisplay: 'flex',
      displayHeader: 'none',
      displaySplahScreen: 'flex',
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.backClick = 0;
  }

  async getDemo() {
    const response = await fetch('https://panel.versoview.com/mobile/demo');
    var data = response.json();
    return data;
  }

  async getDetail() {
    const response = await fetch('https://panel.versoview.com/mobile/magazine');
    var data = response.json();
    return data;
  }

  async getData(forBack = 0) {
    const dt = await this.getDetail();
    const data = dt[0];
    var dataDetail = [];
    for (var a in dt) {
      if (a != 0) {
        dataDetail.push(dt[a]);
      }
    }

    this.setState({
      TopImage: data.image,
      TopTitle: data.title,
      TopDesc: data.detail,
      TopUrl: data.url,
      isDisplay: 'flex',
      data: dataDetail
    });
    if (forBack === 0) {
      this.setState({ displaySplahScreen: 'flex' });
      setTimeout(() => {
        this.setState({ displaySplahScreen: 'none' });
      }, 6000);
    }
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    this.getData();
  }

  handleBackButtonClick() {
    this.backClick++;
    setTimeout(() => {
      this.backClick = 0;
    }, 1000);
    if (this.backClick === 1) {
      this.getData(1);
      ToastAndroid.show('Press again to exit', 300);
    }
    if (this.backClick === 2) {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      BackHandler.exitApp();
    }
    return true;
  }

  async getParam(id) {
    this.setState({ isDisplay: 'none'/* , displaySplahScreen: 'flex' */ });
    const dt = await this.getDetail();
    var data;
    var dataDetail = [];
    for (var a in dt) {
      if (dt[a].id != id) {
        dataDetail.push(dt[a]);
      } else {
        data = dt[a];
      }
    }

    this.setState({
      data: dataDetail,
      TopImage: data.image,
      TopTitle: data.title,
      TopDesc: data.detail,
      TopUrl: data.url,
      isDisplay: 'flex',
      displaySplahScreen: 'none'
    });
    const { _scrollView } = this.refs;
    _scrollView.scrollTo({ y: 0 });
  }

  header() {
    return (
      <View style={{ padding: 20, backgroundColor: '#222D5E' }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Image source={require('./assets/logo-clr.png')} ImageResizeMode="contain" style={{ width: 95, height: 25, marginLeft: -10 }} />
          <TouchableOpacity onPress={() => {
            this.props.navigation.goBack();
          }}>
            <Image source={require('./assets/back-yellow.png')} style={{ width: 25, height: 25, marginRight: -5 }} />
          </TouchableOpacity>
          {/* <Text style={{ marginLeft: 10, fontSize: 15 }}>Back</Text> */}
        </View>
      </View >
    );
  }

  splashScreen() {
    return (
      <View style={{ display: this.state.displaySplahScreen, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f1624' }}>
        <View style={{ padding: 100 }}>
          <Image source={require('./assets/welcome.gif')} style={{ width: width * 0.60, height: width * 0.60, resizeMode: 'contain' }} />
        </View>
      </View>
    );
  }

  renderContent() {
    const { data } = this.state;

    var contents;
    {
      contents = data.map((item, index) => {
        const thumb = item.image;
        return (
          <TouchableOpacity
            onPress={() => this.getParam(item.id)}
            key={index}
            style={styles.viewimage}>
            <Image
              style={styles.image}
              resizeMode={'stretch'}
              source={{ uri: thumb }}
            />
            <Text style={styles.textImage}> {item.title} </Text>
          </TouchableOpacity>
        );
      });
    }

    return (
      <ImageBackground style={{ width: '100%', flex: 1 }} source={bck}>
        {Platform.OS === 'android' ? null : this.header()}
        {this.state.isDisplay === 'none' ? (
          <View style={{ top: height / 2.2, zIndex: 1 }}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        ) : null}
        <ScrollView ref="_scrollView">
          <View style={styles.container}>
            <View
              style={{
                alignItems: 'center',
                marginTop: 20,
                flex: 1,
                flexDirection: 'column',
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('WebView', {
                    linkTo: this.state.TopUrl,
                  })
                }>
                {
                  this.state.TopImage ?
                    <Image
                      style={styles.imageTop}
                      source={{ uri: this.state.TopImage }}
                    />
                    :
                    null
                }
              </TouchableOpacity>

              <View style={styles.viewTitle}>
                <Text style={styles.textTitle}> {this.state.TopTitle} </Text>
                <Text style={styles.textDescription}>
                  {this.state.TopDesc}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 50,
              }}>
              {contents}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('WebView', {
                linkTo: this.state.TopUrl,
              })
            }>
            <Text style={styles.textFooter}>READ</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  render() {
    return this.state.displaySplahScreen === 'flex' ? this.splashScreen() : this.renderContent();
  }
}
