import React from 'react'
import { View, Text, ScrollView, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { getAccountImagesFromApi } from '../API/ImgurApi'
import { tsThisType } from '@babel/types';

class ImagesTab extends React.Component {
    constructor(props) {
        _isMounted = false;
        super(props)
        this.state = {
            images: [],
            isLoading: false,
            refreshing: false
        }
        //        this._loadImages = this._loadImages.bind(this)
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this._loadImages()
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _loadImages() {
        this.setState({ isLoading: true })
        getAccountImagesFromApi().then(data => {
            if (this.state.isLoading) {
                //                console.log(data.data)
                this.setState({
                    images: data.data,
                    isLoading: false,
                    refreshing: false
                })
            }
        })
    }

    _handleRefresh = () => {
        this.setState({
            refreshing: true
        },
            () => {
                this._loadImages();
            }
        )
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

    renderItem(item) {
        return (
            <Image
                style={styles.image}
                source={{ uri: 'https://i.imgur.com/' + item.id + 'm.jpg' }}
            />
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    numColumns={2}
                    style={styles.main_container}
                    data={this.state.images}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => this.renderItem(item)}
                    onRefresh={this._handleRefresh}
                    refreshing={this.state.refreshing}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flex: 0.5,
        width: 100,
        height: 100,
        margin: 5
    }
})

export default ImagesTab