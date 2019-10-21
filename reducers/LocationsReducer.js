

export default function (state = {}, action){
  switch(action.type){
    case "LOCATIONS_FETCH":
      return {
        ...state,
        locationsList: action.payload
      }
    default:
      return state
  }
}