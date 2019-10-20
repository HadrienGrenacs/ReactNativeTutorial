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
        marginHorizontal: 10,
        flex: 1,
        marginTop: 20,
        backgroundColor: "white"
    },
    card_header: {
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        //        alignItems: 'center',
        alignContent: 'center'
    },
    title: {
        fontSize: 18,
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    image: {
        flex: 1,
        width: 340,
//        width: null,
        height: 350,
        resizeMode: 'contain',
    }
})

export default ImageItem