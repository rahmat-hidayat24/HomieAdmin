import React, { Component } from 'react'
import { View, ActivityIndicator, Image, StatusBar, Text, AsyncStorage, StyleSheet, Dimensions } from 'react-native'
import { PanoramaView } from "@lightbase/react-native-panorama-view";
import Server from './ServerFunction'

export default class Images extends Component {
 state={
     poto : 'http://192.168.100.4:8000/images/hunian/360/360.jpg'
 }


 
 componentDidMount(){ 
    this.setState({
        poto:this.props.navigation.state.params.poto360
    })
 }


    render() {
        return (
            <View style={styles.container}>
                <PanoramaView
                    style={styles.viewer}
                    dimensions={{
                        height: Dimensions.get('window').height, width: Dimensions.get("window").width }}
                    inputType="mono"
                    enableTouchTracking={true}
                    imageUrl={this.state.poto}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
    },
    viewer: {
        flex:1
    }
});