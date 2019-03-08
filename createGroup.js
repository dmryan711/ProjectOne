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



  $(document).ready(function() {

    $("#gang-name").text(localStorage.getItem('gangName'));
    $("#gang-owner-name").text("Gang Founder "+ localStorage.getItem('userName'));

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

 