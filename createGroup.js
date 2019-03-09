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
    
    //ButtonJS&APIs

    $("#button").click(function() {
      $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Music&city=York&City&size=10&apikey=KsqjN0QVJGVdC5xziiMBBYicqX3JVnpt",
        async:true,
        dataType: "json",
        success: function(response) {
          parseArray(response._embedded.events)
        },
        error: function(xhr, status, err) {
        }
      });
    });

    function parseArray(response){
      
      var item = Math.floor(Math.random() * response.length)
      createElement("<h2>", response[item].name)
      const {
        dates: { start: { localDate, localTime } },
        name,
        _embedded: { venues: [{ name: venue }] } // const [{ name: venue }] = venues; => [{ name: '' }, {}, {}] venues[0]
      } = response[item];
      
      console.log(response[item])
      console.log(venue);
      document.querySelector('#inputDate').value = localDate;
      document.querySelector('#inputTime').value = localTime;
      document.querySelector('#inputDescription').value = name;
      document.querySelector('#inputLocation').value = venue;
    }

    function createElement(type, string){
      var artistHolder = $("<div>");
      var artist = $(""+type);
      
      $(artist).text(string);
      artistHolder.append(artist);
      //append div to container
      $("#container2").append(artistHolder);
    }
    
    //Second API Call
    $("#button2").on("click", function() {
      const instance = axios.create({
        headers: {
        get: {
          "Authorization": "Bearer 1hwjEf0PpeA_fUdm8xt6l-sKGF9DYePq0wixri01WpA9YG7CZ68qdJAPEJE52lAHhX5eH34uLoyRtS3iSUpVykFZhTILPtpy5g_03k1q23jveFKcguPhV3guNC5_XHYx"
        }
      }
      });
      
      instance.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=live&music&venues&location=brooklyn")
        .then(function (result) {
        console.log(result);
        parseYelp(result);
      });
      function parseYelp (result) {
        $('#inputDate').val('07/11/2019');
        $('#inputTime').val('12:30AM');
        for(key in result) {
          if(key == 'data') {
            var data = result[key];
            for(key in data) {
              if(key == 'businesses'){
                var businesses = data[key];
                console.log(Math.floor(Math.random() * 20));
                var venue = businesses[Math.floor(Math.random() * 20)]; //Get name here
                $('#inputDescription').val(venue.name);
                for(key in venue) {
                  if(key == 'location') {
                    var venueLocation = venue[key];
                    console.log(venueLocation);
                    var location = venueLocation['address1'];
                    $('#inputLocation').val(location);
                    //var description = 'A COOL PLACE IN ' + venueLocation['city'];
                    console.log(location);
                  }
                }
              }
            }
        }
      }
    }
  });
    