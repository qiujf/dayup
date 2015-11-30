// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myapp = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.gongyi', {
        url: '/gongyi',
        views: {
          'tab-gongyi': {
            templateUrl: 'templates/tab-gongyi.html',
            controller: 'GongyiCtrl'
          }
        }
      })

      .state('tab.canshu', {
        url: '/canshu',
        views: {
          'tab-canshu': {
            templateUrl: 'templates/tab-canshu.html',
            controller: 'CanshuCtrl'
          }
        }
      })

      .state('tab.lishi', {
        url: '/lishi',
        views: {
          'tab-lishi': {
            templateUrl: 'templates/tab-lishi.html',
            controller: 'HistoryCtrl'
          }
        }
      })
      .state('tab.zhishi', {
        url: '/zhishi',
        views: {
          'tab-zhishi': {
            templateUrl: 'templates/tab-zhishi.html',
            controller: 'ZhishiCtrl'
          }
        }
      })


      .state('tab.peizhi', {
        url: '/peizhi',
        views: {
          'tab-peizhi': {
            templateUrl: 'templates/tab-peizhi.html',
            controller: 'FangSheYuanCtrl'
          }
        }
      })


      .state('tab.fangsheyuanpeizhi', {
        url: '/peizhi/fangsheyuanpeizhi',
        views: {
          'tab-peizhi': {
            templateUrl: 'templates/peizhi/fangsheyuanpeizhi.html',
            controller: 'FangSheYuanCtrl'
          }
        }
      })

      .state('tab.banzhuang', {
        url: '/gongyi/banzhuang',
        views: {
          'tab-gongyi': {
            templateUrl: 'templates/gongyi/banzhuang.html',
            controller: 'BanzhuangCtrl'
          }
        }
      })

      .state('tab.xiaojinguan', {
        url: '/gongyi/xiaojinguan',
        views: {
          'tab-gongyi': {
            templateUrl: 'templates/gongyi/xiaojinguan.html',
            controller: 'XiaoJinGuanCtrl'
          }
        }
      })

      .state('tab.zhongkoujing', {
        url: '/gongyi/zhongkoujing',
        views: {
          'tab-gongyi': {
            templateUrl: 'templates/gongyi/zhongkoujing.html',
            controller: 'ZhongKouJingCtrl'
          }
        }
      })

      .state('tab.banzhuanglishi', {
        url: '/lishi/banzhuang/:id',
        views: {
          'tab-lishi': {
            templateUrl: 'templates/gongyi/banzhuang.html',
            controller: 'BanzhuangCtrl'
          }
        }
      })
      .state('tab.xiaojinguanlishi', {
        url: '/lishi/xiaojinguan/:id',
        views: {
          'tab-lishi': {
            templateUrl: 'templates/gongyi/xiaojinguan.html',
            controller: 'XiaoJinGuanCtrl'
          }
        }
      })
      .state('tab.zhongkoujinglishi', {
        url: '/lishi/zhongkoujing/:id',
        views: {
          'tab-lishi': {
            templateUrl: 'templates/gongyi/zhongkoujing.html',
            controller: 'ZhongKouJingCtrl'
          }
        }
      })

      .state('tab.canshujihebuqiangxidu', {
        url: '/canshu/jihebuqingxidu',
        views: {
          'tab-canshu': {
            templateUrl: 'templates/canshu/jihebuqingxidu.html',
            controller: 'CanShuJiHeBuQingXiDuCtrl'
          }
        }
      })

      .state('tab.canshushexianyuanqiangdu', {
        url: '/canshu/shexianyuanqiangdu',
        views: {
          'tab-canshu': {
            templateUrl: 'templates/canshu/shexianyuanqiangdu.html',
            controller: 'CanShuSheXianYuanCtrl'
          }
        }
      })
      .state('tab.canshutouzhaohoudu', {
        url: '/canshu/touzhaohoudu',
        views: {
          'tab-canshu': {
            templateUrl: 'templates/canshu/touzhaohoudu.html',
            controller: 'CanShuTouZhaoHouDuCtrl'
          }
        }
      })
      .state('tab.canshuzuixiaojiaoju', {
        url: '/canshu/zuixiaojiaoju',
        views: {
          'tab-canshu': {
            templateUrl: 'templates/canshu/zuixiaojiaoju.html',
            controller: 'CanShuZuiXiaoJiaoJuCtrl'
          }
        }
      })
      .state('tab.canshuhuyidinglv', {
        url: '/canshu/huyidinglv',
        views: {
          'tab-canshu': {
            templateUrl: 'templates/canshu/huyidinglv.html',
            controller: 'CanShuHuYiDingLvCtrl'
          }
        }
      })
      .state('tab.canshupingyijuli', {
        url: '/canshu/pingyijuli',
        views: {
          'tab-canshu': {
            templateUrl: 'templates/canshu/pingyijuli.html',
            controller: 'CanShuPingYiJuLiCtrl'
          }
        }
      });
    /*
     以下部分仅供参考，以后删除
     */

    /*  .state('tab.chats', {
     url: '/chats',
     views: {
     'tab-chats': {
     templateUrl: 'templates/tab-chats.html',
     controller: 'ChatsCtrl'
     }
     }
     })
     .state('tab.chat-detail', {
     url: '/chats/:chatId',
     views: {
     'tab-chats': {
     templateUrl: 'templates/chat-detail.html',
     controller: 'ChatDetailCtrl'
     }
     }
     })

     .state('tab.account', {
     url: '/account',
     views: {
     'tab-account': {
     templateUrl: 'templates/tab-account.html',
     controller: 'AccountCtrl'
     }
     }

     });

     */
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/gongyi');

  })
  .config(function ($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
    $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
  });


