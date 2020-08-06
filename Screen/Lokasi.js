import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StatusBar, PermissionsAndroid, StyleSheet, TouchableOpacity,Linking } from 'react-native'
import MapView, { Marker } from 'react-native-maps';

export default class Lokasi extends Component {

    state = {
        currentLongitude: this.props.long,//Initial Longitude
        currentLatitude: this.props.lat,//Initial Latitude
    }

    directionMap() {

        var url = `https://www.google.com/maps/dir/?api=1&destination=${this.state.currentLatitude},${this.state.currentLongitude}`;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ backgroundColor: '#24A1D7', padding: 8, elevation: 4, borderRadius: 8,position:'absolute',top:8,right:10,zIndex:10 }} activeOpacity={0.8} onPress={()=>this.directionMap()}>
                    <Text style={{color:'#fff'}}>Dapatkan Petunjuk Arah</Text>
                </TouchableOpacity>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: Number(this.state.currentLatitude),
                        longitude: Number(this.state.currentLongitude),
                        latitudeDelta: 0.0012,
                        longitudeDelta: 0.0112,
                    }}
                >

                    <Marker
                        coordinate={{ "latitude": Number(this.state.currentLatitude), "longitude": Number(this.state.currentLongitude) }}
                        title={"Your Location"}
                        title={'Test Marker'}
                    />
                </MapView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 250
    },
    map: {
        height: 260,
        width: '100%',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 0
    },
});

