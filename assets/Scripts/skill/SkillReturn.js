// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

//this script is used for skill select sprite
//it will call skill manager for select skill
cc.Class({
    extends: cc.Component,

    properties: {
        
        id:cc.Integer,
        describe:"",
        manager:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    skillTouched(){
        this.manager.getComponent('SkillManager').setDescribe(this.describe);
        this.manager.getComponent('SkillManager').clickReturn(this.id);
    },
    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.skillTouched, this);
    },

    start () {

    },

    // update (dt) {},
});
