"use strict";
cc._RF.push(module, 'd7421T6s2lKdpdutrvJ1soW', 'JoyStick');
// Scripts/JoyStick.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        stick: {
            type: cc.Node,
            default: null
        },
        max_r: 80,
        stopMoving: true
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.start_pos = cc.v2(0, 0);
        this.stick.setPosition(this.start_pos);

        this.dir = cc.v2(0, 0);

        this.stick.on(cc.Node.EventType.TOUCH_START, function () {}.bind(this), this);

        this.stick.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            this.stopMoving = false;
            var w_pos = e.getLocation();
            var pos = this.node.convertToNodeSpaceAR(w_pos);
            var len = pos.mag();

            /* 好处
            归一化，一个方向，只有一个值;
            this.dir.x = cos(r);
            this.dir.y = sin(r);
            // -1, 1
            */
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;

            if (len > this.max_r) {
                // 三角函数或者比例关系算坐标
                pos.x = pos.x * this.max_r / len;
                pos.y = pos.y * this.max_r / len;
            }
            this.stick.setPosition(pos);
        }.bind(this), this);

        this.stick.on(cc.Node.EventType.TOUCH_END, function () {
            //方向最后不矫正了,会有强制矫正方向的问题
            // this.dir = cc.v2(0, 0);
            this.stick.setPosition(this.start_pos);
            this.stopMoving = true;
        }.bind(this), this);

        this.stick.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            // this.dir = cc.v2(0, 0);
            this.stick.setPosition(this.start_pos);
            this.stopMoving = true;
        }.bind(this), this);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();