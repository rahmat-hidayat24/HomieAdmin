import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StatusBar, Modal, StyleSheet, AsyncStorage,TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import LocationIcon from 'react-native-vector-icons/MaterialIcons'
import Server from './ServerFunction'

// Import Screen for Tab

import InfoSewa from './InfoSewa'
import Fasilitas from './Fasilitas'
import Lokasi from './Lokasi'
import Ulasan from './Ulasan'
import Chat from './Chat'


const styles = StyleSheet.create({
    iconPadding: {
        paddingHorizontal: 15, paddingVertical: 7
    },
    selected: {
        backgroundColor: '#4f81c7',
        color: 'white'
    },
    notSelected: {
        backgroundColor: 'white',
        color: '#4f81c7'
    }
})


export default class DetailHunian extends Component {
    constructor(props) {
        super(props);
        this.state = {

            selectedScreen: 'info',
            bg: '',
            color: '#4f81c7',
            nama: '',
            modalChat: false,
            username:'',
            sendParams: {
                idHunian: this.props.navigation.state.params.hunian.idHunian,
                // pemilik: this.props.navigation.state.params.hunian.pemilik,
                // nm_hunian: this.props.navigation.state.params.hunian.nm_hunian,
                penghuniKamar: this.props.navigation.state.params.hunian.statusKamarMaks,
                kamarTerisi: this.props.navigation.state.params.hunian.statusKamarTerisi,
                kamarTersedia: this.props.navigation.state.params.hunian.kamarTersedia,
                jumlahKamar: this.props.navigation.state.params.hunian.jumlahKamar,
            },
            iconsTab: [
                {
                    iconName: 'md-information-circle',
                    selectedScreen: 'info',
                },
                {
                    iconName: 'ios-bed',
                    selectedScreen: 'info kamar',
                },
                {
                    iconName: 'md-locate',
                    selectedScreen: 'lokasi',
                },
                {
                    iconName: 'md-star',
                    selectedScreen: 'ulasan',
                }
            ],
            screen : this.props.navigation.state.params.screen
        }
    }



    async componentDidMount() {
        const { navigation } = this.props
        // this.getChats()
        // this.intervalID = setInterval(this.getChats.bind(this), 3000)
        let nama = await AsyncStorage.getItem('nama')
        let username = await AsyncStorage.getItem('username')
        console.warn(this.props.navigation.state.params.hunian.idHunian)
        this.setState({
            nama: nama,
            username:username
        })
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({
                selectedScreen: 'info'
            })
        })
    }

    render() {
        const hunian = this.props.navigation.state.params.hunian
        return (
            <ScrollView style={{ backgroundColor: '#f4f3f3', flex: 1 }}>
                <Modal animated animationType='slide' visible={this.state.modalChat} transparent >
                    <Chat />
                </Modal>
                <View style={{ backgroundColor: '#fff' }}>
                    <Image source={{ uri: `${Server.GetBackEndserver()}/images/hunian/${this.props.navigation.state.params.hunian.poto}` }} style={{ width: '98%', height: 250, alignSelf: 'center' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '2%' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 25, color: '#4f81c7' }}>{hunian.nm_hunian}</Text>
                            <Text style={{ fontSize: 15, color: '#4f81c7' }}>{hunian.alamat_hunian}</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 15, color: '#4f81c7', textTransform: 'capitalize', fontWeight: 'bold' }}>{hunian.pemilik}</Text>
                            <Text style={{ fontSize: 15, color: '#4f81c7' }}>{hunian.tel}</Text>
                            <Text style={{ color: '#4f81c7' }}>{Server.FormatCurrency(hunian.harga_hunian_day)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>

                        {
                            this.state.iconsTab.map((item, index) => (

                                <Icon key={index} name={item.iconName} size={30} style={[styles.iconPadding, this.state.selectedScreen === item.selectedScreen ? styles.selected : styles.notSelected]} onPress={() => this.setState({ selectedScreen: item.selectedScreen })} />

                            ))
                        }
                        {/* <TabNav /> */}
                    </View>
                </View>
                <View>

                    {(() => {
                        switch (this.state.selectedScreen) {
                            case 'info': return <InfoSewa params={this.state.sendParams} screen={this.state.screen} />
                            case 'info kamar': return <Fasilitas params={this.state.sendParams} />
                            case 'lokasi': return <Lokasi />
                            case 'ulasan': return <Ulasan params={this.state.sendParams} />
                        }
                    })()}
                </View>
            </ScrollView>
        )
    }
}