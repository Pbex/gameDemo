"use strict";
cc._RF.push(module, 'b3c41K1Y0hIbaVfsXSZzz8N', 'Button');
// Scripts/Button.js

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
        startButton: cc.Button,
        helpButton: cc.Button,
        quitButton: cc.Button
    },

    // LIFE-CYCLE CALLBACKS:
    onBtnStart: function onBtnStart() {
        cc.director.loadScene('GameItself');
    },
    onBtnhelp: function onBtnhelp() {
        cc.director.loadScene('Help');
    },
    onBtnQuit: function onBtnQuit() {
        cc.game.end();
    },

    // onLoad () {},

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();