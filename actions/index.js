import firebase from '../fb';

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

export function postList(title){
  return(dispatch) => {
    firebase.database().ref('/data/lists').push({title})
  }
}

export function deleteList(key){
  return(dispatch) => {
    firebase.database().ref(`/data/lists/${key}`).remove();
  }
}

export function updateList(title, key){
  return(dispatch) => {
    firebase.database().ref('/data/lists').child(key).update({title});
  }
}

export function setCity(city){
  return(dispatch) => {
    dispatch({
      type:"SEARCH_SET_CITY",
      payload: city
    })
  }
}