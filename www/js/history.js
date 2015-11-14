/**
 * Created by qiujf on 2015/11/7.
 */
angular.module('starter.controllers')

  .controller('HistoryCtrl', function ($scope, $ionicModal, historyService) {
    //Data

    /*

     var historyListLiteral = window.localStorage.getItem('history');
     if (historyListLiteral != null) {
     $scope.historyList = angular.fromJson(historyListLiteral);
     } else {
     $scope.historyList = [];
     }
     */
    $scope.historyList = historyService.getHistoryList();


    $scope.data = {
      showDelete: false
    };

    $scope.edit = function (item) {
      alert('Edit Item: ' + item.id);
    };
    $scope.share = function (item) {
      alert('Share Item: ' + item.id);
    };


    $scope.onItemDelete = function (item) {
      $scope.historyList.splice($scope.historyList.indexOf(item), 1);
      historyService.setAndSaveHistoryList($scope.historyList);
    };


  }
)
;
