

export default function(state = {}, action){
  switch(action.type){
    case "LISTS_LOADING_STATUS":
      return {
        ...state,
        loadingReducer: action.payload
      }
    case "LOCATIONS_LOADING_STATUS":
      return {
        ...state,
        loadingReducer: action.payload
      }
      default:
        return state
  }
}