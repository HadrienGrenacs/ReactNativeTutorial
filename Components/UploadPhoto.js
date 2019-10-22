import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import { uploadPhoto } from '../API/ImgurApi'
import { connect } from 'react-redux'

class UploadPhoto extends React.Component {
    constructor(props) {
        super(props)
        this.title = ""
        this.description = ""
        this.state = {
            titleDisabled: true
        }
    }

    _descriptionChanged(text) {
        this.description = text
    }

    _checkTitle(text) {
        this.title = text
        if (this.title.length > 0) {
            this.setState({
                titleDisabled: false
            })
        } else {
            this.setState({
                titleDisabled: true
            })
        }
    }

    _sendPhoto(imageData) {
        uploadPhoto(this.props.accessToken, imageData, this.title, this.description)
        this.props.navigation.navigate("Upload")
    }

    render() {
        const imageSource = this.props.navigation.state.params.imageSource
        const imageData = this.props.navigation.state.params.imageData
        return (
            <View style={styles.main_container}>
                <View style={styles.header_container}>
                    <Icon style={styles.icon} name="md-close" color="white" size={40} onPress={() => this.props.navigation.navigate("Upload")}/>
                    <Icon style={styles.icon2} name="md-send" disabled={this.state.titleDisabled} color={this.state.titleDisabled ? 'black' : 'white'} size={40} onPress={() => this._sendPhoto(imageData)}/>
                </View>
                <TextInput style={styles.textinput}
                    placeholder='Titre (requis)...'
                    onChangeText={(text) => this._checkTitle(text)}
                    placeholderTextColor={'grey'}
                />
                <Image
                    style={styles.image}
                    source={{ uri: imageSource }}
                />
                <TextInput style={styles.textinput2}
                    placeholder='Description...'
                    onChangeText={(text) => this._descriptionChanged(text)}
                    placeholderTextColor={'grey'}
                    multiline={true}
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
    header_container: {
        flexDirection: 'row',
        backgroundColor: 'rgb(55, 57, 63)',
        height: 50
    },
    icon: {
        marginLeft: 10
    },
    icon2: {
        marginLeft: Dimensions.get('window').width - 80
    },
    button_send: {
        flex: 1
    },
    textinput: {
        //        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: 'rgb(55, 57, 63)',
        borderWidth: 1,
        borderColor: '#000',
        height: 50,
        margin: 10,
        fontSize: 18
    },
    textinput2: {
        //        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: 'rgb(55, 57, 63)',
        borderWidth: 1,
        borderColor: '#000',
        height: 100,
        margin: 10,
        fontSize: 18
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        resizeMode: 'contain',
    },
    title: {
        color: 'white',
        fontSize: 30,
    }
})

const mapStateToProps = state => {
    return {
        accessToken: state.accessToken
    }
}

export default connect(mapStateToProps)(UploadPhoto)