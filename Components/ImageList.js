import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
//import { connect } from 'react-redux'
import ImageItem from './ImageItem'

class ImageList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }

//    _displayDetailForImage = (idImage) => {
        //        console.log("Display film " + idFilm)
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
//        this.props.navigation.navigate('ImageDetail', { idImage: idImage })
  //  }

    render() {
        return (
            <FlatList
                style={{flex: 1}}
                data={this.props.images}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ImageItem
                        image={item}
//                        displayDetailForImage={this._displayDetailForImage}
                    />
                )}
            />
        )
    }
}

export default ImageList