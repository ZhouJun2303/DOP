var levelControl = require("./levelControl");
var posCheck = require('./posCheckControl');
cc.Class({
    extends: cc.Component,

    properties: {
        fullPic:cc.Sprite,  //完整图
        incomplete:cc.Sprite,//残缺图
        promptPic:cc.Sprite,    //提示图

        gamePicPar:cc.Node,  //游戏图片父节点
    },

    // LIFE-CYCLE CALLBACKS:
    
    onLoad () {
        this.levelControl = new levelControl();
        this.levelControl.init(this);//关卡控制初始化
        this.showLevel();
    },

    /**
     * 
     */
    showLevel(){
        this.incomplete.node.active = true;
    },

    /**
     * 所有图片隐藏
     */
    _hideAllPic(){
        this.fullPic.active = false;
        this.incomplete.active = false;
        this.promptPic.active = false;
    },
    
    /**
     * 显示提示
     */
    _showPrompt(){
        //todo
    }

    // update (dt) {},
});
