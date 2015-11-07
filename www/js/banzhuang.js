/**
 * Created by qiujf on 2015/10/24.
 */

angular.module('starter.controllers')

  .controller('BanzhuangCtrl', function ($scope, $ionicModal, shareService) {


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
      jiaoPianJuLi: 0,
      youXiaoJiaoDianChiCun: 0,
      zuiXiaoJiaoJu: 0,
      shiJiJiaoJu: 0,
      k: 1.03,
      yiCiTouZhaoChangDu: 0,
      baoGuangLiang: 0,
      fangSheYuanList: [],
      fangSheYuan:0,
      yuanQiangDu: 0,
      baoGuangShiJian: 0
    }

    $scope.baoGuangLiang = {
      shiJiJiaoJu: 0,
      touZhaoHouDu: 0,
      fangSheYuan: "",
      jiaoJuanPinPai: "",
      jiaoJuanXingHao: "",
      jiaoPianXiuZhengXiShuDefault: 0,
      jiaoPianXiuZhengXiShu: 0,
      baoGuangLiang: 0
    }

    function calcBaoGuangLiang() {
      if ($scope.baoGuangLiang.fangSheYuan == "Se75") {
        $scope.baoGuangLiang.baoGuangLiang = 0.000083337 * $scope.baoGuangLiang.jiaoPianXiuZhengXiShu *
          Math.pow($scope.banZhuang.shiJiJiaoJu, 2) * Math.pow(2, $scope.banZhuang.touZhaoHouDu / 10);
      } else if ($scope.baoGuangLiang.fangSheYuan == "Ir192") {
        $scope.baoGuangLiang.baoGuangLiang = 0.0000738 * $scope.baoGuangLiang.jiaoPianXiuZhengXiShu *
          Math.pow($scope.banZhuang.shiJiJiaoJu, 2) * Math.pow(1.77, $scope.banZhuang.touZhaoHouDu / 10);
      }
      $scope.banZhuang.baoGuangLiang=$scope.baoGuangLiang.baoGuangLiang;
    }

    function calcZuiXiaoJiaoJu() {
      if ($scope.banZhuang.touZhaoDengJi == "A") {
        $scope.banZhuang.zuiXiaoJiaoJu = $scope.banZhuang.jiaoPianJuLi + 7.5 * $scope.banZhuang.youXiaoJiaoDianChiCun * Math.pow($scope.banZhuang.jiaoPianJuLi, 2 / 3);
      } else if ($scope.banZhuang.touZhaoDengJi == "AB") {
        $scope.banZhuang.zuiXiaoJiaoJu = $scope.banZhuang.jiaoPianJuLi + 10 * $scope.banZhuang.youXiaoJiaoDianChiCun * Math.pow($scope.banZhuang.jiaoPianJuLi, 2 / 3);

      } else if ($scope.banZhuang.touZhaoDengJi == "B") {
        $scope.banZhuang.zuiXiaoJiaoJu = $scope.banZhuang.jiaoPianJuLi + 15 * $scope.banZhuang.youXiaoJiaoDianChiCun * Math.pow($scope.banZhuang.jiaoPianJuLi, 2 / 3);
      }

      $scope.banZhuang.zuiXiaoJiaoJu = Math.round($scope.banZhuang.zuiXiaoJiaoJu * 100) / 100;
    }

    function calcValueOfK() {
      if ($scope.banZhuang.touZhaoDengJi == "A") {
        $scope.banZhuang.k = 1.03;
      } else if ($scope.banZhuang.touZhaoDengJi == "AB") {
        $scope.banZhuang.k = 1.03;

      } else if ($scope.banZhuang.touZhaoDengJi == "B") {
        $scope.banZhuang.k = 1.01;
      }
    }

    function calcYiCiTouZhaoChangDu() {
      $scope.banZhuang.yiCiTouZhaoChangDu = Math.round(2 * $scope.banZhuang.shiJiJiaoJu / Math.tan(Math.asin(1 / $scope.banZhuang.k)) * 100) / 100;
    }

    function calcTouZhaoHouDu() {
      $scope.banZhuang.touZhaoHouDu = $scope.banZhuang.gongChengHouDu;
    }

    function calcJiaoPianJuLi() {
      $scope.banZhuang.jiaoPianJuLi = $scope.banZhuang.gongChengHouDu + 2;
    }

    function setFangSheYuanOptions() {
      var sheXian;
      if ($scope.banZhuang.touZhaoDengJi == "A" || $scope.banZhuang.touZhaoDengJi == "AB") {
        if ($scope.banZhuang.touZhaoHouDu >= 1 && $scope.banZhuang.touZhaoHouDu < 2) {
          sheXian = "Se75";
        } else if ($scope.banZhuang.touZhaoHouDu >= 4 && $scope.banZhuang.touZhaoHouDu < 10) {
          sheXian = "Ir192";

        } else {
          sheXian = "ALL";
        }
      }

      if ($scope.banZhuang.touZhaoDengJi == "B") {
        if ($scope.banZhuang.touZhaoHouDu >= 1.4 && $scope.banZhuang.touZhaoHouDu < 2) {
          sheXian = "Se75";
        } else if ($scope.banZhuang.touZhaoHouDu >= 4 && $scope.banZhuang.touZhaoHouDu < 9) {
          sheXian = "Ir192";

        } else {
          sheXian = "ALL";
        }
      }

      if (sheXian == "Se75" || sheXian == "Ir192") {
        var fangSheYuan = shareService.getFangSheYuan();
        $scope.banZhuang.fangSheYuanList = [];
        for (var i = 0; i < fangSheYuan.length; i++) {
          if (sheXian == "ALL" || fangSheYuan[i].type == sheXian) {
            $scope.banZhuang.fangSheYuanList.splice($scope.banZhuang.fangSheYuanList.length, 0, fangSheYuan[i]);
          }
        }
      }
    }

    function calcYuanQiangDu() {
      var fangSheYuan = $scope.banZhuang.fangSheYuanList[$scope.banZhuang.fangSheYuan];
      var dateLiteral = fangSheYuan.date;
      var date = new Date();
      date.setFullYear(Number(dateLiteral.substr(0,4)));
      date.setMonth(Number(dateLiteral.substr(4,2))-1);
      date.setDate(Number(dateLiteral.substr(6,2)));
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      var today =new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);

      var days = (today.getTime()-date.getTime())/86400000;
      var curPower = 0;
      if(fangSheYuan.type=="Se75"){
        curPower = fangSheYuan.power*Math.pow(0.5,days/120);
      }else if (fangSheYuan.type=="Ir192"){
        curPower = fangSheYuan.power*Math.pow(0.5,days/74);
      }

      $scope.banZhuang.yuanQiangDu = curPower;
    }

    function calcBaoGuangShiJian(){
      $scope.banZhuang.baoGuangShiJian = $scope.banZhuang.baoGuangLiang/ $scope.banZhuang.yuanQiangDu;
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
      calcBaoGuangLiang();
      setFangSheYuanOptions();
      calcBaoGuangShiJian();
    }

    $scope.onFangSheYuanChange = function(){
      calcYuanQiangDu();
      calcBaoGuangShiJian();
    }

    $scope.onShiJiJiaoJuChange = function () {

      if ($scope.banZhuang.shiJiJiaoJu < $scope.banZhuang.zuiXiaoJiaoJu) {
        alert("实际焦距不能小于最小焦距");
        $scope.banZhuang.shiJiJiaoJu = $scope.banZhuang.zuiXiaoJiaoJu;
      }
      calcYiCiTouZhaoChangDu();
      calcBaoGuangLiang();
      calcBaoGuangShiJian();
    }


    $scope.getBanZhuang = function () {
      /*    alert($scope.banZhuang.gongChengHouDu + "|" + $scope.banZhuang.touZhaoFangShi + "|" + $scope.banZhuang.touZhaoDengJi + "|" + $scope.banZhuang.touZhaoHouDu
       + "|" + $scope.banZhuang.zuiXiaoJiaoJu + "|" + $scope.banZhuang.shiJiJiaoJu + "|" + $scope.banZhuang.yiCiTouZhaoChangDu + "|" + $scope.banZhuang.baoGuangLiang
       + "|" + $scope.banZhuang.yuanQiangDu + "|" + $scope.banZhuang.baoGuangShiJian);*/
      alert(angular.toJson($scope.banZhuang));
    }
    $scope.setBanZhuang = function () {
      $scope.banZhuang.gongChengHouDu = 0;
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

  });

