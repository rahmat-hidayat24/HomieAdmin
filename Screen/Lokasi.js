import React, {Component} from 'react'
import { View, Text, Image, ScrollView, StatusBar } from 'react-native'

export default class Lokasi extends Component{
    render(){
        return(
            <ScrollView>
                <StatusBar
                    backgroundColor='#5edfff'
                    animated
                    barStyle='dark-content' />
                <View>
                    <Text>Lokasi</Text>
                </View>
            </ScrollView>
        )
    }
}

