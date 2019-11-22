(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/player/PlayerControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '42c9bJ4n1lP/L7+iXqR+K3Y', 'PlayerControl', __filename);
// Scripts/player/PlayerControl.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
        gameManager: {
            default: null,
            type: cc.Node
        },
        canvas: {
            default: null,
            type: cc.Node
        },
        stick: {
            default: null,
            type: cc.Node
        },
        speed: 80,

        playerIndex: 0
    },

    // onLoad () {},

    start: function start() {},


    //更新位置，与joystick相关联
    update: function update(dt) {
        if (this.stick.getComponent('JoyStick').dir.mag() < 0.5 || this.stick.getComponent('JoyStick').stopMoving) {
            return;
        }

        var vx = this.stick.getComponent('JoyStick').dir.x * this.speed;
        var vy = this.stick.getComponent('JoyStick').dir.y * this.speed;

        this.node.x += vx * dt;
        this.node.y += vy * dt;
        if (this.node.x > this.canvas.width / 2) {
            this.node.x = this.canvas.width / 2;
        }if (this.node.x < -this.canvas.width / 2) {
            this.node.x = -this.canvas.width / 2;
        }
        if (this.node.y > this.canvas.height / 2) {
            this.node.y = this.canvas.height / 2;
        }
        if (this.node.y < -this.canvas.height / 2) {
            this.node.y = -this.canvas.height / 2;
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=PlayerControl.js.map
        