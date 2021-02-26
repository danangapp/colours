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

  getData(forBack = 0) {
    this.setState({ isDisplay: 'none' });
    fetch('https://agencyfish.com/app/colours.php', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data, isDisplay: 'flex' });
      });

    const data = [
      {
        Page: 'https://versoview.com/openview/airlines/garuda-indonesia/colours/files/medium/1.jpg',
        Title: 'Garuda Indonesia Colours',
        Url: 'https://versoview.com/openview/airlines/garuda-indonesia/colours/',
        Detail:
          "Welcome to Colours December 2019 - Selamat Datang di Colours December 2019, Travel : Jeddah, Nias, Rome. The Archipelago : Jayapura, Masterclass : Interior Photography : The World Most Beautiful Libraries. Travel Trends, What's On, Style, Trending. Flavours : Culinary delights from across the archipelago. \r\nInterview : Rinaldy A. Yunardi. Ga Kids : Togean Islands National Park\r\n\r\n \r\n*Designed & Published in Indonesia by Agency Fish*",
      },
    ];
    this.setState({
      TopImage: data[0].Page,
      TopTitle: data[0].Title,
      TopDesc: data[0].Detail,
      TopUrl: data[0].Url
    });
    if (forBack === 0) {
      this.setState({ displaySplahScreen: 'flex' })
      setTimeout(() => {
        this.setState({ displaySplahScreen: 'none' });
      }, 6000);
    }
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    this.getData();
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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

  getParam(id) {
    this.setState({ isDisplay: 'none'/* , displaySplahScreen: 'flex' */ });
    fetch('https://agencyfish.com/app/colours.php?Page=' + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          TopImage: data[0].Page, TopTitle: data[0].Title,
          TopDesc: data[0].Detail,
          TopUrl: data[0].Url,
          isDisplay: 'flex',
          displaySplahScreen: 'none'
        });
        const { _scrollView } = this.refs;
        _scrollView.scrollTo({ y: 0 });
      });
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
      <View style={{ display: this.state.displaySplahScreen, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F1624' }}>
        <View style={{ padding: 100 }}>
          <Image source={require('./assets/welcome.gif')} style={{ width, height: width, resizeMode: 'cover' }} />
        </View>
      </View>
    );
  }

  renderContent() {
    var contents;
    {
      contents = this.state.data.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => this.getParam(item.id)}
            key={index}
            style={styles.viewimage}>
            <Image
              style={styles.image}
              resizeMode={'stretch'}
              source={{ uri: item.Thumb }}
            />
            <Text style={styles.textImage}> {item.Title} </Text>
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
                <Text style={{ textAlign: 'justify', color: 'white' }}>
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
                justifyContent: 'center',
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
