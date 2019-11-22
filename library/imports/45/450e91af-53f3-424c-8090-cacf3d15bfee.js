"use strict";
cc._RF.push(module, '450e9GvU/NCTICQys89Fb/u', 'PlayerCollider');
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
var untouchableTime = 10;
var isUntouchable = false;
var untouchableTimer = 0;
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
        id: 0
    },

    // LIFE-CYCLE CALLBACKS:
    // LIFE-CYCLE CALLBACKS:
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == 'bullet') //检测碰撞组
            {
                console.log("on hit");
                this.gameManager.getComponent('GameManager').decreaseHealth();
                other.getComponent('Bullet').onHit();
                this.node.group = 'default';
                isUntouchable = true;

                //碰撞则播放动画
                // other.node.removeFromParent();
                // this.hp -= 1;
                // if(this.hp == 0 )
                // {
                //   //  enemyReq.add_Score();
                //      this.node.group = 'default'; //防止播放爆炸动画时继续检测导致神奇的事情发生
                //      var en = this.node.getComponent(cc.Animation);
                //      var na = this.node.name;
                //     en.play(na+"_des"); //播放动画
                //      en.on('finished',function(e){
                //             this.node.removeFromParent();
                //            // var score = this.node.getComponent(cc.Label);   
                //      },this); 
                // }
            }
    },

    destoryCall: function destoryCall() {
        if (this.id == 0) {
            this.gameOver();
        } else {
            this.node.destroy();
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
        if (this.gameManager.getComponent('GameManager').getHealth() == this.id) {

            var anim = this.getComponent(cc.Animation);
            anim.play('defeated');
        }
        if (isUntouchable) {
            if (this.node.group != 'default') {
                this.node.group = 'default';
            }
            untouchableTimer += dt;
            if (untouchableTimer > untouchableTime) {
                isUntouchable = false;
                this.node.group = 'player';
                untouchableTimer = 0;
            }
        } else {
            if (this.node.group != 'player') {
                this.node.group = 'player';
            }
        }
    }
});

cc._RF.pop();