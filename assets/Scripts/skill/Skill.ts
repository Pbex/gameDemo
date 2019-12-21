// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import { Player } from "../player/Player";
@ccclass
export default class Skill extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(Player)
    player = null;
    @property(cc.Node)
    playerNode: cc.Node = null;

    @property(cc.Integer)
    selectedSkillId = -1;

    @property(cc.Node)
    crashIcon: cc.Node;//主动技能图标


    //functions for skill select
    public setLabel(des: string) {
        this.label.string = des;
    }
    public ensureSkill(id: number) {
        if (this.selectedSkillId == id) {
            this.activateSkill(id);
        }
    }

    activateSkill(id) {
        switch (id) {
            case 0://crash skill
                this.activateCrashSkill();
                break;
            case 1://add bullet
                this.player.addBulletNumber();
                break;
            case 2:
                this.player.speedUpBulletGenerate();
                // playerBulletTime*=0.8; 
                break;
            default:
                break;
        }

        /* to be done,将boss的active转移到game logic里 */
        // this.boss.active = true;
        // this.logic.getComponent('GameLogic').startShooting();
    }
    private activateCrashSkill() {
        this.crashIcon.active = true;
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
