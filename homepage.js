
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDrBXxGe_WLXw-VucpOf6z9aWRpNZWoPAg",
    authDomain: "projectone-74ba1.firebaseapp.com",
    databaseURL: "https://projectone-74ba1.firebaseio.com",
    projectId: "projectone-74ba1",
    storageBucket: "projectone-74ba1.appspot.com",
    messagingSenderId: "143505066275"
  };
  firebase.initializeApp(config);
  const GANG_BY_USERS = "Gangs_By_Users";

  firebase.auth().onAuthStateChanged(function(user) {
    loadGangsForUser(user.uid);
  });

  function loadGangsForUser(){
    var userId = firebase.auth().currentUser.uid;
   
    return firebase.database().ref( '/'+GANG_BY_USERS+'/'+ userId ).once('value').then(function(snapshot) {
    var usersGangs = snapshot.val();
    for (key in usersGangs) {
        if (!usersGangs.hasOwnProperty(key)) continue;
        console.log(key);
        console.log(usersGangs[key].description);
      }
});
}




$(document).ready(function() {
    populateHomePageUI(localStorage.getItem('userName'));
    

$('#create-gang-modal-button').on("click",function(){
    var $modalTextElement = $('#search-bar-modal');
    if(!$.trim( $($modalTextElement).val()).length){ // Test if something is in modal Text
       //Nothing is in modal text
       console.log("Nothing is here");

    }else{
      console.log("Something is here");
      //Transition with group name
      localStorage.setItem('gangName',$modalTextElement.val());  
      window.location = "Create-Group.html";
      
    }
  });

function populateHomePageUI(userName){
    $('#create-gang-user-name').text(userName);
  }
 


$('#logout-button').on("click",function(){
    console.log("Sign Out");
    localStorage.removeItem('userName');
    localStorage.removeItem('gangName');


    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign Out Successful");
      window.location = 'index.html';
    }).catch(function(error) {
      // An error happened.
    });
  });
  
})