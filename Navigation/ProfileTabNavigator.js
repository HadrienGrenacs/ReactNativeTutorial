import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import ImagesTab from '../Components/ImagesTab'
import ImageDetail from '../Components/ImageDetail'
import FavoritesTab from '../Components/FavoritesTab'

const ImagesTabStackNavigator = createStackNavigator({
    Search: {
        screen: ImagesTab,
        navigationOptions: {
            header: null
        }
    },
    ImageDetail: {
        screen: ImageDetail
    }
})

const ProfileTabNavigator = createMaterialTopTabNavigator(
    {
        ImagesTab: {
            screen: ImagesTabStackNavigator,
            navigationOptions: {
                title: 'Posts'
            }
        },
        FavoritesTab: {
            screen: FavoritesTab,
            navigationOptions: {
                title: 'Favorites'
            }
        }
    },
    {
        tabBarPosition: 'top',
        tabBarOptions: {
            style: {
                backgroundColor: 'grey'
            },
            indicatorStyle: {
                backgroundColor: 'white'
            },
            activeTintColor: 'white', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveTintColor: 'black', // Couleur d'arrière-plan des onglets non sélectionnés
        }
    }
)

export default createAppContainer(ProfileTabNavigator)