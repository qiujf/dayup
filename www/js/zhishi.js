angular.module('starter.controllers')
.controller('GalleryCtrl', function($scope, $ionicBackdrop, $ionicModal, $ionicPopup,$ionicSlideBoxDelegate, $ionicScrollDelegate) {

  $scope.allImages = [{
    name:"透照厚度",
    type:"text",
    src: '射线照射方向上材料的公称厚度。多层透照时，透照厚度为通过的各层材料公称厚度之和，不考虑余高。'
  }, {
    name:"工件至胶片距离",
    type:"text",
    src: '沿射线束中心测定的工件受检部位射线源侧表面与胶片之间的距离，需考虑余高。'
  }, {
    name:"射线源至工件距离",
    type:"text",
    src: '沿射线束中心测定的射线源与工件受检部位射线源侧表面之间的距离。'
  }, {
    name:"焦距",
    type:"text",
    src: '沿射线束中心测定的射线源与胶片之间的距离，需考虑余高。'
  }, {
    name:"双胶片透照技术",
    type:"text",
    src: '暗盒内两张胶片和三片增感屏（前、中、后屏）进行曝光，在观片灯上采用双片叠加方式进行底片观察的透照技术。'
  }, {
    name:"小管径",
    type:"text",
    src: '外直径Do小于或等于100mm的管子。'
  }, {
    name:"射线胶片分类",
    type:"text",
    src: '胶片系统按照GB/T 19348.1分为六类，即C1、C2、C3、C4、C5和C6类。C1为最高类别，C6为最低类别。'
  },{
    name:"射线胶片分类(表)",
    type:"img",
    src: 'img/jpxt.png'
  },{
    name:"增感屏选用原则",
    type:"text",
    src: '射线检测一般应使用金属增感屏或不用增感屏，应完全干净、抛光和无纹道且与胶片接触良好。'
  },{
    name:"增感屏选用原则(表)",
    type:"img",
    src: 'img/zgp.png'
  },{
    name:"透照厚度比",
    type:"text",
    src: '一次透照长度范围内射线束穿过母材的最大厚度和最小厚度之比。各技术等级下允许的透照厚度比。'
  },{
    name:"透照厚度比(表)",
    type:"img",
    src: 'img/tzhdb.png'
  },{
    name:"小径管透照布置",
    type:"text",
    src: '小径管环向焊接接头采用双壁双影透照布置，当同时满足下列两条件时应采用倾斜透照方式椭圆成像： T（壁厚）≤8mm；g（焊缝宽度）≤Do/4。椭圆成像时，应控制影像的开口宽度（上下焊缝投影最大间距）在1倍焊缝宽度左右。不满足上述条件或椭圆成像有困难时可采用垂直透照方式重叠成像。'
  },{
    name:"小径管环向焊接接头的透照次数",
    type:"text",
    src: '小径管环向焊接接头100%检测的透照次数；采用倾斜透照椭圆成像时，当T/Do≤0.12时，相隔90°透照2次。当T/Do>0.12时，相隔120°或60°透照3次。垂直透照重叠成像时，一般应相隔120°或60°透照3次。'
  },{
    name:"X射线",
    type:"text",
    src: '在保证穿透力的前提下，X射线照相应选用较低的管电压。在采用较高管电压时，应保证适当的曝光量。'
  },{
    name:"X射线最高透照管电压(表)",
    type:"img",
    src: 'img/xdy.png'
  },{
    name:"γ射线和高能X射线",
    type:"text",
    src: '采用源在内中心透照方式，在保证像质计灵敏度达到要求的前提下，允许γ射线的最小透照厚度取表五下限值的1/2。采用其他透照方式，在采取有效补偿措施并保证像质计灵敏度达到要求的前提下,经合同双方商定，A级，AB级技术的Ir192源的最小透照厚度可降至10mm，Se75源的最小厚度可降至5mm。'
  },{
    name:"γ射线,X射线透照厚度范围(表)",
    type:"img",
    src: 'img/sxtzfw.png'
  },{
    name:"A级和B级射线诺模图",
    type:"img",
    src: 'img/pmt.png'
  },{
    name:"AB级射线射线诺模图",
    type:"img",
    src: 'img/pmt2.png'
  },{
    name:"底片黑度",
    type:"text",
    src: '单胶片透照技术，单底片观察评定，底片评定范围内的黑度的D应符合下列规定：A级：1.5≤D≤4.5；AB级：2.0≤D≤4.5；B级：2.3≤D≤4.5。'
  },{
    name:"线性像质计灵敏度(表)（单壁透照，源侧）",
    type:"img",
    src: 'img/xzjyc.png'
  },{
    name:"线性像质计灵敏度(表)（双壁双影，源侧）",
    type:"img",
    src: 'img/xzjsxc.png'
  },{
    name:"线性像质计灵敏度(表)（双壁单/双影，胶片侧）",
    type:"img",
    src: 'img/xzjjpc.png'
  },{
    name:"源在外单壁透照环向焊接接头,K=1.06,透照次数",
    type:"img",
    src: 'img/tzcs1.png'
  },{
    name:"其他方式透照环向焊接接头,K=1.06,透照次数",
    type:"img",
    src: 'img/tzcs2.png'
  },{
    name:"源在外单壁透照环向焊接接,K=1.1,透照次数",
    type:"img",
    src: 'img/tzcs3.png'
  },{
    name:"其他方式透照环向焊接接头,K=1.1,透照次数",
    type:"img",
    src: 'img/tzcs4.png'
  },{
    name:"源在外单壁透照环向焊接接头,K=1.2,透照次数",
    type:"img",
    src: 'img/tzcs5.png'
  },{
    name:"其他方式透照环向焊接接头,K=1.2,透照次数",
    type:"img",
    src: 'img/tzcs6.png'
  }];

  $scope.zoomMin = 1;

    $scope.showImages = function(index) {


      if($scope.allImages[index].type=="text"){
        $scope.zhishi = $scope.allImages[index].src;
        var myPopup = $ionicPopup.show({
          template: '<span style="color:black">{{zhishi}}</span>',
          title: '<h4><b>知识查阅</b></h4>',
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
      }else {
        $scope.imagesrc = $scope.allImages[index].src;
        $scope.activeSlide = index;
        $scope.showModal('templates/gallery-zoomview.html');
      }
    };

    $scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
    };

    $scope.updateSlideStatus = function(slide) {
      //var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
      //if (zoomFactor == $scope.zoomMin) {
      //  $ionicSlideBoxDelegate.enableSlide(true);
      //} else {
      //  $ionicSlideBoxDelegate.enableSlide(false);
      //}
    };

});/**
 * Created by qiujf on 2015/11/28.
 */
