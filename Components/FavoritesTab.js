import React from 'react'
import { View, Text, ScrollView, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions, Image } from 'react-native'
import { getFavoritesImagesFromApi } from '../API/ImgurApi'
import { connect } from 'react-redux'

class FavoritesTab extends React.Component {
    constructor(props) {
        _isMounted = false;
        super(props)
        this.state = {
            images: [],
            refreshing: false
        }
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
        console.log(this.accessToken)
        getFavoritesImagesFromApi(this.props.accessToken, this.props.userName).then(data => {
            console.log(data.data)
            this.setState({
                images: data.data,
                refreshing: false
            })
        })
    }

    _displayDetailForImage = (coverImage) => {
        this.props.navigation.navigate('ImageDetail', { coverImage: coverImage })
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

    renderItem(item) {
        return (
            <TouchableOpacity
                onPress={() => this._displayDetailForImage(item.cover)}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://i.imgur.com/' + item.cover + 'm.jpg' }}
                />
            </TouchableOpacity>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'black'
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
        resizeMode: 'cover',
        flex: 0.5,
        width: (Dimensions.get('window').width / 2) - 10,
        height: 200,
        margin: 5
    }
})

const mapStateToProps = state => {
    return {
        accessToken: state.accessToken,
        userName: state.userName
    }
}

export default connect(mapStateToProps)(FavoritesTab)