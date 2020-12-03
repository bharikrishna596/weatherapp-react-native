import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { Container, Content, Card, Icon } from 'native-base';

class City extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            forecast: [],
        }
    }

    componentDidMount() {
        if (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params) {
            let lat = this.props.navigation.state.params.lat;
            let lng = this.props.navigation.state.params.lng;
            if (lat && lng) {
                this.getWeather(lat, lng)
            }
        }
    }

    getWeather(lat, lng) {
        let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lng + '&units=metric&appid=e8f7b17b7d0cf4f82709ba4c14e750bf';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState((prevState, props) => ({
                    forecast: data
                }));
            })
    }

    getdate = (date) => {
        if (date && date !== '') {
            return date.substring(0, 16)
        } else {
            return ''
        }
    }

    render() {
        let data = [];
        if (this.state.forecast && this.state.forecast.list && Array.isArray(this.state.forecast.list)) {
            data = this.state.forecast.list
        }

        let city = '';
        if (this.state.forecast && this.state.forecast !== null && this.state.forecast !== undefined &&
            this.state.forecast.city !== null && this.state.forecast.city !== undefined && this.state.forecast.city.name) {
            city = this.state.forecast.city.name
        }

        return (
            <Container style={styles.Container}>
                <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                    <Text style={styles.title}>Weather of {city}</Text>
                </View>
                <Content>
                    <View style={{ alignItems: 'center', paddingTop: 10 }}>

                        {data && Array.isArray(data) ? data.map((item, index) =>
                            <Card style={styles.Card} key={index}>

                                <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center', width: '75%' }}>
                                    <View>
                                        <Image source={require('../assets/images/weather.png')} style={{ height: 80, width: 80, borderRadius: 25 }} />
                                    </View>
                                    <View style={{ paddingLeft: 15 }}>
                                        <Text style={styles.cityname}>{this.getdate(item.dt_txt)}</Text>
                                    </View>
                                </View>
                                <View style={{ paddingTop: 5 }}>

                                </View>
                                <View style={{ flexDirection: 'row', paddingTop: 5, alignItems: 'center' }}>
                                    <Icon name="snow-outline" style={{ color: '#81BEF7', fontSize: 20, }} />
                                    <Text style={{ color: 'grey', paddingLeft: 5, }}>Temp | </Text>
                                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingTop: 2 }}>
                                        <Text style={{ color: 'black' }}>{item.main.temp}</Text>
                                        <Text style={{ fontSize: 16, color: '#81BEF7', paddingLeft: 2 }}>°C</Text>
                                    </View>
                                </View>
                            </Card>) : null}
                    </View>

                </Content>
            </Container>
        )
    }
}

export default City;

const styles = StyleSheet.create({
    Container: {
        paddingTop: 25,
        paddingRight: 4,
        paddingLeft: 5,
        height: 'auto',
        paddingBottom: 10,
    },
    Card: {
        width: '85%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
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