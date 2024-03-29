(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/skill/SkillManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '01f24V8UhxBopKgVu3ONzbB', 'SkillManager', __filename);
// Scripts/skill/SkillManager.js

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

//this script is used for select and activate skill
//only design 2 skill 
// 0: crash skill
// 1: add player bullet

// key element: skillActor
// skillActor is a node attach to main playerBulletTime
// it will control player bullet generate and skill effect 
var selectedSkill = -1;
cc.Class({
    extends: cc.Component,

    properties: {

        describe: cc.Label,
        skillActor: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    setDescribe: function setDescribe(des) {
        this.describe.string = des;
    },
    clickReturn: function clickReturn(id) {
        if (id == selectedSkill) {
            this.skillActor.getComponent('SkillActor').activateSkill(id);
            // console.log(this.node.active);
            this.gameManager.closeRadar();
            this.node.active = false;
            // console.log(this.node.active);
        }
        selectedSkill = id;
    },

    // onLoad () {},

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=SkillManager.js.map
        