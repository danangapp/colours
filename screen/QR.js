/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, Linking, View, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

class ScanScreen extends Component {

  renderBarcode = ({ bounds, data }) => (
    <React.Fragment key={data + bounds.origin.x}>
      {console.log('danang', data + bounds.origin.x)}
      <View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          position: 'absolute',
          borderColor: '#F00',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 10,
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        }}
      >
        <Text style={{
          color: '#F00',
          flex: 1,
          position: 'absolute',
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}>{data}</Text>
      </View>
    </React.Fragment>
  );

  renderBarcodes = () => (
    <View>
      {this.state.barcodes.map(this.renderBarcode)}

    </View>
  );

  barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(barcode => Linking.openURL(barcode.data))
  };

  state = {
    barcodes: [],
  }

  render() {
    const isFocused = this.props.navigation.isFocused();
    if (!isFocused) {
      return null;
    } else if (isFocused) {
      return (
        <View style={{ flex: 1, backgroundColor: 'black', height: 200 }}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{
              flex: 1,
              width: '100%',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              var x = barcodes[0].bounds.origin.x;
              var y = barcodes[0].bounds.origin.y;
              var awalX = (width - 280) / 2;
              var batasX = (width + 280) / 2;
              var awalY = (height - 230) / 2;
              var batasY = (height + 230) / 2;
              if (x >= awalX && x <= batasX) {
                if (y >= awalY && y <= batasY) {
                  // console.log(barcodes[0].bounds.origin);
                  barcodes.forEach(barcode => Linking.openURL(barcode.data))
                }
              }
            }}
          >
            <BarcodeMask width={280} height={230} edgeColor={'#62B1F6'} />
          </RNCamera>
        </View>
      );
    }
  }
}

export default ScanScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});