import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, Button, ScrollView, Dimensions } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5"
import Server from './ServerFunction'


export default class LaporanUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            pria: 0,
            wanita: 0,
            showSearch: null,
            searchText: '',
            borderColor: ['#e8bd46', '#8ce846', '#46e8a7', '#46e3e8', '#4679e8']
        }
    }


    deleteUser(username) {
        fetch(`${Server.GetBackEndserver()}/delete/user/${username}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                this.loadUser()
            })
    }

    async loadUser() {
        await fetch(`${Server.GetBackEndserver()}/list/user?screen=Laporan User`)
            .then(res => res.json())
            .then(res => {
                let pria = res.filter((item) => {
                    return item.jenis_kelamin === 'Pria'
                })
                let wanita = res.filter((item) => {
                    return item.jenis_kelamin === 'Wanita'
                })
                this.setState({
                    userList: res,
                    pria: pria.length,
                    wanita: wanita.length
                })
            })
    }


    searchUser(user) {
        fetch(`${Server.GetBackEndserver()}/search/User?user=${user}`)
            .then(res => res.json())
            .then(res => {
                let pria = res.filter((item) => {
                    return item.jenis_kelamin === 'Pria'
                })
                let wanita = res.filter((item) => {
                    return item.jenis_kelamin === 'Wanita'
                })
                this.setState({
                    userList: res,
                    pria: pria.length,
                    wanita: wanita.length
                })
            })
    }

    componentDidMount() {
        const {navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            this.loadUser()
        })
        
        this.loadUser()
    }

    render() {
        const borderColorRepeat = new Array(5).fill([0, 1, 2, 3, 4]).flat()
        return (
            <ScrollView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <StatusBar
                        backgroundColor="#24a1d7"
                        animated
                        barStyle="light-content"
                        showHideTransition="fade" />

                    <View style={styles.headerBg}>
                    </View>
                    <View style={styles.headerInfoContainer}>
                        <View style={styles.headerItemTextContainer}>
                            <Text style={styles.headerItemTextTitle}>{this.state.pria}</Text>
                            <Text style={styles.headerItemSmallText}>Pria</Text>
                        </View>
                        <View style={styles.headerSeparator}></View>
                        <View style={styles.headerItemTextContainer}>
                            <Text style={styles.headerItemTextTitle}>{this.state.wanita}</Text>
                            <Text style={styles.headerItemSmallText}>Wanita</Text>
                        </View>

                        <View style={styles.headerSeparator}></View>
                        <View style={styles.headerItemTextContainer}>
                            <Icon name='search' size={20} color='#758184' onPress={() => this.state.showSearch ? this.setState({ showSearch: false }) : this.setState({ showSearch: true })} />
                        </View>
                    </View>
                    {
                        this.state.showSearch ? <View>
                            <TextInput placeholder='Search' keyboardType="web-search" returnKeyType="search"
                                placeholderTextColor='rgba(0,0,0,.6)' style={styles.searchInput} onChangeText={(value)=>this.searchUser(value)} />
                        </View> : null
                    }


                    {
                        this.state.userList.map((item, index) => (
                            <TouchableOpacity key={index} style={[styles.itemBtnContainer, { borderLeftColor: this.state.borderColor[borderColorRepeat[index]] }]} onPress={() => this.props.navigation.navigate('DetailUser', { data: item })}>
                                <View style={styles.itemContentContainer}>
                                    <Image source={{ uri: `${Server.GetBackEndserver()}/images/user/${item.poto}` }} style={styles.itemImage} />
                                    <View style={{ width: '65%' }}>
                                        <Text style={styles.itemContentTitle}>{item.nama}</Text>
                                        <Text style={styles.itemContentSmallText}>Jenis Kelamin : {item.jenis_kelamin} </Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.itemContentSmallText}>Email : </Text>
                                            <Text style={[styles.itemContentSmallText, { flex: 1, marginLeft: 0 }]}>{item.email}</Text>
                                        </View>
                                        <Text style={styles.itemContentSmallText}>Last Online : {`${item.lastActive.split(' ')[0]} ${item.lastActive.split(' ')[1]} ${item.lastActive.split(' ')[2]}`} </Text>
                                    </View>
                                </View>
                                <View style={styles.itemIconContainer}>
                                    <Icon name='pen' size={20} color='#758184' style={{ marginRight: 15 }} onPress={() => this.props.navigation.navigate('EditUser', { data: item })} />
                                    <Icon name='trash' size={20} color='#758184' onPress={() => this.deleteUser(item.username)} />
                                </View>
                                {/* <View style={{ width: '100%', borderBottomWidth: 1, borderColor: 'Black', padding: 10, borderTopColor: "Black", borderTopWidth: index === 0 ? 1 : 0, marginTop: 6 }} >
                                    <View style={{ flexDirection: "row" }}>
                                        <Image source={{ uri: `${Server.GetBackEndserver()}/images/user/${item.poto}` }} style={{ width: 120, height: 100, alignSelf: "flex-start", marginLeft: 3, borderRadius: 10 }} />
                                        <View style={{ width: '65%' }}>
                                            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10, }}>{item.nama}</Text>
                                            <Text style={{ fontSize: 13, fontWeight: "bold", marginLeft: 10, paddingTop: 5 }}>Jenis Kelamin : {item.jk} </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 13, fontWeight: "bold", marginLeft: 10, paddingTop: 3 }}>Email :</Text>
                                                <Text style={{ fontSize: 13, fontWeight: "bold", marginLeft: 5, paddingTop: 3, flex: 1 }}>{item.email}</Text>
                                            </View>
                                            <Text style={{ fontSize: 13, fontWeight: "bold", marginLeft: 10, paddingTop: 3 }}>Last Online : </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'flex-end', paddingRight: 5 }}>
                                        <Icon name='pen' size={20} style={{ marginRight: 15 }} onPress={() => alert('Test')} />
                                        <Icon name='trash' size={20} onPress={() => alert('Test')} />
                                    </View>
                                </View> */}
                            </TouchableOpacity>
                        ))
                    }


                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    headerBg: {
        backgroundColor: "#24a1d7",
        height: Dimensions.get('window').height - 570,
        elevation: 3
    },
    headerInfoContainer: {
        borderRadius: 5,
        borderColor: "black",
        width: "95%",
        alignSelf: "center",
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        elevation: 3,
        marginTop: -35
    },
    headerItemTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#758184'
    },
    headerSeparator: {
        borderRightWidth: 1
    },
    headerItemTextTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#758184'
    },
    headerItemSmallText: {
        fontSize: 10,
        color: '#758184'
    },
    searchInput: {
        padding: 5,
        width: '85%',
        backgroundColor: "#fff",
        borderRadius: 10,
        width: '90%',
        alignSelf: "center",
        marginVertical: 15,
        elevation: 3
    },
    itemBtnContainer: {
        width: '95%',
        padding: 10,
        marginVertical: 6,
        backgroundColor: '#fff',
        elevation: 3,
        borderRadius: 10,
        alignSelf: 'center',
        borderLeftWidth: 3
    },
    itemContentContainer: {
        flexDirection: "row"
    },
    itemImage: {
        width: 120,
        height: 100,
        alignSelf: "flex-start",
        marginLeft: 3,
        borderRadius: 10
    },
    itemContentTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
        color: '#758184'
    },
    itemContentSmallText: {
        fontSize: 13,
        fontWeight: "bold",
        marginLeft: 10,
        paddingTop: 5,
        color: '#758184'
    },
    itemIconContainer: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        paddingRight: 5
    }

})