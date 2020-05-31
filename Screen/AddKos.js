import React, { Component } from 'react'
import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity, Picker, TextInput, AsyncStorage, StyleSheet, CheckBox, Alert, FlatList, Dimensions } from 'react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { TextField } from 'react-native-material-textfield'
import { TextInputMask } from 'react-native-masked-text'
import ImagePicker from 'react-native-image-crop-picker'
import Server from './../ServerFunction'
import ApartemenIcon from 'react-native-vector-icons/FontAwesome'
import GedungIcon from 'react-native-vector-icons/FontAwesome5'
import HomeIcon from 'react-native-vector-icons/Octicons'
import InfoIcon from 'react-native-vector-icons/Ionicons'

var tempCheckValues = [];
let data = new FormData();
export default class AddKos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBoxChecked: [],
            namaFasilitas: [],
            Fasilitas: [],
            jenisListrikItem: ['Prabayar', 'Pascabayar'],
            dendaList: ['2500', '5000', '7500', '10000', '12500', '15000'],
            tipeBangunan: [{
                selectedTipe: 'Gedung',
                notSelectedIcon: <GedungIcon name='building' size={20} color='#758184' style={{ marginRight: 5 }} />,
                selectedIcon: <GedungIcon name='building' size={20} color='#fff' style={{ marginRight: 5 }} />
            }, {
                selectedTipe: 'Apartemen',
                notSelectedIcon: <ApartemenIcon name='building-o' size={20} color='#758184' style={{ marginRight: 5 }} />,
                selectedIcon: <ApartemenIcon name='building-o' size={20} color='#fff' style={{ marginRight: 5 }} />
            }, {
                selectedTipe: 'Rumah',
                notSelectedIcon: <HomeIcon name='home' size={20} color='#758184' style={{ marginRight: 5 }} />,
                selectedIcon: <HomeIcon name='home' size={20} color='#fff' style={{ marginRight: 5 }} />
            }
            ],
            tipeHunian: '',
            pet: '',
            penghuni: '',
            tel: '',
            username: '',
            namaHunian: '',
            alamatHunian: '',
            luasHunian: '',
            jenisListrik: 'Prabayar',
            dendaSelected: '',
            dendaChoose: false,
            luasTanah: '',
            luasKamar: '',
            jlhLantai: '',
            jlhKT: '',
            jlhKM: '',
            hargaHunianDay: '0',
            hargaHunianWeek: '0',
            hargaHunianMonth: '0',
            hargaHunianYear: '0',
            poto: '',
            deskripsi: '',
            jangkaWaktuHarianSelected: '',
            jangkaWaktuMingguanSelected: '',
            jangkaWaktuBulananSelected: '',
            jangkaWaktuTahunanSelected: '',
            lang: '',
            long: '',
            pemilik: '',
            datePost: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()},${new Date().getHours() - 1}:${new Date().getMinutes()}`,
            valueRadioBtn: -1,
            imageList: [],
            idHunian: '',
            showHargaHarian: false,
            showHargaMinggu: false,
            showHargaBulanan: false,
            showHargaTahunan: false
        }
    }

    openImagePicker = () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            forceJpg: true,
            includeExif: true,
            compressImageQuality: 0.8,
            mediaType: 'photo',
            maxFiles: 8
        }).then(images => {
            this.setState({
                imageList: images.map(i => {
                    console.log('received', i.path);
                    return { uri: i.path }
                })
            })
            console.log(this.state.imageList)
            images.map((item, index) => {
                data.append('images', {
                    uri: item.path,
                    type: 'image/jpeg',
                    name: item.filename || `${Date.now()}${index}.jpg`
                })
                // this.state.imageList.push(item.data)
            })
        }).catch(err => alert(err))
    }


    upload = (idHunian) => {
        fetch(`${Server.GetBackEndserver()}/hunian/uploadPhoto/${idHunian}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
            },
            body: data
        })
            // .then(res => res.json())
            .then(res => {
                alert('Success')
            }).catch(err => {
                console.log(err)
            })
    }


    changeText(item) {
        this.setState({ tipeHunian: item })
    }

    checkBoxChanged(id, value, title) {
        this.setState({
            checkBoxChecked: tempCheckValues
        })

        var tempCheckBoxChecked = this.state.checkBoxChecked;
        tempCheckBoxChecked[id] = !value;

        this.setState({
            checkBoxChecked: tempCheckBoxChecked
        })
    }

    infoDenda() {
        Alert.alert('Info', 'Anda Dapat Menentukan Denda Jika Penghuni Melewati Batas Akhir Pembayaran Tagihan. Secara Default Tidak Denda.')
    }

    async loadFasilitas() {
        await fetch(`${Server.GetBackEndserver()}/fasilitas/hunian`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    Fasilitas: response
                })
            })
    }

    loadUsers() {
        fetch(`${Server.GetBackEndserver()}/profil/${this.state.username}`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    tel: res.tel
                })
            })
    }

    addHunianMethod = () => {
        if (this.state.dendaChoose == false) {
            this.setState({ dendaSelected: 0 })
        }
        if (this.state.tipeHunian !== '') {
            if (this.state.namaHunian !== '') {
                if (this.state.pet !== '') {
                    if (this.state.penghuni !== '') {
                        if (this.state.luasHunian !== '') {
                            if (this.state.luasTanah !== '') {
                                if (this.state.luasKamar !== '') {
                                    if (this.state.jlhLantai !== '') {
                                        if (this.state.namaFasilitas.length !== 0) {
                                            if (this.state.jlhKM !== '') {
                                                if (this.state.showHargaHarian == true && this.state.hargaHunianDay !== '') {
                                                    if (this.state.showHargaMinggu == true && this.state.hargaHunianWeek !== '') {
                                                        if (this.state.showHargaBulanan == true && this.state.hargaHunianMonth !== '') {
                                                            if (this.state.showHargaTahunan == true && this.state.hargaHunianYear !== '') {
                                                                if (this.state.deskripsi !== '') {
                                                                    if (this.state.imageList.length !== 0) {
                                                                        var dataHunian = {
                                                                            tipeHunian: this.state.tipeHunian,
                                                                            namaHunian: this.state.namaHunian,
                                                                            penghuni: this.state.penghuni,
                                                                            jenisListrik: this.state.jenisListrik,
                                                                            username: this.state.username,
                                                                            tel: this.state.tel,
                                                                            pet: this.state.pet,
                                                                            alamatHunian: this.state.alamatHunian,
                                                                            luasHunian: this.state.luasHunian,
                                                                            luasTanah: this.state.luasTanah,
                                                                            luasKamar: this.state.luasKamar,
                                                                            jlhLantai: this.state.jlhLantai,
                                                                            jlhKT: this.state.jlhKT,
                                                                            jlhKM: this.state.jlhKM,
                                                                            fasilitasHunian: this.state.namaFasilitas,
                                                                            hargaHunianDay: this.state.hargaHunianDay,
                                                                            hargaHunianWeek: this.state.hargaHunianWeek,
                                                                            hargaHunianMonth: this.state.hargaHunianMonth,
                                                                            hargaHunianYear: this.state.hargaHunianYear,
                                                                            denda: this.state.dendaSelected,
                                                                            poto: this.state.poto,
                                                                            deskripsi: this.state.deskripsi,
                                                                            lang: this.state.lang,
                                                                            long: this.state.long,
                                                                            pemilik: this.state.pemilik,
                                                                            datePost: this.state.datePost
                                                                        }
                                                                        fetch(`${Server.GetBackEndserver()}/hunian/add`, {
                                                                            method: 'POST',
                                                                            headers: {
                                                                                'Accept': 'application/json',
                                                                                'Content-Type': 'application/json'
                                                                            },
                                                                            body: JSON.stringify(dataHunian)
                                                                        })
                                                                            .then(response => response.json())
                                                                            .then(res => {
                                                                                alert('Data Hunian Berhasil Ditambahkan')
                                                                                this.setState({
                                                                                    idHunian: res.idHunian
                                                                                })
                                                                                this.upload(res.idHunian)
                                                                                this.props.navigation.navigate('AddKamarScreen', { nama_hunian: this.state.namaHunian, idHunian: res.idHunian })
                                                                            }).catch((error) => {
                                                                                console.error(error)
                                                                            })
                                                                    } else {
                                                                        alert('Masukkan Poto Hunian')
                                                                    }
                                                                } else {
                                                                    alert('Deskripsi Tidak Boleh Kosong')
                                                                }
                                                            } else {
                                                                alert('Masukkan Harga Tahunan')
                                                            }
                                                        } else {
                                                            alert('Masukkan Harga Bulanan')
                                                        }
                                                    } else {
                                                        alert('Masukkan Harga Mingguan')
                                                    }
                                                } else {
                                                    alert('Masukkan Harga Harian')
                                                }
                                            } else {
                                                alert('Masukkan Jumlah Kamar Mandi')
                                            }
                                        } else {
                                            alert('Fasilitas Tidak Boleh Kosong')
                                        }
                                    } else {
                                        alert('Masukkan Jumlah Lantai')
                                    }
                                } else {
                                    alert('Masukkan Luas Kamar')
                                }
                            } else {
                                alert('Masukkan Luas Tanah')
                            }
                        } else {
                            alert('Masukkan Luas Hunian')
                        }
                    } else {
                        alert('Masukkan Tipe Kost')
                    }
                } else {
                    alert('Masukkan Keterangan Bawa Hewan Peliharaan')
                }
            } else {
                alert('Nama Hunian Tidak Boleh Kosong')
            }
        } else {
            alert('Tipe Hunian Tidak Boleh Kosong')
        }

    }



    async componentDidMount() {
        // Cara 1
        let pemilik = await AsyncStorage.getItem('nama');
        let username = await AsyncStorage.getItem('username');
        this.setState({ pemilik: pemilik, username: username, dendaSelected: '0' })
        this.loadUsers()
        this.loadFasilitas()
    }

    render() {
        var penghuni = [
            { label: 'Pria', value: 'Pria' },
            { label: 'Wanita', value: 'Wanita' },
            { label: 'Campur', value: 'Campur' }
        ];
        var dendaChoose = [
            { label: 'Denda', value: true },
            { label: 'Tidak Denda', value: false }
        ]

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ width: '100%', padding: 10 }}>
                    <View>
                        <Text style={styles.itemText}>Tipe Hunian : </Text>
                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', paddingTop: 10 }}>
                            {
                                this.state.tipeBangunan.map((item, index) => (

                                    <TouchableOpacity key={index} style={[styles.btnTipeHunian, this.state.tipeHunian === item.selectedTipe ? styles.selected : styles.notSelected]} onPress={() => this.setState({ tipeHunian: item.selectedTipe })}>
                                        {
                                            this.state.tipeHunian === item.selectedTipe ? item.selectedIcon : item.notSelectedIcon
                                        }
                                        <Text style={{ textAlign: 'center', color: this.state.tipeHunian === item.selectedTipe ? 'white' : '#758184' }}>{item.selectedTipe}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <TextField
                            label='Nama Hunian'
                            onChangeText={(value) => this.setState({ namaHunian: value })}
                            autoCapitalize="none"
                            returnKeyType="next"
                            ref={(input) => this.namaHunian = input}
                            onSubmitEditing={() => this.luasHunian.focus()}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextField
                            label='Binatang Peliharaan'
                            onChangeText={(value) => this.setState({ pet: value })}
                            autoCapitalize="none"
                            returnKeyType="next"
                            ref={(input) => this.pet = input}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.itemText}>Penghuni : </Text>
                        <View style={{ marginTop: 13, alignSelf: 'center' }}>
                            <RadioForm
                                radio_props={penghuni}
                                initial={this.state.valueRadioBtn}
                                onPress={(value) => { this.setState({ penghuni: value }) }}
                                formHorizontal={true}
                                buttonSize={10}
                                labelHorizontal={true}
                                buttonColor={'#0099CC'}
                                labelStyle={{ color: '#758184', marginRight: 15 }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextField
                            label='Luas Hunian (m)'
                            onChangeText={(value) => this.setState({ luasHunian: value })}
                            autoCapitalize="none"
                            returnKeyType="next"
                            ref={(input) => this.luasHunian = input}
                            onSubmitEditing={() => this.jenisListrik.focus()}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.itemText}>Jenis Listrik :</Text>
                        <View style={{ borderColor: '#eee', borderWidth: 1, alignSelf: 'center', width: '80%', marginTop: 18 }}>
                            <Picker selectedValue={this.state.jenisListrik}
                                style={{ height: 50, width: '100%', alignSelf: 'center' }}
                                mode='dropdown'
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ jenisListrik: itemValue })
                                }>
                                {this.state.jenisListrikItem.map((item, index) => {
                                    return (
                                        <Picker.Item key={index} label={item} value={item} />
                                    )
                                })}</Picker>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextField
                            label='Luas Tanah (m²)'
                            onChangeText={(value) => this.setState({ luasTanah: value })}
                            autoCapitalize="none"
                            returnKeyType="next"
                            ref={(input) => this.luasTanah = input}
                            onSubmitEditing={() => this.luasKamar.focus()}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextField
                            label='Luas Kamar (m)'
                            onChangeText={(value) => this.setState({ luasKamar: value })}
                            autoCapitalize="none"
                            returnKeyType="next"
                            ref={(input) => this.luasKamar = input}
                            onSubmitEditing={() => this.jlhLantai.focus()}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextField
                            label='Lantai'
                            onChangeText={(value) => this.setState({ jlhLantai: value })}
                            autoCapitalize="none"
                            returnKeyType="next"
                            ref={(input) => this.jlhLantai = input}
                            onSubmitEditing={() => this.jlhKT.focus()}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View>
                            <Text style={styles.itemText}>Fasilitas :</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {

                                this.state.Fasilitas.map((val) => {
                                    { tempCheckValues[val.id] = false }
                                    return (

                                        <View key={val.id} style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                                            <CheckBox
                                                value={this.state.checkBoxChecked[val.id]}
                                                onValueChange={() => { this.checkBoxChanged(val.id, this.state.checkBoxChecked[val.id], val.nama_fasilitas), this.state.checkBoxChecked[val.id] ? this.state.namaFasilitas.push(val.nama_fasilitas) : this.state.namaFasilitas.splice(this.state.namaFasilitas.indexOf(val.nama_fasilitas), 1), console.warn(this.state.namaFasilitas) }}

                                            />
                                            <Text>{val.nama_fasilitas}</Text>
                                        </View >
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextField
                            label='Jumlah Kamar Tidur'
                            onChangeText={(value) => this.setState({ jlhKT: value })}
                            autoCapitalize="none"
                            returnKeyType="next"
                            ref={(input) => this.jlhKT = input}
                            onSubmitEditing={() => this.jlhKM.focus()}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextField
                            label='Jumlah Kamar Mandi'
                            onChangeText={(value) => this.setState({ jlhKM: value })}
                            autoCapitalize="none"
                            returnKeyType="next"
                            ref={(input) => this.jlhKM = input}
                            onSubmitEditing={() => this.alamatHunian.focus()}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextField
                            label='Alamat'
                            onChangeText={(value) => this.setState({ alamatHunian: value })}
                            autoCapitalize="none"
                            returnKeyType="next"
                            ref={(input) => this.alamatHunian = input}
                            onSubmitEditing={() => this.hargaHunian.focus()}
                        />
                    </View>

                    <View>
                        <Text style={styles.itemText}>Pilih Harga Dan Jangka Waktu Sewa : </Text>
                        <View style={{ flexDirection: 'column', paddingTop: 10 }}>
                            {/* Harian */}
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btnTipeHunian, this.state.jangkaWaktuHarianSelected === 'Harian' ? styles.selected : styles.notSelected]} onPress={() => { this.state.jangkaWaktuHarianSelected == 'Harian' ? this.setState({ jangkaWaktuHarianSelected: '', showHargaHarian: false }) : this.setState({ jangkaWaktuHarianSelected: 'Harian', showHargaHarian: true }), console.log(this.state.showHargaHarian) }}>
                                    <Text style={{ textAlign: 'center', color: this.state.jangkaWaktuHarianSelected === 'Harian' ? 'white' : '#758184' }}>Harian</Text>
                                </TouchableOpacity>
                                {
                                    this.state.showHargaHarian ?
                                        <View style={{ borderWidth: 1, width: '65%', borderRadius: 10, borderColor: '#758184', marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ backgroundColor: '#fff', position: 'absolute', top: -10, marginLeft: 5, paddingHorizontal: 5 }}>
                                                <Text style={{ color: '#758184' }}>Harga Sewa / Hari</Text>
                                            </View>
                                            <TextInputMask
                                                type={'money'}
                                                options={{
                                                    precision: 0,
                                                    separator: ',',
                                                    delimiter: '.',
                                                    unit: 'Rp',
                                                    suffixUnit: ''
                                                }}
                                                value={this.state.hargaHunianDay}
                                                includeRawValueInChangeText={true}
                                                onChangeText={(text, rawText) => {
                                                    this.setState({
                                                        hargaHunianDay: rawText
                                                    })
                                                }}
                                                style={{ width: '85%', color: '#758184' }}
                                            />

                                            <ApartemenIcon name='close' size={25} color='#758184' onPress={() => this.setState({ hargaHunianDay: 0 })} />
                                        </View>
                                        : null
                                }
                            </View>
                            {/* Mingguan */}
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btnTipeHunian, this.state.jangkaWaktuMingguanSelected === 'Mingguan' ? styles.selected : styles.notSelected]} onPress={() => { this.state.jangkaWaktuMingguanSelected == 'Mingguan' ? this.setState({ jangkaWaktuMingguanSelected: '', showHargaMinggu: false }) : this.setState({ jangkaWaktuMingguanSelected: 'Mingguan', showHargaMinggu: true }), console.log(this.state.showHargaHarian) }}>
                                    <Text style={{ textAlign: 'center', color: this.state.jangkaWaktuMingguanSelected === 'Mingguan' ? 'white' : '#758184' }}>Mingguan</Text>
                                </TouchableOpacity>
                                {
                                    this.state.showHargaMinggu ?
                                        <View style={{ borderWidth: 1, width: '65%', borderRadius: 10, borderColor: '#758184', marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ backgroundColor: '#fff', position: 'absolute', top: -10, marginLeft: 5, paddingHorizontal: 5 }}>
                                                <Text style={{ color: '#758184' }}>Harga Sewa / Minggu</Text>
                                            </View>
                                            <TextInputMask
                                                type={'money'}
                                                options={{
                                                    precision: 0,
                                                    separator: ',',
                                                    delimiter: '.',
                                                    unit: 'Rp',
                                                    suffixUnit: ''
                                                }}
                                                value={this.state.hargaHunianWeek}
                                                includeRawValueInChangeText={true}
                                                onChangeText={(text, rawText) => {
                                                    this.setState({
                                                        hargaHunianWeek: rawText
                                                    })
                                                }}
                                                style={{ width: '85%', color: '#758184' }}
                                            />

                                            <ApartemenIcon name='close' size={25} color='#758184' onPress={() => this.setState({ hargaHunianWeek: 0 })} />
                                        </View>

                                        : null
                                }
                            </View>
                            {/* Bulanan */}
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btnTipeHunian, this.state.jangkaWaktuBulananSelected === 'Bulanan' ? styles.selected : styles.notSelected, { height: 45 }]} onPress={() => { this.state.jangkaWaktuBulananSelected == 'Bulanan' ? this.setState({ jangkaWaktuBulananSelected: '', showHargaBulanan: false }) : this.setState({ jangkaWaktuBulananSelected: 'Bulanan', showHargaBulanan: true }) }}>
                                    <Text style={{ textAlign: 'center', color: this.state.jangkaWaktuBulananSelected === 'Bulanan' ? 'white' : '#758184' }}>Bulanan</Text>
                                </TouchableOpacity>
                                {
                                    this.state.showHargaBulanan ?
                                        <View style={{ borderWidth: 1, width: '65%', borderRadius: 10, borderColor: '#758184', marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ backgroundColor: '#fff', position: 'absolute', top: -10, marginLeft: 5, paddingHorizontal: 5 }}>
                                                <Text style={{ color: '#758184' }}>Harga Sewa / Bulan</Text>
                                            </View>
                                            <TextInputMask
                                                type={'money'}
                                                options={{
                                                    precision: 0,
                                                    separator: ',',
                                                    delimiter: '.',
                                                    unit: 'Rp',
                                                    suffixUnit: ''
                                                }}
                                                value={this.state.hargaHunianMonth}
                                                includeRawValueInChangeText={true}
                                                onChangeText={(text, rawText) => {
                                                    this.setState({
                                                        hargaHunianMonth: rawText
                                                    })
                                                }}
                                                style={{ width: '85%', color: '#758184' }}
                                            />

                                            <ApartemenIcon name='close' size={25} color='#758184' onPress={() => this.setState({ hargaHunianMonth: 0 })} />
                                        </View>
                                        // <View style={{ marginTop: 3 }}>
                                        //     <TextField
                                        //         label='Harga ( Rp ) / Bulan'
                                        //         onChangeText={(value) => this.setState({ hargaHunianMonth: value })}
                                        //         autoCapitalize="none"
                                        //         returnKeyType="next"
                                        //         ref={(input) => this.hargaHunian = input}
                                        //         keyboardType='number-pad'
                                        //     />
                                        // </View> 
                                        : null
                                }
                            </View>
                            {/* Tahunan */}
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btnTipeHunian, this.state.jangkaWaktuTahunanSelected === 'Tahunan' ? styles.selected : styles.notSelected, { height: 45 }]} onPress={() => { this.state.jangkaWaktuTahunanSelected == 'Tahunan' ? this.setState({ jangkaWaktuTahunanSelected: '', showHargaTahunan: false }) : this.setState({ jangkaWaktuTahunanSelected: 'Tahunan', showHargaTahunan: true }) }}>
                                    <Text style={{ textAlign: 'center', color: this.state.jangkaWaktuTahunanSelected === 'Tahunan' ? 'white' : '#758184' }}>Tahunan</Text>
                                </TouchableOpacity>
                                {
                                    this.state.showHargaTahunan ?
                                        <View style={{ borderWidth: 1, width: '65%', borderRadius: 10, borderColor: '#758184', marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ backgroundColor: '#fff', position: 'absolute', top: -10, marginLeft: 5, paddingHorizontal: 5 }}>
                                                <Text style={{ color: '#758184' }}>Harga Sewa / Tahun</Text>
                                            </View>
                                            <TextInputMask
                                                type={'money'}
                                                options={{
                                                    precision: 0,
                                                    separator: ',',
                                                    delimiter: '.',
                                                    unit: 'Rp',
                                                    suffixUnit: ''
                                                }}
                                                value={this.state.hargaHunianYear}
                                                includeRawValueInChangeText={true}
                                                onChangeText={(text, rawText) => {
                                                    this.setState({
                                                        hargaHunianYear: rawText
                                                    })
                                                }}

                                                style={{ width: '85%', color: '#758184' }}
                                            />
                                            <ApartemenIcon name='close' size={25} color='#758184' onPress={() => this.setState({ hargaHunianYear: 0 })} />
                                        </View>

                                        // <View>
                                        //     <TextField
                                        //         label='Harga ( Rp ) / Tahun'
                                        //         onChangeText={(value) => this.setState({ hargaHunianYear: value })}
                                        //         autoCapitalize="none"
                                        //         returnKeyType="next"
                                        //         ref={(input) => this.hargaHunian = input}
                                        //         keyboardType='number-pad'
                                        //     />
                                        // </View> 
                                        : null
                                }
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                            <Text style={[styles.itemText, { marginRight: 15, marginTop: 15 }]}>Denda :</Text>
                            <InfoIcon name='md-information-circle' size={22} onPress={() => this.infoDenda()} color='rgba(0,0,0,.5)' />
                        </View>
                        <RadioForm
                            radio_props={dendaChoose}
                            initial={this.state.valueRadioBtn}
                            onPress={(value) => { this.setState({ dendaChoose: value }) }}
                            formHorizontal={true}
                            buttonSize={10}
                            labelHorizontal={true}
                            buttonColor={'#0099CC'}
                            labelStyle={{ color: '#758184', marginRight: 15 }}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.itemText}>Tarif Denda :</Text>
                        <View style={{ borderColor: '#eee', borderWidth: 1, alignSelf: 'center', width: '80%' }}>
                            <Picker selectedValue={this.state.dendaSelected}
                                style={{ height: 50, width: '100%', alignSelf: 'center' }}
                                mode='dropdown'
                                enabled={this.state.dendaChoose}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ dendaSelected: itemValue })
                                }>
                                {this.state.dendaList.map((item, index) => {
                                    return (
                                        <Picker.Item key={index} label={Server.FormatCurrency(item) + '/Hari'} value={item} />
                                    )
                                })}</Picker>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.itemText}>Deskripsi</Text>
                        <TextInput
                            multiline={true}
                            keyboardType='default'
                            maxLength={100}
                            style={{ borderWidth: 1, textAlignVertical: 'top', borderRadius: 10, elevation: 3, borderColor: '#758184', backgroundColor: '#fff', overflow: 'scroll', height: 150 }}
                            numberOfLines={4}
                            onChangeText={(value) => this.setState({ deskripsi: value })}
                            autoCapitalize="none"
                            returnKeyType="next"
                            scrollEnabled={true}
                            ref={(input) => this.deskripsi = input}

                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ borderColor: '#eee', borderWidth: 1, padding: 150, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Map</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.openImagePicker()}>
                            <View style={{ borderColor: '#eee', borderWidth: 1, padding: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Photo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {
                        this.state.imageList.length == 0 ? null :

                            <View>
                                <Text>List Gambar : </Text>
                                <FlatList
                                    data={this.state.imageList}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                                    renderItem={({ item, index }) =>
                                        (
                                            // console.log(`data:image/jpeg;base64,` + item)

                                            <View key={index} style={{ margin: 8, backgroundColor: '#fff', elevation: 3, borderRadius: 8 }}>
                                                <Image source={{ uri: `${item.uri}` }} style={{ width: 120, height: 120, borderRadius: 10 }} />
                                            </View>
                                        )
                                    }
                                />
                            </View>
                    }
                </View>
                <TouchableOpacity style={{ backgroundColor: '#5edfff', padding: 18 }} onPress={this.addHunianMethod}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', textAlign: 'center', fontSize: 15 }}>LANJUT</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    btnTipeHunian: {
        borderWidth: 1, padding: 10, width: '32%', borderColor: '#758184', borderRadius: 8, elevation: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    selected: {
        backgroundColor: '#0099CC',
    },
    notSelected: {
        backgroundColor: 'white',
    },
    btnContainer: {
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18
    },
    itemText: {
        color: '#758184',
        fontWeight: 'bold'
    }
})