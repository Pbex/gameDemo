(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/player/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'adf13hTW3NBL57FXjJjgUwX', 'Player', __filename);
// Scripts/player/Player.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/*
整改进来的文件：
playerCollider.js;//done
skillActor.js;
skillCrash.js;
*/
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletNumber = 1;
        _this.bulletTimer = 1;
        _this.singleBulletTimer = 0.2; //一串子弹之间的每个的间隔
        _this.health = 3;
        return _this;
        // update (dt) {}
    }
    // 激活被动技能效果，增加子弹数量
    Player.prototype.addBulletNumber = function () {
        this.bulletNumber++;
    };
    Player.prototype.speedUpBulletGenerate = function () {
        this.singleBulletTimer *= 0.8;
        if (this.singleBulletTimer < 0.05) {
            this.singleBulletTimer = 0.05;
        }
    };
    Player.prototype.decreaseHealth = function () {
        this.health--;
        if (this.health == 0) {
            var anim = this.getComponent(cc.Animation);
            anim.play('defeated');
        }
    };
    Player.prototype.onCollisionEnter = function (other, self) {
        if (other.node.group == 'bullet') {
            other.getComponent('Bullet').onHit(); //break the stone
        }
        this.decreaseHealth();
        self.node.group = 'default'; //default group will not hit stones
        var action = cc.blink(5, 20);
        self.node.runAction(action);
        cc.director.getScheduler().schedule(this.touchable, this, 5, 1, 0, false);
    };
    Player.prototype.touchable = function () {
        this.node.group = 'player';
    };
    Player.prototype.gameOver = function () {
        cc.director.loadScene("GameOver");
    };
    Player.prototype.start = function () {
    };
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.Player = Player;

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
        //# sourceMappingURL=Player.js.map
        