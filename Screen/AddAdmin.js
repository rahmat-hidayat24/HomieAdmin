import React, { Component } from 'react'
import { View, Text, TextInput, Image, ScrollView, StyleSheet, AsyncStorage, TouchableOpacity, Modal, ToastAndroid, Dimensions, Button, Platform, PermissionsAndroid, Alert, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconJk from 'react-native-vector-icons/FontAwesome'
import Server from './ServerFunction'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'

const options = {
    title: 'Select Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class AddAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 120,
            username: '',
            nama: '',
            selected_image: null,
            poto: null,
            alamat: '',
            kota: '',
            jenis: '',
            email: '',
            test: '',
            tel: '',
            jk: '',
            team: '',
            filePath: '',
            password: '',
            c_password: '',
            listTeam: ['Developer', 'System Analyst', 'Customer Service', 'Admin'],
            jkList: ['Pria', 'Wanita'],
            showTeam: false,
            showJk: false
        }
    }

    static navigationOptions = {
        headerShown: false
    }




    checkUsername() {
        fetch(`${Server.GetBackEndserver()}/check/${this.state.username}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(res => {
                if (res === [] || res === undefined || res.length === 0) {
                    this.props.navigation.navigate('Setting'), 
                    this.addAdmin()
                }
                else {
                    alert('Username Sudah Ada')
                }
            })

    }



    addAdmin() {
        fetch(`${Server.GetBackEndserver()}/register/admin`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    nama: this.state.nama,
                    alamat: this.state.alamat,
                    kota: this.state.kota,
                    email: this.state.email,
                    tel: this.state.tel,
                    team: this.state.team,
                    jk:this.state.jk
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



    getPhotos() {
        // //Before calling getPhotos, request permission
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
                    selected_image: response.data,
                });
            }
        });
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

    render() {
        return (
            <ScrollView style={styles.container}>
                <Modal animationType="fade"
                    transparent={true}
                    visible={this.state.showTeam}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center' }} onTouchEndCapture={() => this.setState({ showTeam: false })}>
                        <View style={{ backgroundColor: '#fff', paddingVertical: '5%', borderRadius: 10, width: '80%' }}>
                            <View style={{borderBottomWidth:1, padding:8}}>
                                <Text style={{textAlign:'center', fontWeight:'bold', fontSize:25}}>Select Team</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>

                                {
                                    this.state.listTeam.map((item, index) => (
                                        <TouchableOpacity onPress={() => this.setState({ team: item, showTeam: false })} style={{ borderBottomWidth: 1, padding: 8, width: '100%' }} key={index}>
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal animationType="fade"
                    transparent={true}
                    visible={this.state.showJk}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center' }} onTouchEndCapture={() => this.setState({ showJk: false })}>
                        <View style={{ backgroundColor: '#fff', paddingVertical: '5%', borderRadius: 10, width: '80%' }}>
                            <View style={{borderBottomWidth:1, padding:8}}>
                                <Text style={{textAlign:'center', fontWeight:'bold', fontSize:25}}>Select Gender</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>

                                {
                                    this.state.jkList.map((item, index) => (
                                        <TouchableOpacity onPress={() => this.setState({ jk: item, showJk: false })} style={{ borderBottomWidth: 1, padding: 8, width: '100%' }} key={index}>
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{ backgroundColor: '#24A1D7', width: '100%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, elevation: 4 }}>
                    <Ionicons name="md-close" size={30} style={{ paddingRight: 15 }} color='white' onPress={() => this.props.navigation.goBack()} />
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Tambah Admin</Text>
                    <Ionicons name="md-checkmark" size={30} style={{ paddingRight: 15 }} color='white' onPress={() => { this.checkUsername() }} />
                </View>

                <View style={{ width: '95%', backgroundColor: '#fff', borderRadius: 10, alignSelf: 'center', elevation: 10, paddingHorizontal: 50, paddingVertical: 15, marginTop: 30 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {
                            this.state.selected_image ?
                                <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.selected_image }} style={{ width: 120, height: 120, borderRadius: 60 }} onLoad={this.resizeImage.bind(this)} /> :
                                <Image source={{ uri: `${Server.GetBackEndserver()}/images/user/noPotoUser.png` }} onLoad={this.resizeImage} style={{ width: 120, height: 120, borderRadius: 60, borderColor: '#dcdddf', borderWidth: 1, alignSelf: 'center' }} />
                        }
                        <View style={{ backgroundColor: '#24A1D7', borderRadius: 30, padding: 10, marginTop: -40, marginRight: -80 }}>
                            <IconJk name='camera' size={20} color='#fff' onPress={() => this.getPhotos()} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <TextInput
                                style={styles.textName}
                                placeholder='Nama'
                                keyboardType='default'
                                placeholderTextColor="rgba(0,0,0,0.6)"
                                autoCapitalize="none"
                                returnKeyType="done"
                                onChangeText={(value) => this.setState({ nama: value })}
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                style={styles.email}
                                keyboardType='default'
                                placeholderTextColor="rgba(0,0,0,0.6)"
                                autoCapitalize="none"
                                returnKeyType="done"
                                placeholder='Email'
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
                            {
                                this.state.team === '' || !this.state.team ?
                                    <TouchableOpacity onPress={() => this.setState({ showTeam: true })}>
                                        <Text style={{ color: '#6b6b6b', fontWeight: 'bold' }}>Select Team...</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => this.setState({ showTeam: true })}>
                                        <Text style={{ color: '#6b6b6b', fontWeight: 'bold' }}>{this.state.team}</Text>
                                    </TouchableOpacity>
                            }

                            {/* <Text style={{ color: '#6b6b6b', fontWeight: 'bold' }}>{user.team}</Text> */}
                        </View>
                    </View>

                </View>

                <View style={styles.bodyContainer}>
                    <View style={styles.bodyItemContainer}>
                        <Icon name='person' size={25} color='#cbced0' />
                        <TextInput style={styles.itemText}
                            keyboardType='default'
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            autoCapitalize="none"
                            returnKeyType="done"
                            placeholder='Username'
                            onChangeText={(value) => this.setState({ username: value })}
                            underlineColorAndroid='transparent'
                        />

                    </View>
                    <View style={styles.bodyItemContainer}>
                        <Icon name='lock' size={25} color='#cbced0' />
                        <TextInput style={styles.itemText}
                            keyboardType='default'
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            autoCapitalize="none"
                            returnKeyType="done"
                            secureTextEntry
                            placeholder='Password'
                            onChangeText={(value) => this.setState({ password: value })}
                            underlineColorAndroid='transparent'
                        />

                    </View>
                    <View style={styles.bodyItemContainer}>
                        <Icon name='lock' size={25} color='#cbced0' />
                        <TextInput style={styles.itemText}
                            keyboardType='default'
                            secureTextEntry
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            autoCapitalize="none"
                            placeholder='Konfirmasi Password'
                            returnKeyType="done"
                            onChangeText={(value) => this.setState({ c_password: value })}
                            underlineColorAndroid='transparent'
                            onEndEditing={() => {
                                this.state.password === this.state.c_password ? null : alert('Password Tidak Sama')
                            }}
                        />

                    </View>
                    <View style={styles.bodyItemContainer}>
                        <Icon name='location-on' size={25} color='#cbced0' />
                        <TextInput style={styles.itemText}
                            keyboardType='default'
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            placeholder='Masukkan Alamat'
                            autoCapitalize="none"
                            returnKeyType="done"
                            onChangeText={(value) => this.setState({ alamat: value })}
                            underlineColorAndroid='transparent'
                        />

                    </View>
                    <View style={styles.bodyItemContainer}>
                        <Icon name='location-city' size={25} color='#cbced0' />
                        <TextInput style={styles.itemText}
                            keyboardType='default'
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            autoCapitalize="none"
                            returnKeyType="done"
                            placeholder='Masukkan Kota'
                            onChangeText={(value) => this.setState({ kota: value })}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={styles.bodyItemContainer}>
                        <Icon name='phone-android' size={25} color='#cbced0' />
                        <TextInput style={[styles.itemText,{width:'90%'}]}
                            keyboardType='number-pad'
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            autoCapitalize="none"
                            placeholder='Nomor Telepon'
                            returnKeyType="done"
                            onChangeText={(value) => this.setState({ tel: value })}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={styles.bodyItemContainer}>
                        <IconJk name='intersex' size={25} color='#cbced0' />
                        {
                            this.state.jk === '' || !this.state.jk ? 
                            <TouchableOpacity style={{ padding:10, width:'90%'}} onPress={()=> this.setState({showJk:true})}>
                                <Text style={styles.itemText}>Select Gender</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={{ padding:10, width:'90%'}} onPress={()=> this.setState({showJk:true})}>
                                <Text style={styles.itemText}>{this.state.jk}</Text>
                            </TouchableOpacity>
                        }
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
        color: 'rgba(0,0,0,.6)',
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
        color: 'rgba(0,0,0,.6)',
        alignItems: 'center',
    }
})