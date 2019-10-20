import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { getImageFromApi } from '../API/ImgurApi'

class ImageItem extends React.Component {
/*
    constructor(props) {
        super(props)
        this.state = {
            cover: undefined
        }
    }

    _loadCover(cover) {
        getImageFromApi(cover).then(data => {
            console.log(data.data.link)
            this.setState({
                cover: data.data
            })
        })
    }
*/
    render() {
        const image = this.props.image;

        return (
            <View style={styles.main_container}>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        marginHorizontal: 10,
        //        paddingHorizontal: 10,
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: "white"
    },
    card_header: {
        paddingVertical: 15,
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
        //        marginHorizontal: 10,
        //        paddingHorizontal: 17,
        flex: 1,
        width: 340,
        height: 340
        //        margin: 5
    }
})

export default ImageItem