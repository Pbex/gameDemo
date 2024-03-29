"use strict";
cc._RF.push(module, '58f52XOj3dMZIJIn7y1msHY', 'Skill');
// Scripts/skill/Skill.ts

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
var Player_1 = require("../player/Player");
var Skill = /** @class */ (function (_super) {
    __extends(Skill, _super);
    function Skill() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.player = null;
        _this.playerNode = null;
        _this.selectedSkillId = -1;
        return _this;
        // update (dt) {}
    }
    //functions for skill select
    Skill.prototype.setLabel = function (des) {
        this.label.string = des;
    };
    Skill.prototype.ensureSkill = function (id) {
        if (this.selectedSkillId == id) {
            this.activateSkill(id);
        }
    };
    Skill.prototype.activateSkill = function (id) {
        switch (id) {
            case 0: //crash skill
                this.activateCrashSkill();
                break;
            case 1: //add bullet
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
    };
    Skill.prototype.activateCrashSkill = function () {
        this.crashIcon.active = true;
    };
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Skill.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], Skill.prototype, "label", void 0);
    __decorate([
        property(Player_1.Player)
    ], Skill.prototype, "player", void 0);
    __decorate([
        property(cc.Node)
    ], Skill.prototype, "playerNode", void 0);
    __decorate([
        property(cc.Integer)
    ], Skill.prototype, "selectedSkillId", void 0);
    __decorate([
        property(cc.Node)
    ], Skill.prototype, "crashIcon", void 0);
    Skill = __decorate([
        ccclass
    ], Skill);
    return Skill;
}(cc.Component));
exports.default = Skill;

cc._RF.pop();