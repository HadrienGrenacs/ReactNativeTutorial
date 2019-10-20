import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import ImageList from './ImageList'
import { getGalleryFromApi } from '../API/ImgurApi'
import RNPickerSelect from 'react-native-picker-select'

class Home extends React.Component {

    constructor(props) {
        _isMounted = false;
        super(props)
        this.state = {
            images: [],
            isLoading: false
        }
        this._loadImages = this._loadImages.bind(this)
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this._loadImages('hot')
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _loadImages(section) {
        this.setState({ isLoading: true })
        getGalleryFromApi(section).then(data => {
            if (this.state.isLoading) {
                this.setState({
                    images: data.data,
                    isLoading: false
                })
            }
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
                <View style={styles.input}>
                    <RNPickerSelect
                        placeholder={{}}
                        onValueChange={(value) => this._loadImages(value)}
                        items={[
                            { label: 'Hot', value: 'hot' },
                            { label: 'Top', value: 'top' },
                            { label: 'Score', value: 'user' },
                        ]}
                    />
                </View>
                <ImageList
                    images={this.state.images}
                    loadImages={this._loadImages}
                    navigation={this.props.navigation}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "#E6E6E6",
    },
    input: {
        fontSize: 16,
//        backgroundColor: 'black',
        color: 'black',
        width: 150,
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    }, loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Home