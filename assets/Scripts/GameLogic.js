// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var bulletTimer = 0;
var directionTimer = 0;
var counter = 0;
var bulletDirection = 0;
var playerBulletTimer=0;
var playerBulletTime=0.7;
var singleBulletTimer=0;
var singleBulletTime=0.1;
var bulletShooted=0;
var isShooting=false;
var skillChance=true;
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
            type: cc.Node,
        },



        slowStone: cc.Prefab,
        normalStone: cc.Prefab,
        fastStone: cc.Prefab,

        player: cc.Node,
        playerBullet:cc.Prefab,
        bulletNum:1,
        skillActor: cc.Node,

        directionSwapTime: 30,
        bulletSpeed: 1,
        bulletGenerateTime: 1,

        skillChoiceUI: cc.Node,
        radar: cc.Node,
        boss: cc.Node,
        bossGenerateTime: 100,

        generateBullets: true,
    },

    addSpeed() {
        this.bulletGenerateTime *= 0.85;
    },

    generateRandomPos: function () {
        var randX = 0;
        var randY = 0;
        switch (bulletDirection) {
            case 0://bullets come from up
                randX = (Math.random() - 0.5) * this.node.width;
                randY = this.node.height / 2;
                break;
            case 1://bullets come from right
                randX = this.node.width / 2;
                randY = (Math.random() - 0.5) * this.node.height;
                break;
            case 2://bullets come from down
                randX = (Math.random() - 0.5) * this.node.width;
                randY = -this.node.height / 2;
                break;
            case 3://bullets come from left
                randX = -this.node.width / 2;
                randY = (Math.random() - 0.5) * this.node.height;
                break;
            default:
                break;
        }
        return cc.v2(randX, randY);
    },

    spawnNewBullets: function (speedUp) {
        switch (speedUp) {
            case 4:
                var newBullet = cc.instantiate(this.fastStone);
                break;
            case 2:
                var newBullet = cc.instantiate(this.normalStone);
                break;
            case 1:
                var newBullet = cc.instantiate(this.slowStone);
                break;
            default:
                break;
        }

        this.node.addChild(newBullet);//add node to canvas
        newBullet.setPosition(this.generateRandomPos());
        newBullet.getComponent('Bullet').direction = bulletDirection;
        newBullet.getComponent('Bullet').switchDir();
        newBullet.getComponent('Bullet').speed = this.bulletSpeed * speedUp;
        newBullet.getComponent('Bullet').maxX = this.node.width;
        newBullet.getComponent('Bullet').maxY = this.node.height;
        newBullet.getComponent('Bullet').gameManager = this.gameManager;
        console.log('spwan bullet done');
        
    },

    stopBulletGeneration() {
        this.generateBullets = false;
    },
    startBulletGeneration() {
        this.generateBullets = true;
    },

    bulletGenerator(dt) {
        if (directionTimer > this.directionSwapTime) {
            // console.log('direction changed');

            bulletDirection++;
            directionTimer = 0;
            bulletDirection %= 4;
            this.addSpeed();
        }
        if (bulletTimer > this.bulletGenerateTime) {
            bulletTimer = 0;
            if (counter < 4) {
                this.spawnNewBullets(4);
            } else if (counter < 7) {
                this.spawnNewBullets(2);
            } else {
                this.spawnNewBullets(1);
            }
            counter++;
            counter %= 10;
        }
        bulletTimer += dt;
        directionTimer += dt;
    },

    //todo
    skillChoice() {
        this.skillChoiceUI.active = true;
        this.skillChoiceUI.getComponent('SkillManager').gameManager=this;
        //the activation of boss and shooting execute by skill manager
        // this.boss.active = true;
        // this.skillActor.getComponent('SkillActor').startShooting();
    },
    generateBullet(dt){
        playerBulletTimer += dt;
        singleBulletTimer+=dt;
        
        if (playerBulletTimer > playerBulletTime) {
            if (singleBulletTimer>singleBulletTime) {
                var newBullet = cc.instantiate(this.playerBullet);
                this.node.addChild(newBullet);
                newBullet.setPosition(this.player.position);
                newBullet.getComponent('PlayerBullet').moveBullet(this.boss.position);
                bulletShooted++;
                singleBulletTimer=0;
                if (bulletShooted==this.bulletNum) {
                    playerBulletTimer=0;
                    bulletShooted=0;
                }
            }

        }
    },
    startShooting(){
        this.isShooting=true;
    },
    stopShooting(){
        this.isShooting=false;
    },
    bossActive() {
        
        if (this.gameManager.getComponent('GameManager').getGameTime() > this.bossGenerateTime) {
            this.gameManager.getComponent('GameManager').setGameTime(0);
            this.stopBulletGeneration();
            // if (this.gameManager.getComponent('GameManager').getBullet() <= 0) {
            //     this.skillChoice();
            // }
            if (skillChance) {
                this.radarState();
                this.skillChoice();
                skillChance=false;
            }
        }
    },
    radarState(){
        this.radar.active=!this.radar.active;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    // start () {

    // },

    update(dt) {
        if (this.generateBullets) {
            this.bulletGenerator(dt);
        }
        this.bossActive();
        if (this.isShooting) {
            this.generateBullet(dt);
        }
    },
});
