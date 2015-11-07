/**
 * Created by qiujf on 2015/11/7.
 */
angular.module('starter.controllers')
  .constructor('loadController', function ($scope, $http) {
    $http.get('appdata/file.json')
      .success(function (data) {
        // The json data will now be in scope.
        $scope.myJsonData = data;
      });
  })
