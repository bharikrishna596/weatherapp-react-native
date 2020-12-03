import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, Card, Icon, Right } from 'native-base';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            source: [],
        }
    }

    async componentDidMount() {
        let citities = await this.getQRdetails();
        this.setState({
            source: citities
        })
        this.getLocation();
    }

    async componentDidUpdate(prevProps, preState) {
        let citities = await this.getQRdetails();
        if (this.state.source.length !== citities.length) {
            this.setState({
                source: citities
            })
        }
    }

    clearData = () => {
        AsyncStorage.removeItem('qrdetails');
        this.setState({
            source: []
        })
    }

    getQRdetails = async () => {
        let QData = []
        try {
            const value = await AsyncStorage.getItem('qrdetails');
            if (value !== null) {
                let qrdata = JSON.parse(value)
                if (qrdata !== null && qrdata !== undefined && Array.isArray(qrdata)) {
                    QData = qrdata
                }
            }
        } catch (error) {
            console.log(error)
        }
        return QData;
    }


    getNameofLocation = (item) => {
        let name = 'InValid';

        if (item && item !== '' && JSON.parse(item) !== null && JSON.parse(item) !== '') {
            let data = JSON.parse(item);
            if (data.name !== undefined) {
                name = data.name;
            }
        }
        return name;
    }

    getLat = (item) => {
        let code = 'InValid';
        if (item && item !== '' && JSON.parse(item) !== null && JSON.parse(item) !== '') {
            let data = JSON.parse(item);
            if (data.lat !== undefined) {
                code = data.lat;
            }
        }
        return code;
    }

    getLng = (item) => {
        let code = 'InValid';
        if (item && item !== '' && JSON.parse(item) !== null && JSON.parse(item) !== '') {
            let data = JSON.parse(item);
            if (data.lng !== undefined) {
                code = data.lng;
            }
        }
        return code;
    }


    onClickLocation = (item) => {
        if (this.getNameofLocation(item.data) !== 'InValid') {
            this.props.navigation.navigate('City', { lat: this.getLat(item.data), lng: this.getLng(item.data) })
        }
    }

    render() {
        let data = this.state.source

        return (
            <Container style={styles.Container}>
                <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                    <Text style={styles.title}>City and Temperature</Text>
                </View>
                <Content>
                    <View style={{ alignItems: 'center', paddingTop: 10 }}>
                        {data && Array.isArray(data) ? data.map((item, index) =>
                            <TouchableOpacity style={{ width: '90%', alignItems: 'center' }} onPress={() => this.onClickLocation(item)}>
                                <Card style={styles.Card} key={index}>
                                    <View>
                                        <Icon name="rainy-outline" style={{ color: '#ff5700' }} />
                                    </View>
                                    <View style={{ paddingLeft: 15 }}>
                                        <Text style={styles.cityname}>{this.getNameofLocation(item.data)}</Text>
                                    </View>
                                    <Right style={{ paddingTop: 25, }}>
                                        <Icon name="arrow-forward-outline" style={{ height: 50, width: 50, color: '#ff5700' }} />
                                    </Right>

                                </Card>
                            </TouchableOpacity>) : null}
                    </View>
                </Content>
                <View style={{ marginBottom: 10, flexDirection: 'row', alignSelf: 'center' }}>
                    <TouchableOpacity style={styles.addbutton}
                        onPress={() => this.props.navigation.navigate('QRCodeScan')}>
                        <Text style={{ color: 'white' }}>ADD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addbutton}
                        onPress={() => this.clearData()}>
                        <Text style={{ color: 'white' }}>CLEAR</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}

export default Main;

const styles = StyleSheet.create({
    Container: {
        paddingTop: 25,
        paddingRight: 4,
        paddingLeft: 5,
        height: 'auto'
    },
    Card: {
        width: '85%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
        //backgroundColor:'rgba(56, 172, 236, 1)',
    },
    addbutton: {
        alignItems: 'center',
        width: '40%',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#ff5700',
        borderRadius: 25,
        marginLeft: 5,
    },
    title: {
        fontSize: 20,
        color: 'grey',
        borderBottomWidth: 1
    }, cityname: {
        fontSize: 16,
        color: 'grey',
        letterSpacing: 0.5,
    }
})