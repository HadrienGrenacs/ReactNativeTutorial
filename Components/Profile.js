import React from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import Navigation from '../Navigation/ProfileTabNavigator'
import UserAvatar from 'react-native-user-avatar'
import { getProfileFromApi } from '../API/ImgurApi'
import { connect } from 'react-redux'

class Profile extends React.Component {

    constructor(props) {
        _isMounted = false;
        super(props)
        this.state = {
            profil: {},
            isLoading: false
        }
        this._loadProfile = this._loadProfile.bind(this)
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this._loadProfile()
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _loadProfile() {
        this.setState({ isLoading: true })
        getProfileFromApi(this.props.userName).then(data => {
//            console.log(data.data.url)
            if (this.state.isLoading) {
                this.setState({
                    profil: data.data,
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
                <ImageBackground source={require('../Images/background.jpg')} style={styles.static_header}>
                    <UserAvatar size="70" name="GG" />
                    <Text style={styles.username}>
                        {this.state.profil.url}
                    </Text>
                    <Text style={styles.profile_datas}>
                        {this.state.profil.reputation_name} - {this.state.profil.reputation} points
                    </Text>
                </ImageBackground>
                <Navigation />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    static_header: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    username: {
        paddingVertical: 5,
        color: 'white',
        fontSize: 18
    },
    profile_datas: {
        color: 'white'
    }
})

const mapStateToProps = state => {
    return {
        userName: state.userName
    }
}

export default connect(mapStateToProps)(Profile)