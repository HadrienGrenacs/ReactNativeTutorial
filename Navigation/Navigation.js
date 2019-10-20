import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import Search from '../Components/Search'
import Home from '../Components/Home'
import Upload from '../Components/Upload'
import Profile from '../Components/Profile'
import ImageDetail from '../Components/ImageDetail'

const HomeStackNavigator = createStackNavigator({
    Search: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    ImageDetail: {
        screen: ImageDetail
    }
})

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            header: null
        }
    },
    ImageDetail: {
        screen: ImageDetail
    }
})

const AppTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_home.png')}
                        style={styles.icon} />
                }
            }
        },
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_search.png')}
                        style={styles.icon} />
                }
            }
        },
        Upload: {
            screen: Upload,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_photo.png')}
                        style={styles.icon} />
                }
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_profile.png')}
                        style={styles.icon} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(AppTabNavigator)