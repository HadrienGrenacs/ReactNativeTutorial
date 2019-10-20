import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/ImgurApi'
import Video from 'react-native-video'

class ImageDetail extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            image: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({ isLoading: true })
        getImageFromApi(this.props.navigation.state.params.coverImage).then(data => {
            if (this._isMounted) {
                this.setState({
                    image: data.data,
                    isLoading: false
                })
            }
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

    _displayImageType(image) {
//        console.log(image.type)
  //      console.log(image.link)
        if (image.type == "video/mp4") {
            return (
                <Video
                    style={styles.video}
                    source={{ uri: image.link }}
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
                <Image
                    style={styles.image}
                    source={{ uri: image.link }}
                />
            )
        } 
    }

    _displayImage() {
        const { image } = this.state
        if (image != undefined) {
            return (
                <View style={styles.scrollview_container}>
                    {this._displayImageType(image)}
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayImage()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center'
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
    scrollview_container: {
        flex: 1
    },
    image: {
        resizeMode: 'cover',
        width: null,
        height: 500,
        resizeMode: 'contain'
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center',
    },
    favorite_image: {
        width: 40,
        height: 40
    }
})

export default ImageDetail