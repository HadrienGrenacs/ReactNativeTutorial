import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ImageItem from './ImageItem'

class ImageList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }

    _displayDetailForImage = (coverImage) => {
        this.props.navigation.navigate('ImageDetail', { coverImage: coverImage })
    }

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                data={this.props.images}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ImageItem
                        image={item}
                        displayDetailForImage={this._displayDetailForImage}
                    />
                )}
            />
        )
    }
}

export default ImageList