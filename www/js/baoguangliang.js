/**
 * Created by qiujf on 2015/10/24.
 */
angular.module('starter.controllers')
.controller('BaoguangCtrl', function ($scope) {
/*
    $scope.baoGuang = {
      shiJiJiaoJu: 0,
      touZhaoHouDu: 0,
      fangSheYuan: "",
      jiaoPianPinPai: "",
      jiaoPianXingHao: "",
      jiapPianXiuZhengXiShu: 0,
      paoGuangLiang: 0

    }*/$scope.baoGuangOpt ={
      jiaoPian: [
        {selected: true, name: "富士", value: "FS"},
        {selected: true, name: "柯达", value: "KD"},
        {selected: true, name: "乐凯", value: "LK"}
      ],
      fangSheYuan:[
        {selected: true, name: "Se75", value: "Se75"},
        {selected: true, name: "ir192", value: "ir192"},

      ]

    }
    $scope.saveBaoGuangLiang = function(){
      $scope.banZhuang.baoGuangLiang = 9999;

    }
  $scope.changeSource = function () {


    if($scope.baoGuangLiang.fangSheYuan=="Se75"){
      $scope.baoGuangLiang.jiaoPianXiuZhengXiShu = 4;
    }else{

      $scope.baoGuangLiang.jiaoPianXiuZhengXiShu = 3;
    }
  };

})
