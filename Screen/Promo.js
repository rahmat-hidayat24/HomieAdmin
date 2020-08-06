import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, TextInput, Button, FlatList,Dimensions } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5"
import Server from './ServerFunction'





export default class Promo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promoList: []
        }
    }


    async getPromoList() {
        await fetch(`${Server.GetBackEndserver()}/promo/list`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    promoList: res
                })
                console.log(res)
            })
    }


    deletePromo(idPromo) {
        fetch(`${Server.GetBackEndserver()}/promo/delete/${idPromo}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                this.getPromoList()
            })
    }

    componentDidMount() {
        const {navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getPromoList()
        })
        this.getPromoList()
    }


    render() {
        return (
            <View style={{ flex: 1 , marginBottom:Dimensions.get('window').height - 595}}>

                <FlatList
                    data={this.state.promoList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index}>
                            <View style={{ width: '95%', alignSelf: 'center', marginVertical: 15, flexDirection: "row", borderColor: '#758184', elevation: 3, padding: 10, backgroundColor: '#fff', borderRadius: 10 }}>
                                <Image source={{ uri: `${Server.GetBackEndserver()}/images/promo/${item.poto}` }} style={{ width: 120, height: 100, alignSelf: "flex-start", borderRadius: 10 }} />
                                <View style={{ width: '65%' }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10, borderBottomWidth: 1, borderColor: '#84a9ac', color: '#758184' }}>{item.nama_promo}</Text>
                                    <Text style={{ fontSize: 13, fontWeight: "bold", marginLeft: 10, paddingTop: 5, color: '#758184' }}>Kode Promo : <Text style={{ fontSize: 13, fontWeight: 'normal', marginLeft: 10, paddingTop: 5, color: '#758184' }}>{item.kode_promo}</Text></Text>
                                    <Text style={{ fontSize: 13, fontWeight: "bold", marginLeft: 10, paddingTop: 3, color: '#758184' }}>Expired Date :<Text style={{ fontSize: 13, fontWeight: 'normal', marginLeft: 10, paddingTop: 5, color: '#758184' }}> {item.tgl_akhir} </Text> </Text>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-evenly', alignSelf: "flex-end", width: '30%', marginTop: 15 }}>
                                        <Icon name='pen' size={20} style={{ paddingRight: 10 }} color='#758184' onPress={()=>this.props.navigation.navigate('TambahPromo',{screen : 'Edit Promo', data : item})}/>
                                        <Icon name='trash' size={20} color='#758184' onPress={() => this.deletePromo(item.id_promo)} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item,index)=> String(index)}
                />

            </View>
        )
    }
}