const initialState = {
     accessToken: undefined,
     userName: undefined
}

function setAccountInfos(state = initialState, action) {
     let nextState
     switch (action.type) {
          case 'SET_ACCESS_TOKEN':
               nextState = {
                    ...state,
                    accessToken: action.value
               }
               return nextState || state
          case 'SET_USER_NAME':
               nextState = {
                    ...state,
                    userName: action.value
               }
               return nextState || state
          default:
               return state
     }
}

export default setAccountInfos