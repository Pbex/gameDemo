"use strict";
cc._RF.push(module, 'e5f6cdpEfNJM4dD+/0StFk2', 'Timer');
// Prefabs/Crashs/Timer.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var existTime = 1;
cc.Class({
    extends: cc.Component,

    properties: {
        timer: 0

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    update: function update(dt) {
        this.timer += dt;
        if (this.timer > existTime) {
            this.node.destroy();
        }
    }
});

cc._RF.pop();