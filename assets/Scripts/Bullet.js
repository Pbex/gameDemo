// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var bulletCount=0;

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
        stopBullet: false,
    },



    // LIFE-CYCLE CALLBACKS:
    onHit() {
        var anim = this.getComponent(cc.Animation);
        this.stopBullet = true;
        anim.play('stone_break').wrapMode = cc.WrapMode.Normal;
    },
    onHitEnd: function () {
        this.node.destroy();
    },
    moveBullet: function (dt) {
        // console.log(this.speed);
        // console.log('move bullet start');

        if (this.node.position.y < -this.maxY || this.node.position.x < -this.maxX ||
            this.node.position.y > this.maxY || this.node.position.x > this.maxX) {
            bulletCount--;
                // this.gameManager.getComponent('GameManager').bulletDecrease(bulletCount);
            this.node.destroy();

        }
        switch (this.direction) {
            case 0://comes from up

                this.node.position = new cc.Vec2(this.node.position.x,
                    this.node.position.y - this.speed * dt);
                break;
            case 1:

                this.node.position = new cc.Vec2(this.node.position.x - this.speed * dt,
                    this.node.position.y);
                break;
            case 2:

                this.node.position = new cc.Vec2(this.node.position.x,
                    this.node.position.y + this.speed * dt);
                break;
            case 3:

                this.node.position = new cc.Vec2(this.node.position.x + this.speed * dt,
                    this.node.position.y);
                break;

            default:
                break;
        }
        // console.log('move bullet end');

    },

    switchDir() {
        switch (this.direction) {
            case 1:
                this.node.angle = 270;
                break;
            case 2:
                this.node.angle = 180;
                break;
            case 3:
                this.node.angle = 90;
                break;
            default:
                break;
        }
    },


    onLoad() {

        var anim = this.getComponent(cc.Animation);
        anim.play().wrapMode = cc.WrapMode.Loop;
        anim.play().repeatCount = Infinity;
        bulletCount++;
        // console.log(bulletCount);
        // this.gameManager.getComponent('GameManager').bulletAdd();
        
    },

    start() {
    },

    update(dt) {
        if (!this.stopBullet) {
            this.moveBullet(dt);
        }
    },
});
