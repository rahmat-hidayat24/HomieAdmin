import React, { Component } from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
// Import Icon

import Ionicons from 'react-native-vector-icons/Ionicons'
import TambahPromoIcon from 'react-native-vector-icons/MaterialCommunityIcons'

// Import Screen
import LoginComponent from './Login'
import HomeComponent from './Home'
import LaporanComponent from './Laporan'
import ListHunianComponent from './ListHunian'
import DetailHunianComponent from './DetailHunian'
import DetailUserComponent from './DetailUser'
import LaporanUserComponent from './LaporanUser'
import EditUserComponent from './EditUser'
import ListKritikSaranComponent from './ListKritikSaran'
import DetailKritikSaranComponent from './DetailKritikSaran'
import PromoComponent from './Promo'
import TambahPromoComponent from './AddPromo'
import SettingComponent from './Setting'
import UbahPasswordComponent from './UbahPassword'
import EditProfileComponent from './EditProfil'
import AddAdminComponent from './AddAdmin'
import ChatComponent from './Chat'
import ListChatComponent from './ListChat'


const LoginStack = createStackNavigator({
    Login: {
        screen: LoginComponent,
        navigationOptions: ({ navigation }) => ({
            headerShown: false
        })
    }
})


const HomeStack = createStackNavigator({
    Home: {
        screen: HomeComponent,
        navigationOptions: ({ navigation }) => ({
            headerShown: false
        })
    }
})

const SettingStack = createStackNavigator({
    Setting: {
        screen: SettingComponent,
        navigationOptions: ({ navigation }) => ({
            headerTitleAlign: 'center',
            title: 'Setting',
            headerStyle: {
                backgroundColor: '#24A1D7'
            },
            headerTintColor: '#fff',
            headerRight: () => (
                <View style={{  justifyContent: 'center', alignItems: 'center', borderColor: '#fff', padding: 5, marginRight: 8 }}>
                    <Ionicons name='md-person-add' size={30} color='#fff' onPress={()=>navigation.navigate('AddAdmin')}/>
                </View>
            )
        })
    },
    UbahPassword: {
        screen: UbahPasswordComponent,
        navigationOptions: ({ navigation }) => ({
            headerTitleAlign: 'center',
            title: 'Change Password',
            headerStyle: {
                backgroundColor: '#24A1D7'
            },
            headerTintColor: '#fff'
        })
    },
    EditProfile: {
        screen: EditProfileComponent
    },
    AddAdmin: {
        screen: AddAdminComponent
    },
})
const LaporanStack = createStackNavigator({
    Laporan: {
        screen: LaporanComponent,
        navigationOptions: ({ navigation }) => ({
            headerTitleAlign: 'center',
            title: 'Laporan',
            headerStyle: {
                backgroundColor: '#24A1D7'
            },
            headerTintColor: '#fff'
        })
    },
    DetailUser: {
        screen: DetailUserComponent,
        navigationOptions: ({ navigation }) => ({
            title: 'Detail Pengguna',
            headerStyle: {
                backgroundColor: '#24A1D7'
            },
            headerTintColor: '#fff'
        })
    },
    LaporanUser: {
        screen: LaporanUserComponent,
        navigationOptions: ({ navigation }) => ({
            title: 'List Pengguna',
            headerStyle: {
                backgroundColor: '#24A1D7',
                elevation: 0
            },
            headerTintColor: '#fff'
        })
    },
    EditUser: {
        screen: EditUserComponent,
        navigationOptions: ({ navigation }) => ({
            title: 'Edit User',
            headerStyle: {
                backgroundColor: '#24A1D7',
                elevation: 0
            },
            headerTintColor: '#fff'
        })
    },
    ListKritikSaran: {
        screen: ListKritikSaranComponent,
        navigationOptions: ({ navigation }) => ({
            title: 'List Kritik Dan Saran',
            headerStyle: {
                backgroundColor: '#24A1D7'
            },
            headerTintColor: '#fff'
        })
    },

    DetailKritikSaran: {
        screen: DetailKritikSaranComponent,
        navigationOptions: ({ navigation }) => ({
            title: 'Detail Kritik Saran',
            headerStyle: {
                backgroundColor: '#24A1D7'
            },
            headerTintColor: '#fff'
        })
    },
    ListHunian: {
        screen: ListHunianComponent,
        navigationOptions: ({ navigation }) => ({
            title: 'List Hunian',
            headerStyle: {
                backgroundColor: '#24A1D7',
                elevation: 0
            },
            headerTintColor: '#fff'
        })
    },
    DetailHunian: {
        screen: DetailHunianComponent,
        navigationOptions: ({ navigation }) => ({
            title: 'Detail Hunian',
            headerStyle: {
                backgroundColor: '#24A1D7',
                elevation: 0
            },
            headerTintColor: '#fff'
        })
    }
})


const ChatStack = createStackNavigator({
    ListChat: {
        screen: ListChatComponent,
        navigationOptions: ({ navigation }) => ({
            headerTitleAlign: 'center',
            title: 'Chat',
            headerStyle: {
                backgroundColor: '#24A1D7'
            },
            headerTintColor: '#fff'
        })
    },
    Chat: {
        screen: ChatComponent,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.user,
            headerStyle: {
                backgroundColor: '#24A1D7',
                elevation: 0
            },
            headerTintColor: '#fff'
        })
    },
})

const PromoStack = createStackNavigator({
    Promo: {
        screen: PromoComponent,
        navigationOptions: ({ navigation }) => ({
            headerTitleAlign: 'center',
            title: 'Promo',
            headerStyle: {
                backgroundColor: '#24A1D7'
            },
            headerTintColor: '#fff',
            headerRight: () => (
                <View style={{ borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderColor: '#fff', padding: 5, marginRight: 8 }}>
                    <TambahPromoIcon name='tag-plus' size={20} color='#fff' onPress={() => navigation.navigate('TambahPromo', { screen: 'Tambah Promo' })} />
                </View>
            )
        })
    },
    TambahPromo: {
        screen: TambahPromoComponent,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.screen,
            headerStyle: {
                backgroundColor: '#24A1D7',
                elevation: 0
            },
            headerTintColor: '#fff'
        })
    }
})




const AppNavigator = createBottomTabNavigator({
    MenuRoute: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name='md-home' size={28} color={tintColor} />
            ),
            tabBarOptions: {
                activeTintColor: '#24A1D7'
              }
        }
        
    },
    ChatRoute: {
        screen: ChatStack,
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name='ios-chatbubbles' size={28} color={tintColor} />
            ),
            tabBarOptions: {
                activeTintColor: '#24A1D7'
              }
        },
    },
    LaporanRoute: {
        screen: LaporanStack,
        navigationOptions: {
            tabBarLabel: 'Laporan',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name='ios-paper' size={28} color={tintColor} />
            ),
            tabBarOptions: {
                activeTintColor: '#24A1D7'
              }
        }
    },
    PromoRoute: {
        screen: PromoStack,
        navigationOptions: {
            tabBarLabel: 'Promo',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name='md-pricetags' size={28} color={tintColor} />
            ),
            tabBarOptions: {
                activeTintColor: '#24A1D7'
              }
        }
    },
    SettingRoute: {
        screen: SettingStack,
        navigationOptions: {
            tabBarLabel: 'Setting',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name='ios-settings' size={28} color={tintColor} />
            ),
            tabBarOptions: {
                activeTintColor: '#24A1D7'
              }
        }
    }
})



LaporanStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
    };
};


PromoStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
    };
};


ChatStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
    };
};

SettingStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
    };
};

export default createAppContainer(createSwitchNavigator(
    {
        App: LoginStack,
        Auth: AppNavigator
    }, {
    initialRouteName: 'App'
}
))
