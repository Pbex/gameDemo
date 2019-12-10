(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/help/helpStrings.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '679e0rKZlVHZ40jjYE7Xbyt', 'helpStrings', __filename);
// Scripts/help/helpStrings.js

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
var currentState = 0;
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
        guideString: [cc.String],
        label: cc.Label,
        JoyStick: cc.Node,
        stone: cc.Node,
        radar: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    setState: function setState() {
        console.log('set State' + currentState);
        currentState++;
        switch (currentState) {
            case 0:
                this.label.string = this.guideString[currentState];
                this.JoyStick.active = true;
                this.stone.active = false;
                this.radar.active = false;
            case 1:
                this.label.string = this.guideString[currentState];
                this.JoyStick.active = false;
                this.stone.active = true;
                this.radar.active = false;
                break;
            case 2:
                this.label.string = this.guideString[currentState];
                this.JoyStick.active = false;
                this.stone.active = false;
                this.radar.active = true;
                break;
            case 3:
                cc.director.loadScene('GameMenu');
            default:
                break;
        }
    },

    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.setState, this);
        this.guideString = ['摇杆控制移动', '在旅行时会遇到陨石，碰撞陨石会损失运输仓，\n若没有运输仓可以损失了，飞船就会爆炸', '雷达：宇宙中存在着危险的东西，\n雷达出现反应代表有未知热源接近'];
        this.label.string = this.guideString[currentState];
    },
    start: function start() {}
}

// update (dt) {},
);

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
        //# sourceMappingURL=helpStrings.js.map
        