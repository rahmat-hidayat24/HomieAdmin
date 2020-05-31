import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage ,ToastAndroid} from 'react-native'
import Server from './ServerFunction'


export default class UbahPassword extends Component {
    constructor(props){
        super(props);
        this.state={
            currentPassword : '',
            oldPassword :'',
            password:'',
            c_newPassword:'',
            username :''
        }
    }

    loadUser(){
        fetch(`${Server.GetBackEndserver()}/profil/${this.state.username}`)
        .then(res => res.json())
        .then(res =>{
            console.log(res)
            this.setState({
                currentPassword : res.password
            })
        })
    }

    updatePassword(){
        fetch(`${Server.GetBackEndserver()}/user/change_password/${this.state.username}`,{
            method :'PUT',
            headers :{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                password : this.state.password
            })
        })
        .then(res => res.json())
        .then(res=>{
           ToastAndroid.show('Berhasil Update Password',ToastAndroid.SHORT)
            this.password.clear()
            this.repassword.clear()
            this.newPassword.clear()
        })
    }

    async componentDidMount(){
        let username = await AsyncStorage.getItem('username')
        this.setState({
            username : username
        })
        this.loadUser()
    }


    checkPassword(){
        let password = this.state.password
        let c_newPassword = this.state.c_newPassword
      
        if (this.state.oldPassword !== this.state.currentPassword){
            alert('Password Lama Tidak Sama') 
            this.password.focus()
         } else if (password !== c_newPassword){
           alert('Password Tidak Sama') 
           this.repassword.focus()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.Input}
                        placeholder='Masukkan Password Lama'
                        keyboardType='default'
                        placeholderTextColor="rgba(0,0,0,0.6)"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onEndEditing={this.checkPassword.bind(this)}
                        secureTextEntry={true}
                        onSubmitEditing={() => this.newPassword.focus()}
                        ref={(input) => this.password = input}
                        onChangeText={(value) => this.setState({ oldPassword: value })}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.Input}
                        placeholder='Masukkan Password Baru'
                        keyboardType='default'
                        placeholderTextColor="rgba(0,0,0,0.6)"
                        autoCapitalize="none"
                        returnKeyType="next"
                        secureTextEntry={true}
                        onSubmitEditing={() => this.repassword.focus()}
                        ref={(input) => this.newPassword = input}
                        onChangeText={(value) => this.setState({ password: value })}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.Input}
                        placeholder='Re-Type Password Baru'
                        keyboardType='default'
                        placeholderTextColor="rgba(0,0,0,0.6)"
                        autoCapitalize="none"
                        returnKeyType="done"
                        secureTextEntry={true}
                        onEndEditing={this.checkPassword.bind(this)}
                        ref={(input) => this.repassword = input}
                        onChangeText={(value) => this.setState({ c_newPassword: value })}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=>this.updatePassword()}>
                        <Text style={styles.btnText}>Ubah Password</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical:'5%'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    Input: {
        borderColor: '#858789',
        borderRadius: 15,
        color: '#858789',
        marginBottom: 20,
        width: '90%',
        borderBottomColor: '#858789',
        borderBottomWidth: 1,
        paddingLeft: 10
    },
    btn:{
        backgroundColor: '#5191fd',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: '5%'
    },
    btnText: {
        color: '#fff'
    }
})