/**
 * Created by qiujf on 2015/10/24.
 */

angular.module('starter.controllers')

.controller('BanzhuangCtrl', function ($scope, $ionicModal,shareService) {


  //透照方式Option
  $scope.banZhuangOpt = {
    touZhaoFangShi: [{selected: true, name: "单壁单影", value: "DBDY"}],
    touZhaoDengJi: [{selected: true, name: "A", value: "A"}, {
      selected: false,
      name: "AB",
      value: "AB"
    }, {selected: false, name: "B", value: "B"}]

  };

  //板状工艺
  $scope.banZhuang = {
    gongChengHouDu: 0,
    touZhaoFangShi: "DBDY",
    touZhaoDengJi: "A",
    touZhaoHouDu: 0,
    jiaoPianJuLi:0,
    youXiaoJiaoDianChiCun:0,
    zuiXiaoJiaoJu: 0,
    shiJiJiaoJu: 0,
    k:1.03,
    yiCiTouZhaoChangDu: 0,
    baoGuangLiang: 0,
    yuanQiangDu: 0,
    baoGuangShiJian: 0
  }

    $scope.baoGuangLiang = {
      shiJiJiaoJu:0,
      touZhaoHouDu:0,
      fangSheYuan:"",
      jiaoJuanPinPai:"",
      jiaoJuanXingHao:"",
      jiaoPianXiuZhengXiShuDefault:0,
      jiaoPianXiuZhengXiShu:0,
      baoGuangLiang:0
    }


    function calcZuiXiaoJiaoJu() {
      if ($scope.banZhuang.touZhaoDengJi == "A") {
        $scope.banZhuang.zuiXiaoJiaoJu = $scope.banZhuang.jiaoPianJuLi + 7.5 * $scope.banZhuang.youXiaoJiaoDianChiCun * Math.pow($scope.banZhuang.jiaoPianJuLi, 2 / 3);
      } else if ($scope.banZhuang.touZhaoDengJi == "AB") {
        $scope.banZhuang.zuiXiaoJiaoJu = $scope.banZhuang.jiaoPianJuLi + 10 * $scope.banZhuang.youXiaoJiaoDianChiCun * Math.pow($scope.banZhuang.jiaoPianJuLi, 2 / 3);

      } else if ($scope.banZhuang.touZhaoDengJi == "B") {
        $scope.banZhuang.zuiXiaoJiaoJu = $scope.banZhuang.jiaoPianJuLi + 15 * $scope.banZhuang.youXiaoJiaoDianChiCun * Math.pow($scope.banZhuang.jiaoPianJuLi, 2 / 3);
      }

      $scope.banZhuang.zuiXiaoJiaoJu = Math.round( $scope.banZhuang.zuiXiaoJiaoJu*100)/100;
    }

    function calcValueOfK() {
      if ($scope.banZhuang.touZhaoDengJi == "A")    {
        $scope.banZhuang.k = 1.03;
      } else if ($scope.banZhuang.touZhaoDengJi == "AB") {
        $scope.banZhuang.k = 1.03;

      } else if ($scope.banZhuang.touZhaoDengJi == "B") {
        $scope.banZhuang.k = 1.01;
      }
    }

    function calcYiCiTouZhaoChangDu() {
      $scope.banZhuang.yiCiTouZhaoChangDu = Math.round(2*$scope.banZhuang.shiJiJiaoJu/Math.tan(Math.asin(1/$scope.banZhuang.k))*100)/100;
    }

    function calcTouZhaoHouDu() {
      $scope.banZhuang.touZhaoHouDu = $scope.banZhuang.gongChengHouDu;
    }

    function calcJiaoPianJuLi() {
      $scope.banZhuang.jiaoPianJuLi = $scope.banZhuang.gongChengHouDu + 2;
    }

    $scope.onFormValueChange = function () {
      calcTouZhaoHouDu();
      calcJiaoPianJuLi();
      calcZuiXiaoJiaoJu();
      calcValueOfK();
      if ($scope.banZhuang.shiJiJiaoJu < $scope.banZhuang.zuiXiaoJiaoJu) {
        $scope.banZhuang.shiJiJiaoJu = $scope.banZhuang.zuiXiaoJiaoJu;
      }
      calcYiCiTouZhaoChangDu();
  }



  $scope.onShiJiJiaoJuChange = function () {

    if ($scope.banZhuang.shiJiJiaoJu < $scope.banZhuang.zuiXiaoJiaoJu) {
      alert("实际焦距不能小于最小焦距");
      $scope.banZhuang.shiJiJiaoJu = $scope.banZhuang.zuiXiaoJiaoJu;
    }
    calcYiCiTouZhaoChangDu();
  }



  $scope.getBanZhuang = function () {
    alert($scope.banZhuang.gongChengHouDu + "|" + $scope.banZhuang.touZhaoFangShi + "|" + $scope.banZhuang.touZhaoDengJi + "|" + $scope.banZhuang.touZhaoHouDu
      + "|" + $scope.banZhuang.zuiXiaoJiaoJu + "|" + $scope.banZhuang.shiJiJiaoJu + "|" + $scope.banZhuang.yiCiTouZhaoChangDu + "|" + $scope.banZhuang.baoGuangLiang
      + "|" + $scope.banZhuang.yuanQiangDu + "|" + $scope.banZhuang.baoGuangShiJian);
  }
  $scope.setBanZhuang = function () {
    $scope.banZhuang.gongChengHouDu =  0;
    $scope.banZhuang.touZhaoFangShi = "DBDY";
    $scope.banZhuang.touZhaoDengJi = "A";
    $scope.banZhuang.touZhaoHouDu = 12;
    $scope.banZhuang.zuiXiaoJiaoJu = 13;
    $scope.banZhuang.shiJiJiaoJu = 14;
    $scope.banZhuang.yiCiTouZhaoChangDu = 15;
    $scope.banZhuang.baoGuangLiang = 16;
    $scope.banZhuang.yuanQiangDu = 17;
    $scope.banZhuang.baoGuangShiJian = 18;

  }

  $ionicModal.fromTemplateUrl('templates/baoguangliang.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {

    $scope.baoGuangLiang.shiJiJiaoJu = $scope.banZhuang.shiJiJiaoJu;
    $scope.baoGuangLiang.touZhaoHouDu = $scope.banZhuang.touZhaoHouDu;

    $scope.modal.show();
  };
    $scope.closeModal = function () {

      $scope.modal.hide();
    };
  $scope.saveAndCloseModal = function () {

    $scope.banZhuang.baoGuangLiang = $scope.baoGuangLiang.baoGuangLiang;
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function () {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function () {
    // Execute action
  });
})
;
