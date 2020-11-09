var levelConfig = require("../config/LevelConfig");
cc.Class({
    extends: cc.Component,

    properties: {
       curLevel:null,
    },

    init:function(game){
        this.gameControl = game; //gameControl
        this.curLevel = this._getLevel();
        this._refreshLevel();
        this.loadLevel();
    },

    /**
     * 加载关卡 && 预加载下一关
     */
    loadLevel(){
        cc.vv.Tool.loadTexture(this.gameControl.fullPic,"gameLevelRes/2");
        cc.vv.Tool.loadTexture(this.gameControl.incomplete,"gameLevelRes/1");
    },
    
    /**
     * 获取当前关卡
     */
    _getLevel:function(){
        var curLevel = cc.vv.DataManager.getLevelConfig();
        if(!curLevel){
            console.log("第一次进游戏");
            curLevel  = 1;
            //todo，微信云存储
            cc.vv.DataManager.savaLevelConfig(curLevel);
            return curLevel;
        }else{
            return curLevel;
        }
    },

    /**
     * 刷新关卡配置
     */
    _refreshLevel:function(){
        levelConfig.curLevel = this.curLevel;
    }

    // update (dt) {},
});
