"use strict";
cc._RF.push(module, '4a5aa0mmVFLVK14FCz4uZUc', 'GameLogic');
// Scripts/GameLogic.js

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
var bulletTimer = 0;
var directionTimer = 0;
var counter = 0;
var bulletDirection = 0;
var playerBulletTimer = 0;
var playerBulletTime = 0.5;

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

        boss: cc.Node,
        bossGenerateScore: 1000,

        slowStone: cc.Prefab,
        normalStone: cc.Prefab,
        fastStone: cc.Prefab,
        playerBullet: cc.Prefab,

        player: cc.Node,

        directionSwapTime: 30,
        bulletSpeed: 1,
        bulletGenerateTime: 1,

        scoreLabel: {
            default: null,
            type: cc.Label
        },

        radar: cc.Node,

        generateBullets: true
    },

    addSpeed: function addSpeed() {
        this.bulletGenerateTime -= 0.25;
    },


    generateRandomPos: function generateRandomPos() {
        var randX = 0;
        var randY = 0;
        switch (bulletDirection) {
            case 0:
                //bullets come from up
                randX = (Math.random() - 0.5) * this.node.width;
                randY = this.node.height / 2;
                break;
            case 1:
                //bullets come from right
                randX = this.node.width / 2;
                randY = (Math.random() - 0.5) * this.node.height;
                break;
            case 2:
                //bullets come from down
                randX = (Math.random() - 0.5) * this.node.width;
                randY = -this.node.height / 2;
                break;
            case 3:
                //bullets come from left
                randX = -this.node.width / 2;
                randY = (Math.random() - 0.5) * this.node.height;
                break;
            default:
                break;
        }
        return cc.v2(randX, randY);
    },

    spawnNewBullets: function spawnNewBullets(speedUp) {
        switch (speedUp) {
            case 4:
                var newBullet = cc.instantiate(this.fastStone);
                break;
            case 2:
                var newBullet = cc.instantiate(this.normalStone);
                break;
            case 1:
                var newBullet = cc.instantiate(this.slowStone);
                break;
            default:
                break;
        }

        this.node.addChild(newBullet); //add node to canvas
        newBullet.setPosition(this.generateRandomPos());
        newBullet.getComponent('Bullet').direction = bulletDirection;
        newBullet.getComponent('Bullet').switchDir();
        newBullet.getComponent('Bullet').speed = this.bulletSpeed * speedUp;
        newBullet.getComponent('Bullet').maxX = this.node.width;
        newBullet.getComponent('Bullet').maxY = this.node.height;
    },

    stopBulletGeneration: function stopBulletGeneration() {
        this.generateBullets = false;
    },
    startBulletGeneration: function startBulletGeneration() {
        this.generateBullets = true;
    },
    bulletGenerator: function bulletGenerator(dt) {
        if (directionTimer > this.directionSwapTime) {
            // console.log('direction changed');

            bulletDirection++;
            directionTimer = 0;
            bulletDirection %= 4;
            this.addSpeed();
        }
        if (bulletTimer > this.bulletGenerateTime) {
            bulletTimer = 0;
            if (counter < 4) {
                this.spawnNewBullets(4);
            } else if (counter < 7) {
                this.spawnNewBullets(2);
            } else {
                this.spawnNewBullets(1);
            }
            counter++;
            counter %= 10;
        }
        bulletTimer += dt;
        directionTimer += dt;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},


    // start () {

    // },

    update: function update(dt) {
        if (this.generateBullets) {
            this.bulletGenerator(dt);
        }
        playerBulletTimer += dt;
        if (this.gameManager.getComponent('GameManager').getScore() > this.bossGenerateScore) {
            this.radar.active = false;
            this.boss.active = true;
            this.stopBulletGeneration();
            if (playerBulletTimer > playerBulletTime) {

                var newBullet = cc.instantiate(this.playerBullet);
                this.node.addChild(newBullet);
                newBullet.setPosition(this.player.position);
                newBullet.getComponent('PlayerBullet').moveBullet(this.boss.position);
                playerBulletTimer = 0;
            }
        } else if (this.gameManager.getComponent('GameManager').getScore() > this.bossGenerateScore - 30) {
            this.radar.active = true;
        }
    }
});

cc._RF.pop();