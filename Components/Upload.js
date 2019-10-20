import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { uploadPhoto } from '../API/ImgurApi'

class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageSource: undefined
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
                let requireSource = { uri: response.uri }
                this.setState({
                    imageSource: requireSource
                })
                uploadPhoto(response.data)
            }
        })
    }

    render() {
        return (
            <View>
                <Button
                    title="Prendre une photo"
                    onPress={this._pickPhoto}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    }
})

export default Upload