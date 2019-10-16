

export default function (state = {},){
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