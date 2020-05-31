import React, { Component } from 'react'
import { View, Text, Modal, TouchableOpacity, Picker, TextInput, Image, PermissionsAndroid, ScrollView } from 'react-native'
import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import 'intl';
import 'intl/locale-data/jsonp/id-ID'
import Server from './ServerFunction'


const options = {
    title: 'Select Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class AddPromo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            tglAwal: '',
            tglAkhir: '',
            kodePromo: '',
            jumlahHari: '',
            modalVisible: false,
            persenText: '',
            persenList: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
            jenisPromo: 'Potongan Harga',
            jenisPromoList: ['Potongan Harga'],
            poto: '',
            deskripsi: '',
            kuota: 0,
            title: '',
            width: 250,
            height: null,
            idPromo: ''
        }
    }

    async requestExternalStoreageRead() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Access Photos Permission',
                    message:
                        'Homie needs access to your Gallery ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage Permission Accept');
                console.log(PermissionsAndroid.RESULTS.GRANTED)
                return granted
            } else {
                console.log('Storage Permission Denied');
                console.log(PermissionsAndroid.RESULTS.GRANTED)
                return false
            }
        } catch (err) {
            console.warn(err)
        }

    }


    chooseImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };

                // You can also display the image using data:
                // console.log(source)
                this.setState({
                    poto: response.data,
                });
            }
        });
    }

    addPromo() {
        var data = {
            tgl_mulai: this.state.tglAwal,
            tgl_akhir: this.state.tglAkhir,
            kode_promo: this.state.kodePromo,
            deskripsi: this.state.deskripsi,
            kuota: this.state.kuota,
            jenisPromo: this.state.jenisPromo,
            persen: this.state.persenText,
            nama_promo: this.state.title
        }
        fetch(`${Server.GetBackEndserver()}/promo/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                this.uploadPhoto(res.idPromo)
            })
    }

    uploadPhoto(idPromo) {
        fetch(`${Server.GetBackEndserver()}/uploadFoto/add/promo/${idPromo}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ poto: this.state.poto })
        })
            .then(response => response.json())
            .then(res => {
                console.log('Tambah Gambar Berhasil')
            }).catch(err => {
                console.log(err)
            })
        // 
    }

    getPhotosOption = async () => {
        if (await this.requestExternalStoreageRead()) {
            this.chooseImage()
        }
    }

    resizeImage = (event) => {
        let widthOrigin = event.nativeEvent.source.width
        let heightOrigin = event.nativeEvent.source.height
        let aspectRatio = widthOrigin / heightOrigin
        this.setState({
            height: this.state.width / aspectRatio
        })

    }


    imageCheck() {
        const screen = this.props.navigation.state.params.screen
        if (screen == 'Tambah Promo') {
            return (
                this.state.poto.length == 0 ?
                    <View>
                        <Icon name='add-a-photo' size={50} color='#24A1D7' onPress={() => this.getPhotosOption()} />
                        <Text>Add Photo</Text>
                    </View> :
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.poto }} style={{ width: this.state.width, height: this.state.height }} onLoad={(event) => this.resizeImage(event)} />
                        <Icon name='photo-camera' size={35} color='#24A1D7' onPress={() => this.getPhotosOption()} style={{ position: 'relative' }} />
                        <Text>Change Photo</Text>
                    </View>
            )
        } else {
            const data = this.props.navigation.state.params.data
            return (
                this.state.poto == data.poto ?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: `${Server.GetBackEndserver()}/images/promo/${this.state.poto}` }} style={{ width: this.state.width, height: this.state.height }} onLoad={(event) => this.resizeImage(event)} />
                        <Icon name='photo-camera' size={35} color='#24A1D7' onPress={() => this.getPhotosOption()} style={{ position: 'relative' }} />
                        <Text>Change Photo</Text>
                    </View> :
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.poto }} style={{ width: this.state.width, height: this.state.height }} onLoad={(event) => this.resizeImage(event)} />
                        <Icon name='photo-camera' size={35} color='#24A1D7' onPress={() => this.getPhotosOption()} style={{ position: 'relative' }} />
                        <Text>Change Photo</Text>
                    </View>
            )
        }

    }

    countDay = () => {
        var { tglAwal, tglAkhir, kodePromo, poto } = this.state
        if (!tglAwal || !tglAkhir || !kodePromo || !poto) {
            alert('Input Gak Boleh Kosong')
        } else {
            var msDiff = new Date(this.state.tglAkhir).getTime() - new Date(this.state.tglAwal).getTime();
            var countDay = Math.floor(msDiff / (1000 * 60 * 60 * 24));
            this.setState({ jumlahHari: countDay })
            this.setState({ modalVisible: true })
        }
    }

    editPromo() {
        var data = {
            tgl_mulai: this.state.tglAwal,
            tgl_akhir: this.state.tglAkhir,
            kode_promo: this.state.kodePromo,
            deskripsi: this.state.deskripsi,
            kuota: this.state.kuota,
            jenisPromo: this.state.jenisPromo,
            persen: this.state.persenText,
            nama_promo: this.state.title
        }
        fetch(`${Server.GetBackEndserver()}/promo/edit/${this.state.idPromo}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                this.uploadPhoto(this.state.idPromo)
                this.props.navigation.goBack()
            })
    }

    componentDidMount() {
        const screen = this.props.navigation.state.params.screen
        if (screen == 'Edit Promo') {
            const data = this.props.navigation.state.params.data
            console.warn(data.persen)
            console.warn(data.id_promo)
            this.setState({
                tglAwal: data.tgl_mulai,
                tglAkhir: data.tgl_akhir,
                kodePromo: data.kode_promo,
                deskripsi: data.deskripsi,
                kuota: data.kuota,
                jenisPromo: data.jenisPromo,
                persenText: Number(data.persen),
                title: data.nama_promo,
                poto: data.poto,
                idPromo: data.id_promo
            })
        } else {
            this.setState({
                persenText: 5
            })
        }
    }

    checkBtn() {
        const screen = this.props.navigation.state.params.screen
        if (screen == 'Edit Promo') {
            this.editPromo()
        } else if (screen == 'Tambah Promo') {
            this.addPromo()
        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
                <Modal animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center' }} onTouchEndCapture={() => this.setState({ modalVisible: false })}>
                        <View style={{ backgroundColor: '#fff', paddingVertical: '5%', borderRadius: 10, width: '80%' }}>
                            <View style={{ width: '90%', borderBottomColor: '#eee', borderBottomWidth: 1, alignSelf: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>Detail Promo</Text>
                            </View>
                            <View style={{ paddingHorizontal: '2%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>Jenis Promo</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Potongan ( % )</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Kode Promo</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Tanggal Mulai</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Tanggal Berakhir</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Jumlah Hari</Text>

                                </View>
                                <View>
                                    <Text>: {this.state.jenisPromo}</Text>
                                    <Text>: {this.state.persenText}%</Text>
                                    <Text>: {this.state.kodePromo}</Text>
                                    <Text>: {this.state.tglAwal}</Text>
                                    <Text>: {this.state.tglAkhir}</Text>
                                    <Text >: {this.state.jumlahHari}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', paddingHorizontal: '2%', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: '5%', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.setState({ modalVisible: false })} style={{ backgroundColor: '#41C7DB', padding: '2%', borderRadius: 10, width: '40%', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Batal</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }, () => this.checkBtn()} style={{ backgroundColor: '#41C7DB', padding: '2%', borderRadius: 10, width: '40%', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Kirim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={{ width: '80%', marginTop: 15 }}>
                    <Text>Buat Judul Semenarik Mungkin (Maks. 35 Huruf) </Text>
                    <TextInput
                        placeholder='Judul Promo'
                        keyboardType='default'
                        underlineColorAndroid='#24A1D7'
                        maxLength={35}
                        value={this.state.title}
                        style={{ borderRadius: 10, borderWidth: 1, borderColor: '#eee', width: '100%' }}
                        onChangeText={(value) => this.setState({ title: value })}
                    />
                </View>
                <View style={{ width: '90%' }}>
                    <Text>Jenis Promo :</Text>
                    <View style={{ borderColor: '#eee', borderWidth: 1, alignSelf: 'center', width: '80%' }}>
                        <Picker selectedValue={this.state.jenisPromo}
                            style={{ height: 50, width: '100%', alignSelf: 'center' }}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ jenisPromo: itemValue })
                            }>
                            {this.state.jenisPromoList.map((item, index) => {
                                return (
                                    <Picker.Item key={index} label={item} value={item} />
                                )
                            })}</Picker>
                    </View>
                </View>

                <View style={{ width: '50%' }}>
                    <Text>Potongan ( % )</Text>
                    <View style={{ borderColor: '#eee', borderWidth: 1, alignSelf: 'center', width: '100%' }}>
                        <Picker
                            selectedValue={this.state.persenText}
                            style={{ height: 50, width: '100%', alignSelf: 'center', borderWidth: 1, borderColor: '#eee' }}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ persenText: itemValue })
                            }>
                            {this.state.persenList.map((item, index) => {
                                return (
                                    <Picker.Item key={index} label={item + '%'} value={item} />
                                )
                            })}
                        </Picker>
                    </View>
                </View>
                <View style={{ width: '80%' }}>
                    <Text>Masukkan Kode Promo :</Text>
                    <TextInput
                        placeholder='Kode Promo'
                        keyboardType='default'
                        underlineColorAndroid='#24A1D7'
                        autoCapitalize='characters'
                        style={{ borderRadius: 10, borderWidth: 1, borderColor: '#eee', width: '100%' }}
                        onChangeText={(value) => this.setState({ kodePromo: value })}
                    />
                </View>
                <View>
                    <Text>Tanggal Mulai : </Text>
                    <DatePicker
                        style={{ width: '95%' }}
                        date={this.state.tglAwal}
                        mode="date"
                        placeholder="select date"
                        format="DD MMM YYYY"
                        minDate={new Date()}
                        confirmBtnText="Confirm"
                        locale='id'
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => { this.setState({ tglAwal: date }) }}
                    />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text>Tanggal Berakhir : </Text>
                    <DatePicker
                        style={{ width: '95%' }}
                        date={this.state.tglAkhir}
                        mode="date"
                        placeholder="select date"
                        format="DD MMM YYYY"
                        minDate={this.state.tglAwal}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        locale='id'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => this.setState({ tglAkhir: date })}
                    />
                </View>
                <View style={{ borderWidth: 1, borderColor: '#24A1D7', alignSelf: 'center', width: '90%', borderRadius: 10, paddingVertical: 15, justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                    {
                        this.imageCheck()
                    }

                </View>
                <View style={{ marginVertical: 15 }}>
                    <Text>Deskripsi :</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderRadius: 10 }}
                        numberOfLines={5}
                        textAlignVertical='top'
                        multiline={true}
                        value={this.state.deskripsi}
                        onChangeText={(value) => this.setState({ deskripsi: value })}
                    />
                </View>
                <TouchableOpacity style={{ backgroundColor: '#24A1D7', padding: '2%', borderRadius: 10, width: '80%', marginVertical: 15, alignSelf: 'center' }} onPress={this.countDay}>
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>Lanjut</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}