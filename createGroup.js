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
  const GANGS = "Gangs";
  const GANG_BY_USERS = "Gangs_By_Users";



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

    $('#save-gang-button').on("click",function(e){
        e.preventDefault();
        var date = $('#inputDate').val();
        var time = $('#inputTime').val();
        var location = $('#inputLocation').val();
        var description = $('#inputDescription').val();
        var name = localStorage.getItem('gangName');
        var owner = firebase.auth().currentUser.uid
        saveGangWith(date,time,location,description,name,owner);

    });
      
    })

    function saveGangWith(date,time,location,description,name,ownerId){
        var gang = {
            name:name,
            date:date,
            time:time,
            location:location,
            description: description,
            ownerId:ownerId
        }

       var newGangKey = firebase.database().ref().child(GANGS).push().key;

       var updates = {};
        updates['/'+GANGS+'/' + newGangKey] = gang;
        updates ['/'+GANG_BY_USERS+'/'+ ownerId + '/' + newGangKey] = gang;


        firebase.database().ref().update(updates,function(error){
            if(error){
                console.log(error);
            }else{
                window.location = 'Home-page.html';
            }

        });

        




    }

 