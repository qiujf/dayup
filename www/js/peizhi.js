/**
 * Created by qiujf on 2015/11/7.
 */
angular.module('starter.controllers')

  .controller('FangSheYuanCtrl', function($scope,$ionicModal,shareService) {
  //Data






    var fangSheYuanSeq = window.localStorage.getItem('fangSheYuanSeq');
    if(fangSheYuanSeq!=null){
      $scope.fangSheYuanSeq = fangSheYuanSeq;
    }else{
      $scope.fangSheYuanSeq = 1;
    }

    var fangSheYuanPeiZhiLiteral = window.localStorage.getItem('fangSheYuanPeiZhi');

    if(fangSheYuanPeiZhiLiteral!=null) {
      $scope.fangSheYuanList = angular.fromJson(fangSheYuanPeiZhiLiteral);
    }else{
      $scope.fangSheYuanList = [];
    }

    $scope.xinZheng ={
      type:"",
      date:"",
      power:0
    }


    $scope.data = {
      showDelete: false
    };

    $scope.edit = function(item) {
      alert('Edit Item: ' + item.id);
    };
    $scope.share = function(item) {
      alert('Share Item: ' + item.id);
    };



    $scope.onItemDelete = function(item) {
      $scope.fangSheYuanList.splice($scope.fangSheYuanList.indexOf(item), 1);
      window.localStorage.setItem('fangSheYuanPeiZhi',angular.toJson($scope.fangSheYuanList));
    };

    $scope.addItem =function(type,date,power){
     var item = {id:0,type:"",data:""};
      item.id = $scope.fangSheYuanSeq;
      $scope.fangSheYuanSeq++;
      item.type = type;
      item.date = date;
      item.power = power;

      $scope.fangSheYuanList.splice($scope.fangSheYuanList.length,0,item);

    }

    $scope.showTimePicker = function() {
      var options = {date: new Date(), mode: 'time'};
      $cordovaDatePicker.show(options).then(function(date){
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
      $scope.xinZheng.type="";
      $scope.xinZheng.date="";
      $scope.xinZheng.power=0;
      $scope.modal.show();
    };
    $scope.closeModal = function () {

      $scope.modal.hide();
    };
    $scope.saveAndCloseModal = function () {

      $scope.addItem($scope.xinZheng.type,$scope.xinZheng.date,$scope.xinZheng.power);

      window.localStorage.setItem('fangSheYuanPeiZhi',angular.toJson($scope.fangSheYuanList));
      window.localStorage.setItem('fangSheYuanSeq',$scope.fangSheYuanSeq);
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



  })
  .controller('XinZengFangSheYuanCtrl',function($scope){

  }
)
;
