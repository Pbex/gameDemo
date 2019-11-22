(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Bullet.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a6c9fa1FspNqotG3sxR2gro', 'Bullet', __filename);
// Scripts/Bullet.js

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
        stopBullet: false
    },

    // LIFE-CYCLE CALLBACKS:
    onHit: function onHit() {
        var anim = this.getComponent(cc.Animation);
        this.stopBullet = true;
        anim.play('stone_break').wrapMode = cc.WrapMode.Normal;
    },

    onHitEnd: function onHitEnd() {
        this.node.destroy();
    },
    moveBullet: function moveBullet(dt) {
        // console.log(this.speed);
        switch (this.direction) {
            case 0:
                //comes from up
                if (this.node.position.y < -this.maxY) {
                    // console.log('destroy bullet');
                    this.node.destroy();
                }
                this.node.position = new cc.Vec2(this.node.position.x, this.node.position.y - this.speed * dt);
                break;
            case 1:
                if (this.node.position.x < -this.maxX) {
                    this.node.destroy();
                }
                this.node.position = new cc.Vec2(this.node.position.x - this.speed * dt, this.node.position.y);
                break;
            case 2:
                if (this.node.position.y > this.maxY) {
                    this.node.destroy();
                }
                this.node.position = new cc.Vec2(this.node.position.x, this.node.position.y + this.speed * dt);
                break;
            case 3:
                if (this.node.position.x > this.maxX) {
                    this.node.destroy();
                }
                this.node.position = new cc.Vec2(this.node.position.x + this.speed * dt, this.node.position.y);
                break;

            default:
                break;
        }
    },

    switchDir: function switchDir() {
        switch (this.direction) {
            case 1:
                this.node.angle = 270;
                break;
            case 2:
                this.node.angle = 180;
                break;
            case 3:
                this.node.angle = 90;
                break;
            default:
                break;
        }
    },
    onLoad: function onLoad() {
        var anim = this.getComponent(cc.Animation);
        anim.play().wrapMode = cc.WrapMode.Loop;
        anim.play().repeatCount = Infinity;
    },
    start: function start() {},
    update: function update(dt) {
        if (!this.stopBullet) {
            this.moveBullet(dt);
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
        //# sourceMappingURL=Bullet.js.map
        