import React, { Component } from 'react'
import { View, Text, TextInput, Image, ScrollView, StyleSheet, AsyncStorage, TouchableOpacity, Modal, ToastAndroid, Dimensions, Button, Platform, PermissionsAndroid, Alert, Linking } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconJk from 'react-native-vector-icons/FontAwesome'
import Server from './ServerFunction'
import Ionicons from 'react-native-vector-icons/Ionicons'

const options = {
    title: 'Select Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class EditProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 120,
            username: '',
            nama: '',
            selected_image: null,
            heightGaleri: Dimensions.get('window').width / 3,
            widthGaleri: Dimensions.get('window').width / 3,
            image: [],
            showGalleri: false,
            poto: null,
            alamat: '',
            kota: '',
            jenis: '',
            email: '',
            test: '',
            tel: '',
            jk: '',
            team: '',
            filePath: ''
        }
    }

    static navigationOptions = {
        headerShown: false
    }


    getDataUser() {
        fetch(`${Server.GetBackEndserver()}/profil/${this.state.username}`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    username: res.username,
                    nama: res.nama,
                    poto: res.poto,
                    alamat: res.alamat,
                    kota: res.kota,
                    email: res.email,
                    jenis: res.jenis,
                    tel: res.tel,
                    jk: res.jk,
                    team: res.team
                })
            })
    }





    editProfile() {
        fetch(`${Server.GetBackEndserver()}/profile/edit/${this.state.username}`,
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
                    tel: this.state.tel,
                    team:this.state.team
                })
            })
            .then(res => {
                if (res.status == '500') {
                    alert('Gagal Edit')
                } else {
                    this.uploadPhoto()
                }
            }).catch(err => {
                console.log(err)
            })

    }


    uploadPhoto() {
        fetch(`${Server.GetBackEndserver()}/uploadFoto/${this.state.username}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ poto: this.state.selected_image })
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        // 
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

    imagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    selected_image: response.data,
                });
            }
        });
    }

    getPhotosOption = async () => {
        if (await this.requestExternalStoreageRead()) {
            this.imagePicker()
        }
    }


    async componentDidMount() {
        var username = await AsyncStorage.getItem('username')
        this.setState({ username: username })
        this.getDataUser()

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
        var user = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: '#24A1D7', width: '100%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, elevation: 4 }}>
                    <Ionicons name="md-close" size={30} style={{ paddingRight: 15 }} color='white' onPress={() => this.props.navigation.goBack()} />
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Edit Profile</Text>
                    <Ionicons name="md-checkmark" size={30} style={{ paddingRight: 15 }} color='white' onPress={() => { this.props.navigation.navigate('Setting'), this.editProfile() }} />
                </View>

                <View style={{ width: '95%', backgroundColor: '#fff', borderRadius: 10, alignSelf: 'center', elevation: 10, paddingHorizontal: 50, paddingVertical: 15, marginTop: 30 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {
                            this.state.selected_image ?
                                <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.selected_image }} style={{ width: 120, height: 120, borderRadius: 60 }} onLoad={this.resizeImage.bind(this)} /> :
                                <Image source={{ uri: `${Server.GetBackEndserver()}/images/user/${user.poto}` }} onLoad={this.resizeImage} style={{ width: 120, height: 120, borderRadius: 60, borderColor: '#dcdddf', borderWidth: 1, alignSelf: 'center' }} />
                        }
                        <View style={{ backgroundColor: '#24A1D7', borderRadius: 30, padding: 10, marginTop: -40, marginRight: -80 }}>
                            <IconJk name='camera' size={20} color='#fff' onPress={() => this.getPhotosOption()} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <TextInput
                                style={styles.textName}
                                keyboardType='default'
                                value={user.nama}
                                placeholderTextColor="rgba(0,0,0,0.6)"
                                autoCapitalize="none"
                                returnKeyType="done"
                                onChangeText={(value) => this.setState({ nama: value })}
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                style={styles.email}
                                keyboardType='default'
                                value={user.email}
                                placeholderTextColor="rgba(0,0,0,0.6)"
                                autoCapitalize="none"
                                returnKeyType="done"
                                onChangeText={(value) => this.setState({ email: value })}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#6b6b6b', fontSize: 10 }}>Role</Text>
                            <Text style={{ color: '#6b6b6b', fontWeight: 'bold' }}>Admin</Text>
                        </View>
                        <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#6b6b6b', fontSize: 10 }}>Team</Text>
                            <TextInput
                                style={{ color: '#6b6b6b', fontWeight: 'bold', padding:0,margin:0 }}
                                keyboardType='default'
                                value={user.team}
                                placeholderTextColor="rgba(0,0,0,0.6)"
                                autoCapitalize="none"
                                returnKeyType="done"
                                onChangeText={(value) => this.setState({ team: value })}
                                underlineColorAndroid='transparent'
                            />
                            {/* <Text style={{ color: '#6b6b6b', fontWeight: 'bold' }}>{user.team}</Text> */}
                        </View>
                    </View>

                </View>

                <View style={styles.bodyContainer}>
                    <Text style={{ color: '#696969' }}>Alamat</Text>
                    <View style={styles.bodyItemContainer}>
                        <Icon name='location-on' size={25} color='#cbced0' />
                        <TextInput style={styles.itemText}
                            keyboardType='default'
                            value={user.alamat}
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            autoCapitalize="none"
                            returnKeyType="done"
                            onChangeText={(value) => this.setState({ alamat: value })}
                            underlineColorAndroid='transparent'
                        />

                    </View>
                    <Text style={{ color: '#696969' }}>Kota</Text>
                    <View style={styles.bodyItemContainer}>
                        <Icon name='location-city' size={25} color='#cbced0' />
                        <TextInput style={styles.itemText}
                            keyboardType='default'
                            value={user.kota}
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            autoCapitalize="none"
                            returnKeyType="done"
                            onChangeText={(value) => this.setState({ kota: value })}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <Text style={{ color: '#696969' }}>Nomor Telepon</Text>
                    <View style={styles.bodyItemContainer}>
                        <Icon name='phone-android' size={25} color='#cbced0' />
                        <TextInput style={styles.itemText}
                            keyboardType='default'
                            value={user.tel}
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            autoCapitalize="none"
                            returnKeyType="done"
                            onChangeText={(value) => this.setState({ tel: value })}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <Text style={{ color: '#696969' }}>Jenis Kelamin</Text>
                    <View style={styles.bodyItemContainer}>
                        <IconJk name='intersex' size={25} color='#cbced0' />
                        <TextInput style={styles.itemText}
                            keyboardType='default'
                            value={user.jk}
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            autoCapitalize="none"
                            returnKeyType="done"
                            editable={false}
                            onChangeText={(value) => this.setState({ jk: value })}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    headerRating: {
        flexDirection: 'row'
    },
    textName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#696969',
        textTransform: 'capitalize',
        padding: 0,
        marginBottom: 0
    },
    email: {
        color: '#696969',
        padding: 0
    },
    bodyContainer: {
        padding: 10
    },
    bodyItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        marginBottom: '5%',
        borderBottomColor: '#cbced0',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    itemText: {
        marginLeft: 5,
        color: '#696969',
        alignItems: 'center',
        fontWeight: 'bold'
    }
})