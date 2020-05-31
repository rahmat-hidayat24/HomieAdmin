import React, { Component } from 'react'
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View , TouchableWithoutFeedback, Modal,Dimensions} from 'react-native'
import Star from 'react-native-stars'
import StarIcon from 'react-native-vector-icons/Ionicons'
import Server from './ServerFunction'


export default class Ulasan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ulasan: [],
            idHunian: this.props.params.idHunian,
            pemilik: this.props.params.pemilik,
            nama_hunian: this.props.params.nm_hunian,
            starFasilitas: 0,
            starHarga: 0,
            starKeamanan: 0,
            starKebersihan: 0,
            starKenyamanan: 0,
            previewPotoModal : false,
            previewPotoSelected : '',
            height:0,
            width: Dimensions.get('window').width-10,
        }
    }

    getUlasan() {
        fetch(`${Server.GetBackEndserver()}/Ulasan/${this.state.idHunian}`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    ulasan: res
                })

                let totalStar1Fasilitas = 0
                let totalStar2Fasilitas = 0
                let totalStar3Fasilitas = 0
                let totalStar4Fasilitas = 0
                let totalStar5Fasilitas = 0

                let totalStar1Harga = 0
                let totalStar2Harga = 0
                let totalStar3Harga = 0
                let totalStar4Harga = 0
                let totalStar5Harga = 0

                let totalStar1Keamanan = 0
                let totalStar2Keamanan = 0
                let totalStar3Keamanan = 0
                let totalStar4Keamanan = 0
                let totalStar5Keamanan = 0

                let totalStar1Kebersihan = 0
                let totalStar2Kebersihan = 0
                let totalStar3Kebersihan = 0
                let totalStar4Kebersihan = 0
                let totalStar5Kebersihan = 0

                let totalStar1Kenyamanan = 0
                let totalStar2Kenyamanan = 0
                let totalStar3Kenyamanan = 0
                let totalStar4Kenyamanan = 0
                let totalStar5Kenyamanan = 0

                let ulasan = this.state.ulasan

                let sum = ulasan => ulasan.reduce((x, y) => x + y);
                let jumlahFasilitas = sum(ulasan.map(x => Number(x.starFasilitas)));
                let jumlahHarga = sum(ulasan.map(x => Number(x.starHarga)));
                let jumlahKeamanan = sum(ulasan.map(x => Number(x.starKeamanan)));
                let jumlahKebersihan = sum(ulasan.map(x => Number(x.starKebersihan)));
                let jumlahKenyamanan = sum(ulasan.map(x => Number(x.starKenyamanan)));
                // for (var i = 0; i < ulasan.length; i++) {
                //         ulasan[i].starFasilitas == 5 ? total += 1 : total += 0
                // }

                // Perhitungan Rating
                ulasan.map((item, index) => {
                    item.starFasilitas == 5 ? totalStar5Fasilitas += 1 : totalStar5Fasilitas += 0
                    item.starFasilitas == 4 ? totalStar4Fasilitas += 1 : totalStar4Fasilitas += 0
                    item.starFasilitas == 3 ? totalStar3Fasilitas += 1 : totalStar3Fasilitas += 0
                    item.starFasilitas == 2 ? totalStar2Fasilitas += 1 : totalStar2Fasilitas += 0
                    item.starFasilitas == 1 ? totalStar1Fasilitas += 1 : totalStar1Fasilitas += 0

                    item.starHarga == 5 ? totalStar5Harga += 1 : totalStar5Harga += 0
                    item.starHarga == 4 ? totalStar4Harga += 1 : totalStar4Harga += 0
                    item.starHarga == 3 ? totalStar3Harga += 1 : totalStar3Harga += 0
                    item.starHarga == 2 ? totalStar2Harga += 1 : totalStar2Harga += 0
                    item.starHarga == 1 ? totalStar1Harga += 1 : totalStar1Harga += 0

                    item.starKeamanan == 5 ? totalStar5Keamanan += 1 : totalStar5Keamanan += 0
                    item.starKeamanan == 4 ? totalStar4Keamanan += 1 : totalStar4Keamanan += 0
                    item.starKeamanan == 3 ? totalStar3Keamanan += 1 : totalStar3Keamanan += 0
                    item.starKeamanan == 2 ? totalStar2Keamanan += 1 : totalStar2Keamanan += 0
                    item.starKeamanan == 1 ? totalStar1Keamanan += 1 : totalStar1Keamanan += 0

                    item.starKebersihan == 5 ? totalStar5Kebersihan += 1 : totalStar5Kebersihan += 0
                    item.starKebersihan == 4 ? totalStar4Kebersihan += 1 : totalStar4Kebersihan += 0
                    item.starKebersihan == 3 ? totalStar3Kebersihan += 1 : totalStar3Kebersihan += 0
                    item.starKebersihan == 2 ? totalStar2Kebersihan += 1 : totalStar2Kebersihan += 0
                    item.starKebersihan == 1 ? totalStar1Kebersihan += 1 : totalStar1Kebersihan += 0

                    item.starKenyamanan == 5 ? totalStar5Kenyamanan += 1 : totalStar5Kenyamanan += 0
                    item.starKenyamanan == 4 ? totalStar4Kenyamanan += 1 : totalStar4Kenyamanan += 0
                    item.starKenyamanan == 3 ? totalStar3Kenyamanan += 1 : totalStar3Kenyamanan += 0
                    item.starKenyamanan == 2 ? totalStar2Kenyamanan += 1 : totalStar2Kenyamanan += 0
                    item.starKenyamanan == 1 ? totalStar1Kenyamanan += 1 : totalStar1Kenyamanan += 0
                })

                var starFasilitasAverage = (1 * totalStar1Fasilitas + 2 * totalStar2Fasilitas + 3 * totalStar3Fasilitas + 4 * totalStar4Fasilitas + 5 * totalStar5Fasilitas) / (totalStar1Fasilitas + totalStar2Fasilitas + totalStar3Fasilitas + totalStar4Fasilitas + totalStar5Fasilitas)

                var starHargaAverage = (1 * totalStar1Harga + 2 * totalStar2Harga + 3 * totalStar3Harga + 4 * totalStar4Harga + 5 * totalStar5Harga) / (totalStar1Harga + totalStar2Harga + totalStar3Harga + totalStar4Harga + totalStar5Harga)

                var starKeamananAverage = (1 * totalStar1Keamanan + 2 * totalStar2Keamanan + 3 * totalStar3Keamanan + 4 * totalStar4Keamanan + 5 * totalStar5Keamanan) / (totalStar1Keamanan + totalStar2Keamanan + totalStar3Keamanan + totalStar4Keamanan + totalStar5Keamanan)

                var starKebersihanAverage = (1 * totalStar1Kebersihan + 2 * totalStar2Kebersihan + 3 * totalStar3Kebersihan + 4 * totalStar4Kebersihan + 5 * totalStar5Kebersihan) / (totalStar1Kebersihan + totalStar2Kebersihan + totalStar3Kebersihan + totalStar4Kebersihan + totalStar5Kebersihan)

                var starKenyamananAverage = (1 * totalStar1Kenyamanan + 2 * totalStar2Kenyamanan + 3 * totalStar3Kenyamanan + 4 * totalStar4Kenyamanan + 5 * totalStar5Kenyamanan) / (totalStar1Kenyamanan + totalStar2Kenyamanan + totalStar3Kenyamanan + totalStar4Kenyamanan + totalStar5Kenyamanan)

                console.warn(starFasilitasAverage)
                console.warn(starHargaAverage)
                console.warn(starKeamananAverage)
                console.warn(starKebersihanAverage)
                console.warn(starKenyamananAverage)
                var ratingHunian = (starFasilitasAverage + starHargaAverage + starKeamananAverage + starKebersihanAverage + starKenyamananAverage) / 5
                console.warn(ratingHunian)
                if (starFasilitasAverage > 1.1 && starFasilitasAverage < 2.0) {
                    starFasilitasAverage = 1.5
                }
                else if (starFasilitasAverage > 2.1 && starFasilitasAverage < 3.0) {
                    starFasilitasAverage = 2.5
                }
                else if (starFasilitasAverage > 3.1 && starFasilitasAverage < 4.0) {
                    starFasilitasAverage = 3.5
                }
                else if (starFasilitasAverage > 4.1 && starFasilitasAverage < 5.0) {
                    starFasilitasAverage = 4.5
                }

                // Tampilkan Rating
                this.setState({
                    starFasilitas: starFasilitasAverage.toFixed(1),
                    starHarga: starHargaAverage.toFixed(1),
                    starKeamanan: starKeamananAverage.toFixed(1),
                    starKebersihan: starKebersihanAverage.toFixed(1),
                    starKenyamanan: starKenyamananAverage.toFixed(1)
                })
            }).catch(err=>{
                this.setState({
                    starKenyamanan:0,
                    starFasilitas:0,
                    starKeamanan :0,
                    starKebersihan:0,
                    starHarga:0,
                    ulasan:[]
                })
            })

    }

    
    resizeImage = (event) => {
        let widthOrigin = event.nativeEvent.source.width
        let heightOrigin = event.nativeEvent.source.height
        let aspectRatio = widthOrigin / heightOrigin
        this.setState({
            height: this.state.width / aspectRatio
        })
    }

    componentDidMount() {
        this.getUlasan()
        console.log(this.state.idHunian)
    }

    // componentDidUpdate(){
    //     this.getUlasan()
    // }
    render() {
        return (
            <ScrollView style={{ paddingBottom: '8%', flex: 1 }}>
               <Modal visible={this.state.previewPotoModal} transparent onRequestClose={()=>this.setState({previewPotoModal:false})} animated animationType='fade'>
                   <View style={{flex:1, backgroundColor:'rgba(0,0,0,.5)', alignItems:'center', justifyContent:'center'}} onTouchEndCapture={()=>this.setState({previewPotoModal:false})}>
                            <View>
                                <Image source={{uri : `${Server.GetBackEndserver()}/images/ulasan/${this.state.previewPotoSelected}`}}  style={{width:this.state.width, height:this.state.height}} onLoad={(event)=>this.resizeImage(event)}/>
                            </View>
                   </View>
               </Modal>
                <View style={{ backgroundColor: '#fff' }}>
                    <View style={{ backgroundColor: '#e8ffe8', padding: 8, borderColor: '#eee', borderWidth: 0.8 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#4f81c7' }}>Ulasan </Text>
                    </View>
                    <View style={{ padding: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#63707e' }}>Fasilitas </Text>
                            <Star
                                count={5}
                                rating={this.state.starFasilitas}
                                half={false}
                                fullStar={<StarIcon name={'md-star'} size={25} color='#3e64ff' />}
                                emptyStar={<StarIcon name={'md-star-outline'} size={25} color='#3e64ff' />}
                                disabled
                            />

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#63707e' }}>Harga </Text>
                            <Star
                                count={5}
                                rating={this.state.starHarga}
                                half={false}
                                fullStar={<StarIcon name={'md-star'} size={25} color='#3e64ff' />}
                                emptyStar={<StarIcon name={'md-star-outline'} size={25} color='#3e64ff' />}
                                disabled
                            />

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#63707e' }}>Keamanan </Text>
                            <Star
                                count={5}
                                rating={this.state.starKeamanan}
                                half={true}
                                fullStar={<StarIcon name={'md-star'} size={25} color='#3e64ff' />}
                                emptyStar={<StarIcon name={'md-star-outline'} size={25} color='#3e64ff' />}
                                disabled
                            />

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#63707e' }}>Kebersihan </Text>
                            <Star
                                count={5}
                                rating={this.state.starKebersihan}
                                half={false}
                                fullStar={<StarIcon name={'md-star'} size={25} color='#3e64ff' />}
                                emptyStar={<StarIcon name={'md-star-outline'} size={25} color='#3e64ff' />}
                                disabled
                            />

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#63707e' }}>Kenyamanan </Text>
                            <Star
                                count={5}
                                rating={this.state.starKenyamanan}
                                half={false}
                                fullStar={<StarIcon name={'md-star'} size={25} color='#3e64ff' />}
                                emptyStar={<StarIcon name={'md-star-outline'} size={25} color='#3e64ff' />}
                                disabled
                            />

                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#fff', marginTop: 15 }}>
                    <View style={{ backgroundColor: '#e8ffe8', padding: 8, borderColor: '#eee', borderWidth: 0.8 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#4f81c7' }}>Semua Ulasan ({this.state.ulasan.length})</Text>
                    </View>
                    {this.state.ulasan.length !== 0 ?
                        this.state.ulasan.map((item, index) => (
                            <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1, padding: 8, flexDirection: 'row', justifyContent: 'space-between' }} key={index}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#4f81c7' }}>{item.nama}</Text>
                                    <Text style={{ color: '#63707e' }}>{item.ulasan}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' , borderColor:'#eee', borderWidth:1}}>
                                        <Text style={{ fontSize: 10, color: '#63707e' }}>{item.date}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <StarIcon name={'md-star'} size={15} color='#3e64ff' />
                                            <Text style={{ color: '#3e64ff', fontWeight: 'bold', fontSize: 14 }}>4.0</Text>
                                        </View>
                                    </View>
                                </View>
                                {
                                    item.poto.length == 0 ? null : 
                                    <TouchableWithoutFeedback onPress={()=>{this.setState({previewPotoSelected:item.poto, previewPotoModal:true})}}>
                                    <Image source={{ uri : `${Server.GetBackEndserver()}/images/ulasan/${item.poto}`}} style={{ width: 80, height: 100 }} />
                                    </TouchableWithoutFeedback>
                                }
                            </View>
                        )) : <View style={{ padding: 10 }}><Text style={{ color: '#63707e' }}>Belum Ada Ulasan</Text></View>
                    }

                </View>
            </ScrollView>
        )
    }
}