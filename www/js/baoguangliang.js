/**
 * Created by qiujf on 2015/10/24.
 */
angular.module('starter.controllers')
.controller('BaoguangCtrl', function ($scope) {


 $scope.baoGuang ={
   shiJiJiaoJu:0,
   touZhaoHouDu:0,
   fangSheYuan:"",
   jiaoPianPinPai:"",
   jiaoPianXingHao:"",
   jiapPianXiuZhengXiShu:0,
   paoGuangLiang:0
 }
  $scope.changeSource = function (sourceInput) {


    $scope.zpxzxs = sourceInput;
  };

})
