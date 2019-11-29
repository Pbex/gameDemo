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
        health:1000,
        state1:666,
        state2:333,//the certian number that makes the movement of boss become different
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onCollisionEnter:function(other,self){
        if(other.node.group == 'playerBullet'){
            this.health--;
            // console.log('boss hit by bullet');
            
        }else if(other.node.group == 'bullet'){
            this.health-=5;
            other.getComponent('Bullet').onHit();
        }

        if (this.health<0) {
            cc.director.loadScene("GameWin");
        }
    },

    start () {

    },

    update (dt) {

    },
});
