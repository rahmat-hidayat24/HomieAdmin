import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, Button } from 'react-native'


export default class DetailKritikSaran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.state.params.data
        }
    }

    componentDidMount() {
        console.log(this.state.data)
    }
    render() {
        var data = this.state.data
        return (
            <View style={{ flex: 1, backgroundColor: '#24a1d7', justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar
                    backgroundColor="#24a1d7"
                    animated
                    barStyle="light-content"
                    showHideTransition="fade" />

                <View style={{ backgroundColor: '#fff', width: '80%', borderRadius: 15, padding: 5, elevation: 25 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1,borderBottomColor:'#24a1d7' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold',color:'#758184' }}>{data.nama}</Text>
                        <Text style={{color:'#758184'}}>@{data.username}</Text>
                        <Text style={{color:'#758184'}}>Date Create : {data.date_create}</Text>
                    </View>
                    <View>
                        <TextInput
                            style={{ color: "#758184" }}
                            editable={false}
                            multiline
                            numberOfLines={10}
                            textAlignVertical='top'
                            value={data.deskripsi}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
