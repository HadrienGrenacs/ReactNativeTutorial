import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import Login from '../Components/Login'
import Index from "../Components/Index";

const LoginStackNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login'
        }
    },
    Index: {
        screen: Index,
        navigationOptions: {
            header: null
        }
    }
});

export default createAppContainer(LoginStackNavigator)
