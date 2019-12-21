cc.Class({
    extends: cc.Component,

    properties: {
        stopBullet: false,
    },



    // LIFE-CYCLE CALLBACKS:
    onHit() {
        var anim = this.getComponent(cc.Animation);
        this.stopBullet = true;
        this.gameManager.getComponent('GameManager').bulletDecrease();
        anim.play('stone_break').wrapMode = cc.WrapMode.Normal;
    },
    onHitEnd: function () {
        this.node.destroy();
    },
    moveBullet: function (dt) {
        if (this.node.position.y < -this.maxY || this.node.position.x < -this.maxX ||
            this.node.position.y > this.maxY || this.node.position.x > this.maxX) {
            this.gameManager.getComponent('GameManager').bulletDecrease();
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
        this.gameManager.getComponent('GameManager').bulletAdd();
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
        // console.log(bulletCount);
    },

    start() {
    },

    update(dt) {
        if (!this.stopBullet) {
            this.moveBullet(dt);
        }
    },
});
