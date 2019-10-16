

export default function (state = {},){
  switch(action.type){
    case "NOTES_FETCH":
      return {
        ...state,
        notesList: action.payload
      }
    default:
      return state
  }
}