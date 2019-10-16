

export default function (state = {}, action){
  switch(action.type){
    case "SEARCH_FETCH":
      return {
        ...state,
        searchList: action.payload
      }
    default:
      return state
  }
}