import React, { Component } from 'react'
import { View, Dimensions, StatusBar, ScrollView, FlatList, StyleSheet } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { Grid, LineChart, XAxis, YAxis, BarChart, AreaChart, StackedAreaChart } from 'react-native-svg-charts'
import LinearGradient1 from 'react-native-linear-gradient';
import PureChart from 'react-native-pure-chart'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import Server from './ServerFunction'
import { Text, Svg } from 'react-native-svg'


export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pria: 0,
            wanita: 0,
            pemilik: 0,
            penghuni: 0,
            dataTransaksi: [],
            tanggalTransaksi: [],
            indexTransaksi: ['Transaksi Dalam Aplikasi', 'Jenis Transaksi'],
            dataKota: [],
            timeActiveArray: [],
            monthActiveArray: [],
            timeActiveArrayFormatted: [],
            HomiePay : [],
            Cash : []
        }
    }




    async loadUser() {
        await fetch(`${Server.GetBackEndserver()}/list/user?screen=Laporan User`)
            .then(res => res.json())
            .then(res => {
                let pria = res.filter((item) => {
                    return item.jenis_kelamin === 'Pria'
                })
                let wanita = res.filter((item) => {
                    return item.jenis_kelamin === 'Wanita'
                })
                let pemilik = res.filter((item) => {
                    return item.role === 'Pemilik'
                })
                let penghuni = res.filter((item) => {
                    return item.role === 'Penghuni'
                })
                let lastActiveArray = []
                let lastActiveArrayFormatted = []
                let lastActiveMonthArray = []
                const lastActive = res.map(item => {
                    lastActiveArray.push(item.lastActive.split('2020')[1])
                    lastActiveMonthArray.push(item.lastActive.split('2020')[0])
                })
                const trimLastActive = lastActiveArray.map(function (s) { return String.prototype.trim.apply(s); })
                const trimLastActiveMonth = lastActiveMonthArray.map(function (s) { return String.prototype.trim.apply(s); })
                const test = trimLastActive.map(item => {
                    lastActiveArrayFormatted.push({ y: item, x: item.split(':')[0] })
                })
                const lastActiveMonth = [...new Set(lastActiveMonthArray)]
                this.setState({
                    pria: pria.length,
                    wanita: wanita.length,
                    pemilik: pemilik.length,
                    penghuni: penghuni.length,
                    timeActiveArray: trimLastActive,
                    monthActiveArray: lastActiveMonth,
                })
            })
    }

    loadDataTransaksi() {
        fetch(`${Server.GetBackEndserver()}/statistik/data/transaksi`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                let testArray = []
                let testArray1 = []
                // Get Data Transaksi Berdasarkan Metode Pembayaran
                const test = res.filter(item => item.metode === 'HomiePay')
                const test1 = res.filter(item => item.metode === 'Cash')
                console.log('Test ', test)
                console.log('Test1 ', test1)
              
                // Get Data Transaksi
                const jumlahTransaksi = res.map(item => item.jumlahTransaksi)
                const date = res.map(item => item.tgl_transaksi)

                const dateSplit = date.map(item => item.split('/'))
                const dateText = dateSplit.map(item => { return `${item[0]}/${item[1]}` })
                this.setState({
                    dataTransaksi: jumlahTransaksi,
                    tanggalTransaksi: dateText,
                    HomiePay:test,
                    Cash:test1
                })
            })
    }

    loadDataKotaUser() {
        fetch(`${Server.GetBackEndserver()}/statistik/data/user/kota`)
            .then(res => res.json())
            .then(res => {
                let test = res.map(item => { return { value: item.totalUser, label: item.kota } })
                console.log(test)
                this.setState({
                    dataKota: res.map(item => { return { value: item.totalUser, label: item.kota } })
                })
            })
    }
    async componentDidMount() {
        this.loadUser()
        this.loadDataTransaksi()
        this.loadDataKotaUser()
    }

    render() {
        const dataLine = this.state.dataTransaksi
        const label = this.state.tanggalTransaksi
        const axesSvg = { fontSize: Dimensions.get('window').width / 55, fill: '#fff' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30
        const sampleData = [1, 2, 1, 14,15]

        const data = [
            {
                name: "Pria",
                population: this.state.pria,
                color: "#038cfc",
                legendFontColor: "#fff",
                legendFontSize: 15
            },
            {
                name: "Wanita",
                population: this.state.wanita,
                color: "#ff4fdc",
                legendFontColor: "#fff",
                legendFontSize: 15
            },

        ];
        const data1 = [
            {
                name: "Penghuni",
                population: this.state.penghuni,
                color: "#0d85db",
                legendFontColor: "#fff",
                legendFontSize: 15
            },
            {
                name: "Pemilik",
                population: this.state.pemilik,
                color: "#9a26ff",
                legendFontColor: "#fff",
                legendFontSize: 15
            },

        ];
        const metodePembayaran = [
            {
                name: "HomiePay",
                population: this.state.HomiePay.length,
                color: "#0d85db",
                legendFontColor: "#fff",
                legendFontSize: 15
            },
            {
                name: "Cash",
                population: this.state.Cash.length,
                color: "#9a26ff",
                legendFontColor: "#fff",
                legendFontSize: 15
            },

        ];


        const dataArray = this.state.dataKota

        const Labels = ({ x, y, bandwidth, data }) => (
            dataArray.map((value, index) => (
                <Text
                    key={index}
                    x={x(0) + 10}
                    y={y(index) + (bandwidth / 2)}
                    fontSize={14}
                    fill={'white'}
                    alignmentBaseline={'middle'}
                >
                    {value.value}
                </Text>
            ))
        )


        return (
            <LinearGradient1 colors={['#2974FA', '#38ABFD', '#43D4FF']} style={{ flex: 1 }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false} style={{ marginHorizontal: 10 }}>
                    <StatusBar
                        backgroundColor="#2974FA"
                        animated
                        barStyle="light-content"
                        showHideTransition='fade' />

                    <LinearGradient1 colors={['#2974FA', '#38ABFD', '#43D4FF']} style={{ width: '100%', alignSelf: 'center', borderRadius: 10, marginVertical: 15, elevation: 5 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#fff' }}>Jenis Kelamin : </Text>

                        <PieChart
                            data={data}
                            width={Dimensions.get('window').width}
                            height={100}
                            chartConfig={{
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            accessor="population"
                            absolute
                        />
                    </LinearGradient1>
                    <LinearGradient1 colors={['#2974FA', '#38ABFD', '#43D4FF']} style={{ width: '100%', alignSelf: 'center', borderRadius: 10, marginVertical: 15, elevation: 5 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#fff' }}>Jenis User : </Text>
                        <PieChart
                            data={data1}
                            width={Dimensions.get('window').width}
                            height={100}
                            chartConfig={{
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            accessor="population"
                            absolute
                        />
                    </LinearGradient1>
                    <LinearGradient1 colors={['#2974FA', '#38ABFD', '#43D4FF']} style={{ width: '100%', alignSelf: 'center', borderRadius: 10, marginVertical: 15, elevation: 5 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#fff' }}>Metode : </Text>
                        <PieChart
                            data={metodePembayaran}
                            width={Dimensions.get('window').width}
                            height={100}
                            chartConfig={{
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            accessor="population"
                            absolute
                        />
                    </LinearGradient1>

                    <LinearGradient1 colors={['#2974FA', '#38ABFD', '#43D4FF']} style={{ width: '100%', alignSelf: 'center', borderRadius: 10, marginVertical: 15, elevation: 5, padding: 20 }}>
                        <View style={{ position: 'absolute', padding: 5, justifyContent: 'center', left: 0, right: 0, top: 0, alignSelf: 'center' }}>
                            <Svg height="60" width={Dimensions.get('window').width}>
                                <Text
                                    fill="white"
                                    fontSize="10"
                                    fontWeight="bold"
                                    x="150"
                                    y="10"
                                    textAnchor="middle"
                                >
                                    Kota Pengguna Aplikasi
                                        </Text>
                            </Svg>
                        </View>
                        <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16, width: '100%', alignSelf: 'center' }}>
                            <YAxis
                                data={dataArray}
                                yAccessor={({ index }) => index}
                                scale={scale.scaleBand}
                                contentInset={{ top: 10, bottom: 10 }}
                                spacing={0.2}
                                formatLabel={(_, index) => dataArray[index].label}
                                svg={{ fontSize: 10, fill: 'white', fontWeight: 'bold' }}
                            />
                            <BarChart
                                style={{ flex: 1, marginLeft: 8 }}
                                data={dataArray}
                                horizontal={true}
                                yAccessor={({ item }) => item.value}
                                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                                contentInset={{ top: 10, bottom: 10 }}
                                spacing={0.2}
                                gridMin={0}
                            >
                                <Grid direction={Grid.Direction.VERTICAL} />
                                <Labels />
                            </BarChart>
                        </View>
                    </LinearGradient1>

                    <LinearGradient1 colors={['#2974FA', '#38ABFD', '#43D4FF']} style={{ height: 200, padding: 20, flexDirection: 'row', width: Dimensions.get('window').width - 30, alignSelf: 'center', borderRadius: 10, elevation: 5, marginVertical: 15, marginHorizontal: 15 }}>
                        <View style={{ position: 'absolute', padding: 5, justifyContent: 'center', left: 0, right: 0, top: 0, alignSelf: 'center' }}>
                            <Svg height="60" width={Dimensions.get('window').width}>
                                <Text
                                    fill="white"
                                    fontSize="10"
                                    fontWeight="bold"
                                    x="150"
                                    y="10"
                                    textAnchor="middle"
                                >
                                    Jumlah Transaksi Dalam Aplikasi Homie
                                </Text>
                            </Svg>
                        </View>
                        <YAxis
                            data={dataLine}
                            style={{ marginBottom: xAxisHeight }}
                            contentInset={verticalContentInset}
                            svg={axesSvg}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>

                            <AreaChart
                                style={{ flex: 1 }}
                                data={dataLine}
                                contentInset={verticalContentInset}
                                svg={{ fill: 'rgba(134, 65, 244, 0.5)' }}
                            >
                                <Grid />
                            </AreaChart>
                            <XAxis
                                style={{ marginHorizontal: -10, height: xAxisHeight, width: '100%' }}
                                data={dataLine}
                                formatLabel={(value, index) => label[index]}
                                contentInset={{ left: 15, right: 10 }}
                                svg={axesSvg}
                            />
                        </View>
                    </LinearGradient1>
                    <LinearGradient1 colors={['#2974FA', '#38ABFD', '#43D4FF']} style={{ height: 250, padding: 20, width: Dimensions.get('window').width - 30, alignSelf: 'center', borderRadius: 10, elevation: 5, marginVertical: 15, marginHorizontal: 15 }}>
                        <View style={{ position: 'absolute', padding: 5, justifyContent: 'center', left: 0, right: 0, top: 0, alignSelf: 'center' }}>
                            <Svg height="60" width={Dimensions.get('window').width}>
                                <Text
                                    fill="white"
                                    fontSize="10"
                                    fontWeight="bold"
                                    x="150"
                                    y="10"
                                    textAnchor="middle"
                                >
                                   Jumlah User Aktif :{this.state.monthActiveArray[0]} 2020
                                        </Text>
                            </Svg>
                        </View>
                        <BarChart
                            style={{ flex: 1 }}
                            data={sampleData}
                            gridMin={0}
                            svg={{ fill: 'rgba(134, 65, 244,.5)' }}
                        />
                        <XAxis
                            style={{ marginTop: -10 }}
                            data={sampleData}
                            scale={scale.scaleBand}
                            formatLabel={(value, index) => sampleData[index]}
                            labelStyle={{ color: 'black' }}
                            svg={axesSvg}
                        />
                        <XAxis
                            style={{ marginTop: 10 }}
                            data={this.state.timeActiveArray}
                            scale={scale.scaleBand}
                            formatLabel={(value, index) => this.state.timeActiveArray[index]}
                            labelStyle={{ color: 'black' }}
                            svg={axesSvg}
                        />
                    </LinearGradient1>
                </ScrollView>
            </LinearGradient1>
        )
    }
}