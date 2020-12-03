import React, { Component } from 'react';
import { Button, Text, View, BackHandler, AsyncStorage } from 'react-native';
import { RNCamera } from 'react-native-camera';

class QRCodeScan extends Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      }
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack(null)
    return true;
  }

  onBarCodeRead(scanResult) {
    if (scanResult.data != null) {
      this.QRcodedetails(scanResult)
    }
  }

  getNameofLocation = (item) => {
    console.log('sdfsafsa', item)
    let name = {};

    if (item && item !== '' && JSON.parse(item) !== null && JSON.parse(item) !== '') {
        let data = JSON.parse(item);
        if (data.name !== undefined) {
            name = data.name;
        }
    }
    return name;
  }

  QRcodedetails = async scanCode => {
      let qrdata = []
      const value = await AsyncStorage.getItem('qrdetails');
      if(value && Array.isArray(JSON.parse(value))){
        qrdata = JSON.parse(value);
      }
      let unique = true;
      qrdata.forEach(el => {
        if(this.getNameofLocation(el.data) === this.getNameofLocation(scanCode.data)) {
          unique = false;
        }
      });
      if (unique) {
        qrdata.unshift(scanCode);
      }
    try {
        AsyncStorage.setItem('qrdetails', JSON.stringify(qrdata))
        this.props.navigation.navigate('Main', scanCode)
    } catch(error){
        console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
      
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            defaultTouchToFocus
            flashMode={this.state.camera.flashMode}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => { }}
            onZoomChanged={() => { }}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            style={styles.preview}
            type={this.state.camera.type}
          />
          <View style={[styles.overlay, styles.topOverlay]}>
            <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
          </View>      
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default QRCodeScan;