"use strict";
cc._RF.push(module, '22720Fxj1NEkJ6WbU58Ws2E', 'GameManager');
// Scripts/GameManager.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var targetScore = new Array(500, 1000, 2000);
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
        health: 3,
        score: 0,
        lerpVal: 0.5
    },

    // LIFE-CYCLE CALLBACKS:
    decreaseHealth: function decreaseHealth() {
        this.health--;
    },
    getHealth: function getHealth() {
        return this.health;
    },
    addScore: function addScore() {
        this.score += this.health;
    },
    getScore: function getScore() {
        return this.score;
    },
    gameOver: function gameOver() {
        cc.director.loadScene("GameOver");
    },
    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        cc.game.addPersistRootNode(this.node);
    },
    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();