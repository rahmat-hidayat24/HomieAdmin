import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, Button } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import Server from './ServerFunction'








export default class DetailUser extends Component {

    render() {
        const user = this.props.navigation.state.params.data
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#24a1d7"
                    animated
                    barStyle="light-content"
                    showHideTransition="fade" />
                <View style={{ paddingTop: 20, backgroundColor: '#fff', width: '90%', alignSelf: 'center', elevation: 5, marginTop: 35 , borderRadius:10}}>
                    <View>
                        <Image source={{ uri: `${Server.GetBackEndserver()}/images/user/${user.poto}` }} style={{ width: 150, height: 150, borderRadius: 75, alignSelf: 'center' }} />
                    </View>
                    <Text style={{ fontSize: 15, alignSelf: "center", marginBottom: 5, marginTop: 5 }}>Last Online: 29 Maret 2020 </Text>
                </View>
                <View style={{backgroundColor:'#fff', justifyContent:'center', width:'90%', alignSelf:'center', elevation:5, borderRadius:10, borderTopColor:'#758184', borderTopWidth:1}}>
                    <View style={styles.formContainer}>
                        <View style={styles.leftSide}>
                            <Text style={styles.boldText}>Nama</Text>
                            <Text style={styles.boldText}>Sebagai</Text>
                            <Text style={styles.boldText}>Alamat</Text>
                            <Text style={styles.boldText}>Email</Text>
                            <Text style={styles.boldText}>No Handphone</Text>
                            <Text style={styles.boldText}>Jenis Kelamin</Text>
                            <Text style={styles.boldText}>Kota</Text>
                        </View>
                        <View style={styles.rightSide}>
                            <Text>: {user.nama}</Text>
                            <Text>: {user.jenis}</Text>
                            <Text>: {user.alamat}</Text>
                            <Text>: {user.email}</Text>
                            <Text>: {user.tel}</Text>
                            <Text>: {user.jk}</Text>
                            <Text>: {user.kota}</Text>
                        </View>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    formContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    leftSide: {
        width: '35%'
    },
    rightSide: {
        width: '65%'
    },
    boldText: {
        fontWeight: 'bold',
        color:'#758184'
    }
})