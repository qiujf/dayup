angular.module('starter.controllers',[])

  .controller('GongyiCtrl', function ($scope, $ionicPopup, $timeout) {

    $scope.showUnderConstructionAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: '提示',
        template: '功能开发中'
      });

      alertPopup.then(function (res) {
        console.log('功能开发中');
      });
    }
  })





  .controller('LishiCtrl', function ($scope) {
  })
  .controller('CanshuCtrl', function ($scope) {
  })
  .controller('PeizhiCtrl', function ($scope) {
  })
  .controller('ZhishiCtrl', function ($scope) {
  })

  .controller('MockListCtrl', function ($scope) {
    $scope.password = '';
    $scope.grade = function () {
      var size = $scope.password.length;
      if (size > 8) {
        $scope.strength = 'strong';
      } else if (size > 3) {
        $scope.strength = 'medium';
      } else {
        $scope.strength = 'weak';
      }
    }
  })


  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
;
