import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StatusBar, Modal, StyleSheet, AsyncStorage, Platform, Linking, Dimensions, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import LocationIcon from 'react-native-vector-icons/MaterialIcons'
import HomeIcon from 'react-native-vector-icons/Octicons'
import Server from './ServerFunction'
import { SliderBox } from 'react-native-image-slider-box'

// Import Screen for Tab

import InfoSewa from './InfoSewa'
import Fasilitas from './Fasilitas'
import Lokasi from './Lokasi'
import Ulasan from './Ulasan'
import Chat from './Chat'
import { TouchableOpacity } from 'react-native-gesture-handler'



export default class Sewa extends Component {
    constructor(props) {
        super(props);
        this.state = {

            selectedScreen: 'info',
            bg: '',
            color: '#4f81c7',
            nama: '',
            modalChat: false,
            username: '',
            sendParams: {
                idHunian: this.props.navigation.state.params.hunian.idHunian,
                // pemilik: this.props.navigation.state.params.hunian.pemilik,
                // nm_hunian: this.props.navigation.state.params.hunian.nm_hunian,
                penghuniKamar: this.props.navigation.state.params.hunian.statusKamarMaks,
                kamarTerisi: this.props.navigation.state.params.hunian.statusKamarTerisi,
                kamarTersedia: this.props.navigation.state.params.hunian.kamarTersedia,
                jumlahKamar: this.props.navigation.state.params.hunian.jumlahKamar,
                tempatHunian: this.props.navigation.state.params.tempatHunian
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
            photoList: [],
            height: 0,
            width: Dimensions.get('window').width,
        }
    }



    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };

    async componentDidMount() {
        let nama = await AsyncStorage.getItem('nama')
        let username = await AsyncStorage.getItem('username')
        this.setState({
            nama: nama,
            username: username
        })

        const hunian = await this.props.navigation.state.params.hunian.poto
        const test1 = hunian.split(',')

        const test = test1.map(x => `${Server.GetBackEndserver()}/images/hunian/${x}`)
        this.setState({
            photoList: test
        })

    }

    resizeImage = (event) => {
        let widthOrigin = event.nativeEvent.source.width
        let heightOrigin = event.nativeEvent.source.height
        let aspectRatio = widthOrigin / heightOrigin
        this.setState({
            height: this.state.width / aspectRatio
        })
    }
    render() {
        const hunian = this.props.navigation.state.params.hunian
        const tempatHunian = this.props.navigation.state.params.tempatHunian
        return (
            <View style={{ backgroundColor: '#f4f3f3', flex: 1 }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <Modal animated animationType='slide' visible={this.state.modalChat} transparent >
                        <Chat />
                    </Modal>
                    <View style={{ backgroundColor: '#fff', paddingTop: 10 }}>
                        <View style={{ alignSelf: 'center', height: 250 }}>
                            <SliderBox
                                images={this.state.photoList}
                                sliderBoxHeight={250}
                                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                                dotColor="#5edfff"
                                inactiveDotColor="#90A4AE"
                                parentWidth={Dimensions.get('window').width - 10}
                                paginationBoxVerticalPadding={20}
                                resizeMethod={'resize'}
                                resizeMode={'stretch'}
                                ImageComponentStyle={{ borderRadius: 10 }}
                                imageLoadingColor='#24A1D7'

                            />
                        </View>

                        {
                            hunian.poto360 ?
                                <View style={{ width: Dimensions.get('window').width - 220 }}>
                                    <TouchableOpacity style={{ justifyContent: 'center', width: 120, margin: 15 }} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('PhotoSphereScreen', { poto360: `${Server.GetBackEndserver()}/images/hunian/360/${hunian.poto360}` })}>
                                        <Image source={{ uri: `${Server.GetBackEndserver()}/images/hunian/360/${hunian.poto360}` }} style={{ width: 120, height: 60, borderRadius: 8 }} />
                                        <Image source={require('./Asset/Icon/360-transparent.gif')} style={{ width: 15, height: 15, marginRight: 8, position: 'absolute', alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>
                                : null
                        }

                        <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: '2%', borderTopWidth: 1, borderTopColor: '#4f81c7' }}>
                            <View style={{ flexDirection: 'column', width: '100%', marginTop: 8 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <HomeIcon name='home' size={25} color='#4f81c7' />
                                    <Text style={{ fontSize: 25, color: '#4f81c7', fontWeight: 'bold',marginLeft:8 }}>{hunian.nm_hunian}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <LocationIcon name='person-pin' size={25} color='#24A1D7' />
                                    <Text style={{ fontSize: 15, color: '#24A1D7', textTransform: 'capitalize', fontWeight: 'bold',marginLeft:8 }}>{hunian.pemilik}</Text>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                    <View>
                                    <LocationIcon name='location-on' size={25} color='#4f81c7' />
                                    </View>
                                    <Text style={{ fontSize: 15, color: '#4f81c7',marginLeft:8 ,flexShrink:1}}>{hunian.alamat_hunian}</Text>
                                </View>
                            </View>

                            {/* <View style={{ alignItems: 'center', justifyContent: 'center', borderLeftColor: '#4f81c7', borderLeftWidth: 1, paddingHorizontal: 8 }}>
                                <Icon name='md-call' size={40} color='#4f81c7' onPress={() => this.dialCall(hunian.tel)} />
                            </View> */}
                        </View>
                        {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' , alignItems:'center'}}>
                            <TouchableOpacity style={styles.btnItem} onPress={() => this.props.navigation.navigate('SurveiScreen', { data: hunian })}>
                                <Text style={styles.btnItemText}>Survei</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnItem} onPress={() => hunian.kamarTersedia == '0' ? alert('Hunian Sudah Penuh') : Object.keys(tempatHunian).length !== 0 ? alert('Anda Sudah Memiliki Tempat Hunian, Untuk Melakukan Pemesanan Harap Berhenti Dari Hunian Sebelumnya') : this.props.navigation.navigate('OrderRoomScreen', { nama_hunian: hunian.nm_hunian, data: hunian })}>
                                <Text style={styles.btnItemText}>Pesan</Text>
                            </TouchableOpacity>
                        </View> */}
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
                                case 'info': return <InfoSewa params={this.state.sendParams} />
                                case 'info kamar': return <Fasilitas params={this.state.sendParams} />
                                case 'lokasi': return <Lokasi long={hunian.longtitude} lat={hunian.latitude} />
                                case 'ulasan': return <Ulasan toScreen={() => this.props.navigation.navigate('TambahUlasanScreen', { idHunian: hunian.idHunian })} params={this.state.sendParams} />
                                // case 'chat': this.props.navigation.navigate('ChatScreen', {
                                //     nama: this.state.nama, pemilik: this.props.navigation.state.params.hunian.pemilik, namaHunian: this.props.navigation.state.params.hunian.nm_hunian,
                                //     userPoto: this.props.navigation.state.params.hunian.userPoto,
                                //     usernamePemilik: this.props.navigation.state.params.hunian.username, usernamePenghuni: this.state.username, chatId: this.props.navigation.state.params.key,
                                //     idHunian: this.state.sendParams.idHunian, screen: 'Chat'
                                // })
                            }
                        })()}
                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', width: '20%', bottom: 15, right: -15 }}>
                    {/* <View style={{ backgroundColor: '#4f81c7', width: '50%', justifyContent: 'center', alignItems: 'center', elevation: 5, borderTopStartRadius: 6, borderBottomStartRadius: 6 }}>
                        <Icon name='ios-chatbubbles' size={38} color='#fff' onPress={() => this.props.navigation.navigate('ChatScreen', {
                            nama: this.state.nama, pemilik: this.props.navigation.state.params.hunian.pemilik, namaHunian: this.props.navigation.state.params.hunian.nm_hunian,
                            userPoto: this.props.navigation.state.params.hunian.userPoto,
                            usernamePemilik: this.props.navigation.state.params.hunian.username, usernamePenghuni: this.state.username, chatId: this.props.navigation.state.params.key,
                            idHunian: this.state.sendParams.idHunian, screen: 'Chat'
                        })} />
                    </View> */}
                    <View style={{ backgroundColor: '#fff', width: '50%', justifyContent: 'center', alignItems: 'center', borderColor: '#4f81c7', borderWidth: 1, elevation: 5, borderTopEndRadius: 6, borderBottomEndRadius: 6 }}>
                        <Icon name='md-call' size={38} color='#4f81c7' onPress={() => this.dialCall(hunian.tel)} />
                    </View>
                </View>
            </View>
        )
    }
}

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
    },
    btnItem: {
        paddingVertical: 10,
        backgroundColor: '#24A1D7',
        borderColor: '#3e64ff',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 5,
        elevation: 3,
        width: '100%',
        paddingHorizontal: 60
    },
    btnItemText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})