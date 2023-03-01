var config = require('MyBaseConfig');
var hallowViewScript = require('HallowNightGoldCoin');
cc.Class({
    extends: cc.Component,
    extends: require("MyBaseReelView"),

    properties: {
        isLooping: false,

        gameController: cc.Node,

        hallowView: cc.Node,
        goldCoinFreeSpin: cc.Node,
        multiPlier: cc.Node,
        // multiX1: cc.Node,
        // multiX2: cc.Node,
        // multiX3: cc.Node,
        hallowViewScript: {
            default: null,
            visible: false,
        },

        popUpBat: cc.Node,

        coinCount: {
            default: 0,
            visible: false,
        },

        // coinCount: 0,

    },

    start() {
        if (this.gameController != null)
            this.gameController = this.gameController.getComponent(config.SCRIPT.GAMECONTROLLER);

    },

    startSpin() {
        console.log("startSpin");
        // this.multiPlier.getComponent("HallowNightMultiplier").countShow = 0;
        this.goldCoinFreeSpin = this.goldCoinFreeSpin.getComponent("HallowNightGoldCoinFreeSpin")
        this.hallowViewScript = this.hallowView.getComponent("HallowNightGoldCoin");
        this.resetDesposeAnim();
        this.node.stopAllActions();
        this.isDimAllSymbol(false);
        this.isReceiveResult = false;
        if (this.reelManager != null)
            this.reelSpinTime = this.reelManager.defaultReelStopTime;
        this.isInstant = false;
        this.isLooping = false;
        this.loopSpinAnimation();

        if (this.blurNode != null) {
            this.blurNode.active = true;
            for (let i = 0; i < this.symbolsNode.length; i++) {
                this.symbolsNode[i].active = false;
            }
        }
        if (this.blurSingleNode.length > 0) {
            for (let i = 0; i < this.blurSingleNode.length; i++) {
                this.blurSingleNode[i].active = true;
            }
        }
        if (this.gameController.isInFreeSpinMode) {
            this.multiPlier.getComponent("HallowNightMultiplier").countShow = 0;
        }

        // this.multiPlier.getComponent("HallowNightMultiplier").multiX1.active = true;
        // this.multiPlier.getComponent("HallowNightMultiplier").multiX2.active = false;
        // // this.multiX2.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
        // this.multiPlier.getComponent("HallowNightMultiplier").multiX3.active = false;

        // let numRow =config.NUMBEROFROW;


    },

    receiveResult(stopTime, isInstantStop) {
        console.log("receiveResult");
        // console.log(this.isInstant + "   " + isInstantStop + "   " + this.isLooping);
        if (this.isInstant) {
            if (this.instanceStopPattern == 1) {
                if (this.climaxNode != null)
                    this.climaxNode.active = false;
                this.isReceiveResult = true;
                this.isClimax = false;
                this.node.stopAllActions();
                this.loopSpinAnimation();
                this.disableBlurAnim(true);
                return;
            }
        }
        if (!isInstantStop && this.isLooping) {
            this.isReceiveResult = false;
        } else if (!isInstantStop) {
            this.isReceiveResult = true;
        }
        else {
            if (this.climaxNode != null)
                this.climaxNode.active = false;

            this.node.stopAllActions();
            this.loopSpinAnimation();
        }
        if (this.isClimax) {
            this.enableClimax();
        }
        this.node.runAction(cc.sequence(
            cc.delayTime(stopTime),
            cc.callFunc(this.disableClimax, this, {}),
        ));

        // console.log(this.isInstant + "   " + isInstantStop + "   " + this.isLooping);
    },

    loopSpinAnimation() {
        // console.log(this.isReceiveResult + "   "+ this.isClimax  + "   "+this.isLooping);
        if (this.isReceiveResult && !this.isClimax && !this.isLooping) {
            if (this.isInstant) {
                if (this.instanceStopPattern == 0) {
                    this.node.runAction(cc.sequence(
                        cc.moveTo(this.reelSpinTime, cc.v2(this.node.position.x, this.maxReach)),
                        cc.callFunc(this.finishSpinResult, this),
                        cc.callFunc(this.resetAllEffect, this),
                        cc.moveTo(this.timeBounceUp, cc.v2(this.node.position.x, this.node.position.y - this.distanceBounceUp)),
                        cc.moveTo(this.timeBounceUp, cc.v2(this.node.position.x, 0)),
                    ));
                } else {
                    this.node.runAction(cc.sequence(
                        cc.callFunc(this.finishSpinResult, this),
                        cc.callFunc(function () {
                            this.node.setPosition(this.node.position.x, this.node.position.y - this.distanceBounceUp);
                        }, this),
                        cc.callFunc(this.resetAllEffect, this),
                        cc.moveTo(this.timeBounceUp, cc.v2(this.node.position.x, 0)),
                    ));
                }
            } else {
                this.node.runAction(cc.sequence(
                    cc.moveTo(this.reelSpinTime, cc.v2(this.node.position.x, this.maxReach)),
                    cc.callFunc(this.finishSpinResult, this),
                    cc.callFunc(this.resetAllEffect, this),
                    cc.moveTo(this.timeBounceUp, cc.v2(this.node.position.x, this.node.position.y - this.distanceBounceUp)),
                    cc.moveTo(this.timeBounceUp, cc.v2(this.node.position.x, 0)),
                ));
            }
        } else {
            this.node.runAction(cc.sequence(
                cc.moveTo(this.reelSpinTime, cc.v2(this.node.position.x, this.maxReach)),
                cc.callFunc(this.reachTopSymbol, this),
            ));
        }
    },

    reachTopSymbol() {
        let numRow = config.NUMBEROFROW;
        var childCount = this.node.childrenCount - numRow;

        for (var i = 0; i < this.symbolResult.length; i++) {
            this.symbolView[i].setSpinningSymbol(this.symbolView[childCount].symbolCode);
            childCount++;
        }

        for (var i = numRow; i < this.symbolView.length; i++) {
            if (this.isReceiveResult && !this.isClimax && !this.isLooping) {
                this.symbolView[i].setSpinningSymbol(this.symbolResult[i - numRow]);
            } else {
                let s = this.randomSymbol[Math.floor(Math.random() * this.randomSymbol.length)];
                this.symbolView[i].setSpinningSymbol(s);
            }

        }

        this.node.setPosition(this.node.position.x, 0);
        this.loopSpinAnimation();
    },
    finishSpinResult() {
        this.multiPlier = this.multiPlier.getComponent("HallowNightMultiplier");
        let numRow = config.NUMBEROFROW;
        var childCount = this.node.childrenCount - numRow;
        console.log(this.node.name);
        console.log(this.symbolResult);
        for (let i = numRow; i < numRow * 2; i++) {
            this.symbolView[i].setSymbol(this.randomSymbol[Math.floor(Math.random() * this.randomSymbol.length)]);
        }

        for (let i = 0; i < numRow; i++) {
            // console.log( "show numRow = " + numRow);
            this.symbolView[i].setSymbol(this.symbolResult[i]);
            // console.log (this.symbolView[i]);
            // console.log (this.symbolResult[i]);
            if (this.symbolResult[i] == "w2") {
                // console.log(i + " symbolResult");
                console.log("show w2");
                if (this.gameController.isInFreeSpinMode) {
                    // this.isFreeSpin = true;
                    this.goldCoinFreeSpin.keepCoinCountFs();
                } else if (!this.gameController.isInFreeSpinMode) {
                    // this.isFreeSpin = false;
                    this.hallowViewScript.keepCoinCount();
                }
            }
            if (this.gameController.isInFreeSpinMode) {
                // this.isFreeSpin = true;
                // console.log("symbolResult = " + (this.symbolResult[i]));
                if (this.symbolResult[i] == "w3") {
                    this.multiPlier.keepCount();
                }
                if (this.symbolResult[i] == "w1") {
                    this.multiPlier.keepCount();
                }
            }
            if (this.symbolResult[i] == "c1") {
                console.log (this.symbolResult[i] == "c1");
                this.popUpBat.getComponent("HallowNightPopUpView").keepCountScatter();

            }


            childCount++;
        }

        this.node.setPosition(this.node.position.x, 0);

        if (this.audioManager != null) {
            this.audioManager.playCustomSoundSfx(this.audioManager.reelStopClip, false);
        }
    },
    resultReelCoinCount() {

    },

    // updateSymbol(){
    //         let numRow =config.NUMBEROFROW;
    //     for (let i = 0; i < numRow; i++) {
    //         this.symbolView[i].setSymbol("w1");
    //     }
    // },
});