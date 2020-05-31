import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Server from './ServerFunction'


export default class Fasilitas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idHunian: this.props.params.idHunian,
            listFasilitas: [],
            Fasilitas: {}
        }
    }

    async loadInfoKamar() {
        await fetch(`${Server.GetBackEndserver()}/${this.state.idHunian}/kamar`)
            .then(response => response.json())
            .then(res => {
                // Get Data
                this.setState({
                    Fasilitas: res
                })

                // Get And Joining Data
                var listFasilitas = this.state.Fasilitas.Fasilitas
                var arr = listFasilitas.split(',')
                this.setState({
                    listFasilitas: arr
                })

                // Delete Duplicate Data
                var fasilitas = Array.from(new Set(this.state.listFasilitas))
                this.setState({
                    listFasilitas: fasilitas
                })
                
                // var distinctTest = [...new Set(res.map(x => x.nama_fasilitas))]
            })

    }

    async componentDidMount() {
        this.loadInfoKamar()
    }

    render() {
        return (
            <View style={{ marginBottom: 10, flex: 1 }}>
                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ backgroundColor: '#e8ffe8', padding: 8, borderColor: '#eee', borderWidth: 0.8 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#4f81c7' }}>Fasilitas Kamar</Text>
                    </View>
                    <View>
                        {
                            this.state.listFasilitas.length == 0 ?
                                <View style={{paddingHorizontal:10, paddingVertical:10}}>
                                    <Text style={{ color: '#63707e' }}>Fasilitas Belum Ditambahkan atau Belum Ada</Text>
                                </View> : this.state.listFasilitas.map((item, index) => (
                                    <View key={index}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, borderBottomColor: '#f2f6f5', borderBottomWidth: 1 }}>
                                            <Text style={{ color: '#63707e' }}>{item}</Text>
                                            <Ionicons name='md-checkmark' color='#4f81c7' size={25} />
                                        </View>
                                    </View>
                                ))
                        }
                    </View>
                    <View style={{ backgroundColor: '#defcfc', padding: 2, borderColor: '#eee', borderWidth: 0.8 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#4f81c7' }}>Detail Kamar</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, borderBottomColor: '#f2f6f5', borderBottomWidth: 1 }}>
                        <Text style={{ color: '#63707e' }}>{this.state.Fasilitas.luasKamar} m</Text>
                    </View>
                </View>


            </View>
        )
    }
}