import React from 'react';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import LoginNavigator from './Navigation/LoginNavigator';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <LoginNavigator />
            </Provider>
        )
    }
}