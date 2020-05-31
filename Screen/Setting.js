import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, AsyncStorage, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/FontAwesome5'
import Server from './ServerFunction'




export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            dataUser: {},
            listData: []
        }
    }



    getDataAdmin() {
        fetch(`${Server.GetBackEndserver()}/profil/${this.state.username}`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    dataUser: res
                })
            })
    }


    getListDataAdmin() {
        fetch(`${Server.GetBackEndserver()}/list/user?screen=Setting&username=${this.state.username}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    listData: res
                })
            })
    }

    LogoutMethod = () => {
        AsyncStorage.clear();
        this.props.navigation.navigate('Login')
    }

    async componentDidMount() {
        const {navigation} = this.props
        this.focusListener = navigation.addListener('willFocus',()=>{
            this.getListDataAdmin(), this.getDataAdmin()
        })
        let username = await AsyncStorage.getItem('username')
        this.setState({ username: username })
        this.getDataAdmin()
        this.getListDataAdmin()
    }

    render() {
        var user = this.state.dataUser
        return (
            <View style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
                <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={false}>
                    <View style={{ width: '95%', backgroundColor: '#fff', borderRadius: 10, alignSelf: 'center', elevation: 10, paddingHorizontal: 50, paddingVertical: 15, marginTop: 30 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{width: 120, height: 120, borderRadius: 60, elevation:8}}>
                                <Image source={{ uri: `${Server.GetBackEndserver()}/images/user/${user.poto}` }} style={{ width: 120, height: 120, borderRadius: 60 }} />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#6b6b6b' }}>{user.nama}</Text>
                                <Text style={{ color: '#6b6b6b' }}>{user.email}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#6b6b6b', fontSize: 10 }}>Role</Text>
                                <Text style={{ color: '#6b6b6b', fontWeight: 'bold' }}>Admin</Text>
                            </View>
                            <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#6b6b6b', fontSize: 10 }}>Team</Text>
                                <Text style={{ color: '#6b6b6b', fontWeight: 'bold' }}>{user.team}</Text>
                            </View>
                        </View>
                        <Icon1 name='user-edit' size={25} style={{ alignSelf: 'flex-end', position: 'absolute', top: 10, right: 5 }} color='#6b6b6b' onPress={() => this.props.navigation.navigate('EditProfile')} />
                    </View>
                    <View style={{ width: '95%', alignSelf: 'center', marginTop: 30 }}>
                        <Text style={{ marginLeft: '10%', fontWeight: 'bold', color: '#6b6b6b' }}>Admin</Text>
                        {
                            this.state.listData.map((item, index) => (
                                <TouchableOpacity key={index} style={{ backgroundColor: '#fff', elevation: 4, width: '90%', alignSelf: 'center', borderRadius: 10, flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 10, alignItems: 'center', marginTop: 15 }}>
                                    <Image source={{ uri: `${Server.GetBackEndserver()}/images/user/${item.poto}` }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                                    <View style={{ marginLeft: '5%' }}>
                                        <Text style={{ fontWeight: 'bold', color: '#6b6b6b', fontSize: 16 }}>{item.nama}</Text>
                                        <Text style={{ fontWeight: 'bold', color: '#6b6b6b', fontSize: 14 }}>Admin</Text>
                                        <Text style={{ fontSize: 10, color: '#6b6b6b' }}>{item.team}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }


                        {/* <TouchableOpacity style={{ backgroundColor: '#fff', elevation: 4, width: '90%', alignSelf: 'center', borderRadius: 10, flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 10, alignItems: 'center', marginTop: 30 }}>
                        <Image source={require('./image/admin2.jpg')} style={{ width: 80, height: 80, borderRadius: 40 }} />
                        <View style={{ marginLeft: '5%' }}>
                            <Text style={{ fontWeight: 'bold', color: '#6b6b6b', fontSize: 16 }}>Rahmat Hidayat</Text>
                            <Text style={{ fontWeight: 'bold', color: '#6b6b6b', fontSize: 14 }}>Admin</Text>
                            <Text style={{ fontSize: 10, color: '#6b6b6b' }}>Admin & Developer</Text>
                        </View>
                    </TouchableOpacity> */}
                    </View>
                    <View style={{ marginTop: 50, borderTopColor: '#f3f3f3', paddingHorizontal: 5, paddingVertical: 15, borderTopWidth: 1, elevation: 10, backgroundColor: '#fff', flex: 1 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => this.props.navigation.navigate('UbahPassword')}>
                            <View style={{ padding: 15 }}>
                                <View>
                                    <Text style={{ color: '#758184', fontSize: 15 }}>Change Password</Text>
                                </View>
                            </View>
                            <Icon name='lock-reset' size={30} color='#758184' />
                        </TouchableOpacity>
                        <View>
                            <View style={{ borderTopWidth: 1, borderTopColor: '#eee' }}></View>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => this.LogoutMethod()}>
                                <View style={{ padding: 15 }}>
                                    <Text style={{ color: '#758184', fontSize: 15 }}>Logout</Text>
                                </View>
                                <Icon name='logout' size={30} color='#758184' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}