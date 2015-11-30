/**
 * Created by qiujf on 2015/11/7.
 */
angular.module('starter.controllers')

  .controller('FangSheYuanCtrl', function ($scope, $ionicModal, $ionicPopup, shareService) {
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
      } else if (type == "Co60") {
        curPower = startPower * Math.pow(0.5, days / 1935);
      } else if (type == "Tm170") {
        curPower = startPower * Math.pow(0.5, days / 128);
      } else if (type == "Yb169") {
        curPower = startPower * Math.pow(0.5, days / 32);
      }

      return Math.round(curPower * 100) / 100;
    }

    $scope.idx =0;
    $scope.fangSheYuan = {
      id:"",
      type: "",
      rongQi:"",
      fangSheYuan: "",
      date: "",
      power: "",
      curPower: 0
    };


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

    $scope.addItem = function (type, rongQi, fangSheYuan,date, power) {
      var item = {id: 0, type: "", data: ""};
      item.id = $scope.fangSheYuanSeq;
      $scope.fangSheYuanSeq++;
      item.type = type;
      item.rongQi = rongQi;
      item.fangSheYuan = fangSheYuan,
        item.date = date;
      item.power = power;
      item.curPower = getCurPower(type, date, power);

      $scope.fangSheYuanList.splice($scope.fangSheYuanList.length, 0, item);

    };

    $scope.showTimePicker = function () {
      var options = {date: new Date(), mode: 'time'};
      $cordovaDatePicker.show(options).then(function (date) {
        $scope.timeFieldInModel = date;
      });
    };

    $scope.editRongQi = function(index){
      $scope.idx = index;
      $scope.fangSheYuan.rongQi = $scope.fangSheYuanList[index].rongQi;
      var myPopup = $ionicPopup.show({
        templateUrl: "templates/modal/editRongQi.html",
        title: '<h3><b>修改容器编号</b></h3>',
        scope: $scope,
        buttons: [
          {
            text: '<b>确定</b>',
            type: 'button-positive',
            onTap: function (e) {
              return true;
            }
          } ,  {
            text: '<b>取消</b>',
            type: 'button-positive',
            onTap: function (e) {
              return false;
            }
          }
        ]
      });
      myPopup.then(function (res) {
        if(res){
          $scope.fangSheYuanList[$scope.idx].rongQi = $scope.fangSheYuan.rongQi;
          saveFangSheYuan();
        }
      })
    };

    $ionicModal.fromTemplateUrl('templates/peizhi/xinzengfangsheyuan.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.fangSheYuan.type = "";
      $scope.fangSheYuan.fangSheYuan = "";

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
      $scope.fangSheYuan.power = "";
      $scope.modal.show();
    };

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


      }
    };

    $scope.closeModal = function () {

      $scope.modal.hide();
    };

    function saveFangSheYuan() {
      window.localStorage.setItem('fangSheYuanPeiZhi', angular.toJson($scope.fangSheYuanList));
      window.localStorage.setItem('fangSheYuanSeq', $scope.fangSheYuanSeq);
    }

    $scope.saveAndCloseModal = function () {


      $scope.addItem($scope.fangSheYuan.type,$scope.fangSheYuan.rongQi, $scope.fangSheYuan.fangSheYuan, $scope.fangSheYuan.date, $scope.fangSheYuan.power);
      saveFangSheYuan();
      shareService.setFangSheYuan($scope.fangSheYuanList);
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

    $scope.showAboutUs = function () {

      var myPopup = $ionicPopup.show({
        templateUrl: "templates/modal/aboutus.html",
        title: '<h3><b>联系我们</b></h3>',
        scope: $scope,
        buttons: [
          {
            text: '<b>确定</b>',
            type: 'button-positive',
            onTap: function (e) {
              return $scope.search;
            }
          }
        ]
      });
      myPopup.then(function (res) {
        search(res);
        saveFangSheYuan();
      })

    };
    $scope.showSoftware = function () {

      var myPopup = $ionicPopup.show({
        templateUrl: "templates/modal/software.html",
        title: '<h3><b>软件信息</b></h3>',
        scope: $scope,
        buttons: [
          {
            text: '<b>确定</b>',
            type: 'button-positive',
            onTap: function (e) {
              return $scope.search;
            }
          }
        ]
      });
      myPopup.then(function (res) {
        search(res);
      })

    }


  }


)
;
