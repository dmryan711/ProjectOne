
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
const database = firebase.database();
const GANGS = 'Gangs';






//Firebase
// //Handle Account Status
// firebase.auth().onAuthStateChanged(user => {
//   console.log("auth changed");
//   if(user && !user.displayName){
//     //Set up UI
//     console.log("User Name in auth changed" + user.displayName);
   
//     if(window.location.href.indexOf("index.html") > -1){
//       //Set the UID to local storage
//       localStorage.setItem('UserId',user.uid);

//       window.location = 'Home-page.html'; //After successful login, user will be redirected to Home-page.html
//     }else if(window.location.href.indexOf("Home-page.html") > -1){
//       console.log("Here is the user name" +firebase.auth().currentUser.displayName)
//         populateUserUI(firebase.auth().currentUser.displayName);
//     }else if(window.location.href.indexOf("Create-Group.html") > -1){
//         populateGangUI(firebase.auth().currentUser.displayName);
//     }
//   }else{
//     if(window.location.href.indexOf("index.html")>-1){
//       console.log("do nothing");
//     }else{
//       window.location = 'index.html'; //After user is cleared , user will be redirected to index.html
//     }
    
//   }
// });
//Home-page START
var groupID;

$(document).ready(function() {

  if(window.location.href.indexOf("Create-Group.html") > -1){
    //var currentUser = firebase.auth().currentUser.uid;
    console.log(localStorage.getItem('UserId'));
  }
//Login Start
   $('#signup-button').on("click",function(e){
     e.preventDefault();
     var email = $('#email-input').val();
     var password = $('#password-input').val();
     var userName = $('#user-name-input').val();
     if(userName != ""){
       console.log("User Name going in"+ userName);
      createGangOutUser(email,userName,password);
     }else{
       console.log("Enter a user name");
     } 
   });


  $('#login-button').on("click",function(e){
    e.preventDefault();
    console.log("Login Button");
    var email = $('#email-input').val();
    var password = $('#password-input').val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Log In Errors here.
      if(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        //User does not have an account, create one for them
      }
    });
  });

  $('#logout-button').on("click",function(){
    console.log("Sign Out");
    localStorage.removeItem('UserId');
    localStorage.removeItem('gangName');


    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign Out Successful");
    }).catch(function(error) {
      // An error happened.
    });
  });
 
  $('#create-gang-modal-button').on("click",function(){
    var $modalTextElement = $('#search-bar-modal');
    if(!$.trim( $($modalTextElement).val()).length){ // Test if something is in modal Text
       //Nothing is in modal text
       console.log("Nothing is here");

    }else{
      console.log("Something is here");
      //Transition with group name

      
      
      window.location = "Create-Group.html";
      localStorage.setItem('gangName',$modalTextElement.val());
      
     
     

     
      
    }
  });

//CREATE GANG PAGE
 $("#gang-name").text(localStorage.getItem('gangName'));
 $("#gang-owner-name").text("Gang Founder "+ localStorage.getItem('userName'));

  

    $('#userGroup1').on("click", function(){
      var $userGroup = $('#userGroup1');
      groupID = $userGroup.attr('id');
      console.log(groupID);
    });
    $('#userGroup2').on("click", function(){
      var $userGroup = $('#userGroup2');
      groupID = $userGroup.attr('id');
      console.log(groupID);
    });
    $('#userGroup3').on("click", function(){
      var $userGroup = $('#userGroup3');
      groupID = $userGroup.attr('id');
      console.log(groupID);
    });
    $('#userGroup4').on("click", function(){
      var $userGroup = $('#userGroup4');
      groupID = $userGroup.attr('id');
      console.log(groupID);
    });

    var publicGroups1 = $('#publicGroups1')
    var publicGroups2 = $('#publicGroups2')
    var publicGroups3 = $('#publicGroups3')

    publicGroups1.on("click", function(){
      
    });
    publicGroups2.on("click", function(){
      
    });
    publicGroups3.on("click", function(){
      
    });

});
//Landing-page END


function createGangWithName(gangNameString){

  var gangsKey =  database.ref().child(GANGS).push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/'+GANGS+'/'+gangsKey] = {
    name: gangNameString,
    members: ["Peter","John"]
  };
}


 function createGangOutUser(email,displayName,password){
    var user = null;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      
    .then(function () {
      console.log("Adding User Name");
      user = firebase.auth().currentUser;
      console.log(user);
      console.log(displayName);
      user.updateProfile({
        displayName: displayName
      });
    })
    .catch(function(error) {
      console.log(error.message);
    });
  }

  function populateUserUI(userName){
    $('#create-gang-user-name').text(userName);
  }

  function populateGangUI(userName){
    $("#gang-owner-name").text("Gang Founder "+ userName);
  }

 // console.log(gangsKey);
// // Create a new ref and log it’s push key
// var userRef = usersRef.push();
// console.log(‘user key’, userRef.key);
// // Create a new ref and save data to it in one step
// var userRef = usersRef.push({
//  name: ‘Christopher’,
//  description: ‘I eat too much ice cream’
// });
