/**
 * Created by qiujf on 2015/10/24.
 */
angular.module('starter.controllers')
.controller('BaoguangCtrl', function ($scope) {
  console.log('BaoguangCtrl');
  $scope.changeSource = function (sourceInput) {


    $scope.zpxzxs = sourceInput;
  };

})
