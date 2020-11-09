cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        let cb = () => {
            //进度条
            cc.director.loadScene("game");
        }
        /**
         * 初始化辅助模块
         */
        let initModel = function (cb) {
            cc.vv = {};
            //Tool工具函数
            cc.vv.Tool = require("../Tool/Tool");
            //本地数据管理模块
            var dataManager = require("../Tool/DataManager");
            cc.vv.DataManager = new dataManager();
            cc.vv.DataManager.initData()
            //声音管理模块
            var Audio = require("../Tool/AudioMgr");
            cc.vv.AudioMgr = new Audio();
            cc.vv.AudioMgr.initData();
            cb();
        };
        initModel(cb);
        
    },

    start() {

    },

    // update (dt) {},
});