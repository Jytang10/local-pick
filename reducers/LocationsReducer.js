

export default function (state = {},){
  switch(action.type){
    case "LOCATION_FETCH":
      return {
        ...state,
        locationsList: action.payload
      }
    default:
      return state
  }
}