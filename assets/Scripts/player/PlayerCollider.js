// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var untouchableTime = 5;
var isUntouchable = false;

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
        gameManager: {
            default: null,
            type: cc.Node
        },
        stick: {
            default: null,
            type: cc.Node
        },
        id: 0,
        untouchableTimer: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    onCollisionEnter: function (other, self) {
        if (other.node.group == 'bullet') //检测碰撞组
        {
            other.getComponent('Bullet').onHit();
        }
        console.log('collision enter');
        console.log('self.node.group',self.node.group);
        
        if (self.node.group == 'player') {
            console.log('decrease health call');
            
            this.gameManager.getComponent('GameManager').decreaseHealth();
            self.node.group = 'default';
            // console.log('scheduler problem');
            var action = cc.blink(5, 20);
            self.node.runAction(action);
            cc.director.getScheduler().schedule(this.touchable, this, 5, 1,0,false);
            // console.log('scheduler problem');
        }
    },

    touchable() {
        this.node.group = 'player';
    },

    destoryCall() {
        if (this.id == 0) {
            this.gameOver();
        }
    },

    gameOver() {
        this.gameManager.getComponent('GameManager').gameOver();
    },

    onLoad() {
        var anim = this.getComponent(cc.Animation);
        var animState = anim.play();
        animState.wrapMode = cc.WrapMode.Loop;
        animState.repeatCount = Infinity;
    },

    start() {

    },

    update(dt) {
        // Math.atan2(y,x) 计算出来的结果angel是一个弧度值 数学的弧度是逆时针的 而游戏中是顺时针的
        var angel = Math.atan2(this.stick.getComponent('JoyStick').dir.y,
            this.stick.getComponent('JoyStick').dir.x);
        var degree = angel * 180 / Math.PI;
        degree = degree - 90;
        this.node.angle = degree;

        // console.log(this.gameManager.getComponent('GameManager').getHealth());

        if (this.gameManager.getComponent('GameManager').getHealth() == this.id) {
            var anim = this.getComponent(cc.Animation);
            anim.play('defeated');
        }

    },
});
