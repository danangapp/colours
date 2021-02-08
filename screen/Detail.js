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
    };
  }

  getData() {
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
        this.setState({ data: data });
        this.setState({ isDisplay: 'flex' });
      });

    // fetch("https://agencyfish.com/app/colours.php?Last=1", {
    //   method: "GET",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //   this.setState({TopImage:data[0].Page});
    //   this.setState({TopTitle:data[0].Title});
    //   this.setState({TopDesc:data[0].Detail});
    //   this.setState({TopUrl:data[0].Url});
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
    this.setState({
      TopImage: data[0].Page,
      TopTitle: data[0].Title,
      TopDesc: data[0].Detail,
      TopUrl: data[0].Url
    });
  }

  componentDidMount() {
    this.getData();
  }

  getParam(id) {
    this.setState({ isDisplay: 'none' });
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
          isDisplay: 'flex'
        });
        const { _scrollView } = this.refs;
        _scrollView.scrollTo({ y: 0 });
      });
  }

  render() {
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
        {this.state.isDisplay == 'none' ? (
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
}
