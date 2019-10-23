import React from 'react'
import { StyleSheet } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux'

const CLIENT_ID = '80d39b58ac93dda';

class Login extends React.Component {
    accessToken;
    expiresIn;
    refreshToken;
    userName;

    constructor(props) {
        super(props);
    }

    _resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Index' })],
    });

    _changeNavigationState = async (webView) => {
        if (this._splitUrl(webView.url) === true) {
            this.props.dispatch({type: "SET_ACCESS_TOKEN", value: this.accessToken})
            this.props.dispatch({type: "SET_USER_NAME", value: this.userName})
            this.props.navigation.dispatch(this._resetAction);
        }
    };

    _splitUrl(url) {
        if (url.search("access_token=") > 0) {
            let array = url.split("=");
            this.accessToken = array[2].split('&')[0];
            this.expiresIn = array[3].split('&')[0];
            this.refreshToken = array[5].split('&')[0];
            this.userName = array[6].split('&')[0];
            console.log(this.accessToken)
            return (true);
        }
        return (false);
    }

    webviewProps = {
        style: styles.webview_container,
        ref: 'webviewRef',
        javaScriptEnabled: true,
        onNavigationStateChange: this._changeNavigationState.bind(this),
        source: {
            uri: 'https://api.imgur.com/oauth2/authorize?client_id=' + CLIENT_ID + '&response_type=token&state=APPLICATION_STATE',
        }
    };

    render() {
        return (
            <WebView  {...this.webviewProps} />
        )

    }
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: 'black'
    },
    webview_container: {
        flex: 1
    }
});

const mapStateToProps = state => {
    return {
        accessToken: state.accessToken,
        userName: state.userName
    }
}

export default connect(mapStateToProps)(Login)