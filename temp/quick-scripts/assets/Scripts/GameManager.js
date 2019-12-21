(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/GameManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '22720Fxj1NEkJ6WbU58Ws2E', 'GameManager', __filename);
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
var timer = 0;
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
        lerpVal: 0.5,
        gameTime: 0,
        target: 0,
        bulletCount: 0,

        playerLifeLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:
    decreaseHealth: function decreaseHealth() {
        this.health--;
        console.log(this.health);
    },
    getHealth: function getHealth() {
        return this.health;
    },
    addGameTime: function addGameTime() {
        this.gameTime++;
    },
    getGameTime: function getGameTime() {
        return this.gameTime;
    },
    setGameTime: function setGameTime(time) {
        this.gameTime = time;
    },


    //prove can't be used
    bulletAdd: function bulletAdd() {
        // console.log('game manager bullet add');

        this.bulletCount++;
        // console.log('game manager bullet add done');
    },

    //prove can't be used
    bulletDecrease: function bulletDecrease() {
        console.log(this.bulletCount);

        this.bulletCount--;
    },
    getBullet: function getBullet() {
        return this.bulletCount;
    },
    gameOver: function gameOver() {
        cc.director.loadScene("GameOver");
    },
    onLoad: function onLoad() {
        // cc.game.addPersistRootNode(this.node);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        // cc.game.addPersistRootNode(this.node);
    },
    start: function start() {},
    update: function update(dt) {
        timer += dt;
        if (timer > 1) {
            this.addGameTime();
            timer = 0;
        }
        this.playerLifeLabel.string = "Life: " + (this.getHealth() + 1);
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
        //# sourceMappingURL=GameManager.js.map
        