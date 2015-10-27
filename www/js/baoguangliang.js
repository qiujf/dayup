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
        {selected: true, name: "AGFA", value: "AGFA"}
      ],
      fangSheYuan:[
        {selected: true, name: "Se75", value: "Se75"},
        {selected: true, name: "ir192", value: "ir192"},

      ],

      jiaoPianXingHao:{
        selected:[],
        FS:[

          {selected: true, name: "富士25", value: "FS25"},
          {selected: true, name: "富士50", value: "FS50"},
          {selected: true, name: "富士80", value: "FS80"},
          {selected: true, name: "富士100", value: "FS100"},
          {selected: true, name: "富士150", value: "FS150"}
        ],
        KD:[
          {selected: true, name: "DR50", value: "DR50"},
          {selected: true, name: "M100", value: "M100"},
          {selected: true, name: "M125", value: "M125"},
          {selected: true, name: "T200", value: "T200"},
          {selected: true, name: "AA400", value: "AA400"},
          {selected: true, name: "HS800", value: "HS800"}
        ],
        AGFA:[
          {selected: true, name: "AGFA D2", value: "AGFA D2"},
          {selected: true, name: "AGFA D3", value: "AGFA D3"},
          {selected: true, name: "AGFA C4", value: "AGFA C4"},
          {selected: true, name: "AGFA D4", value: "AGFA D4"},
          {selected: true, name: "AGFA D5", value: "AGFA D5"},
          {selected: true, name: "AGFA C7", value: "AGFA C7"},
          {selected: true, name: "AGFA D7", value: "AGFA D7"},
          {selected: true, name: "AGFA D8", value: "AGFA D8"}
        ]
      }


    }
    $scope.saveBaoGuangLiang = function(){
      $scope.banZhuang.baoGuangLiang = 9999;

    }
    $scope.changeJiaoPianPinPai = function(){
      if($scope.baoGuangLiang.jiaoJuanPinPai=="FS") {
        $scope.baoGuangOpt.jiaoPianXingHao.selected = $scope.baoGuangOpt.jiaoPianXingHao.FS;
      }else if($scope.baoGuangLiang.jiaoJuanPinPai=="KD"){
        $scope.baoGuangOpt.jiaoPianXingHao.selected = $scope.baoGuangOpt.jiaoPianXingHao.KD;
      }else if($scope.baoGuangLiang.jiaoJuanPinPai=="AGFA"){
        $scope.baoGuangOpt.jiaoPianXingHao.selected = $scope.baoGuangOpt.jiaoPianXingHao.AGFA;
      }
    }
  $scope.changeSource = function () {


    if($scope.baoGuangLiang.fangSheYuan=="Se75"){
      $scope.baoGuangLiang.jiaoPianXiuZhengXiShu = 4;
    }else{

      $scope.baoGuangLiang.jiaoPianXiuZhengXiShu = 3;
    }
  };

})
