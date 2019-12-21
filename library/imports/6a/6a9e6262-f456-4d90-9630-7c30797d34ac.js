"use strict";
cc._RF.push(module, '6a9e6Ji9FZNkJYwfDB5fTSs', 'OnCrash');
// Scripts/Boss/OnCrash.js

"use strict";

//should be merge into Boss.ts
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
        crash5: cc.Prefab

    },

    // LIFE-CYCLE CALLBACKS:
    onCrash: function onCrash() {
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

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();