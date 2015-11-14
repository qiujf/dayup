/**
 * Created by qiujf on 2015/11/7.
 */
angular.module('starter.controllers')

  .controller('FangSheYuanCtrl', function ($scope, $ionicModal, shareService) {
    //Data


    var fangSheYuanSeq = window.localStorage.getItem('fangSheYuanSeq');
    if (fangSheYuanSeq != null) {
      $scope.fangSheYuanSeq = fangSheYuanSeq;
    } else {
      $scope.fangSheYuanSeq = 1;
    }

    var fangSheYuanPeiZhiLiteral = window.localStorage.getItem('fangSheYuanPeiZhi');

    if (fangSheYuanPeiZhiLiteral != null) {
      $scope.fangSheYuanList = angular.fromJson(fangSheYuanPeiZhiLiteral);
    } else {
      $scope.fangSheYuanList = [];
    }
    for (var i = 0; i < $scope.fangSheYuanList.length; i++) {

      $scope.fangSheYuanList[i].curPower = getCurPower($scope.fangSheYuanList[i].type, $scope.fangSheYuanList[i].date, $scope.fangSheYuanList[i].power);
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
      }

      return Math.round(curPower * 100) / 100;
    }

    $scope.xinZheng = {
      type: "",
      date: "",
      power: "",
      curPower: 0
    }


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
      $scope.fangSheYuanList.splice($scope.fangSheYuanList.indexOf(item), 1);
      window.localStorage.setItem('fangSheYuanPeiZhi', angular.toJson($scope.fangSheYuanList));
    };

    $scope.addItem = function (type, date, power) {
      var item = {id: 0, type: "", data: ""};
      item.id = $scope.fangSheYuanSeq;
      $scope.fangSheYuanSeq++;
      item.type = type;
      item.date = date;
      item.power = power;
      item.curPower = getCurPower(type, date, power);

      $scope.fangSheYuanList.splice($scope.fangSheYuanList.length, 0, item);

    }

    $scope.showTimePicker = function () {
      var options = {date: new Date(), mode: 'time'};
      $cordovaDatePicker.show(options).then(function (date) {
        $scope.timeFieldInModel = date;
      });
    }

    $ionicModal.fromTemplateUrl('templates/peizhi/xinzengfangsheyuan.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.xinZheng.type = "";
      $scope.xinZheng.date = "";
      $scope.xinZheng.power = "";
      $scope.modal.show();
    };

    $scope.closeModal = function () {

      $scope.modal.hide();
    };

    $scope.saveAndCloseModal = function () {

      if ($scope.xinZheng.type == "Tm170" || $scope.xinZheng.type == "Yb169" || $scope.xinZheng.type == "Co60") {
        alert("所选放射源暂不支持");
      }
      else {

        $scope.addItem($scope.xinZheng.type, $scope.xinZheng.date, $scope.xinZheng.power);

        window.localStorage.setItem('fangSheYuanPeiZhi', angular.toJson($scope.fangSheYuanList));
        window.localStorage.setItem('fangSheYuanSeq', $scope.fangSheYuanSeq);
        shareService.setFangSheYuan($scope.fangSheYuanList);
        $scope.modal.hide();
      }
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
  .controller('XinZengFangSheYuanCtrl', function ($scope) {

  }
)
;
