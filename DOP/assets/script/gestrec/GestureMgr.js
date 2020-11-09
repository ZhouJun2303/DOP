//手势识别
var GesturesData = require("../../resources/gameLevelConfig/Gestures");
var gestrec = require('./gestrec');
var MAX_SCORE = require("../config/gestrecConfig/getureConfig").MAX_SCORE;
var THRESHOLD = require("../config/gestrecConfig/getureConfig").THRESHOLD;
cc.Class({
    extends: cc.Component,

    properties: {

    },

  
    /**
     * 初始化手势库
     */
    init() {
        //加载手势识别库
        this._store = gestrec.GestureStore.fromJSON(GesturesData);
    },

    newPoint(x, y, t) {
        return new gestrec.Point(x, y, t);
    },

    _normalize(points) {
        var xmin = Number.MAX_VALUE,
            ymin = Number.MAX_VALUE,
            xmax = 0,
            ymax = 0,
            len = points.length,
            i, dx, dy;

        for (i = 0; i < len; ++i) {
            if (points[i].x < xmin) xmin = points[i].x;
            if (points[i].y < ymin) ymin = points[i].y;
            if (points[i].x > xmax) xmax = points[i].x;
            if (points[i].y > ymax) ymax = points[i].y;
        }

        dx = xmax - xmin;
        dy = ymax - ymin;
        if (dx > dy) {
            ymin -= (dx - dy) / 2;
            dy += (dx - dy);
        } else {
            xmin -= (dy - dx) / 2;
            dx += (dy - dx);
        }

        for (i = 0; i < len; ++i) {
            points[i].x = 0.1 + 0.8 * (points[i].x - xmin) / dx;
            points[i].y = 0.1 + 0.8 * (points[i].y - ymin) / dy;
        }

        return points;
    },

    _newGesture(points) {
        points = this._normalize(points);
        let strokes = [new gestrec.Stroke(points)];
        return new gestrec.Gesture(strokes);
    },

    _recognize(gesture) {
        let r = this._store.recognize(gesture),
            msg = '手势（未识别）';
        let score = Math.min(r.length && r[0].score || 0, MAX_SCORE);
        if (score > THRESHOLD) {
            msg = `识别结果：手势(${r[0].name}) 相似度(${score.toFixed(2)})`;
        } else {
            msg = `识别结果：未知`;
        }
        // console.log(msg);
        return msg;
    },

    /**
     * 识别检测入口
     * @param {Array} path 
     */
    gestureComparison: function (path) {
        let gesture = this._newGesture(path);
        return this._recognize(gesture);
    }

});