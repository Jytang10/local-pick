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

export function postList(title, description, city){
  return(dispatch) => {
    firebase.database().ref('/data/lists').push({title, description, city})
  }
}

export function deleteList(key){
  return(dispatch) => {
    firebase.database().ref(`/data/lists/${key}`).remove();
  }
}

export function updateList(title, description, key){
  return(dispatch) => {
    firebase.database().ref('/data/lists').child(key).update({ title, description });
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

export function postLocation(name, website, address, lat, lng, photo_url, contact, pickID){
  return(dispatch) => {
    firebase.database().ref('/data/locations').push({name, website, address, lat, lng, photo_url, contact, pickID});
  }
}

export function deleteLocation(key){
  return(dispatch) => {
    firebase.database().ref(`/data/locations/${key}`).remove();
  }
}

export function updateLocation(name, key){
  return(dispatch) => {
    firebase.database().ref('/data/locations').child(key).update({name});
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

export function postNote(content, userName, locationID){
  return(dispatch) => {
    firebase.database().ref('/data/notes').push({content, userName, locationID});
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

export function setLoginTrue(){
  return(dispatch) => {
    dispatch({
      type: "LOGIN_STATUS",
      payload: true
    })
  }
}

export function setLoginFalse(){
  return(dispatch) => {
    dispatch({
      type: "LOGIN_STATUS",
      payload: false
    })
  }
}

export function setUser(userData){
  return(dispatch) => {
    dispatch({
      type: "SET_USER",
      payload: userData
    })
  }
}

