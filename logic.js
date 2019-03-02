//Landing-page START
var groupID;

$( document ).ready(function() {
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