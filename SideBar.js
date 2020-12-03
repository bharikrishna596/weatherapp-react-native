import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


class SideBar extends React.Component {
    render() {
        return (
            <View>
                <TouchableOpacity>
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default SideBar;