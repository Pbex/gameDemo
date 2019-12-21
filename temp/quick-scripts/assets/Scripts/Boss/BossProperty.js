(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Boss/BossProperty.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '236f5NiMu9ETq67VnzUzFlS', 'BossProperty', __filename);
// Scripts/Boss/BossProperty.js

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
var timer = 0;

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
        health: 500,
        state1: 250,
        state2: 100, //the certian number that makes the movement of boss become different
        crashHandler: cc.Node,
        blinking: false
    },

    // LIFE-CYCLE CALLBACKS:
    onCrash: function onCrash() {

        this.crashHandler.getComponent('OnCrash').onCrash();
    },

    // onLoad () {},

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == 'playerBullet') {
            this.health--;
            // console.log('boss hit by bullet');
        } else if (other.node.group == 'bullet') {
            this.health -= 3;
            other.getComponent('Bullet').onHit();
        } else if (other.node.group == 'crash') {
            this.health -= 5;
            self.getComponent('BossProperty').onCrash();
        }
        if (!this.blinking) {
            this.blinking = true;
            var finished = cc.callFunc(function () {
                this.blinking = false;
            }, this, false);
            var seq = cc.sequence(cc.blink(0.3, 3), finished);
            this.node.runAction(seq);
        }
        if (this.health < 0) {
            cc.director.loadScene("GameWin");
        }
    },

    start: function start() {},
    update: function update(dt) {}
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
        //# sourceMappingURL=BossProperty.js.map
        