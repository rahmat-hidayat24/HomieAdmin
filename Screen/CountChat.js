import React from 'react';
import { Image, Text, View , StyleSheet} from 'react-native';
import Server from './ServerFunction'



export default class CountChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idChat: this.props.idChat,
            unread: 0,
            username: this.props.username,
            jenis: this.props.jenis
        }
    }

    getCountChat() {
        fetch(`${Server.GetBackEndserver()}/unread/chat/count/chat_id/${this.state.username}?jenis=${this.state.jenis}&idChat=${this.state.idChat}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    unread: res[0].unread
                })
                this.checkStatus()
            })
    }

    componentDidMount() {
        this.getCountChat()
    }

    checkStatus() {
        if (this.state.unread == 0) {
            return (<View>
                <Text style={{ color: '#fff' }}></Text>
            </View>)
        } else {
            return (<View>
                <Text style={{ color: '#fff' }}>{this.state.unread}</Text>
            </View>)
        }
    }

    render() {
        return (
            <View style={this.state.unread == 0 ? styles.read : styles.unread}>
                {
                    this.checkStatus()
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    unread:{
        position: 'absolute', backgroundColor: '#4f81c7', width: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', left: 0, top: 10
    },
    read:{
        backgroundColor:'transparent'
    }
})