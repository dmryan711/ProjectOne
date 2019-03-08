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

  $(document).ready(function() {
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
      
      //Add user name to local storage
      localStorage.setItem('userName',displayName);

      //Move to next screen
      window.location = "Home-page.html";
    })
    .catch(function(error) {
      console.log(error.message);
    });
  }

  })

