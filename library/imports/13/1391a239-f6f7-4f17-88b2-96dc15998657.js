"use strict";
cc._RF.push(module, '1391aI59vdPF4iyltwVmYZX', 'AI');
// Scripts/Boss/AI.js

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

var movingLeft = true;
var movingWidth = 0;
var coolDownTimer = 0;
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
        gameManager: cc.Node,
        player: cc.Node,
        doingSth: false,
        canvas: cc.Node,
        bullet: cc.Prefab,
        coolDownTime: 5, //boss skill have cool down time, not continueously
        chargingTime: 2, //the time cost of charging or moving back
        chargingCurvRate: 2, //doingSth is running according to a curve certian rate
        bulletSpeed: 150,
        speed: 100 //the horizon moving speed of boss
    },

    // LIFE-CYCLE CALLBACKS:
    moveDown: function moveDown() {
        var xBias = this.node.position.x - this.player.position.x;
        if (xBias < 10 && xBias > -10) {
            this.doingSth = true;
            var finished = cc.callFunc(function (mov) {
                this.doingSth = false;
                var anim = this.getComponent(cc.Animation);
                anim.play('idle');
            }, this, false);

            var lastPos = this.node.position;
            var moveBackAction = cc.moveTo(this.chargingTime, lastPos);
            moveBackAction.easing(cc.easeElasticOut(this.chargingCurvRate));

            var target = this.player.position;
            var moveDownAction = cc.moveTo(this.chargingTime, target);
            moveDownAction.easing(cc.easeOut(this.chargingCurvRate));

            var seq = cc.sequence(moveDownAction, moveBackAction, finished);

            this.node.runAction(seq);

            var anim = this.getComponent(cc.Animation);
            anim.play('charge');
        }
    },
    moveHorizontal: function moveHorizontal(dt) {
        // console.log(dt * this.speed);
        // console.log(movingLeft);
        // console.log(this.node.position.x);


        if (movingLeft) {
            this.node.position = new cc.Vec2(this.node.position.x - dt * this.speed, this.node.position.y);
        } else {
            this.node.position = new cc.Vec2(this.node.position.x + dt * this.speed, this.node.position.y);
        }

        if (this.node.position.x > movingWidth) {
            movingLeft = true;
        } else if (this.node.position.x < -movingWidth) {
            movingLeft = false;
        }
    },
    initPos: function initPos() {
        this.doingSth = true;
        var initialPos = cc.v2(this.node.position.x, this.canvas.height / 2);
        var finished = cc.callFunc(function (mov) {
            this.doingSth = false;
        }, this, false);
        var seq = cc.sequence(cc.moveTo(2, initialPos), finished);
        this.node.runAction(seq);
    },
    movingLogic: function movingLogic(dt) {
        this.moveHorizontal(dt);
        this.moveDown();
    },
    generateSingleBullet: function generateSingleBullet(direction, yBias) {
        // console.log('bullet Direction: '+direction);
        // console.log('bullet y pos: '+this.player.position.y);
        // console.log('bullet x pos: '+this.canvas.width/2);
        var newBullet = cc.instantiate(this.bullet);
        this.canvas.addChild(newBullet);
        if (direction == 1) {
            //see Bullet.js, comes from right
            newBullet.setPosition(cc.v2(this.canvas.width / 2, this.player.position.y + yBias));
        } else {
            //see Bullet.js, comes from left(3)
            newBullet.setPosition(cc.v2(-this.canvas.width / 2, this.player.position.y + yBias));
        }
        newBullet.getComponent('Bullet').direction = direction;
        newBullet.getComponent('Bullet').gameManager = this.gameManager;
        newBullet.getComponent('Bullet').switchDir();
        newBullet.getComponent('Bullet').speed = this.bulletSpeed;
        newBullet.getComponent('Bullet').maxX = this.canvas.width;
        newBullet.getComponent('Bullet').maxY = this.canvas.height;
    },
    generateBullets: function generateBullets() {
        var anim = this.getComponent(cc.Animation);
        anim.play('charge');
        for (var bias = -120; bias < 121; bias += 60) {
            this.generateSingleBullet(1, bias);
            this.generateSingleBullet(3, bias);
        }
        this.doingSth = false;
    },
    skillChoice: function skillChoice(dt) {
        if (coolDownTimer > this.coolDownTime) {
            this.doingSth = true;
            var maxVal = 1;
            var minVal = 0;
            var choice = Math.floor((Math.random() + 0.5) * (maxVal - minVal));
            switch (choice) {
                case 0:
                    this.generateBullets();
                    break;

                default:
                    this.doingSth = false;
                    break;
            }
            coolDownTimer = 0;
        }
        coolDownTimer += dt;
    },
    onLoad: function onLoad() {
        var anim = this.getComponent(cc.Animation);
        anim.play('idle');
        movingWidth = this.canvas.width / 2;
        // movingWidth = this.canvas.width / 2 - this.node.width / 2;
    },


    //node active action
    onEnable: function onEnable() {
        this.initPos();
    },
    start: function start() {},
    update: function update(dt) {
        // console.log(this.doingSth);
        if (this.doingSth) {//can't use other logic while doing something

        } else {
            this.movingLogic(dt);
            this.skillChoice(dt);
        }
    }
});

cc._RF.pop();