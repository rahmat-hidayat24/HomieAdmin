import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, Modal, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Server from './ServerFunction'

const styles = StyleSheet.create({
    itemList: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolbarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        height: 56,
        backgroundColor: '#F5365C',
        position: 'absolute',
        width: '100%'
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FB6340',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1
    },
    button: {
        backgroundColor: '#F5365C',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default class Contacts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            data_kontak: [],
            namaDepan : '',
            namaBelakang:'',
            nomor_hp:'',
            email:'',
            show_modal:false
        }
    }

    getDataKontak() {
        this.setState({ isLoading: true })
        fetch('http://192.168.100.20:8000/kontak')
            .then(response => response.json())
            .then(res => {
                this.setState({
                    isLoading: false,
                    data_kontak: res
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    saveDataKontak() {
        var addkontak = {
            nama_depan: this.state.namaDepan,
            nama_belakang: this.state.namaDepan,
            nomor_hp: this.state.nomorHP,
            email: this.state.emailKontak
        }
        fetch('http://192.168.100.20:8000/addkontak', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addkontak)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
            })
    }

    componentDidMount() {
        this.getDataKontak()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbarContainer}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Daftar Kontak</Text>

                    <TouchableOpacity onPress={() => this.setState({ show_modal: true })}>
                        <Ionicons size={24} color='white' name='md-add' />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 56 }}>
                    {
                        this.isLoading ? <ActivityIndicator color='#F5365C' size={30} /> : null
                    }

                    <FlatList data={this.state.data_kontak}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.itemList} key={index}>
                                <View style={styles.avatarContainer}>
                                    <Text style={{ fontSize: 18, color: 'white' }}>{item.nama_depan[0]}</Text>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 16 }}>{item.nama_depan} {item.nama_belakang}</Text>
                                    <Text style={{ fontSize: 11, color: '#999' }}>{item.email}</Text>
                                    <Text style={{ fontSize: 11, color: '#999' }}>{item.nomor_hp}</Text>
                                </View>
                            </TouchableOpacity>
                        )}

                    />
                </View>

                <Modal visible={this.state.show_modal} animationType='slide'>
                    <View style={styles.toolbarContainer}>
                        <Text style={{ color: 'white', fontSize: 15 }}>Tambah Kontak</Text>
                        <TouchableOpacity onPress={() => this.setState({ show_modal: false })}>
                            <Text style={{ color: 'white' }}>Tutup</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ marginTop: 56 }}>
                        <TextInput placeholder='Nama Depan' onChangeText={(value) => this.setState({ namaDepan: value })} />
                        <TextInput placeholder='Nama Belakang' onChangeText={(value) => this.setState({ namaBelakang: value })} />
                        <TextInput placeholder='Nomor HP' onChangeText={(value) => this.setState({ nomorHP: value })} />
                        <TextInput placeholder='Email' onChangeText={(value) => this.setState({ emailKontak: value })} />
                    </ScrollView>

                    <TouchableOpacity onPress={() => this.saveDataKontak()} style={styles.button}>
                        <Text style={styles.textButton}>Simpan</Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}