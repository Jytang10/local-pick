import firebase from '../fb';

export function getSearchCity(){
  return(dispatch) => {
    dispatch({
      type:"SEARCH_FETCH",
      payload:"success"
    })
  //  dispatch({
  //    type:"SEARCH_LOADING_STATUS",
  //    payload: true
  //  })
  }
}

export function getLists(){
  return(dispatch) => {
    dispatch({
      type:"LISTS_LOADING_STATUS",
      payload: true
    })

    firebase.database().ref('/data/lists').on('value', snapshot => {
      dispatch({
        type: "LISTS_FETCH",
        payload: snapshot.val()
      })

      dispatch({
        type: "LISTS_LOADING_STATUS",
        payload: false
      })
    })
  }
}