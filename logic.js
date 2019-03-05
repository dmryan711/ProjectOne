
console.log(document.URL);
//Firebase
//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
  if(user){
    if(window.location.href.indexOf("index.html") > -1) {
      window.location = 'Home-page.html'; //After successful login, user will be redirected to Home-page.html
   }
  }else{
    if(window.location.href.indexOf("index.html")>-1){
      console.log("do nothing");
    }else{
      window.location = 'index.html'; //After user is cleared , user will be redirected to index.html
    }
    
  }
});
//Home-page START
var groupID;

$(document).ready(function() {
  //Login Start
  $('#signup-button').on("click",function(e){
    e.preventDefault();
    console.log("Sign Up");
      var email = $('#email-input').val();
      var password = $('#password-input').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Sign UpErrors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);  
    });
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
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign Out Successful");
    }).catch(function(error) {
      // An error happened.
    });
  });
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