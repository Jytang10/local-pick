

export default function (state = {}, action){
  switch(action.type){
    case "SEARCH_SET_CITY":
      return {
        ...state,
        city: action.payload
      }
    default:
      return state
  }
}