

export default function (state = {}, action){
  switch(action.type){
    case "SET_USER":
      return {
        ...state,
        userData: action.payload
      }
    default:
      return state
  }
}