import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, TextInput, Button, AsyncStorage, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import Server from './ServerFunction'





export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errInput: false,
            errText: false
        }
    }



    loginMethod = () => {
        fetch(`${Server.GetBackEndserver()}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(res => {

                if (this.state.username == '' || this.state.password == '') {
                    alert('Input tidak boleh kosong')
                }
                else {
                    if (res === false) {
                        alert('Username atau Password Salah')
                        this.setState({ errInput: true, errText: true })
                    }
                    else {
                        this.setState({ errInput: false })
                        if (res.jenis !== 'Admin') {
                            alert('Username atau Password Salah')
                            this.setState({ errInput: true, errText: true })
                        } else {
                            console.log(res)
                            AsyncStorage.setItem('username', res.username);
                            AsyncStorage.setItem('jenis', res.jenis)
                            AsyncStorage.setItem('nama', res.nama)
                            AsyncStorage.setItem('tel', res.tel)
                            AsyncStorage.setItem('token', res.token)
                            this.props.navigation.navigate('Home', { nama: res.nama })
                        }

                    }
                }
            }).catch((error) => {
                console.error(error);
            })
    }

    async componentDidMount() {
        await AsyncStorage.getItem('jenis')
            .then(res => {
                if (res == 'Admin') {
                    this.props.navigation.navigate('Auth')
                } else
                    this.props.navigation.navigate('App')
            })
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, backgroundColor: '#208ebd' }}>
                    <StatusBar
                        backgroundColor="#208ebd"
                        animated
                        barStyle="light-content"
                        showHideTransition='fade' />
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex:1 }}>
                        <View style={{ backgroundColor: '#fff',  position: 'absolute', width: '90%', padding: 15, borderRadius: 80 , height:350, justifyContent:'center'}}>
                            <View style={{ borderWidth:10 , position:'absolute', top:-80, alignSelf:'center', borderRadius:120, borderColor:'#208ebd'}}>
                                <Image source={require('./logouser.png')} style={{ width: 140, height: 140, alignSelf: 'center'}} />
                            </View>
                            <View style={{ padding: 15, marginTop:20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10, alignItems: 'center' }}>
                                    <Icon name='user' size={30} />
                                    <TextInput placeholder='Username'
                                        onChangeText={(value) => this.setState({ username: value, errText: false })}
                                        placeholderTextColor='rgba(0,0,0,.6)' style={{ padding: 5, borderBottomColor: this.state.errInput ? 'red' : 'black', borderBottomWidth: 1, width: '75%', marginLeft: 5, color: this.state.errText ? 'red' : 'black' }}
                                        autoCapitalize='none' />

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='lock' size={30} />
                                    <TextInput placeholder='Password'
                                        secureTextEntry
                                        onChangeText={(value) => this.setState({ password: value })}
                                        placeholderTextColor='rgba(0,0,0,.6)' style={{ padding: 5, borderBottomColor: this.state.errInput ? 'red' : 'black', borderBottomWidth: 1, width: '75%', marginLeft: 5, color: this.state.errText ? 'red' : 'black' }} />
                                </View>
                            </View>
                            <View style={{ width: '75%', alignSelf: 'center', marginTop: '10%' }}>
                                <Button title='Login' color='#24a1d7' onPress={this.loginMethod} />
                            </View>
                        </View>
                    </View>
                    {/* <View style={{ position: 'absolute', top: 50, paddingLeft: 15 ,borderWidth:1 }}>
                        <Text style={{ color: '#fff' }}>Welcome To Homie Admin Mobile</Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', position: 'absolute', width: '100%', bottom: 0, borderTopLeftRadius: 120 , borderWidth:1, elevation:4}}>
                        <View style={{ paddingTop: '45%'}}>

                            <View style={{ width: '100%', position:'absolute' }}>
                                <Image source={require('./logouser.png')} style={{ width: 140, height: 140, alignSelf: 'center' }} />
                            </View>
                            <View style={{ padding: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10, alignItems: 'center' }}>
                                    <Icon name='user' size={30} />
                                    <TextInput placeholder='Username'
                                        onChangeText={(value) => this.setState({ username: value, errText: false })}
                                        placeholderTextColor='rgba(0,0,0,.6)' style={{ padding: 5, borderBottomColor: this.state.errInput ? 'red' : 'black', borderBottomWidth: 1, width: '75%', marginLeft: 5, color: this.state.errText ? 'red' : 'black' }}
                                        autoCapitalize='none' />

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='lock' size={30} />
                                    <TextInput placeholder='Password'
                                        secureTextEntry
                                        onChangeText={(value) => this.setState({ password: value })}
                                        placeholderTextColor='rgba(0,0,0,.6)' style={{ padding: 5, borderBottomColor: this.state.errInput ? 'red' : 'black', borderBottomWidth: 1, width: '75%', marginLeft: 5, color: this.state.errText ? 'red' : 'black' }} />
                                </View>
                            </View>
                            <View style={{ width: '75%', alignSelf: 'center', marginTop: '10%' }}>
                                <Button title='Login' color='#24a1d7' onPress={this.loginMethod} />
                            </View>
                        </View>
                    </View> */}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}