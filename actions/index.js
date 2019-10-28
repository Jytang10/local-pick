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

export function postLocation(name, place_id, address, photo_ref, contact, pickID){
  return(dispatch) => {
    firebase.database().ref('/data/locations').push({name, place_id, address, photo_ref, contact, pickID});
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

export function getNotes(locationID){
  return(dispatch) => {
    dispatch({
      type: "NOTES_LOADING_STATUS",
      payload: true
    })

    firebase.database().ref('/data/notes').orderByChild('locationID').equalTo(locationID).on('value', snapshot => {
      dispatch({
        type: "NOTES_FETCH",
        payload: snapshot.val()
      })

      dispatch({
        type: "NOTES_LOADING_STATUS",
        payload: false
      })
    })
  }
}

export function postNote(content, locationID){
  return(dispatch) => {
    firebase.database().ref('/data/notes').push({content, locationID});
  }
}

export function deleteNote(key){
  return(dispatch) => {
    firebase.database().ref(`/data/notes/${key}`).remove();
  }
}

export function updateNote(content, key){
  return(dispatch) => {
    firebase.database().ref('/data/notes').child(key).update({content});
  }
}