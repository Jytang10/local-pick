

export default function(state = {}, action){
  switch(action.type){
    case "LOGIN_STATUS":
      return {
        ...state,
        loginStatus: action.payload
      }
      default:
        return state
  }
}