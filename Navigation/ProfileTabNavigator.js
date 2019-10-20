import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import ImagesTab from '../Components/ImagesTab'
import FavoritesTab from '../Components/FavoritesTab'

const ProfileTabNavigator = createMaterialTopTabNavigator(
    {
        ImagesTab: {
            screen: ImagesTab,
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