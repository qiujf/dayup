angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };

})
  .service("shareService", function() {

    var banZhuangProps={
      shiJiJiaoJu:0,
      touZhaoHouDu:0,
      fangSheYuan:"",
      jiaoJuanPinPai:"",
      jiaoJuanXingHao:"",
      jiaoPianXiuZhengXiShu:0,
      baoGuangLiang:0
    };

    var fangSheYuanList;

    var fangSheYuanPeiZhiLiteral = window.localStorage.getItem('fangSheYuanPeiZhi');

    if(fangSheYuanPeiZhiLiteral!=null) {
      fangSheYuanList = angular.fromJson(fangSheYuanPeiZhiLiteral);
    }else{
      fangSheYuanList = [];
    }


    this.getFangSheYuan = function() {
      return fangSheYuanList;
    };
    this.setFangSheYuan = function (fangSheYuan) {
      fangSheYuanList = fangSheYuan;
    }

  })

  .service("historyService", function () {

    var historyList;
    var historyListLiteral = window.localStorage.getItem('history');
    if (historyListLiteral != null) {
      historyList = angular.fromJson(historyListLiteral);
      console.log("get history");
      console.log(historyList);
    } else {
      historyList = [];
    }

    this.setAndSaveHistoryList = function (list) {
      historyList = list;
      var temp = angular.toJson(historyList);
      window.localStorage.setItem('history', temp);
    };

    this.getItem = function (index) {
      return historyList[index];
    };

    this.getHistoryList = function () {
      return historyList;
    };
    this.save = function (item) {
      var isNew = true;
      for (var i = 0; i < historyList.length; i++) {
        if (historyList[i].id == item.id) {
          historyList.splice(i, 1, item);
          isNew = false;
        }
      }
      if (isNew) {
        historyList.splice(historyList.length, 0, item);
      }
      var temp = angular.toJson(historyList);

      console.log(historyList);
      console.log("set history");
      window.localStorage.setItem('history', temp);
    }

  })
;
