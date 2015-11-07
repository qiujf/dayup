/**
 * Created by qiujf on 2015/11/7.
 */
angular.module('starter.controllers')

  .controller('FangSheYuanCtrl', function($scope,$ionicModal) {
  //Data


    $scope.fangSheYuanSeq=0;


    var fangSheYuanPeiZhiLiteral = window.localStorage.getItem('fangSheYuanPeiZhi');

    if(fangSheYuanPeiZhiLiteral!=null) {
      $scope.fangShenYuanList = angular.fromJson(fangSheYuanPeiZhiLiteral);
    }else{
      $scope.fangShenYuanList = [];
    }

    $scope.xinZheng ={
      type:"",
      date:"",
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
      $scope.fangShenYuanList.splice($scope.fangShenYuanList.indexOf(item), 1);
      window.localStorage.setItem('fangSheYuanPeiZhi',angular.toJson($scope.fangShenYuanList));
    };

    $scope.addItem =function(type,date){
     var item = {id:0,type:"",data:""};
      item.id = $scope.fangSheYuanSeq++;
      item.type = type;
      item.date = date;

      $scope.fangShenYuanList.splice($scope.fangShenYuanList.length,0,item);

    }


    $ionicModal.fromTemplateUrl('templates/peizhi/xinzengfangsheyuan.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.xinZheng.type="";
      $scope.xinZheng.date=""
      $scope.modal.show();
    };
    $scope.closeModal = function () {

      $scope.modal.hide();
    };
    $scope.saveAndCloseModal = function () {

      $scope.addItem($scope.xinZheng.type,$scope.xinZheng.date);

      window.localStorage.setItem('fangSheYuanPeiZhi',angular.toJson($scope.fangShenYuanList));
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
