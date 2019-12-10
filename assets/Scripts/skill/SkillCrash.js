// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

//this script is used for skill ui
var timer=0;
cc.Class({
    extends: cc.Component,

    properties: {
        //this.actor==SkillActor.getComponent('SkillManager')
        coolDownTime:5,
        progressBar:cc.ProgressBar,
        actor:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

skillTouched(){
    if (this.progressBar.progress>=1) {
        this.actor.getComponent('SkillActor').crashStart();
        timer=0;
    }
},

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.skillTouched, this);
    },

    start () {

    },

    update (dt) {
        timer+=dt;
        
        if (timer>this.coolDownTime) {
            this.progressBar.progress=1;
        }else{
            this.progressBar.progress=timer/this.coolDownTime;
        }
    },
});
