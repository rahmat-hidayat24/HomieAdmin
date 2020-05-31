import React, { Component } from 'react'
import { View, StatusBar, Text, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native'
import Server from './ServerFunction'
import Ionicons from 'react-native-vector-icons/Ionicons'


export default class InfoSewa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idHunian: this.props.params.idHunian,
            penghuniKamar: this.props.params.penghuniKamar,
            kamarTerisi: this.props.params.statusKamarTerisi,
            kamarTersedia: this.props.params.kamarTersedia,
            jumlahKamar: this.props.params.jumlahKamar,
            infoSewa: {},
            listFasilitas: [],
            Fasilitas: [],
            screen: this.props.screen,
            pet: '',
            penghuniList: ['Pria', 'Wanita', 'Campur'],
            penghuniText: '',
            tipe_hunian: ['Rumah', 'Gedung', 'Apartemen'],
            tipe_hunianSelected: '',
            jenisListrik: ['Prabayar', 'Pascabayar'],
            jenisListrikSelected: '',
            optionPet: '',
            showInputPet: false
        }
    }

    async loadInfoHunian() {
        await fetch(`${Server.GetBackEndserver()}/hunian/detail/${this.state.idHunian}`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    infoSewa: res,
                    penghuniText:res.penghuni,
                    tipe_hunianSelected:res.tipe_hunian,
                    jenisListrikSelected:res.jenisListrik,
                })
                if(res.pet == 'Tidak Boleh'){
                    this.setState({
                        optionPet: 'Tidak Boleh'
                    })
                } else{
                    this.setState({
                        optionPet:'Boleh',
                        showInputPet : true,
                        pet : res.pet
                    })
                }
                this.setState({
                    Fasilitas: res.nama_fasilitas
                })
                var listFasilitas = this.state.Fasilitas
                var arr = listFasilitas.split(',')
                this.setState({
                    listFasilitas: arr
                })
            })
    }

    componentDidMount() {
        this.loadInfoHunian()
        
    }

    
    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ backgroundColor: '#e8ffe8', padding: 8 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#4f81c7' }}>Info Tempat Kos</Text>
                    </View>
                    {
                        this.state.screen == 'Edit Hunian' ? <View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: '#63707e' }}>Penghuni :</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 15 }}>
                                {
                                    this.state.penghuniList.map((item, index) => (
                                        <View key={index}>
                                            <TouchableOpacity style={{ borderColor: '#4f81c7', backgroundColor: this.state.penghuniText === item ? '#4f81c7' : '#fff', borderWidth: 1, padding: 8, borderRadius: 8, width: 80, alignItems: 'center' }} onPress={() => this.setState({ penghuniText: item })}>
                                                <Text style={{ color: this.state.penghuniText === item ? '#fff' : '#4f81c7' }}>{item}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: '#63707e' }}>Binatang Peliharaan :</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 15 }}>
                                <TouchableOpacity style={{ borderColor: '#4f81c7', backgroundColor: this.state.optionPet === 'Tidak Boleh' ? '#4f81c7' : '#fff', borderWidth: 1, padding: 8, borderRadius: 8, width: '30%', alignItems: 'center' }} onPress={() => this.setState({ optionPet: 'Tidak Boleh', showInputPet: false, pet: 'Tidak Boleh' })}>
                                    <Text style={{ color: this.state.optionPet === 'Tidak Boleh' ? '#fff' : '#4f81c7' }}>Tidak Boleh</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ borderColor: '#4f81c7', backgroundColor: this.state.optionPet === 'Boleh' ? '#4f81c7' : '#fff', borderWidth: 1, padding: 8, borderRadius: 8, alignItems: 'center', width: '30%' }} onPress={() => this.setState({ optionPet: 'Boleh', showInputPet: true, pet: '' })}>
                                    <Text style={{ color: this.state.optionPet === 'Boleh' ? '#fff' : '#4f81c7' }}>Boleh</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                this.state.showInputPet === true && this.state.pet !== 0 || this.state.pet !== '' && this.state.pet !== 'Tidak Boleh' ? <TextInput
                                    underlineColorAndroid='#4f81c7'
                                    onChangeText={(value) => this.setState({ pet: value })}
                                    value={this.state.pet}
                                    placeholder='Ketikkan Binatang Peliharaan yang Boleh Dibawa'
                                /> : null
                            }
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: '#63707e' }}>Penghuni Kamar :</Text>
                            <TextInput
                                underlineColorAndroid='#4f81c7'
                                value={`${this.state.penghuniKamar} Orang (Total Dari ${this.state.jumlahKamar} Kamar)`}
                                editable={false} />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: '#63707e' }}>Tipe Bangunan :</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 15 }}>
                                {
                                    this.state.tipe_hunian.map((item, index) => (
                                        <View key={index}>
                                            <TouchableOpacity style={{ borderColor: '#4f81c7', backgroundColor: this.state.tipe_hunianSelected === item ? '#4f81c7' : '#fff', borderWidth: 1, padding: 8, borderRadius: 8, width: '100%', alignItems: 'center' }} onPress={() => this.setState({ tipe_hunianSelected: item })}>
                                                <Text style={{ color: this.state.tipe_hunianSelected === item ? '#fff' : '#4f81c7' }}>{item}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: '#63707e' }}>Luas Kamar :</Text>
                            <TextInput
                                underlineColorAndroid='#4f81c7'
                                style={{ color: '#63707e' }}
                                value={this.state.infoSewa.luasKamar}
                                editable={true}
                                placeholder='ex : 5x5' />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: '#63707e' }}>Jenis Listrik :</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 15 }}>
                                {
                                    this.state.jenisListrik.map((item, index) => (
                                        <View key={index}>
                                            <TouchableOpacity style={{ borderColor: '#4f81c7', backgroundColor: this.state.jenisListrikSelected === item ? '#4f81c7' : '#fff', borderWidth: 1, padding: 8, borderRadius: 8, width: '100%', alignItems: 'center' }} onPress={() => this.setState({ jenisListrikSelected: item })}>
                                                <Text style={{ color: this.state.jenisListrikSelected === item ? '#fff' : '#4f81c7' }}>{item}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: '#63707e' }}>Harga :</Text>
                            <TextInput
                                underlineColorAndroid='#4f81c7'
                                value={`${Server.FormatCurrency(this.state.infoSewa.harga_hunian_day)} / Hari `}
                                editable={false} />
                            <TextInput
                                underlineColorAndroid='#4f81c7'
                                value={`${Server.FormatCurrency(this.state.infoSewa.harga_hunian_week)} / Minggu `}
                                editable={false} />
                            <TextInput
                                underlineColorAndroid='#4f81c7'
                                value={`${Server.FormatCurrency(this.state.infoSewa.harga_hunian_month)} / Bulan `}
                                editable={false} />
                            <TextInput
                                underlineColorAndroid='#4f81c7'
                                value={`${Server.FormatCurrency(this.state.infoSewa.harga_hunian_year)} / Tahun `}
                                editable={false} />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: '#63707e' }}>Kamar Tersedia :</Text>
                            <TextInput
                                underlineColorAndroid='#4f81c7'
                                value={`${this.state.kamarTersedia}`}
                                editable={false} />
                        </View>
                        <View style={{width:'80%', alignSelf:'center' , marginVertical:15}}>
                            <Button title='Update Hunian' />
                        </View>
                    </View> : 
                    <View style={{ flexDirection: 'row', borderTopColor: '#eee', borderTopWidth: 2, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'column', width: '40%', padding: 5 }}>
                            <Text style={{ color: '#63707e' }}>Penghuni </Text>
                            <Text style={{ color: '#63707e' }}>Binatang Peliharaan </Text>
                            <Text style={{ color: '#63707e' }}>Penghuni Kamar</Text>
                            <Text style={{ color: '#63707e' }}>Tipe Bangunan</Text>
                            <Text style={{ color: '#63707e' }}>Luas Kamar</Text>
                            <Text style={{ color: '#63707e' }}>Jumlah Lantai</Text>
                            <Text style={{ color: '#63707e' }}>Jenis Listrik </Text>
                            <Text style={{ color: '#63707e' }}>Harga </Text>
                            <Text> </Text>
                            <Text> </Text>
                            <Text style={{ color: '#63707e' }}>Kamar Tersedia</Text>

                        </View>
                        <View style={{ flexDirection: 'column', width: '60%', padding: 5 }}>
                            
                            <Text style={{ color: '#63707e' }}>: {this.state.infoSewa.penghuni}</Text>
                            <Text style={{ color: '#63707e' }}>: {this.state.infoSewa.pet} </Text>
                            <Text style={{ color: '#63707e' }}>: {this.state.penghuniKamar} Orang (Total Dari {this.state.jumlahKamar} Kamar)</Text>
                            <Text style={{ color: '#63707e' }}>: {this.state.infoSewa.tipe_hunian}</Text>
                            <Text style={{ color: '#63707e' }}>: {this.state.infoSewa.luasKamar} m</Text>
                            <Text style={{ color: '#63707e' }}>: {this.state.infoSewa.jlhLantai} Lantai</Text>
                            <Text style={{ color: '#63707e' }}>: {this.state.infoSewa.jenisListrik} </Text>
                            <Text style={{ color: '#63707e' }}>: {Server.FormatCurrency(this.state.infoSewa.harga_hunian_day)} / hari </Text>
                            <Text style={{ color: '#63707e' }}>: {Server.FormatCurrency(this.state.infoSewa.harga_hunian_month)} / bulan </Text>
                            <Text style={{ color: '#63707e' }}>: {Server.FormatCurrency(this.state.infoSewa.harga_hunian_year)} / tahun </Text>
                            <Text style={{ color: '#63707e' }}>: {this.state.kamarTersedia}  </Text>
                        </View>
                    </View> 
                            }
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 15 }}>
                    <View style={{ backgroundColor: '#e8ffe8', padding: 5, borderColor: '#eee', borderWidth: 0.8 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#4f81c7' }}>Keterangan Lain</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, borderBottomColor: '#f2f6f5', borderBottomWidth: 1 }}>
                        <Text style={{ color: '#63707e' }}>{this.state.infoSewa.deskripsi}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: 'white', marginTop: 15 }}>
                    <View style={{ backgroundColor: '#e8ffe8', padding: 8, borderColor: '#eee', borderWidth: 0.8 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#4f81c7' }}>Fasilitas Hunian</Text>
                    </View>
                    <View>
                        {
                            this.state.listFasilitas.map((item, index) => (

                                <View key={index}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, borderBottomColor: '#f2f6f5', borderBottomWidth: 1 }}>
                                        <Text style={{ color: '#63707e' }}>{item}</Text>
                                        <Ionicons name='md-checkmark' color='#4f81c7' size={25} />
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }
}