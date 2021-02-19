/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import styles from './styles';

var { width, height } = Dimensions.get('window');
const bck = require('./assets/bg.png');

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isDisplay: 'flex',
      displaySplahScreen: 'flex',
    };
  }

  getData() {
    this.setState({ isDisplay: 'none' });
    // fetch("https://agencyfish.com/app/colours.php?Last=1", {
    //   method: "GET",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //   this.setState({isDisplay: 'flex'});
    //   this.setState({data:data});
    // })
    const data = [
      {
        Page: 'https://versoview.com/pageturner/gia/colours/files/page/1.jpg',
        Title: 'Garuda Indonesia Colours',
        Url: 'https://versoview.com/pageturner/gia/colours/',
        Detail:
          "Welcome to Colours December 2019 - Selamat Datang di Colours December 2019, Travel : Jeddah, Nias, Rome. The Archipelago : Jayapura, Masterclass : Interior Photography : The World Most Beautiful Libraries. Travel Trends, What's On, Style, Trending. Flavours : Culinary delights from across the archipelago. \r\nInterview : Rinaldy A. Yunardi. Ga Kids : Togean Islands National Park\r\n\r\n \r\n*Designed & Published in Indonesia by Agency Fish*",
      },
    ];
    this.setState({ isDisplay: 'flex', data: data, displaySplahScreen: 'flex' });
    setTimeout(() => {
      this.setState({ displaySplahScreen: 'none' });
    }, 6000);
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    this.getData();
  }

  renderContent() {
    var i = 1;
    return (
      <ImageBackground style={{ width: '100%', flex: 1 }} source={bck}>
        {this.state.isDisplay == 'none' ? (
          <View style={{ top: height / 2.2, zIndex: 1 }}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        ) : null}
        <ScrollView style={{ display: this.state.isDisplay }}>
          <View style={styles.container}>

            {this.state.data.map((item, index) => {
              i++;
              if (i == 2) {
                return (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Detail')}
                    key={index}
                    style={styles.buttonTopHome}>
                    <Image style={styles.imageHome} source={{ uri: item.Page }} />
                  </TouchableOpacity>
                );
              }
            })}

            <View style={{ alignItems: 'center' }}>
              <View style={styles.viewdetailHome}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Detail')}
                  style={styles.buttonHome}>
                  <Image
                    style={styles.imageHomeMagazine}
                    resizeMode={'stretch'}
                    source={{
                      uri: 'https://agencyfish.com/app/images/magazinelogo.png',
                    }}
                  />
                  <Text style={styles.textImageHome}> Magazines </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('QR')}
                  style={styles.buttonHome}>
                  <Image
                    style={styles.imageHomeMagazine}
                    resizeMode={'stretch'}
                    source={{
                      uri: 'https://agencyfish.com/app/images/qrlogo.png',
                    }}
                  />
                  <Text style={styles.textImageHome}> QR Scan </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* <OneSignal /> */}
      </ImageBackground>
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

  render() {
    return this.state.displaySplahScreen === 'flex' ? this.splashScreen() : this.renderContent();
  }
}
