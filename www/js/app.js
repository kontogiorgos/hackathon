var user = {
  "id": 1,
  "name": "Aske Mottelson"
};


function updateCards($scope){
  var latitude = 55.678152;
  var longitude = 12.564681;
  var max_dist = 5;

  closeObjects(user.id, latitude, longitude, max_dist, function(res) {


        // res is array of art objects
        var cardTypes = res.data;

        $scope.cards = [];

        $scope.addCard = function(i) {
            var newCard = cardTypes[i];
            $scope.cards.push(angular.extend({}, newCard));
        }

        for (var i = 0; i < cardTypes.length; i++) {
            $scope.addCard(i);
        }

        $scope.cardSwipedLeft = function(index) {
            //rate(user.id,)
        }

        $scope.cardSwipedRight = function(index) {
            console.log('Right swipe');
        }

        $scope.onHold = function(index) {
            console.log('Get info');

            var alertPopup = $ionicPopup.alert({
                title: 'Details',
                template: "Artist: Conny Walther <br> Location: Copenhagen"
            });
            alertPopup.then(function(res) {
                console.log('Showing details');
            });
        }

        $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);
            if(index == 0){
              updateCards($scope);
            }
        }
        $scope.$apply();
    });
}


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
    //     var cardTypes = [
    // { image: 'img/img1.jpg', title: 'Klods med søjler'},
    // { image: 'img/img2.jpg', title: 'Klods med sort og hvid klump'},
    // { image: 'img/img3.jpg', title: 'Klods med klumper og kugler'},
    //     ];



    updateCards($scope);


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

    $urlRouterProvider.otherwise("/event/home");
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
    $scope.attendees = [{
        firstname: 'Nicolas',
        lastname: 'Cage'
    }, {
        firstname: 'Jean-Claude',
        lastname: 'Van Damme'
    }, {
        firstname: 'Keanu',
        lastname: 'Reeves'
    }, {
        firstname: 'Steven',
        lastname: 'Seagal'
    }];

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('CheckinCtrl', function($scope) {
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
        if (!$scope.attendee.firstname) {
            alert('Info required');
            return;
        }
        $scope.showForm = false;
        $scope.attendees.push($scope.attendee);
    };

})

.controller('AttendeesCtrl', function($scope) {

    $scope.activity = [];
    $scope.arrivedChange = function(attendee) {
        var msg = attendee.firstname + ' ' + attendee.lastname;
        msg += (!attendee.arrived ? ' has arrived, ' : ' just left, ');
        msg += new Date().getMilliseconds();
        $scope.activity.push(msg);
        if ($scope.activity.length > 3) {
            $scope.activity.splice(0, 1);
        }
    };
});