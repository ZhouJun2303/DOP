cc.Class({
    extends: cc.Component,
    statics:
    {
        // 更换图片
        loadTexture: function (sprite, path) {
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    console.log("err path", path);
                    return;
                }
                sprite.spriteFrame = spriteFrame
            })
        },

        // 更换按钮图片
        loadButton: function (sprite, path1, path2) {
            cc.loader.loadRes(path1, cc.SpriteFrame, function (err, spriteFrame) {
                sprite.normalSprite = spriteFrame
            })

            cc.loader.loadRes(path2, cc.SpriteFrame, function (err, spriteFrame) {
                sprite.pressedSprite = spriteFrame
            })
        },

        // 加载预制体
        loadPrefab: function (path, callBack) {
            cc.loader.loadRes(path, cc.Prefab, function (err, prefab) {
                if (err) {
                    console.log("加载预制体出错 path:" + path);
                } else {
                    callBack(prefab)
                }

            })
        },

        /**
        * 判断手机设备
        */
        getDevicetype: function () {
            if (cc.sys.OS_IOS) {
                return 1;
            } else if (cc.sys.OS_ANDROID) {
                return 2;
            } else {
                return 3;
            }
        },
    },



    onLoad() { },

    // update (dt) {},
});
