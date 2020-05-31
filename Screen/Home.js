import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, StatusBar, Image } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import Server from './ServerFunction'






export default class Home extends Component {
    state = {
        username: '',
        poto: '',
        nama: ''
    }


    LogoutMethod = () => {
        AsyncStorage.clear();
        this.props.navigation.navigate('Login')
    }


    getDataUser() {
        fetch(`${Server.GetBackEndserver()}/profil/${this.state.username}`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    username: res.username,
                    nama: res.nama,
                    poto: res.poto
                })
            })
    }

    async componentDidMount() {
        let username = await AsyncStorage.getItem('username')
        this.setState({
            username: username
        })
        this.getDataUser()
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:'#fcfcfc'}}>
                <StatusBar
                    backgroundColor="#208ebd"
                    animated
                    barStyle="light-content"
                    showHideTransition='fade' />
                <View style={{ padding: 15 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginBottom: 10, alignItems: 'center', marginTop: 100 }}>
                        <Text style={{ fontSize: 50, alignSelf: "center", fontWeight: "bold", marginBottom: 30 }}>Welcome</Text>
                        {/* <Icon name='user-circle-o' size={170} /> */}
                        <View style={{width: 170, height: 170, borderRadius: 85 , elevation:4}}>
                        <Image source={{ uri: `${Server.GetBackEndserver()}/images/user/${this.state.poto}` }} style={{ width: 170, height: 170, borderRadius: 85 }} />
                        </View>
                        <Text style={{ fontSize: 30, alignSelf: "center", fontWeight: "bold", marginBottom: 3 }}>{this.state.nama}</Text>
                        <Text style={{ fontSize: 25, alignSelf: "center", marginBottom: 30 }}>(Admin)</Text>
                        <Text style={{ color: '#24A1D7' }} onPress={this.LogoutMethod}>Logout</Text>
                    </View>
                </View>
            </View>

        )
    }
}