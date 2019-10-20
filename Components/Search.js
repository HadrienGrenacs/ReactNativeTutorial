// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ImageList from './ImageList'
import { getGalleryFromApiWithText } from '../API/ImgurApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = ""
        this.state = {
            images: [],
            isLoading: false
        }
        this._loadImages = this._loadImages.bind(this)
    }

    _loadImages() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getGalleryFromApiWithText(this.searchedText).then(data => {
                if (this.state.isLoading) {
                    this.setState({
                        images: data.data,
                        isLoading: false
                    })
                }
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchImages() {
        this.setState({
            images: [],
        }, () => {
            this._loadImages()
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.textinput}>
                    <TextInput style={styles.input}
                        placeholder='Image ou #tag'
                        onChangeText={(text) => this._searchTextInputChanged(text)}
                        onSubmitEditing={() => this._searchImages()}
                    />
                    <Icon style={styles.icon} name='md-search' color="#000" size={28} onPress={() => this._searchImages()} />
                </View>
                <ImageList
                    images={this.state.images}
                    loadImages={this._loadImages}
                //                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    textinput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        height: 45,
        margin: 10,
    },
    input:{
        flex: 1,
        marginLeft: 5,
    },
    icon: {
        marginRight: 15
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search