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
/*
整改进来的文件：
playerCollider.js;//done
skillActor.js;
skillCrash.js;
*/

@ccclass
export class Player extends cc.Component {

    boss: cc.Node;//用于获取boss位置发射子弹 
    crash: cc.Node;
    logic: cc.Node;


    private bulletNumber = 1;
    private bulletTimer = 1;
    private singleBulletTimer = 0.2;//一串子弹之间的每个的间隔

    lifeLabel: cc.Node;//the label that shows the current health
    private health = 3;

    // 激活被动技能效果，增加子弹数量
    public addBulletNumber() {
        this.bulletNumber++;
    }

    public speedUpBulletGenerate() {
        this.singleBulletTimer *= 0.8;
        if (this.singleBulletTimer < 0.05) {
            this.singleBulletTimer = 0.05;
        }
    }

    decreaseHealth() {
        this.health--;
        if (this.health == 0) {
            var anim = this.getComponent(cc.Animation);
            anim.play('defeated');
        }
    }

    onCollisionEnter(other, self): any {
        if (other.node.group == 'bullet')
        {
            other.getComponent('Bullet').onHit();//break the stone
        }
        this.decreaseHealth();
        self.node.group = 'default';//default group will not hit stones
        var action = cc.blink(5, 20);
        self.node.runAction(action);
        cc.director.getScheduler().schedule(this.touchable, this, 5, 1, 0, false);
    }

    touchable() {//the node should set touchable after being hit and blink
        this.node.group = 'player';
    }

    gameOver() {//called by function at the end of defeated anim
        cc.director.loadScene("GameOver");
    }

    start() {

    }

    // update (dt) {}
}
