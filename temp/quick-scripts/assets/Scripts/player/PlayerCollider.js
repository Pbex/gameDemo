(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/player/PlayerCollider.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '450e9GvU/NCTICQys89Fb/u', 'PlayerCollider', __filename);
// Scripts/player/PlayerCollider.js

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
var untouchableTime = 5;
var isUntouchable = false;

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
        stick: {
            default: null,
            type: cc.Node
        },
        id: 0,
        untouchableTimer: 0
    },

    // LIFE-CYCLE CALLBACKS:
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == 'bullet') //检测碰撞组
            {
                other.getComponent('Bullet').onHit();
            }
        console.log('collision enter');
        if (self.group == 'player') {
            this.gameManager.getComponent('GameManager').decreaseHealth();
            self.group = 'default';
            console.log('scheduler problem');

            cc.director.getScheduler().schedule(this.touchable(), this, 5, 1, 0, false);
            console.log('scheduler problem');
        }
    },

    touchable: function touchable() {
        this.node.group = 'player';
    },
    destoryCall: function destoryCall() {
        if (this.id == 0) {
            this.gameOver();
        }
    },
    gameOver: function gameOver() {
        this.gameManager.getComponent('GameManager').gameOver();
    },
    onLoad: function onLoad() {
        var anim = this.getComponent(cc.Animation);
        var animState = anim.play();
        animState.wrapMode = cc.WrapMode.Loop;
        animState.repeatCount = Infinity;
    },
    start: function start() {},
    update: function update(dt) {
        // Math.atan2(y,x) 计算出来的结果angel是一个弧度值 数学的弧度是逆时针的 而游戏中是顺时针的
        var angel = Math.atan2(this.stick.getComponent('JoyStick').dir.y, this.stick.getComponent('JoyStick').dir.x);
        var degree = angel * 180 / Math.PI;
        degree = degree - 90;
        this.node.angle = degree;

        // console.log(this.gameManager.getComponent('GameManager').getHealth());

        if (this.gameManager.getComponent('GameManager').getHealth() == this.id) {
            var anim = this.getComponent(cc.Animation);
            anim.play('defeated');
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
        //# sourceMappingURL=PlayerCollider.js.map
        