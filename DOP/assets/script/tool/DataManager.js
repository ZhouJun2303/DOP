cc.Class({
    extends: cc.Component,

    properties: {

    },

    initData: function () {
        this.loginData = {}
    },
    
    //APP配置
    setAppConfig: function (data) {
        this.appConfig = data;
    },

    //存储关卡配置
    savaLevelConfig:function(curLevel){
        return this.saveData("DOPgameLevelconfig",curLevel);
    },
    //读取关卡配置
    getLevelConfig:function(){
        return this.getData("DOPgameLevelconfig");
    },

    //获取App配置
    getAppConfig: function () {
        return this.appConfig;
    },

    saveData: function (key, val) {
        return cc.sys.localStorage.setItem(key, val)
    },

    getData: function (key) {
        return cc.sys.localStorage.getItem(key)
    },

    removeData: function (key) {
        cc.sys.localStorage.removeItem(key)
    },

   
});
