angular.module('starter.controllers', [])

    .controller('GongyiCtrl', function ($scope, $ionicPopup, $timeout) {

        $scope.showUnderConstructionAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '功能开发中'
            });

            alertPopup.then(function(res) {
                console.log('功能开发中');
            });
    }})

    .controller('BaoguangCtrl',function($scope){
        console.log('BaoguangCtrl');
        $scope.changeSource = function(sourceInput) {


            $scope.zpxzxs = sourceInput;
        };

    })

    .controller('BanzhuangCtrl', function($scope, $ionicModal) {
        $ionicModal.fromTemplateUrl('templates/baoguangliang.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
    })

    .controller('LishiCtrl', function ($scope) {
    })
    .controller('CanshuCtrl', function ($scope) {
    })
    .controller('PeizhiCtrl', function ($scope) {
    })
    .controller('ZhishiCtrl', function ($scope) {
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
    });;
