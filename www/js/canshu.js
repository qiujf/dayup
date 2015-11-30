/**
 * Created by qiujf on 2015/11/28.
 */
angular.module('starter.controllers')

  .controller('CanShuSheXianYuanCtrl', function ($scope, $ionicPopup) {
    $scope.fangSheYuan = {
      type: "",
      date: "",
      power: "",
      curPower: 0
    };

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }


    $scope.fangSheYuan.date = yyyy.toString() + mm.toString() + dd.toString();


    $scope.calcCurPower = function () {
      $scope.fangSheYuan.curPower = getCurPower($scope.fangSheYuan.type, $scope.fangSheYuan.date, $scope.fangSheYuan.power);

    };

    function getCurPower(type, startDate, startPower) {
      var dateLiteral = startDate;
      var date = new Date();
      date.setFullYear(Number(dateLiteral.substr(0, 4)));
      date.setMonth(Number(dateLiteral.substr(4, 2)) - 1);
      date.setDate(Number(dateLiteral.substr(6, 2)));
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);

      var days = (today.getTime() - date.getTime()) / 86400000;
      var curPower = 0;
      if (type == "Se75") {
        curPower = startPower * Math.pow(0.5, days / 120);
      } else if (type == "Ir192") {
        curPower = startPower * Math.pow(0.5, days / 74);
      } else if (type == "Co60") {
        curPower = startPower * Math.pow(0.5, days / 1935);
      } else if (type == "Tm170") {
        curPower = startPower * Math.pow(0.5, days / 128);
      } else if (type == "Yb169") {
        curPower = startPower * Math.pow(0.5, days / 32);
      }

      return Math.round(curPower * 100) / 100;
    }

    $scope.checkDate = function () {
      var rs = true;
      var temp = $scope.fangSheYuan.date;
      var reg = /^(\d{4})(\d{2})(\d{2})$/;
      var r = temp.match(reg);
      if (r == null) rs = false;
      r[2] = r[2] - 1;
      var d = new Date(r[1], r[2], r[3], 0, 0, 0);
      if (d.getFullYear() != r[1]) rs = false;
      if (d.getMonth() != r[2]) rs = false;
      if (d.getDate() != r[3]) rs = false;


      if (!rs) {

        var myPopup = $ionicPopup.show({
          template: '<span style="color:red">请输入正确的日期格式:yyyyMMdd</span>',
          title: '<h3><b>警告</b></h3>',
          scope: $scope,
          buttons: [
            {
              text: '<b>确定</b>',
              type: 'button-positive',
              onTap: function (e) {

              }
            }
          ]
        });
        myPopup.then(function (res) {

        });

        $scope.fangSheYuan.date = "";
      } else {
        $scope.calcCurPower();
      }
    }


  })
  .controller('CanShuZuiXiaoJiaoJuCtrl', function ($scope, $ionicPopup, $ionicModal) {

    $scope.jiaoju = {
      gongJian: "",
      touZhaoDengji: "",
      gongChengHouDu: "",
      waiJing: "",
      youxiaoJiaoDian: "",
      zuiXiaoJiaoJu: ""
    };

    $scope.showWaiJing = false;
    $scope.showHouDu = false;
    $scope.setYouXiaoJiaoDianChiCun = function (value) {
      $scope.jiaoju.youxiaoJiaoDian = value;
      $scope.calcZuiXiaoJiaoJu();
    };
    $scope.onGongJianChange = function () {
      if ($scope.jiaoju.gongJian == "bz" || $scope.jiaoju.gongJian == "zjg") {
        $scope.showWaiJing = false;
        $scope.showHouDu = true;
      } else if ($scope.jiaoju.gongJian == "xjg") {
        $scope.showWaiJing = true;
        $scope.showHouDu = false;
      }

      $scope.calcZuiXiaoJiaoJu();
    };

    $scope.calcZuiXiaoJiaoJu = function () {
      var b;
      if ($scope.jiaoju.gongJian == "bz" || $scope.jiaoju.gongJian == "zjg") {
        b = $scope.jiaoju.gongChengHouDu + 2;
      } else if ($scope.jiaoju.gongJian == "xjg") {
        b = $scope.jiaoju.waiJing + 2;
      }
      var d = $scope.jiaoju.youxiaoJiaoDian;
      if ($scope.jiaoju.touZhaoDengJi == "A") {
        $scope.jiaoju.zuiXiaoJiaoJu = b + 7.5 * d * Math.pow(b, 2 / 3);
      } else if ($scope.jiaoju.touZhaoDengJi == "AB") {
        $scope.jiaoju.zuiXiaoJiaoJu = b + 10 * d * Math.pow(b, 2 / 3);
      } else if ($scope.jiaoju.touZhaoDengJi == "B") {
        $scope.jiaoju.zuiXiaoJiaoJu = b + 15 * d * Math.pow(b, 2 / 3);
      }

      $scope.jiaoju.zuiXiaoJiaoJu = Math.round($scope.jiaoju.zuiXiaoJiaoJu * 100) / 100;
    }

  })
  .controller('CanShuJiHeBuQingXiDuCtrl', function ($scope, $ionicPopup, $ionicModal) {
    $scope.jihe = {
      gongJian: "",
      jiaoJu: "",
      gongChengHouDu: "",
      waiJing: "",
      jiHeBuQingXiDu: ""
    };


    $scope.showWaiJing = false;
    $scope.showHouDu = false;

    $scope.setYouXiaoJiaoDianChiCun = function (value) {
      $scope.jihe.youxiaoJiaoDian = value;
      $scope.calcJiHeBuQingXiDu();
    };
    $scope.onGongJianChange = function () {
      if ($scope.jihe.gongJian == "bz" || $scope.jihe.gongJian == "zjg") {
        $scope.showWaiJing = false;
        $scope.showHouDu = true;
      } else if ($scope.jihe.gongJian == "xjg") {
        $scope.showWaiJing = true;
        $scope.showHouDu = false;
      }

      $scope.calcJiHeBuQingXiDu();
    };

    $scope.calcJiHeBuQingXiDu = function () {
      var b;
      if ($scope.jihe.gongJian == "bz" || $scope.jihe.gongJian == "zjg") {
        b = $scope.jihe.gongChengHouDu + 2;
      } else if ($scope.jihe.gongJian == "xjg") {
        b = $scope.jihe.waiJing + 2;
      }
      var d = $scope.jihe.youxiaoJiaoDian;
      var F = $scope.jihe.jiaoJu;

      $scope.jihe.jiHeBuQingXiDu = (d*b)/(F-b);
      $scope.jihe.jiHeBuQingXiDu = Math.round($scope.jihe.jiHeBuQingXiDu * 10000) / 10000;
    }
  }).
  controller('CanShuTouZhaoHouDuCtrl', function ($scope, $ionicPopup, $ionicModal) {
    $scope.touZhaoHouDu =
    {
      touZhaoHouDu: "",
      gongChengHouDu: "",
      touZhaoFangShi: ""
    };
    $scope.calcTouZhaoHouDu = function () {

      if ($scope.touZhaoHouDu.touZhaoFangShi == "dbtz") {
        $scope.touZhaoHouDu.touZhaoHouDu = ($scope.touZhaoHouDu/**/.gongChengHouDu)
      } else if ($scope.touZhaoHouDu.touZhaoFangShi == "sbtz") {
        $scope.touZhaoHouDu.touZhaoHouDu = 2 * ($scope.touZhaoHouDu/**/.gongChengHouDu)


      }
    }
  }
  )
    .controller('CanShuHuYiDingLvCtrl', function ($scope, $ionicPopup, $ionicModal) {
      $scope.huyi =
      {
        yuanBaoGuang: "",
        xianBaoGuang: "",
        yuanJiaoJu: "",
        xianJiaoJu:""
      };
      $scope.calcHuYi = function () {

        $scope.huyi.xianBaoGuang = $scope.huyi.yuanBaoGuang*Math.pow($scope.huyi.xianJiaoJu,2)/Math.pow($scope.huyi.yuanJiaoJu,2);
      }
    }
  )
  .controller('CanShuPingYiJuLiCtrl', function ($scope, $ionicPopup, $ionicModal) {
    $scope.pingyi =
    {
      waiJing: "",
      hanFengKuanDu: "",
      shiJiJiaoJu: "",
      pingYiJuLi:""
    };
    $scope.calcPingYiJuLi = function () {

      $scope.pingyi.pingYiJuLi = ($scope.pingyi.shiJiJiaoJu-($scope.pingyi.waiJing+2))/(($scope.pingyi.waiJing+2)*($scope.pingyi.hanFengKuanDu+10));

      $scope.pingyi.pingYiJuLi = Math.round( $scope.pingyi.pingYiJuLi*1000)/1000;

    }
  }
);
