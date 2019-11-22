// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var lerpVal=0;//插值参数
var nodePos=new cc.v2(0,0);
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
        target:{
            default:null,
            type:cc.Node
        },
        gameManager:{
            default:null,
            type:cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:
    move(){
        this.node.position=cc.v2((this.node.position.x+(this.target.position.x-this.node.position.x)*lerpVal),
            (this.node.position.y+(this.target.position.y-this.node.position.y)*lerpVal));
    },

    onLoad () {
        lerpVal=this.gameManager.getComponent('GameManager').lerpVal;
    },


    start () {

    },

    update (dt) {
        this.move();
    },
});
