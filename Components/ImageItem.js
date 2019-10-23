import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { getImageFromApi } from '../API/ImgurApi'

class ImageItem extends React.Component {
    render() {
        const { image, displayDetailForImage } = this.props;
        if (image.cover != undefined) {
            return (
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={() => displayDetailForImage(image.cover)}>
                    <View style={styles.card_header}>
                        <Text style={styles.title}>
                            {image.title}
                        </Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://i.imgur.com/' + image.cover + 'm.jpg' }}
                    />
                    <View style={styles.card_footer}>
                    </View>
                </TouchableOpacity>
            )
        }
        return (null)
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 20
    },
    card_header: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        aspectRatio: 1,
        flex: 1,
        resizeMode: 'contain',
    }
})

export default ImageItem