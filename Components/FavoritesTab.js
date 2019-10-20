import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

class FavoritesTab extends React.Component {
    render() {
        return (
            <ScrollView>
                <Text>second tab</Text>
            </ScrollView>
        )
    }
}

export default FavoritesTab