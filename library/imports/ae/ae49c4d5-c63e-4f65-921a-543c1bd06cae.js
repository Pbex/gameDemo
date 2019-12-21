"use strict";
cc._RF.push(module, 'ae49cTVxj5PZZIaVDwb0Gyu', 'SkillActor');
// Scripts/player/SkillActor.js

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


var crashTimer = 0;
var crashTime = 5;
var crashing = false;
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
        boss: cc.Node,
        crashIcon: cc.Node,
        crash: cc.Node,
        logic: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:
    activateSkill: function activateSkill(id) {
        switch (id) {
            case 0:
                //crash skill
                this.crashIcon.active = true;
                break;
            case 1:
                //add bullet
                this.logic.getComponent('GameLogic').bulletNum++;
                break;
            case 2:
                // playerBulletTime*=0.8; 
                break;
            default:
                break;
        }
        this.boss.active = true;
        this.logic.getComponent('GameLogic').startShooting();
    },
    crashStart: function crashStart() {
        crashing = true;
        this.crash.active = true;
        this.logic.getComponent('GameLogic').stopShooting();
        console.log('speed problem');
        this.node.parent.getComponent('PlayerControl').speed *= 4;
        console.log('speed no problem');
        this.node.parent.group = 'default'; //player can't be touch while crash
        this.node.group = 'crash';
        cc.director.getScheduler().schedule(this.blink, this, 3, 1, 0, false);
    },
    blink: function blink() {
        var action = cc.blink(2, 10);
        this.crash.runAction(action);
    },
    crashEnd: function crashEnd() {
        this.crash.active = false;
        this.node.group = 'default';
        this.node.parent.group = 'player';
        this.node.parent.getComponent('PlayerControl').speed /= 4;
        this.logic.getComponent('GameLogic').startShooting();
        crashing = false;
    },


    // onLoad () {},

    start: function start() {},
    update: function update(dt) {
        if (crashing) {
            crashTimer += dt;
            if (crashTimer > 10) {
                crashTimer = 0;
                this.crashEnd();
            }
        }
    }
});

cc._RF.pop();