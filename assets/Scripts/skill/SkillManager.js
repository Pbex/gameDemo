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
var selectedSkill=-1;
cc.Class({
    extends: cc.Component,

    properties: {
       
        describe:cc.Label,
        skillActor:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    setDescribe(des){
        this.describe.string=des;
    },
    clickReturn(id){
        if (id==selectedSkill) {
            this.skillActor.getComponent('SkillActor').activateSkill(id);
            // console.log(this.node.active);
            this.gameManager.closeRadar();
            this.node.active=false;
            // console.log(this.node.active);
        }
        selectedSkill=id;
    },
    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
