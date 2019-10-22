import { createStore } from 'redux';
import setAccountInfos from './Reducers/accessTokenReducer'

export default createStore(setAccountInfos)