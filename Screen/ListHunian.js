import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, Alert, ScrollView, Dimensions } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5"
import Server from './ServerFunction'






export default class ListHunian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            hunian: [],
            apartemen: 0,
            gedung: 0,
            rumah: 0,
            showSearch: null,
            searchText: '',
            borderColor: ['#e8bd46', '#8ce846', '#46e8a7', '#46e3e8', '#4679e8']
        }
    }


    async loadHunian() {
        try {
            await fetch(`${Server.GetBackEndserver()}/hunian`)
                .then(response => response.json())
                .then(response => {
                    let Rumah = response.filter((item) => {
                        return item.tipe_hunian === 'Rumah'
                    })
                    let Apartemen = response.filter((item) => {
                        return item.tipe_hunian === 'Apartemen'
                    })
                    let Gedung = response.filter((item) => {
                        return item.tipe_hunian === 'Gedung'
                    })
                    this.setState({
                        loading: false,
                        hunian: response,
                        apartemen: Apartemen.length,
                        gedung: Gedung.length,
                        rumah: Rumah.length,
                    })

                })
                .catch(err => {
                    alert(err)
                    this.setState({ loading: false })
                })
        }
        catch (e) {
            alert(e)
        }

    }


    deleteOption(idHunian, nm_hunian) {
        Alert.alert(
            'Hapus Hunian',
            'Anda Yakin Menghapus Hunian ' + nm_hunian + ' ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => { this.deleteHunian(idHunian), this.loadHunian() } },
            ],
            { cancelable: false },
        );
    }


    deleteHunian(idHunian) {
        fetch(`${Server.GetBackEndserver()}/hunian/delete/${idHunian}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(res => {
                alert('Data Hunian Berhasil Di Hapus')
            }).catch((error) => {
                console.error(error)
            })
    }

    searchHunian(hunian) {
        fetch(`${Server.GetBackEndserver()}/search/Hunian?nama_hunian=${hunian}`)
            .then(res => res.json())
            .then(res => {
                let Rumah = res.filter((item) => {
                    return item.tipe_hunian === 'Rumah'
                })
                let Apartemen = res.filter((item) => {
                    return item.tipe_hunian === 'Apartemen'
                })
                let Gedung = res.filter((item) => {
                    return item.tipe_hunian === 'Gedung'
                })
                this.setState({
                    hunian: res,
                    apartemen: Apartemen.length,
                    gedung: Gedung.length,
                    rumah: Rumah.length,
                })
            })
    }

    componentDidMount() {
        const {navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            this.loadHunian()
        })
        this.loadHunian()
    }

    render() {
        const borderColorRepeat = new Array(5).fill([0, 1, 2, 3, 4]).flat()
        return (
            <ScrollView style={styles.container}>
                <StatusBar
                    backgroundColor="#24a1d7"
                    animated
                    barStyle="light-content"
                    showHideTransition="fade" />

                <View style={styles.headerBg}>
                </View>
                <View style={styles.headerInfoContainer}>
                    <View style={styles.headerItemTextContainer}>
                        <Text style={styles.headerItemTextTitle}>{this.state.apartemen}</Text>
                        <Text style={styles.headerItemSmallText}>Apartemen</Text>
                    </View>
                    <View style={styles.headerSeparator}></View>
                    <View style={styles.headerItemTextContainer}>
                        <Text style={styles.headerItemTextTitle}>{this.state.gedung}</Text>
                        <Text style={styles.headerItemSmallText}>Gedung</Text>
                    </View>
                    <View style={styles.headerSeparator}></View>
                    <View style={styles.headerItemTextContainer}>
                        <Text style={styles.headerItemTextTitle}>{this.state.rumah}</Text>
                        <Text style={styles.headerItemSmallText}>Rumah</Text>
                    </View>

                    <View style={styles.headerSeparator}></View>
                    <View style={styles.headerItemTextContainer}>
                        <Icon name='search' size={20} color='#758184' onPress={() => this.state.showSearch ? this.setState({ showSearch: false }) : this.setState({ showSearch: true })} />
                    </View>
                </View>
                {
                    this.state.showSearch ? <View>
                        <TextInput placeholder='Search' keyboardType="web-search" returnKeyType="search"
                            placeholderTextColor='rgba(0,0,0,.6)' style={styles.searchInput} onChangeText={(value)=> this.searchHunian(value)} />
                    </View> : null
                }

                {
                    this.state.hunian.map((item, index) => {
                        const thumbnail = item.poto.split(',')
                        return (
                        <TouchableOpacity key={index} style={[styles.itemBtnContainer, { borderLeftColor: this.state.borderColor[borderColorRepeat[index]]}]} onPress={() => this.props.navigation.navigate('DetailHunian',{hunian : item, screen :'Detail Hunian'})}>
                                <View style={styles.itemContentContainer}>
                                    <Image source={{ uri: `${Server.GetBackEndserver()}/images/hunian/${thumbnail[0]}` }} style={styles.itemImage} />
                                    <View>
                                        <Text style={styles.itemContentTitle}>{item.nm_hunian}</Text>
                                        <Text style={styles.itemContentSmallText}>Alamat : {item.alamat_hunian} </Text>
                                        <Text style={styles.itemContentSmallText}>Tipe Bangunan : {item.tipe_hunian}</Text>
                                        <Text style={styles.itemContentSmallText}>Last Update : {item.LastOn}</Text>
                                    </View>
                                </View>
                                <View style={styles.itemIconContainer}>
                                    <Icon name='pen' size={20} color='#758184' style={{ marginRight: 15 }} onPress={()=>this.props.navigation.navigate('DetailHunian',{hunian:item, screen:'Edit Hunian'})}/>
                                    <Icon name='trash' size={20} color='#758184' onPress={() => this.deleteOption(item.idHunian, item.nm_hunian)} />
                                </View>
                            </TouchableOpacity>
                    )})
                }
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