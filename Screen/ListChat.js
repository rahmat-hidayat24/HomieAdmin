import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StatusBar, TextInput, ImageBackground, AsyncStorage, TouchableOpacity, RefreshControl, Modal , Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Server from './ServerFunction'
import CountChat from './CountChat'

export default class ListChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalChat: true,
            pemilik: '',
            username: '',
            listChat: [],
            idChat : '',
            refreshing: true,
            jenis: '',
            nama: '',
            showPopUp: false,
            usernameSend:'',
            nama_hunian :'',
            today: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            errChat : false
        }
    }


    async getChats() {
        await fetch(`${Server.GetBackEndserver()}/livechat/list/admin`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    refreshing: false,
                    listChat: res
                })
            })
            .catch(err => {
                alert('Gagal Load Chat')
            })
    }

    showoption(chatId){
        this.setState({
            showPopUp:true,
            idChat : chatId
        })
    }

    updateRead_at(idChat){
        fetch(`${Server.GetBackEndserver()}/chat/update/status/livechat/${idChat}`,{
            method:'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                status : 'read'
            })
        })
        .then(res => res.json())
        .then(res=>{
            console.log('Berhasil Ubah')
        })
    }

    deleteOption(){
        Alert.alert(
            'Hapus Pesan',
            'Anda Yakin Menghapus Pesan ini ?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Yes', onPress: () => {this.deleteChat(this.state.idChat)}},
            ],
            {cancelable: false},
          );
    }

    deleteChat(chat_id) {
        console.log(chat_id)
        fetch(`${Server.GetBackEndserver()}/livechat/delete/${chat_id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                alert('Berhasil Hapus Pesan')
            })
    }

    async componentDidMount() {
        var username = await AsyncStorage.getItem('username')
        var jenis = await AsyncStorage.getItem('jenis')
        var nama = await AsyncStorage.getItem('nama')
        this.setState({
            pemilik: nama,
            username: username,
            nama: nama,
            jenis: jenis
        })
        this.intervalID = setInterval(this.getChats.bind(this), 2000)
        this.getChats()
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    onRefresh() {
        //Clear old data of the list
        // this.setState({ listChat: [] });
        //Call the Service to get the latest data
        this.getChats();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', padding: '5%' }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >


                    <Modal
                        visible={this.state.showPopUp}
                        animationType='fade'
                        transparent={true}
                    >
                        <View style={{ flex:1,backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center' }} onTouchEndCapture={() => this.setState({ showPopUp: false })}>
                            <View style={{ backgroundColor: '#fff', padding: 15, width: '95%', alignSelf: 'center', borderRadius: 6 }}>
                                <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.deleteOption()}>
                                    <Icon name='trash-2' size={25} style={{marginRight:10}}/>
                                    <Text>Hapus Pesan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Modal>

                    {
                        this.state.listChat.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => {this.props.navigation.navigate('Chat', { idChat:item.idChat , usernameUser: item.usernameUser, nama:item.nama}),this.updateRead_at(item.idChat)}} onLongPress={() => this.showoption(item.idChat)}>
                                <View style={{ flexDirection: 'row', padding: 5, borderBottomColor: '#dcdddf', borderBottomWidth: 1, marginTop: 10, alignItems: 'center' }} >
                                    <Image source={{ uri: `${Server.GetBackEndserver()}/images/user/${item.poto}` }} style={{ width: 40, height: 40, borderRadius: 20, borderColor: '#dcdddf', borderWidth: 1 }} />
                                    <CountChat idChat={item.idChat} username={this.state.username} jenis={this.state.jenis} />
                                    <View style={{ width: '80%', padding: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>{item.nama }</Text>
                                            <Text>{this.state.today == item.date ? `Today, ${item.time}` : item.date}</Text>
                                        </View>
                                        <Text numberOfLines={1}>{this.state.username === item.usernameSend ? 'Anda: ' + item.message : item.message}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )).reverse()
                    }
                </ScrollView>
            </View>
        )
    }
}