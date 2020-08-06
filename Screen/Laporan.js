import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, Button, Dimensions } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import Icon1 from "react-native-vector-icons/FontAwesome"
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons"
import Server from './ServerFunction'




export default class Laporan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemHunian: 0,
            itemUser: 0,
            itemKritikSaran: 0
        }
    }


    async loadUser() {
        await fetch(`${Server.GetBackEndserver()}/list/user?screen=Laporan User`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    itemUser: res.length
                })
            })
    }

    async loadHunian() {
        try {
            await fetch(`${Server.GetBackEndserver()}/hunian`)
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        itemHunian: response.length
                    })
                })
        }
        catch (e) {
            alert(e)
        }

    }


    async loadReview() {
        await fetch(`${Server.GetBackEndserver()}/review/app/list`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    itemKritikSaran: res.length
                })
            })
    }
   

    componentDidMount() {
        this.loadUser()
        this.loadHunian()
        this.loadReview()
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#208ebd"
                    animated
                    barStyle="light-content"
                    showHideTransition='fade' />

                <View style={styles.leftSide}>
                </View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Chart')} activeOpacity={0.8}>
                    <View style={styles.btnContainer}>
                        <View style={styles.btnItemContainer}>
                            <View style={styles.btnItemLeftIconContainer}>
                                <Icon2 name='chart-line' size={35} color='#758184' />
                            </View>
                            <View style={styles.btnTextContainer}>
                                <Text style={styles.btnItemTextTitle}>Statistik</Text>
                                <Text style={styles.btnItemSmallText}>6 items</Text>
                            </View>
                            <View style={styles.btnItemRightIconContainer}>
                                <Icon name='ios-arrow-dropright' size={30} color='#758184' />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('ListHunian')} activeOpacity={0.8}>
                    <View style={styles.btnContainer}>
                        <View style={styles.btnItemContainer}>
                            <View style={styles.btnItemLeftIconContainer}>
                                <Icon name='ios-business' size={35} color='#758184' />
                            </View>
                            <View style={styles.btnTextContainer}>
                                <Text style={styles.btnItemTextTitle}>Hunian</Text>
                                <Text style={styles.btnItemSmallText}>{this.state.itemHunian} items</Text>
                            </View>
                            <View style={styles.btnItemRightIconContainer}>
                                <Icon name='ios-arrow-dropright' size={30} color='#758184' />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('LaporanUser')}>
                    <View style={styles.btnContainer}>
                        <View style={styles.btnItemContainer}>
                            <View style={styles.btnItemLeftIconContainer}>
                                <Icon1 name='user-circle-o' size={35} color='#758184' />
                            </View>
                            <View style={styles.btnTextContainer}>
                                <Text style={styles.btnItemTextTitle}>Pengguna</Text>
                                <Text style={styles.btnItemSmallText}>{this.state.itemUser} Items</Text>
                            </View>
                            <View style={styles.btnItemRightIconContainer}>
                                <Icon name='ios-arrow-dropright' size={30} color='#758184' />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('ListKritikSaran')}>
                    <View style={styles.btnContainer}>
                        <View style={styles.btnItemContainer}>
                            <View style={styles.btnItemLeftIconContainer}>
                                <Icon2 name='pencil-box' size={35} color='#758184' />
                            </View>
                            <View style={styles.btnTextContainer}>
                                <Text style={styles.btnItemTextTitle}>Kritik &amp; Saran</Text>
                                <Text style={styles.btnItemSmallText}>{this.state.itemKritikSaran} Items</Text>
                            </View>
                            <View style={styles.btnItemRightIconContainer}>
                                <Icon name='ios-arrow-dropright' size={30} color='#758184' />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    leftSide: {
        height: Dimensions.get('window').height,
        backgroundColor: '#24A1D7',
        position: 'absolute',
        width: '25%',
    },
    btnContainer: {
        padding: 5
    },
    btnItemContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        marginBottom: 15,
        alignItems: 'center',
        padding: 8,
        borderRadius: 10,
        width: "80%",
        alignSelf: "center",
        backgroundColor: '#fff',
        elevation: 6
    },
    btnItemLeftIconContainer: {
        width: '18%',
        position: 'absolute',
        left: -25,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 6,
        padding: 5
    },
    btnTextContainer: {
        marginLeft: '5%',
        width: '75%',
    },
    btnItemRightIconContainer: {
        width: '10%',
        position: 'absolute',
        right: -15,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 6
    },
    btnItemTextTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#758184'
    },
    btnItemSmallText: {
        color: '#758184'
    }
})