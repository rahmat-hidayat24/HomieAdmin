import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, ScrollView, Dimensions, ToastAndroid } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5"
import Server from './ServerFunction'








export default class ListKritikSaran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listReview: [],
            itemListText: 0,
            showSearch: null,
            searchText: '',
            borderColor: ['#e8bd46', '#8ce846', '#46e8a7', '#46e3e8', '#4679e8']
        }
    }



    async loadReview() {
        await fetch(`${Server.GetBackEndserver()}/review/app/list`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    listReview: res,
                    itemListText: res.length
                })
            })
    }


    deleteReview(idReview){
        fetch(`${Server.GetBackEndserver()}/review/app/delete/${idReview}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(res=>{
            ToastAndroid.show(res.message, ToastAndroid.SHORT)
            this.loadReview()
        })
    }


    searchReview(date){
        fetch(`${Server.GetBackEndserver()}/search/Review?date_create=${date}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                listReview: res,
                itemListText: res.length
            })
        })
    }

    componentDidMount() {
        this.loadReview()
    }


    render() {
        const borderColorRepeat = new Array(5).fill([0, 1, 2, 3, 4]).flat()
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <StatusBar
                        backgroundColor="#24a1d7"
                        animated
                        barStyle="light-content"
                        showHideTransition="fade" />

                    {/* Header */}
                    <View style={styles.headerBg}>
                    </View>
                    <View style={styles.headerInfoContainer}>
                        <View style={styles.headerItemTextContainer}>
                            <Text style={styles.headerItemTextTitle}>{this.state.itemListText}</Text>
                            <Text style={styles.headerItemSmallText}>Laporan</Text>
                        </View>

                        <View style={styles.headerSeparator}></View>
                        <View style={styles.headerItemTextContainer}>
                            <Icon name='search' size={20} color='#758184' onPress={() => this.state.showSearch ? this.setState({ showSearch: false }) : this.setState({ showSearch: true })} />
                        </View>
                    </View>
                    {
                        this.state.showSearch ? <View>
                            <TextInput placeholder='Search by date (DD/MM/YYYY)' keyboardType='web-search' returnKeyType="search"
                                placeholderTextColor='rgba(0,0,0,.6)' style={styles.searchInput}  onChangeText={(value)=>this.searchReview(value)}/>
                        </View> : null
                    }


                    {/* Body  */}

                    {
                        this.state.listReview.map((item, index) => (
                            <TouchableOpacity style={[styles.itemBtnContainer, { borderLeftColor: this.state.borderColor[borderColorRepeat[index]] }]} key={index} onPress={() => this.props.navigation.navigate('DetailKritikSaran', { data: item })}>
                                <View style={styles.itemContentContainer}>
                                    <View>
                                        <Text style={styles.itemContentTitle}>{item.nama}</Text>
                                        <Text style={styles.itemContentSmallText} numberOfLines={1}>{item.deskripsi} </Text>
                                        <Text style={styles.itemContentSmallText}>{item.date_create}</Text>
                                    </View>
                                </View>
                                <View style={styles.itemIconContainer}>
                                    <Icon name='trash' size={20} color='#758184' onPress={()=> this.deleteReview(item.idReview)}/>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    headerBg: {
        backgroundColor: "#24a1d7",
        height: Dimensions.get('window').height - 570,
        elevation: 3
    },
    headerInfoContainer: {
        borderRadius: 5,
        borderColor: "black",
        width: "95%",
        alignSelf: "center",
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        elevation: 3,
        marginTop: -35
    },
    headerItemTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#758184'
    },
    headerSeparator: {
        borderRightWidth: 1
    },
    headerItemTextTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#758184'
    },
    headerItemSmallText: {
        fontSize: 10,
        color: '#758184'
    },
    searchInput: {
        padding: 5,
        width: '85%',
        backgroundColor: "#fff",
        borderRadius: 10,
        width: '90%',
        alignSelf: "center",
        marginVertical: 15,
        elevation: 3
    },
    itemBtnContainer: {
        width: '95%',
        padding: 10,
        marginVertical: 6,
        backgroundColor: '#fff',
        elevation: 3,
        borderRadius: 10,
        alignSelf: 'center',
        borderLeftWidth: 3
    },
    itemContentContainer: {
        flexDirection: "row"
    },
    itemImage: {
        width: 120,
        height: 100,
        alignSelf: "flex-start",
        marginLeft: 3,
        borderRadius: 10
    },
    itemContentTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
        color: '#758184'
    },
    itemContentSmallText: {
        fontSize: 13,
        fontWeight: "bold",
        marginLeft: 10,
        paddingTop: 5,
        color: '#758184'
    },
    itemIconContainer: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        paddingRight: 5
    }

})