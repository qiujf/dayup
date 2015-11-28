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
    }

    $scope.calcCurPower = function () {
      $scope.fangSheYuan.curPower = getCurPower($scope.fangSheYuan.type, $scope.fangSheYuan.date, $scope.fangSheYuan.power);

    }

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

  })
  .controller('CanShuJiHeBuQingXiDuCtrl', function ($scope, $ionicPopup, $ionicModal) {

  }).
  controller('CanShuTouZhaoHouDuCtrl', function ($scope, $ionicPopup, $ionicModal) {
    $scope.touZhaoHouDu =
    {
      touZhaoHouDu: "",
      gongChengHouDu: "",
      touZhaoFangShi: ""
    }
    $scope.calcTouZhaoHouDu = function () {

      if ($scope.touZhaoHouDu.touZhaoFangShi == "dbtz") {
        $scope.touZhaoHouDu.touZhaoHouDu = ($scope.touZhaoHouDu/**/.gongChengHouDu)
      } else if ($scope.touZhaoHouDu.touZhaoFangShi == "sbtz") {
        $scope.touZhaoHouDu.touZhaoHouDu = 2 * ($scope.touZhaoHouDu/**/.gongChengHouDu)


      }
    }
  }


)
