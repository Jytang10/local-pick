

export default function (state = {}, action){
  switch(action.type){
    case "CATEGORIES_FETCH":
      return {
        ...state,
        categoriesList: action.payload
      }
    default:
      return state
  }
}