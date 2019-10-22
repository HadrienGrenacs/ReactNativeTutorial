import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity, Dimensions } from 'react-native'
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

    _displayImage() {
        const { image } = this.state
        if (image != undefined) {
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
    }

    render() {
        return (
            <ScrollView style={styles.main_container}>
                {this._displayImage()}
                {this._displayLoading()}
            </ScrollView>
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
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: null,
        height: 500,
        resizeMode: 'contain'
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
    },
})

export default ImageDetail