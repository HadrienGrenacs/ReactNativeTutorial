import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import { getImageFromApi, getFavoritesImagesFromApi, setFavoriteImage } from '../API/ImgurApi'
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

class ImageDetail extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            image: undefined,
            isLoading: true
        }
    }

    _toggleFavorite() {
        setFavoriteImage(this.props.accessToken, this.state.image.id)
        this.setState({
            isLoading: false
        },
            () => {
                this._loadImages();
            }
        )
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({ isLoading: true })
        if (this._isMounted) {
            this._loadImages()
        }
    }

    _loadImages() {
        getImageFromApi(this.props.navigation.state.params.coverImage).then(data => {
            this.setState({
                image: data.data,
                isLoading: false
            })
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
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

    _displayImage() {
        if (this.state.image.type == "video/mp4") {
            return (
                <Video
                    style={styles.video}
                    source={{ uri: this.state.image.link }}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    onBuffer={this.onBuffer}
                    onError={this.videoError}
                    paused={false}
                    repeat={true}
                    resizeMode='cover'
                />
            )
        }
        else {
            return (
                <ReactNativeZoomableView
                    maxZoom={1.5}
                    minZoom={1}
                    zoomStep={0.5}
                    initialZoom={1}
                    bindToBorders={true}
                    onZoomAfter={this.logOutZoomState}>
                    <Image
                        style={styles.image}
                        source={{ uri: this.state.image.link }}
                    />
                </ReactNativeZoomableView>
            )
        }
    }

    _displayView() {
        const { image } = this.state
        if (image != undefined) {
            return (
                <ScrollView style={styles.main_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.views}>views : {image.views}</Text>
                        <Icon style={styles.icon} name="md-heart" color={image.favorite ? 'white' : 'black'} size={40} onPress={() => this._toggleFavorite()} />
                    </View>
                    {this._displayImage()}
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayView()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'black'
    },
    header_container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgb(55, 57, 63)'
    },
    views: {
        //        paddingLeft : 10,
        color: 'white'
    },
    icon: {
        paddingLeft: 200
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    favorite_container: {
        borderColor: 'white'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: null,
        height: 500,
        resizeMode: 'contain',
        backgroundColor: 'black'
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
    },
})

const mapStateToProps = state => {
    return {
        accessToken: state.accessToken
    }
}

export default connect(mapStateToProps)(ImageDetail)