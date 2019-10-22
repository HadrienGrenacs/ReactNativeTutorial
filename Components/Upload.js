import React from 'react'
import { View, Text, StyleSheet, Button, Image, Dimensions, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import { uploadPhoto } from '../API/ImgurApi'

class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageSource: undefined,
            data: undefined
        }
        this._pickPhoto = this._pickPhoto.bind(this)
    }

    _pickPhoto() {
        ImagePicker.showImagePicker({}, (response) => {
            if (response.didCancel) {
                console.log('L\'utilisateur a annulé')
            }
            else if (response.error) {
                console.log('Erreur : ', response.error)
            }
            else {
                console.log('Photo : ', response.uri)
                //                let requireSource = { uri: response.uri }
                this.setState({
                    imageSource: response.uri,
                    imageData: response.data
                })
                this.props.navigation.navigate("UploadPhoto", { imageSource: this.state.imageSource, imageData: this.state.imageData });
            }
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.title}>Nouveau post</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._pickPhoto}>
                    <Icon name='md-add' color="white" size={80} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 150,
        width: 150,  //The Width must be the same as the height
        borderRadius: 300, //Then Make the Border Radius twice the size of width or Height   
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 2,
        resizeMode: 'contain'
    },
    title: {
        color: 'white',
        fontSize: 30,
    }
})

export default Upload