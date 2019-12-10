// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
        crash0: cc.Prefab,
        crash1: cc.Prefab,
        crash2: cc.Prefab,
        crash3: cc.Prefab,
        crash4: cc.Prefab,
        crash5: cc.Prefab,

    },

    // LIFE-CYCLE CALLBACKS:
    onCrash() {
        var randomIdx = Math.floor(Math.random() * 6);
        switch (randomIdx) {
            case 0:
                this.node.addChild(cc.instantiate(this.crash0));
                break;
            case 1:
                this.node.addChild(cc.instantiate(this.crash1));
                break;
            case 2:
                this.node.addChild(cc.instantiate(this.crash2));
                break;
            case 3:
                this.node.addChild(cc.instantiate(this.crash3));
                break;
            case 4:
                this.node.addChild(cc.instantiate(this.crash4));
                break;
            case 5:
                this.node.addChild(cc.instantiate(this.crash5));
                break;
            default:
                break;
        }
    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
