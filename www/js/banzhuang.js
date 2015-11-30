/**
 * Created by qiujf on 2015/10/24.
 */

angular.module('starter.controllers')

  .controller('BanzhuangCtrl', function ($scope, $stateParams, $ionicPopup, $ionicModal, shareService, historyService) {

    $scope.enableSaving = true;
    //初始化
    var historyId = $stateParams.id;
    if (historyId != null) {
      var item = historyService.getItem(historyId);

      $scope.id = item.id;
      $scope.banZhuang = item.banZhuang;
      $scope.baoGuangLiang = item.baoGuangLiang;
      calcYuanQiangDu();
      setFangSheYuanOptions();
      calcBaoGuangShiJian();
    } else {
      $scope.id = (new Date()).getTime();

      //板状工艺
      $scope.banZhuang = {
        gongChengHouDu: "",
        touZhaoFangShi: "DBDY",
        touZhaoDengJi: "A",
        xiangZhiJi: "",
        touZhaoHouDu: "",
        jiaoPianJuLi: "",
        youXiaoJiaoDianChiCun: "",
        zuiXiaoJiaoJu: "",
        shiJiJiaoJu: "",
        k: 1.03,
        yiCiTouZhaoChangDu: "",
        baoGuangLiang: "",
        baoGuangliang_tbq: "",
        fangSheYuanList: [],
        fangSheYuan: "",
        yuanQiangDu: "",
        baoGuangShiJian: ""
      };

      //曝光量参数，用于曝光量Modal
      $scope.baoGuangLiang = {
        shiJiJiaoJu: "",
        touZhaoHouDu: "",
        fangSheYuanType: "",
        jiaoJuanPinPai: "",
        jiaoJuanXingHao: "",
        jiaoPianXiuZhengXiShuDefault: "",
        jiaoPianXiuZhengXiShu: "",
        baoGuangLiang: "",
        baoGuangliang_tbq: ""
      }
    }

    //透照方式Option
    $scope.banZhuangOpt = {
      touZhaoFangShi: [{selected: true, name: "单壁单影", value: "DBDY"}],
      touZhaoDengJi: [{selected: true, name: "A", value: "A"}, {
        selected: false,
        name: "AB",
        value: "AB"
      }, {selected: false, name: "B", value: "B"}]

    };

    $scope.xiangZhiJi = {
      A: [
        {no: 17, size: 0.080, gchd: 1.2},
        {no: 16, size: 0.100, gchd: 2},
        {no: 15, size: 0.125, gchd: 3.5},
        {no: 14, size: 0.160, gchd: 5.0},
        {no: 13, size: 0.20, gchd: 7.0},
        {no: 12, size: 0.25, gchd: 10},
        {no: 11, size: 0.32, gchd: 15},
        {no: 10, size: 0.40, gchd: 25},
        {no: 9, size: 0.50, gchd: 32},
        {no: 8, size: 0.63, gchd: 40},
        {no: 7, size: 0.80, gchd: 55},
        {no: 6, size: 1.00, gchd: 85},
        {no: 5, size: 1.25, gchd: 150},
        {no: 4, size: 1.60, gchd: 250},
        {no: 3, size: 2.00, gchd: 350},
        {no: 2, size: 2.50, gchd: 9999999}
      ],

      AB: [
        {no: 18, size: 0.063, gchd: 1.2},
        {no: 17, size: 0.080, gchd: 2.0},
        {no: 16, size: 0.100, gchd: 3.5},
        {no: 15, size: 0.125, gchd: 5.0},
        {no: 14, size: 0.160, gchd: 7.0},
        {no: 13, size: 0.20, gchd: 10},
        {no: 12, size: 0.25, gchd: 15},
        {no: 11, size: 0.32, gchd: 25},
        {no: 10, size: 0.40, gchd: 32},
        {no: 9, size: 0.50, gchd: 40},
        {no: 8, size: 0.63, gchd: 55},
        {no: 7, size: 0.80, gchd: 85},
        {no: 6, size: 1.00, gchd: 150},
        {no: 5, size: 1.25, gchd: 250},
        {no: 4, size: 1.60, gchd: 350},
        {no: 3, size: 2.00, gchd: 999999}
      ],

      B: [
        {no: 19, size: 0.050, gchd: 1.5},
        {no: 18, size: 0.063, gchd: 2.5},
        {no: 17, size: 0.080, gchd: 4.0},
        {no: 16, size: 0.100, gchd: 6.0},
        {no: 15, size: 0.125, gchd: 8.0},
        {no: 14, size: 0.160, gchd: 12},
        {no: 13, size: 0.20, gchd: 20},
        {no: 12, size: 0.25, gchd: 30},
        {no: 11, size: 0.32, gchd: 35},
        {no: 10, size: 0.40, gchd: 45},
        {no: 9, size: 0.50, gchd: 65},
        {no: 8, size: 0.63, gchd: 120},
        {no: 7, size: 0.80, gchd: 200},
        {no: 6, size: 1.00, gchd: 350},
        {no: 5, size: 1.25, gchd: 9999999}
      ]
    };

    $scope.youXiaoJiaoDianList = [
      {name: 2, value: 2},
      {name: 2.5, value: 2.5},
      {name: 3, value: 3},
      {name: "自定义", value: ""},
    ];

    /**
     * Internal functions
     */


    function getXiangZhiJi(list, dengji, gchd) {
      var temp;
      if (dengji == "A") {
        temp = list.A;
      } else if (dengji == "AB") {
        temp = list.AB;
      } else if (dengji == "B") {
        temp = list.B;
      }
      var i;
      for (i = 0; i < temp.length; i++) {
        if (gchd <= temp[i].gchd) {
          break;
        }
      }
      return temp[i];
    }

    function calcXiangZhiJi() {
      var xiangZhiJi = getXiangZhiJi($scope.xiangZhiJi, $scope.banZhuang.touZhaoDengJi, $scope.banZhuang.gongChengHouDu);
      $scope.banZhuang.xiangZhiJi = "源侧：" + xiangZhiJi.no + "(" + xiangZhiJi.size + ")";
    }

    function calcBaoGuangLiang() {
      var fangSheYuanType = $scope.banZhuang.fangSheYuanList[$scope.banZhuang.fangSheYuan];
      if (fangSheYuanType.type == "Se75") {
        $scope.baoGuangLiang.baoGuangLiang = 0.000083337 * $scope.baoGuangLiang.jiaoPianXiuZhengXiShu *
          Math.pow($scope.banZhuang.shiJiJiaoJu, 2) * Math.pow(2, $scope.banZhuang.touZhaoHouDu / 10);
      } else if (fangSheYuanType.type == "Ir192") {
        $scope.baoGuangLiang.baoGuangLiang = 0.0000738 * $scope.baoGuangLiang.jiaoPianXiuZhengXiShu *
          Math.pow($scope.banZhuang.shiJiJiaoJu, 2) * Math.pow(1.77, $scope.banZhuang.touZhaoHouDu / 10);
      }else if(fangSheYuanType.type=="Co60"){
        $scope.baoGuangLiang.baoGuangLiang = Math.pow(Math.E,$scope.baoGuangLiang.touZhaoHouDu/20) * $scope.baoGuangLiang.jiaoPianXiuZhengXiShu *
          Math.pow($scope.banZhuang.shiJiJiaoJu, 2) *0.160;
      }
      $scope.banZhuang.baoGuangLiang = $scope.baoGuangLiang.baoGuangLiang;


      $scope.banZhuang.baoGuangLiang = Math.round($scope.banZhuang.baoGuangLiang * 10000) / 10000;
      $scope.banZhuang.baoGuangliang_tbq = Math.round($scope.banZhuang.baoGuangLiang * 10000 * 0.037) / 10000;
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
      $scope.banZhuang.yiCiTouZhaoChangDu = Math.round(2 * ($scope.banZhuang.shiJiJiaoJu - $scope.banZhuang.gongChengHouDu - 2) / Math.tan(Math.asin(1 / $scope.banZhuang.k)) * 100) / 100;
    }

    function calcTouZhaoHouDu() {
      $scope.banZhuang.touZhaoHouDu = $scope.banZhuang.gongChengHouDu;
    }

    function calcJiaoPianJuLi() {
      $scope.banZhuang.jiaoPianJuLi = $scope.banZhuang.gongChengHouDu + 2;
    }

    function setFangSheYuanOptions() {
      var sheXian = [];
      if ($scope.banZhuang.touZhaoDengJi == "A" || $scope.banZhuang.touZhaoDengJi == "AB") {
        if ($scope.banZhuang.touZhaoHouDu >= 10 && $scope.banZhuang.touZhaoHouDu <= 40) {
          sheXian.splice(0, 0, "Se75");
        }

        if ($scope.banZhuang.touZhaoHouDu >= 20 && $scope.banZhuang.touZhaoHouDu <= 100) {
          sheXian.splice(0, 0, "Ir192");
        }

        if ($scope.banZhuang.touZhaoHouDu >= 40 && $scope.banZhuang.touZhaoHouDu <= 200) {
          sheXian.splice(0, 0, "Co60");
        }

      }

      if ($scope.banZhuang.touZhaoDengJi == "B") {
        if ($scope.banZhuang.touZhaoHouDu >= 14 && $scope.banZhuang.touZhaoHouDu <= 40) {
          sheXian.splice(0, 0, "Se75");
        }

        if ($scope.banZhuang.touZhaoHouDu >= 20 && $scope.banZhuang.touZhaoHouDu <= 90) {
          sheXian.splice(0, 0, "Ir192");
        }

        if ($scope.banZhuang.touZhaoHouDu >= 60 && $scope.banZhuang.touZhaoHouDu <= 150) {
          sheXian.splice(0, 0, "Co60");
        }
      }


      var fangSheYuan = shareService.getFangSheYuan();
      $scope.banZhuang.fangSheYuanList = [];
      for (var i = 0; i < fangSheYuan.length; i++) {
        for (var j = 0; j < sheXian.length; j++) {
          if (sheXian[j] == fangSheYuan[i].type) {
            $scope.banZhuang.fangSheYuanList.splice($scope.banZhuang.fangSheYuanList.length, 0, fangSheYuan[i]);
          }
        }
      }


      //$scope.banZhuang.fangSheYuan = -1;
      $scope.banZhuang.yuanQiangDu = 0;
      $scope.banZhuang.baoGuangShiJian = 0;
    }

    function calcYuanQiangDu() {
      var fangSheYuan = $scope.banZhuang.fangSheYuanList[$scope.banZhuang.fangSheYuan];
      var dateLiteral = fangSheYuan.date;
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
      if (fangSheYuan.type == "Se75") {
        curPower = fangSheYuan.power * Math.pow(0.5, days / 120);
      } else if (fangSheYuan.type == "Ir192") {
        curPower = fangSheYuan.power * Math.pow(0.5, days / 74);
      } else if (fangSheYuan.type == "Co60") {
        curPower = fangSheYuan.power * Math.pow(0.5, days / 1935);
      }

      $scope.banZhuang.yuanQiangDu = Math.round(curPower * 10000) / 10000;
    }

    function calcBaoGuangShiJian() {
      $scope.banZhuang.baoGuangShiJian = Math.round(($scope.banZhuang.baoGuangLiang / $scope.banZhuang.yuanQiangDu) * 100) / 100;

      if ($scope.banZhuang.baoGuangShiJian < 1 && $scope.banZhuang.baoGuangShiJian > 0) {

        var myPopup = $ionicPopup.show({
          template: '<span style="color:red">曝光时间小于一分钟，请增大实际焦距至{{getTuijianJiaoju().toString()}}mm以上</span>',
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

        })

      }
    }

    $scope.getTuijianJiaoju = function () {
      var fangSheYuanType = $scope.banZhuang.fangSheYuanList[$scope.banZhuang.fangSheYuan];
      var jiaoJu = 0;
      if (fangSheYuanType.type == "Se75") {
        jiaoJu = Math.ceil(Math.pow($scope.banZhuang.yuanQiangDu / (0.000083337 * $scope.baoGuangLiang.jiaoPianXiuZhengXiShu * Math.pow(2, $scope.banZhuang.touZhaoHouDu / 10)), 0.5));
      } else if (fangSheYuanType.type == "Ir192") {
        jiaoJu = Math.ceil(Math.pow($scope.banZhuang.yuanQiangDu / (0.0000738 * $scope.baoGuangLiang.jiaoPianXiuZhengXiShu * Math.pow(1.77, $scope.banZhuang.touZhaoHouDu / 10)), 0.5));

      }
      return jiaoJu;
    };

    /**
     * UI functions
     */

    $scope.save = function () {
      var item = {};
      item.id = $scope.id;

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


      item.date = yyyy + "-" + mm + "-" + dd;
      item.typeShort = "banzhuang";
      item.type = "板状工件";
      item.banZhuang = $scope.banZhuang;
      item.baoGuangLiang = $scope.baoGuangLiang;
      historyService.save(item);

      var myPopup = $ionicPopup.show({
        template: '',
        title: '<h3><b>保存成功</b></h3>',
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

      })


    };

    $scope.onGongChengHouDuChange = function () {
      calcXiangZhiJi();
      calcTouZhaoHouDu();
      calcJiaoPianJuLi();
      calcValueOfK();
      calcZuiXiaoJiaoJu();
      if ($scope.banZhuang.shiJiJiaoJu < $scope.banZhuang.zuiXiaoJiaoJu) {
        $scope.banZhuang.shiJiJiaoJu = $scope.banZhuang.zuiXiaoJiaoJu;
      }
      calcYiCiTouZhaoChangDu();
      setFangSheYuanOptions();
      calcBaoGuangLiang();
      calcBaoGuangShiJian();
    };

    $scope.onTouZhaoDengjiChange = function () {
      calcXiangZhiJi();
      calcValueOfK();
      calcZuiXiaoJiaoJu();
      if ($scope.banZhuang.shiJiJiaoJu < $scope.banZhuang.zuiXiaoJiaoJu) {
        $scope.banZhuang.shiJiJiaoJu = $scope.banZhuang.zuiXiaoJiaoJu;
      }
      calcYiCiTouZhaoChangDu();
      setFangSheYuanOptions();
      calcBaoGuangLiang();
      calcBaoGuangShiJian();
    };

    $scope.onYouXiaoJiaoDianChiCun = function () {
      calcZuiXiaoJiaoJu();
      if ($scope.banZhuang.shiJiJiaoJu < $scope.banZhuang.zuiXiaoJiaoJu) {
        $scope.banZhuang.shiJiJiaoJu = $scope.banZhuang.zuiXiaoJiaoJu;
      }
      calcYiCiTouZhaoChangDu();
      calcBaoGuangLiang();
      calcBaoGuangShiJian();

    };

    $scope.onShiJiJiaoJuChange = function () {

      if ($scope.banZhuang.shiJiJiaoJu < $scope.banZhuang.zuiXiaoJiaoJu) {
        var myPopup = $ionicPopup.show({
          template: '<span style="color:red">实际焦距不能小于最小焦距</span>',
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
        $scope.banZhuang.shiJiJiaoJu = $scope.banZhuang.zuiXiaoJiaoJu;
      }
      calcYiCiTouZhaoChangDu();
      calcBaoGuangLiang();
      calcBaoGuangShiJian();
    };


    $scope.onFangSheYuanChange = function () {
      calcBaoGuangLiang();
      calcYuanQiangDu();
      calcBaoGuangShiJian();
    };


    $scope.onBaoGuangLiangChange = function () {
      calcBaoGuangShiJian();
    };

    $scope.onYuanQiangDuChange = function () {
      calcBaoGuangShiJian();
    };


    $ionicModal.fromTemplateUrl('templates/baoguangliang.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {

      $scope.baoGuangLiang.shiJiJiaoJu = $scope.banZhuang.shiJiJiaoJu;
      $scope.baoGuangLiang.touZhaoHouDu = $scope.banZhuang.touZhaoHouDu;
      $scope.baoGuangLiang.fangSheYuanType = $scope.banZhuang.fangSheYuanList[$scope.banZhuang.fangSheYuan].type;

      $scope.modal.show();
    };
    $scope.closeModal = function () {

      $scope.modal.hide();
    };
    $scope.saveAndCloseModal = function () {

      $scope.banZhuang.baoGuangLiang = $scope.baoGuangLiang.baoGuangLiang;
      $scope.banZhuang.baoGuangliang_tbq = $scope.baoGuangLiang.baoGuangliang_tbq;
      $scope.modal.hide();
      $scope.onBaoGuangLiangChange();
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

    $scope.setYouXiaoJiaoDianChiCun = function (value) {
      $scope.banZhuang.youXiaoJiaoDianChiCun = value;
      $scope.onYouXiaoJiaoDianChiCun();
    };

    /**
     * 内部测试
     */


    $scope.getBanZhuang = function () {
      /*    alert($scope.banZhuang.gongChengHouDu + "|" + $scope.banZhuang.touZhaoFangShi + "|" + $scope.banZhuang.touZhaoDengJi + "|" + $scope.banZhuang.touZhaoHouDu
       + "|" + $scope.banZhuang.zuiXiaoJiaoJu + "|" + $scope.banZhuang.shiJiJiaoJu + "|" + $scope.banZhuang.yiCiTouZhaoChangDu + "|" + $scope.banZhuang.baoGuangLiang
       + "|" + $scope.banZhuang.yuanQiangDu + "|" + $scope.banZhuang.baoGuangShiJian);*/
      alert(angular.toJson($scope.banZhuang));
    };
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


  });

