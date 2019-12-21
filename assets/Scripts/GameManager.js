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
        gameTime: 0,
        target:0,
        bulletCount:0,

        playerLifeLabel:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:
    decreaseHealth(){
        this.health--;
        console.log(this.health);
    },

    getHealth(){
        return this.health;
    },

    addGameTime() {
        this.gameTime++;
    },

    getGameTime(){
        return this.gameTime;
    },
    setGameTime(time){
        this.gameTime=time;
    },

    //prove can't be used
    bulletAdd(){
        // console.log('game manager bullet add');
        
        this.bulletCount++;
        // console.log('game manager bullet add done');
    },
    //prove can't be used
    bulletDecrease(){
        console.log(this.bulletCount);
        
        this.bulletCount--;
    },
    

    getBullet(){
        return this.bulletCount;
    },



    gameOver(){
        cc.director.loadScene("GameOver");
    },

    onLoad () {
        // cc.game.addPersistRootNode(this.node);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        // cc.game.addPersistRootNode(this.node);
    },

    start () {

    },

    update (dt) {
        timer+=dt;
        if (timer>1) {
            this.addGameTime();
            timer=0;
        }
        this.playerLifeLabel.string="Life: "+(this.getHealth()+1);
    },
});
