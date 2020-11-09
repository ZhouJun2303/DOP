
cc.Class({
    extends: cc.Component,

    properties: {
        drawNode: cc.Graphics,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var gestureMgr = require("../gestrec/GestureMgr");
        this.gestureMgr = new gestureMgr();
        this.gestureMgr.init();

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.path = [];
        this.basetime = null;
    },

    start() {

    },

    addPoint(x, y) {
        let t = Date.now() - this.basetime;
        let w = cc.winSize.width, h = cc.winSize.height;
        x = x / w, y = (h - y) / h;
        let point = this.gestureMgr.newPoint(x, y, t);
        this.path.push(point);
    },

    getTouchPoint(event) {
        let point = event.getLocation();
        return this.node.convertToNodeSpaceAR(point);
    },

    onTouchStart(event) {
        // event.stopPropagation();
        this._clear();
        let touch = this.getTouchPoint(event);
        let [x, y] = [touch.x, touch.y];
        this.drawNode.moveTo(x, y);

        this.path = [];
        this.basetime = Date.now();
        this.addPoint(x, y);
    },

    onTouchMove(event) {
        event.stopPropagation();
        let touch = this.getTouchPoint(event);
        let [x, y] = [touch.x, touch.y];
        this._draw(x, y);
        this.addPoint(x, y);
    },

    onTouchEnd(event) {
        // event.stopPropagation();
        this._clear();
        this.basetime = null;
        let result =  this.gestureMgr.gestureComparison(this.path);
        console.log(result);
    },

    /**
     * 清除
     */
    _clear() {
        this.drawNode.clear();
    },

    /**
     * 绘制
     */
    _draw(x, y) {
        this.drawNode.lineTo(x, y);
        this.drawNode.stroke();
        this.drawNode.moveTo(x, y);
    }
    // update (dt) {},
});
