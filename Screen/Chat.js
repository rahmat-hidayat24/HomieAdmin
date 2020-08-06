import React, { Component } from 'react'
import { View, Text, Image, Keyboard, StatusBar, TextInput, ImageBackground, AsyncStorage, SectionList, FlatList, StyleSheet, Dimensions, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Server from './ServerFunction'
import { ScrollView } from 'react-native-gesture-handler';



export default class Chat extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameAdmin: '',
            usernameUser: this.props.navigation.state.params.usernameUser,
            chatUser: [],
            dataPemilik: {},
            idChat: this.props.navigation.state.params.idChat,
            hours: new Date().getHours(),
            min: new Date().getMinutes(),
            poto: '',
            role: '',
            date: '',
            status: 'unread',
            tanggal: [],
            message: '',
            style: {},
            nama: this.props.navigation.state.params.nama

        }
    }

    twoDigits(time) {
        const timeString = `${time}`
        if (timeString.length == 2) return time
        else return `0${time}`
    }


    getChats() {
        fetch(`${Server.GetBackEndserver()}/livechat/detail/list?username=${this.state.usernameUser}`)
            .then(response => response.json())
            .then(res => {
                console.log(res)
                const dataSource = res.reduce(function (sections, item) {

                    let section = sections.find(section => section.date === item.date);
                    if (!section) {
                        section = { date: item.date, data: [] };
                        sections.push(section);
                    }
                    section.data.push(item);
                    return sections;
                }, []);
                this.setState({
                    chatUser: dataSource,
                })
            })
            .catch(err => {
                alert('Gagal Mendapatkan Pesan')
                clearInterval(this.intervalID)
                console.log(err)
            })
    }




    sendChat() {
        const time = `${this.twoDigits(this.state.hours)}:${this.twoDigits(this.state.min)}`
        const date = `${this.twoDigits(new Date().getDate())}/${this.twoDigits(new Date().getMonth() + 1)}/${new Date().getFullYear()}`
        if (this.state.message === '') {
            alert('Ketikkan Pesan Anda')
        } else {
            fetch(`${Server.GetBackEndserver()}/livechat/add`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatId: this.state.idChat,
                    usernameUser: this.state.usernameUser,
                    usernameAdmin: this.state.username,
                    usernameSend: this.state.username,
                    role: this.state.role,
                    message: this.state.message,
                    date: date,
                    time: time,
                    status: this.state.status
                })
            })
                .then(response => response.json())
                .then(res => {
                    Keyboard.dismiss
                    ToastAndroid.show('Pesan Terkirim', ToastAndroid.SHORT)
                    this.chat.clear()
                }).catch((error) => {
                    console.error(error)
                })
        }
    }


    componentDidMount() {
        AsyncStorage.getItem('username')
            .then(res => {
                this.setState({
                    username: res
                })
            })

        AsyncStorage.getItem('jenis')
            .then(res => {
                console.log(res)
                this.setState({
                    role: res
                })
            })
        this.getChats()
        this.intervalID = setInterval(this.getChats.bind(this), 2000)

    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                    paddingBottom: 60

                }} fadeDuration={1} resizeMode='cover' >
                    <SectionList
                        sections={this.state.chatUser}
                        stickySectionHeadersEnabled={true}
                        renderSectionHeader={
                            ({ section: { date } }) => (
                                <View style={{ padding: 5, paddingHorizontal: 8, marginTop: 5, backgroundColor: '#fff', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', flex: 0.25, borderRadius: 10 }}>
                                    <Text>{date}</Text>
                                </View>)
                        }
                        renderItem={({ item, index, section }) =>
                            <View key={index}>
                                <View style={{ alignSelf: this.state.username === item.usernameSend ? 'flex-end' : 'flex-start', backgroundColor: 'white', width: '45%', marginHorizontal: 5, marginTop: 15, borderRadius: 10, padding: 5, marginVertical: this.state.username !== item.usernameSend ? '2%' : null }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#4f81c7', fontWeight: 'bold', textTransform: 'capitalize' }}>{this.state.username === item.usernameSend ?  'Admin' :  this.state.nama}</Text>
                                        <Text style={{ fontSize: 8 }}>{item.time}</Text>
                                    </View>
                                    <Text style={{ textAlign: 'right', color: '#393e46' }}>{item.message}</Text>
                                </View>
                            </View>}
                        keyExtractor={(item, index) => item.id + index}
                    />
                    {/* </View>
                    {/* </ScrollView> */}
                </ImageBackground>

                <View style={{ position: 'absolute', bottom: 5, width: '95%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, alignSelf: 'center' }} >
                    <TextInput
                        placeholder='Ketik Pesan'
                        placeholderTextColor='#63707e'
                        keyboardType='default'
                        multiline
                        autoCapitalize='words'
                        style={{ position: 'relative', width: '90%' }}
                        ref={(input) => this.chat = input}
                        onChangeText={(value) => this.setState({ message: value })}

                    />
                    <Icon name='send' size={30} color='#4f81c7' onPress={() => { this.sendChat(), Keyboard.dismiss }} />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    sectionHeader: {
        height: 50,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingLeft: 10
    },
    header: {
        fontSize: 20,
    },
    view: {
        aspectRatio: 1.5
    }
});