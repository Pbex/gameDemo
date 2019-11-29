// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var timer=0;
var targetScore=new Array(500,1000,2000);
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
        health:3,
        lerpVal: 0.5,
        score: 0,
        target:0
    },

    // LIFE-CYCLE CALLBACKS:
    decreaseHealth(){
        this.health--;
    },

    getHealth(){
        return this.health;
    },

    addScore() {
        this.score+=this.health;
    },

    getScore(){
        return this.score;
    },

    gameOver(){
        cc.director.loadScene("GameOver");
    },

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        cc.game.addPersistRootNode(this.node);
    },

    start () {

    },

    update (dt) {
        timer+=dt;
        if (timer>1) {
            this.addScore();
            timer=0;
        }

    },
});
