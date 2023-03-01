var utils = require('Utils');
var accounting = require('Accounting');
var config = require('MyBaseConfig');

cc.Class({
    extends: require("BigWinEffect"),

    properties: {
        explosion: cc.Node,

    },

    startBigWinEffect(amount) {
        // this.bigWinAfterStartFunction();
        this.isCloseNormal = false;
        this.isStart = true;
        if (this.audioManager != null) {
            this.playBigWinClip();
        }
        //amount = 2500;
        this.node.stopAllActions();
        this.node.active = true;
        this.amount = amount;
        this.loopTime = 300;
        if (this.button != null) {
            this.button.active = false;
        }
        if (this.jpButton != null) {
            this.jpButton.active = false;
        }
        this.startTweenWinValue(this.amount);
        this.node.getComponent(cc.Animation).play("HallowNightBigWin_Start");
        this.freeSpinBigWin = false;

        this.node.runAction(
            cc.sequence(
                cc.callFunc(this.playPopUpSfx, this),
                cc.delayTime(0.5),
                cc.callFunc(this.playBigWinSfx, this),
            )
        );

        return 2;
    },

    startBigWinEffect2(amount) {
        // this.bigWinAfterStartFunction();
        this.isCloseNormal = true;
        this.isStart = true;
        if (this.audioManager != null) {
            this.playBigWinClip();
        }
        //amount = 2500;
        this.node.stopAllActions();
        this.node.active = true;
        this.amount = amount;
        this.loopTime = 300;
        if (this.button != null) {
            this.button.active = false;
        }
        if (this.jpButton != null) {
            this.jpButton.active = false;
        }
        this.startTweenWinValue(this.amount);
        this.node.getComponent(cc.Animation).play("HallowNightBigWin_Start");
        // this.node.getComponent(cc.Animation).play("BigWin_Start");
        this.freeSpinBigWin = true;

        this.node.runAction(
            cc.sequence(
                cc.callFunc(this.playPopUpSfx, this),
                cc.delayTime(0.5),
                cc.callFunc(this.playBigWinSfx, this),
            )
        );

        return 2;
    },

    startMegaWinEffect(amount) {
        // this.bigWinAfterStartFunction();
        this.isCloseNormal = false;
        this.isStart = true;
        if (this.audioManager != null) {
            this.playBigWinClip2();
        }
        //amount = 5000;
        this.node.stopAllActions();
        this.node.active = true;
        this.amount = amount;
        this.loopTime = 300;
        if (this.button != null) {
            this.button.active = false;
        }
        if (this.jpButton != null) {
            this.jpButton.active = false;
        }
        this.startTweenWinValue(this.amount);
        this.node.getComponent(cc.Animation).play("HallowNightBigWin_MegaStart");
        //this.audioController.playBigWin();
        this.freeSpinBigWin = false;

        this.node.runAction(
            cc.sequence(
                cc.callFunc(this.playPopUpSfx, this),
                cc.delayTime(0.5),
                cc.callFunc(this.playBigWinSfx, this),
            )
        );

        return 4;
    },

    startMegaWinEffect2(amount) {
        // this.bigWinAfterStartFunction();
        this.isCloseNormal = true;
        this.isStart = true;
        if (this.audioManager != null) {
            this.playBigWinClip2();
        }
        //amount = 5000;
        this.node.stopAllActions();
        this.node.active = true;
        this.amount = amount;
        this.loopTime = 300;
        if (this.button != null) {
            this.button.active = false;
        }
        if (this.jpButton != null) {
            this.jpButton.active = false;
        }
        this.startTweenWinValue(this.amount);
        this.node.getComponent(cc.Animation).play("HallowNightBigWin_MegaStart");
        //this.audioController.playBigWin();
        this.freeSpinBigWin = true;

        this.node.runAction(
            cc.sequence(
                cc.callFunc(this.playPopUpSfx, this),
                cc.delayTime(0.5),
                cc.callFunc(this.playBigWinSfx, this),
            )
        );

        return 4;
    },

    startMagicalWinEffect(amount) {
        // this.bigWinAfterStartFunction();
        this.isCloseNormal = false;
        this.isStart = true;
        if (this.audioManager != null) {
            this.playBigWinClip3();
        }
        //amount = 5000;
        this.node.stopAllActions();
        this.node.active = true;
        this.amount = amount;
        this.loopTime = 300;
        if (this.button != null) {
            this.button.active = false;
        }
        if (this.jpButton != null) {
            this.jpButton.active = false;
        }
        this.startTweenWinValue(this.amount);
        this.node.getComponent(cc.Animation).play("HallowNightBigWin_MagicalStart");
        //this.audioController.playBigWin();
        this.freeSpinBigWin = false;

        this.node.runAction(
            cc.sequence(
                cc.callFunc(this.playPopUpSfx, this),
                cc.delayTime(0.5),
                cc.callFunc(this.playBigWinSfx, this),
            )
        );

        return 4;
    },

    startMagicalWinEffect2(amount) {
        this.isCloseNormal = true;
        this.isStart = true;
        if (this.audioManager != null) {
            this.playBigWinClip3();
        }
        //amount = 5000;
        this.node.stopAllActions();
        this.node.active = true;
        this.amount = amount;
        this.loopTime = 300;
        if (this.button != null) {
            this.button.active = false;
        }
        if (this.jpButton != null) {
            this.jpButton.active = false;
        }
        this.startTweenWinValue(this.amount);
        this.node.getComponent(cc.Animation).play("HallowNightBigWin_MagicalStart");
        //this.audioController.playBigWin();
        this.freeSpinBigWin = true;

        this.node.runAction(
            cc.sequence(
                cc.callFunc(this.playPopUpSfx, this),
                cc.delayTime(0.5),
                cc.callFunc(this.playBigWinSfx, this),
            )
        );

        return 4;
    },
});