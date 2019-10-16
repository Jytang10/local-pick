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