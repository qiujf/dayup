/**
 * Created by qiujf on 2015/11/7.
 */
angular.module('starter.controllers')

  .controller('HistoryCtrl', function ($scope, $ionicPopup, $ionicModal, historyService) {
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

    $scope.onSearch = function () {
      $scope.search = {
        type: "all",
        gongChengHouDu: "",
        waiJing: ""
      }

      var myPopup = $ionicPopup.show({
        templateUrl: "templates/modal/search.html",
        title: '<h3><b>搜索条件</b></h3>',
        scope: $scope,
        buttons: [
          {
            text: '<b>确定</b>',
            type: 'button-positive',
            onTap: function (e) {
              return $scope.search;
            }
          }
        ]
      });
      myPopup.then(function (res) {
        search(res);
      })
    }

    function search(res) {

      var searchResult = [];
      var list = historyService.getHistoryList();
      for (var i = 0; i < list.length; i++) {
        if (res.type != "all") {
          if (res.type != list[i].typeShort) {
            continue;
          }
        }

        if ("" !== res.gongChengHouDu && list[i].banZhuang.gongChengHouDu != res.gongChengHouDu) {
          continue;
        }

        if ("" !== res.waiJing && list[i].banZhuang.waijing != res.waiJing) {
          continue;
        }

        searchResult.splice(searchResult.length, 0, list[i]);
      }

      $scope.historyList = searchResult;

    }
  }
)
;
