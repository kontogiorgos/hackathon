var user = {
  id: 1,
  name: "",
  dist: 5
};

var cardTypes;
var longitude, latitude;
var matches = [];

var ionicPopup;

function updateCards($scope,cb){

  if(longitude && latitude){


    closeObjects(user.id, latitude, longitude, user.dist, function(res) {
        // res is array of art objects
        cardTypes = res.data;
        $scope.cards = [];
        cb($scope);

        $scope.addCard = function(i) {
            var newCard = cardTypes[i];
            $scope.cards.push(angular.extend({}, newCard));
        }

        for (var i = 0; i < cardTypes.length; i++) {
            $scope.addCard(i);
        }

        $scope.$apply();
    });

  } else {
    // set the geo location
    navigator.geolocation.getCurrentPosition(function(pos){
      longitude = pos.coords.longitude;
      latitude = pos.coords.latitude;
      updateCards($scope,cb);
    });
  }
}

function popUp(title,msg){
  var alertPopup = ionicPopup.alert({
        title: title,
        template: msg
    });
    alertPopup.then(function(res) {
        //console.log('Showing details');
    });
}


function checkMatches(){
  console.log("checkMatches()");

  myMatches(user.id, function(res){
    var new_matches = res.data;

    for(var i = 0; i < new_matches.length; i++){
      var match = new_matches[i];
      if(!containsObject(match,matches)){
        popUp("New Match!", match.firstname + " " + match.lastname);
        break;
      }
    }

    for(var i = 0; i < new_matches.length; i++){
      var match = new_matches[i];
      matches.push(match);

    }



  });
}
setInterval(function(){checkMatches()},10000);




// Ionic Starter App, v0.9.20
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ionic.contrib.ui.tinderCards' is found in ionic.tdcards.js
angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])

.directive('noScroll', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $element.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    }
})

.controller('CardsCtrl', function($scope, $ionicPopup) {
    ionicPopup = $ionicPopup;

    updateCards($scope, function($scope){

        $scope.cardSwipedLeft = function(index) {
            var card = cardTypes[index];
            // NO
            rate(user.id,card.id,0);
        }

        $scope.cardSwipedRight = function(index) {
            var card = cardTypes[index];
            // NO
            rate(user.id,card.id,1);
        }

        $scope.onHold = function(index) {
            var card = cardTypes[index];



            var text = (typeof card.text == 'undefined') ? "" : card.text.substring(0,400);

            var alertPopup = $ionicPopup.alert({
                title: card.title,
                template: card.primaryMaker + "<br>" + card.displayDate + "<br>" + card.classification + "<br>" + card.address + " (" + card.region + ")" + "<br>" + text
            });
            alertPopup.then(function(res) {
                //console.log('Showing details');
            });
        }

        $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);

            // no more cards!!
            if(index == 0){
              updateCards($scope, function(){
                $scope.$apply();
              });
            }
        }
        $scope.$apply();
    });


})




.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('eventmenu', {
            url: "/event",
            abstract: true,
            templateUrl: "templates/event-menu.html"
        })
        .state('eventmenu.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html"
                }
            }
        })
        .state('eventmenu.checkin', {
            url: "/check-in",
            views: {
                'menuContent': {
                    templateUrl: "templates/check-in.html",
                    controller: "CheckinCtrl"
                }
            }
        })
        .state('eventmenu.attendees', {
            url: "/attendees",
            views: {
                'menuContent': {
                    templateUrl: "templates/attendees.html",
                    controller: "AttendeesCtrl"
                }
            }
        })

    $urlRouterProvider.otherwise("/event/check-in");

})



.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {


    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('CheckinCtrl', function($scope, $location) {
    $scope.showForm = true;

    $scope.shirtSizes = [{
        text: '5km',
        value: '5'
    }, {
        text: '15km',
        value: '15'
    }, {
        text: '30km',
        value: '30'
    }];

    $scope.attendee = {};
    $scope.submit = function() {

        var firstname = $scope.attendee.firstname;
        var lastname = $scope.attendee.lastname;
        var max_dist = $scope.attendee.shirtSize;

        if(firstname && lastname && max_dist){

          createUser(25,0,firstname,lastname,max_dist, function(res){

            user = res.data;
            //$urlRouterProvider.otherwise("/event/home");
            $location.path("/event/home");
            $scope.$apply();

          });
        } else {
            alert('Info required');
        }

        //$scope.showForm = false;
    };

})

.controller('AttendeesCtrl', function($scope) {

    $scope.activity = [];
    $scope.arrivedChange = function(attendee) {
        // var msg = attendee.firstname + ' ' + attendee.lastname;
        // msg += (!attendee.arrived ? ' has arrived, ' : ' just left, ');
        // msg += new Date().getMilliseconds();
        // $scope.activity.push(msg);
        // if ($scope.activity.length > 3) {
        //     $scope.activity.splice(0, 1);
        // }
    };
});
