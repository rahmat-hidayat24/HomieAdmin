import React, { Component } from 'react'
import {View, ActivityIndicator,Image} from 'react-native'

export default class Loading extends Component{
    render(){
        return(
            <View style={{alignContent:'center',justifyContent:'center', flex:1,backgroundColor:'#c36a2d'}}>
                <Image source={require('./Asset/Image/Logo/Logo-ReCafe-Transparant.png')} style={{ width: 400, alignSelf: 'center', height: 200 }} />
                <ActivityIndicator color='#e2c275'/>
            </View>
        )
    }
}