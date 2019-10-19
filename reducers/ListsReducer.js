

export default function (state = {}, action){
  switch(action.type){
    case "LISTS_FETCH":
      return {
        ...state,
        listsList: action.payload
      }
    default:
      return state
  }
}