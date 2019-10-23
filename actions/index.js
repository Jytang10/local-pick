import firebase from '../fb';

export function setCity(city){
  return(dispatch) => {
    dispatch({
      type:"SEARCH_SET_CITY",
      payload: city
    })
  }
}

export function getLists(city){
  return(dispatch) => {
    dispatch({
      type:"LISTS_LOADING_STATUS",
      payload: true
    })
    firebase.database().ref('/data/lists').orderByChild('city').equalTo(city).on('value', snapshot => {
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

export function postList(title, city){
  return(dispatch) => {
    firebase.database().ref('/data/lists').push({title, city})
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

export function getLocations(pickID){
  return(dispatch) => {
    dispatch({
      type: "LOCATIONS_LOADING_STATUS",
      payload: true
    })

    firebase.database().ref('/data/locations').orderByChild('pickID').equalTo(pickID).on('value', snapshot => {
      dispatch({
        type: "LOCATIONS_FETCH",
        payload: snapshot.val()
      })

      dispatch({
        type: "LOCATIONS_LOADING_STATUS",
        payload: false
      })
    })
  }
}

export function postLocation(locationTitle, city, pickID){
  return(dispatch) => {
    firebase.database().ref('/data/locations').push({locationTitle, city, pickID});
  }
}

export function deleteLocation(key){
  return(dispatch) => {
    firebase.database().ref(`/data/locations/${key}`).remove();
  }
}

export function updateLocation(locationTitle, key){
  return(dispatch) => {
    firebase.database().ref('/data/locations').child(key).update({locationTitle});
  }
}