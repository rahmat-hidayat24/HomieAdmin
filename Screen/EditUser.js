import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, Button, ScrollView } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import Server from './ServerFunction'








export default class DetailUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nama: '',
            jenis: '',
            alamat: '',
            email: '',
            notel: '',
            kota: '',
            jk: '',
            team : ''
        }
    }



    editProfile(username) {
        fetch(`${Server.GetBackEndserver()}/profile/edit/${username}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nama: this.state.nama,
                    alamat: this.state.alamat,
                    kota: this.state.kota,
                    email: this.state.email,
                    tel: this.state.notel,
                    team : ''
                })
            })
            .then(res => {
                if (res.status == '500') {
                    alert('Gagal Edit')
                } else {
                    alert('Berhasil Edit User')
                }
            }).catch(err => {
                console.log(err)
            })

    }


    componentDidMount() {
        const user = this.props.navigation.state.params.data
        this.setState({
            nama: user.nama,
            jenis: user.jenis,
            alamat: user.alamat,
            email: user.email,
            notel: user.tel,
            jk: user.jk,
            kota: user.kota
        })
    }
    render() {
        const user = this.props.navigation.state.params.data
        return (
            <ScrollView style={{flex:1, paddingBottom:15}}>
                <View style={{paddingBottom:20}}>
                    <StatusBar
                        backgroundColor="#24a1d7"
                        animated
                        barStyle="light-content"
                        showHideTransition="fade" />

                    {/* Header */}
                    <View style={{ paddingTop: 20, backgroundColor: '#fff', width: '90%', alignSelf: 'center', elevation: 5, marginTop: 35, borderRadius: 10 }}>
                        <View>
                            <Image source={{ uri: `${Server.GetBackEndserver()}/images/user/${user.poto}` }} style={{ width: 150, height: 150, borderRadius: 75, alignSelf: 'center' }} />
                        </View>
                        <Text style={{ fontSize: 15, alignSelf: "center", marginBottom: 5, marginTop: 5 }}>Last Online: 29 Maret 2020 </Text>
                    </View>

                    {/* Body */}
                    <View style={{ backgroundColor: '#fff', justifyContent: 'center', width: '90%', alignSelf: 'center', elevation: 5, borderRadius: 10, borderTopColor: '#758184', borderTopWidth: 1 }}>
                        <View style={{ paddingLeft: 10  }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text style={styles.boldText}>Nama</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>:</Text>
                                    <TextInput
                                        value={this.state.nama}
                                        onChangeText={(value) => this.setState({ nama: value })}
                                        style={{ width: '65%' }}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.boldText}>Jenis</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>:</Text>
                                    <TextInput
                                        value={this.state.email}
                                        onChangeText={(value) => this.setState({ email: value })}
                                        style={{ width: '65%' }}
                                        keyboardType='email-address'
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.boldText}>Jenis</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>:</Text>
                                    <TextInput
                                        value={this.state.jenis}
                                        onChangeText={(value) => this.setState({ jenis: value })}
                                        style={{ width: '65%' }}
                                        editable={false}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.boldText}>Alamat</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>:</Text>
                                    <TextInput
                                        value={this.state.alamat}
                                        onChangeText={(value) => this.setState({ alamat: value })}
                                        style={{ width: '65%' }}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.boldText}>No. Handphone</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>:</Text>
                                    <TextInput
                                        value={this.state.notel}
                                        onChangeText={(value) => this.setState({ notel: value })}
                                        style={{ width: '65%' }}
                                        keyboardType='number-pad'
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.boldText}>Jenis Kelamin</Text>
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                    <Text>:</Text>
                                    <TextInput
                                        value={this.state.jk}
                                        onChangeText={(value) => this.setState({ jk: value })}
                                        style={{ width: '65%' }}
                                        editable={false}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.boldText}>Kota</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>:</Text>
                                    <TextInput
                                        value={this.state.kota}
                                        onChangeText={(value) => this.setState({ kota: value })}
                                        style={{ width: '65%' }}
                                    />
                                </View>
                            </View>
                        </View>
                        <Button title='Update User' onPress={()=>{this.editProfile(user.username), this.props.navigation.goBack()}} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    formContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    // leftSide: {
    //     width: '35%'
    // },
    // rightSide: {
    //     width: '65%'
    // },
    boldText: {
        fontWeight: 'bold',
        color: '#758184'
    }
})