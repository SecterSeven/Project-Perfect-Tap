var config = require('MyBaseConfig');
var accounting = require('Accounting');

cc.Class({
    extends: cc.Component,
    extends: require('MyBaseController'),

    properties: {
        loadingBar: cc.Node,
        loadingStart: cc.Node,
        LoadingView: cc.Node,
        descriptionLabel: cc.Node,
        goldCoinRestore: cc.Node,
        goldCoinFsRestore: cc.Node,
        freespinMultipler: cc.Node,

        freeSpinTempAmount: {
            visible: false,
            default: 0,
        },
        goldCoinList: {
            visible: false,
            default: [],
        },
        freeSpinNumPlus: {
            visible: false,
            default: 0,
        },
        calculateFreeSpinNum: {
            visible: false,
            default: 0,
        },
        isPlusFreeSpinNum: {
            visible: false,
            default: false,
        },

        // currentCount: {
        //     default: 0,
        //     visible: false,
        // },
    },

    onLoad: function () {
        this._super();
        this.loadingPage.active = true;
        this.LoadingView.getComponent("HallowsNightLoadingView").startLoading();
    },

    closeLoadingPage() {
        this.loadingPage.active = false;
    },

    startSpin() {
        // console.log(this.isInFreeSpinMode);
        // console.log(this.freeSpinMode);
        console.log("freespinNum === " + this.freespinNum);
        this.panelMainView.isSpinning = true;
        // this.goldCoinRestore.getComponent("HallowNightGoldCoin").isStartKeepCoin = true;
        console.log (this.goldCoinRestore.getComponent("HallowNightGoldCoin").isStartKeepCoin = true);
        this.node.stopAllActions();

        if (this.winEffect != null)
            this.winEffect.hideObject();

        this.reelMainView.startSpin();

        if (this.baseSymbolView != null) {
            for (let i = 0; i < this.baseSymbolView.length; i++) {
                this.baseSymbolView[i].getComponent("MyBaseSymbolView").scatter = false;
            }
        }

        if (this.audioManager != null && this.spinData.freeSpinNum <= 0) {
            this.audioManager.playCustomSoundSfx(this.audioManager.reelSpinningClip, true);
            this.audioManager.spinPlayBGM(0);
        }

        if (this.audioManager != null && this.spinData.freeSpinNum > 0) {
            if (this.audioManager.reelSpinningClip2 != null) {
                this.audioManager.playCustomSoundSfx(this.audioManager.reelSpinningClipFS, false);
            }
            else {
                this.audioManager.playCustomSoundSfx(this.audioManager.reelSpinningClip, true);
            }
        }

        this.bigWinStatus = false;
    },

    onReceiveChangeMode: function (data) {
        this.freespinNum = -1;

        console.log("onReceiveChangeMode : " + data);
        if (data == 1) {
            this.isSpecialEvent = true;
            this.eventType = -1;

            return;
        }

        var type = data[0];
        if (type == 1) {
            var num = data[1][0];
            if (num > 0) {
                console.log(data[1][0]);
                this.freespinNum = data[1][0];
                this.freespinMulti = data[1][1];
                this.eventType = 0;
                this.isSpecialEvent = true;
                // cc.log(this.freespinNum);
                // cc.log(this.popUpMainView);
                this.popUpMainView.updateFreeSpinNumber(this.freespinNum);
                // if (this.freespinMultipler != null) {
                //     this.freespinMultipler.getComponent(cc.Label).string = "X"+this.freespinMulti;
                //     if (this.mafia)
                //     {
                //         this.popUpMainView.getComponent("MyBasePopUpView").mafiaResumeFS = 0;
                //     }
                // }
            }
        } else if (type == 2) {
            this.eventType = 0;
            this.isSpecialEvent = true;
        } else if (type == 3) {
            //gameble
        } else if (type == 4) {
            //bonus 
            //bonus update click data[1][0];
            this.eventType = 4;
            this.isSpecialEvent = true;
            this.popUpMainView.updateBonusTotalClick(data[1][0]);
        } else if (type == 6) {
            this.eventType = 6;
            this.isSpecialEvent = true;
        } else if (type == 7) {
            this.eventType = 7;
            this.isSpecialEvent = true;
        }
    },


    onReceiveStartGameData(data) {
        cc.log(data);
        if (this.isDirectInGame == true && this.loadingPage != null) {
            this.loadingPage.active = false;
        } else if (this.isDirectInGame == false && this.loadingPage != null) {
            if (this.loadingButton != null) {
                this.loadingButton.active = true;
            }
            this.node.runAction(cc.sequence(
                cc.delayTime(this.loadingDelay),
                cc.callFunc(function () {
                    this.loadingPage.active = false;
                }, this),
            ));
        }

        // this.goldCoinRestore.getComponent("HallowNightGoldCoin").isStartKeepCoin = false;
        window.isSlotDone = 1;
        window.betAmount = data.betValue * data.lineNum;
        if (window.jpMainView != null)
            window.jpMainView.updateGameJackpot();
        this.spinData = data;
        this.myCredit = data.playerCredit;
        this.myCredit2 = data.playerCredit2;
        // console.log(data.playerName+" / "+ this.myCredit+" / "+this.myCredit2)
        this.panelMainView.updatePlayerDetail(data.playerName, this.myCredit, this.myCredit2);

        this.isSpecialEvent = data.isSpecialEvent;
        this.eventType = data.eventType;
        this.freespinNum = data.freeSpinNum;
        this.freespinMulti = data.freeSpinMultiplier;
        if (data.gameActionData > -1) {
            if (window.jpMainView != null) {
                window.jpMainView.close();
            }
            if (this.popUpMainView != null)
                this.popUpMainView.restorePreFreeSpinGame(data.restoreDataFSArr);

            return;
        }

        if (this.freespinNum > 0 && data.roundId != -1) {
            if (window.jpMainView != null) {
                window.jpMainView.close();
            }
            this.panelMainView.updateFreeSpinTotalWin(this.spinData.curTotalWin - this.spinData.totalGameWin);
            this.popUpMainView.popUpEnterFSResult(this.spinData.freeSpinNum, this.spinData.freeSpinMultiplier);
            this.panelMainView.updateFreeSpinNumber(this.spinData.freeSpinNum);
            this.isInFreeSpin = true;
        }

        if (this.eventType == 4) {
            if (window.jpMainView != null) {
                window.jpMainView.close();
            }
            let bonusNum = [];
            for (let i = 0; i < data.restoreDataBonus.length; i++) {
                bonusNum.push(data.restoreDataBonus[i]);
            }
            this.popUpMainView.updateBonusTotalClick(bonusNum.length + data.restoreBonusRemaining);
            this.popUpMainView.restoreBonusNumber(bonusNum);
        }

        if (data.roundId != -1) {
            this.reelMainView.updateReelResult(this.spinData);
            this.reelMainView.instantUpdateAllReel(false);
            this.reelMainView.updateReelPosition();
        } else {
            this.reelMainView.instantUpdateAllReel(true);
        }

        if (this.isSpecialEvent) {
            if (this.eventType == 0) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(0),
                    cc.callFunc(this.playSpecialEvent, this),
                ));
            }
        }


        this.goldCoinList = [];
        if (data.restoreData != null) {
            let goldCoinSize = data.restoreData[0];
            let betSize = data.restoreData[1];
            for (let i = 0; i < betSize.length; i++) {
                let list = [];
                list.betSize = betSize[i];
                list.goldCoinSize = goldCoinSize[i];
                // list.goldCoinFsSize = goldCoinFsSize[i];
                this.goldCoinList.push(list);
            }
            this.goldCoinRestore.getComponent("HallowNightGoldCoin").storeGoldCoinList(this.goldCoinList);
            // this.goldCoinFsRestore.getComponent("HallowNightGoldCoinFreeSpin").storeGoldCoinFsList(this.goldCoinList);
        }

        let currentBetSize = data.betValue;
        this.panelMainView.showRestoreBetSize(currentBetSize);

        // this.goldCoinFsList = [];
        // if (data.restoreDataFSArr != null) {
        //     let goldCoinFsSize = data.restoreDataFSArr[0];
        //     let betSize = data.restoreDataFSArr[1];
        //     for (let i = 0; i < betSize.length; i++) {
        //         let listFs = [];
        //         list.betSize = betSize[i];
        //         list.goldCoinFsSize = goldCoinFsSize[i];
        //         this.goldCoinFsList.push(listFs);
        //     }
        //     this.goldCoinFsRestore.getComponent("HallowNightGoldCoinFreeSpin").storeGoldCoinFsList(goldCoinFsList);

        // }

        // if (data.restoreData[0] != 0) {
        //     var tempScatterCount = 0;
        //     for (let i = 0; i < data.fullReelData.length; i++) {
        //         for (let j = 0; j < data.fullReelData[i].length; j++) {
        //             if (data.fullReelData[i][j] == "c1") {
        //                 tempScatterCount++;
        //             }
        //         }
        //     }

        //     tempScatterCount = this.spinData.restoreData[2] - tempScatterCount;

        //     this.reelMainView.scatterArray = [0, 1, 2, 3];
        //     if(tempScatterCount > 0) {
        //         this.reelMainView.coinEffect.active = true;
        //         this.reelMainView.scatterCount = tempScatterCount;
        //         this.reelMainView.scatterShownCount = tempScatterCount;
        //         for (let i = 0; i < tempScatterCount; i++) {
        //             this.reelMainView.coinList[this.reelMainView.scatterArray[0]].active = true;
        //             this.reelMainView.scatterArray.splice(0, 1);
        //         }
        //     }
        // }
    },

    goldCoinFsPlus() {
        console.log("goldCoinFsPlus+++++++3")
        this.isPlusFreeSpinNum = true;
        this.freeSpinNumPlus += 3;
        console.log("Plus+++++3 === " + this.freeSpinNumPlus)
        // this.panelMainView.updateFreeSpinNumber(this.freespinNum)
        return this.freespinNum;
    },


    onReceiveSpinResult(data) {
        console.log("onReceiveSpinResult");
        console.log(data);
        this.goldCoinFsRestore.getComponent("HallowNightGoldCoinFreeSpin");
        this.isSpecialEvent = false;
        this.isOneTimeGoldCoins = false;

        let fullReelData = data.fullReelData;
        for (let i = 0; i < fullReelData.length; i++) {
            for (let j = 0; j < fullReelData[i].length; j++) {
                if (fullReelData[i][j] == "w3") {
                    let w3 = fullReelData[i][j] == "w3";
                    if (w3 == 9) {
                        // have show gold coin
                        this.isOneTimeGoldCoins = true;
                    }

                }
            }
        }

        console.log(this.goldCoinFsRestore.getComponent("HallowNightGoldCoinFreeSpin").keepCoinFs);
        console.log(this.goldCoinFsRestore.getComponent("HallowNightGoldCoinFreeSpin").isPlusFsNum);
        let isPlusFsNum = this.goldCoinFsRestore.getComponent("HallowNightGoldCoinFreeSpin").keepCoinFs;
        // if (isPlusFsNum == 2) {
        //     console.log("isPlusFsNum +++++ 3");
        //     this.freespinNum = this.spinData.freeSpinNum;
        //     let numSpin = this.freespinNum + 3;
        //     this.calculateFreeSpinNum = numSpin;
        //     this.panelMainView.updateFreeSpinNumber(this.calculateFreeSpinNum);
        // }

        this.spinData = data;
        if (this.spinData.freeSpinNum > this.freespinNum)
            this.enableRetrigger = true;

        window.betAmount = this.spinData.lineNum * this.spinData.betValue;
        // if(this.goldCoinFsRestore.isPlusFsNum){
        //     this.freespinNum = this.spinData.freeSpinNum;
        //     this.freespinNum += 3;
        //     this.panelMainView.updateFreeSpinNumber(this.freespinNum);
        // }
        if (this.enableRetrigger) {
            console.log("enableRetrigger******")
            this.freespinNum = this.spinData.freeSpinNum;
            // this.freespinNum += 3;
        } else if (this.isPlusFreeSpinNum) {
            console.log ("freeSpinNumPlus === "+ this.freespinNum)
            console.log("isPlusFreeSpinNum=== " + this.isPlusFreeSpinNum);
            this.freespinNum = this.spinData.freeSpinNum + this.freeSpinNumPlus;
            console.log ("freeSpinNumPlus === "+ this.freespinNum)
            // let numSpin = this.spinData.freeSpinNum + 3;
            // this.calculateFreeSpinNum = numSpin;
            this.panelMainView.updateFreeSpinNumber(this.freespinNum);
            // this.popUpMainView.updateFreeSpinNumber(this.freespinNum);
            console.log("this.calculateFreeSpinNum ==== " + this.freespinNum);
        } else {
            console.log("Awayyyyyyyyyy")
            this.freespinNum = this.spinData.freeSpinNum;
            this.panelMainView.updateFreeSpinNumber(this.freespinNum);
            console.log("this.freespinNum ==========  = " + this.freespinNum);
        }
        // if(this.goldCoinFsRestore.getComponent("HallowNightGoldCoinFreeSpin").keepCoinFs == 3){
        //     console.log (this.goldCoinFsRestore.getComponent("HallowNightGoldCoinFreeSpin").keepCoinFs == 3);
        //     this.freespinNum = this.spinData.freeSpinNum;
        //     this.freespinNum += 3;
        //     this.panelMainView.updateFreeSpinNumber(this.freespinNum);
        // }
        this.reelMainView.updateReelResult(this.spinData);

        this.countSpin++;
        this.resultTotalWin += this.spinData.curTotalWin;

        if (this.isRequestDepose == 1) {
            this.reelMainView.playDesposeAnimation();
            this.panelMainView.isConnection = false;
        }
        else {
            this.beforeReelStop();
        }
        console.log("this.spinData.freeSpinNum ==== " + this.spinData.freeSpinNum);
        console.log("this.freespinNum === " + this.freespinNum);
    },

    beforeReelStop() {
        this.reelMainView.receiveResult();
    },

    bigWin() {
        var isFiveOfKind = false;
        var isFiveOfKindS1 = false;
        var isFiveOfKindS2 = false;
        var isFiveOfKindS3 = false;
        var isFiveOfKindS4 = false;
        var isFiveOfKindS5 = false;
        for (let i = 0; i < this.spinData.winCounts.length; i++) {
            // console.log("FIVE+++1 = " + isFiveOfKind);
            if (this.spinData.winCounts[i] == 5) {
                // console.log("FIVE+++ = " + isFiveOfKind + " //  winCount= " + this.spinData.winCounts.length);
                if (this.spinData.winSymbols[i] == "s1") {
                    console.log("bigWin 1");
                    isFiveOfKindS1 = true;
                    let value = 1;
                    this.popUpMainView.fiveOfKindShowS1(isFiveOfKindS1, value);

                    //console.log(this.spinData.winSymbols[i] == "s1");

                } else if (this.spinData.winSymbols[i] == "s2") {
                    console.log("bigWin 2");
                    isFiveOfKindS2 = true;
                    this.popUpMainView.fiveOfKindShowS2(isFiveOfKindS2);

                    //console.log(this.spinData.winSymbols[i] == "s2");

                } else if (this.spinData.winSymbols[i] == "s3") {
                    console.log("bigWin 3");
                    isFiveOfKindS3 = true;
                    this.popUpMainView.fiveOfKindShowS3(isFiveOfKindS3);

                    //console.log(this.spinData.winSymbols[i] == "s3");

                } else if (this.spinData.winSymbols[i] == "s4") {
                    console.log("bigWin 4");
                    isFiveOfKindS4 = true;
                    this.popUpMainView.fiveOfKindShowS4(isFiveOfKindS4);

                    //console.log(this.spinData.winSymbols[i] == "s4");

                } else if (this.spinData.winSymbols[i] == "s5") {
                    console.log("bigWin 5");
                    isFiveOfKindS5 = true;
                    this.popUpMainView.fiveOfKindShowS5(isFiveOfKindS5);

                    //console.log(this.spinData.winSymbols[i] == "s5");

                } else {

                    isFiveOfKind = true;
                    this.popUpMainView.enableFiveOfKind(isFiveOfKind);

                }

            }

        }

        this.node.delayTime = 2;
        //console.log("bigWin 8");
        var delayTime = 0;
        var multiActions = [];
        var isBigWin = false;
        multiActions.push(cc.delayTime(0));
        multiActions.push(cc.delayTime(0));
        //console.log("bigWin 9");
        var _totalWin = this.spinData.curTotalWin;
        if (this.spinData.freeSpinNum >= 0) {
            _totalWin = 0;
            for (let i = 0; i < this.spinData.winNumbers.length; i++) {
                _totalWin += this.spinData.winNumbers[i];
            }
        }
        if (this.spinData.jackpotData != null && this.spinData.jackpotData != -1 && this.spinData.jackpotData[0] != -1) {
            this.eventType = 5;
            this.isSpecialEvent = true;
            delayTime = this.bigWinView.startJackpotEffect(this.spinData.jackpotData);
            isBigWin = true;
        } else if (_totalWin / (this.spinData.lineNum * this.spinData.betValue) >= 30 && this.spinData.freeSpinNum < 0 && this.bigWinType >= 3) {
            this.node.runAction(cc.sequence(
                cc.delayTime(this.bigWinDelay),
                cc.callFunc(function () {
                    this.bigWinView.startMagicalWinEffect(_totalWin);
                }, this),
            ));
            isBigWin = true;
        } else if (_totalWin / (this.spinData.lineNum * this.spinData.betValue) >= 20 && this.spinData.freeSpinNum < 0 && this.bigWinType >= 2) {
            this.node.runAction(cc.sequence(
                cc.delayTime(this.bigWinDelay),
                cc.callFunc(function () {
                    this.bigWinView.startMegaWinEffect(_totalWin);
                }, this),
            ));
            isBigWin = true;
        } else if (_totalWin / (this.spinData.lineNum * this.spinData.betValue) >= 10 && this.spinData.freeSpinNum < 0 && this.bigWinType >= 1) {
            this.node.runAction(cc.sequence(
                cc.delayTime(this.bigWinDelay),
                cc.callFunc(function () {
                    this.bigWinView.startBigWinEffect(_totalWin);
                }, this),
            ));
            isBigWin = true;
        } else if (isFiveOfKind) {
            //console.log("bigWin 10");
            delayTime = this.popUpMainView.enableFiveOfKind(isFiveOfKind);
            multiActions.push(cc.delayTime(delayTime));
        }

        if (!isBigWin) {
            // this.node.runAction(cc.sequence(
            //     cc.delayTime(0),
            //     // cc.callFunc(function() {
            //     //     this.reelMainView.afterAllWinLine();
            //     // }, this), 
            // ));
            this.resultPresentation();
        } else {
            this.bigWinStatus = true;
        }
    },


    afterBigWin() {
        // if (this.bigWinView.bigWinEnd == true) {
        if (this.freeSpinMode == true) {
            this.transition.active = false;
            this.transition.active = true;
            if (this.audioManager.transition != null) {
                this.audioManager.playCustomSoundSfx(this.audioManager.transition, false);
            }

            this.node.runAction(cc.sequence(
                cc.delayTime(1.5),
                cc.callFunc(function () {
                    this.isInFreeSpinMode = false;

                    if (this.freespinMainView != null) {
                        this.freespinMainView.exitFreeSpin();
                    }

                    if (this.audioManager != null) {
                        this.audioManager.stopBGM();
                        this.audioManager.backFromSpecialToNormal();
                    }
                }, this),
                cc.delayTime(1.5),
                cc.callFunc(function () {
                    this.backFromExitFSEvent2();
                }, this),
            ));
            this.freeSpinMode = false;
        } else {
            this.winEffect.startCoinEffect(this.spinData.curTotalWin);
            this.reelMainView.afterAllWinLine();
        }
        // this.bigWinView.bigWinEnd = false;
        // }
    },

    enterFreeSpin() {
        cc.log(this.eventType);
        this.goldCoinFsRestore.getComponent("HallowNightGoldCoinFreeSpin").showRestoreCoinFs();
        this.transition.active = false;
        this.transition.active = true;
        if (this.audioManager.transition != null) {
            this.audioManager.playCustomSoundSfx(this.audioManager.transition, false);
        }
        this.node.runAction(cc.sequence(
            cc.delayTime(1.5),
            cc.callFunc(function () {
                this.isInFreeSpinMode = true;
                this.freespinMainView.enterFreeSpin();
                this.panelMainView.updateFreeSpinNumber(this.freespinNum);
                if (this.audioManager != null) {
                    this.audioManager.playCustomSoundSfx(this.audioManager.startFreeSpin, false);
                    this.audioManager.playBGM(1);
                }
            }, this),
            cc.delayTime(1.5),
            cc.callFunc(function () {
                this.panelMainView.resetAllButton();
            }, this),
        ));
        this.freeSpinMode = true;
        this.freeSpinTempAmount = this.spinData.curTotalWin;
    },
    backFromSpecialEvent() {
        console.log('backFromSpecialEvent')
        this.updatePlayerCredit();
        this.panelMainView.resetFreeSpinNum();

        if (this.popUpMainView != null)
            this.popUpMainView.exitFreeSpinMode(this.spinData.curTotalWin, this.spinData.totalGameWin, this.spinData.curTotalWin - this.spinData.totalGameWin);

        if (this.winEffect != null)
            this.winEffect.updateAmount(this.spinData.curTotalWin);

        this.isInFreeSpin = false;
        // this.freeSpinMode = false;
        // this.isInFreeSpinMode = false;
        // this.reelMainView.multiplier.active = false;
        // this.reelMainView.character.getComponent(sp.Skeleton).setAnimation(0, "basegame_idle", true);

        if (window.jpMainView != null) {
            window.jpMainView.open();
        }
    },

    afterAllWinLine() {
        console.log("afterAllWinLine********");
        this.reelMainView.disableAllFrame();

        this.updatePlayerCredit();
        if (this.isSpecialEvent) {
            cc.log(this.eventType);
            this.panelMainView.startSpecialEvent();
            if (this.eventType == 0) {
                var delayTime = 0;
                if (this.enableRetrigger) {
                    this.enableRetrigger = false;
                    this.popUpMainView.enableRetrigger(true);
                    this.delayTime = 2;
                }
                if(this.isPlusFreeSpinNum){

                }

                this.node.runAction(cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(this.updateFreeSpin, this),
                    cc.delayTime(this.delayFSAnimToPopup),
                    cc.callFunc(this.playSpecialEvent, this),
                ));
            } else if (this.eventType == -1) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(this.backFromSpecialEvent, this),
                ));
            } else if (this.eventType == 4) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(this.updateBonus, this),
                    cc.delayTime(2),
                    cc.callFunc(this.playSpecialEvent, this),
                ));
            } else if (this.eventType == 5) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(this.updateJackpot, this),
                    cc.delayTime(0),
                    cc.callFunc(this.backFromJackpotEvent, this),
                ));
            } else if (this.eventType == 6) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(this.updateFever, this),
                    cc.delayTime(2),
                    cc.callFunc(this.playSpecialEvent, this),
                ));
            } else if (this.eventType == 7) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(this.updateJackpotGame, this),
                    cc.delayTime(2),
                    cc.callFunc(this.playSpecialEvent, this),
                ));
            }
        } else if (this.isBigWin) {
            if (this.panelMainView.autoSpinAmt > 0) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            } else if (this.freespinNum > 0) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            } else if (this.reelMainView.isMysteryRespin) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            }
        } else if (this.reelMainView.isDesposeSlot) {
            if (this.panelMainView.autoSpinAmt > 0 && this.reelMainView.spinData.winLines.length <= 0) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            }
            else if (this.freespinNum > 0 && this.reelMainView.spinData.winLines.length <= 0) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            }
            else {
                if (this.reelMainView.spinData.winLines.length <= 0) {
                    this.panelMainView.resetAllButton();
                    this.panelMainView.isSpinning = false;
                }
                this.reelMainView.startWinLineByLine();
            }

            this.isRequestDepose = 0;
            return;
        } else if (this.enableRetrigger) {
            this.enableRetrigger = false;
            if (this.panelMainView.autoSpinAmt > 0) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function () {
                        this.popUpMainView.enableRetrigger(true)
                    }, this),
                    cc.delayTime(2),
                    cc.callFunc(function () {
                        this.panelMainView.updateFreeSpinNumber(this.freespinNum);
                        this.updateFreeSpin();
                    }, this),
                    cc.delayTime(2),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            } else if (this.freespinNum > 0) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function () {
                        this.popUpMainView.enableRetrigger(true)
                    }, this),
                    cc.delayTime(2),
                    cc.callFunc(function () {
                        this.panelMainView.updateFreeSpinNumber(this.freespinNum);
                        this.updateFreeSpin();
                    }, this),
                    cc.delayTime(2),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            }
        } else if (this.isPlusFreeSpinNum) {
            if (this.panelMainView.autoSpinAmt > 0) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(function () {
                        this.panelMainView.updateFreeSpinNumber(this.freespinNum);
                        this.updateFreeSpin();
                    }, this),
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            } else if (this.freespinNum > 0) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(function () {
                        this.panelMainView.updateFreeSpinNumber(this.freespinNum);
                        this.updateFreeSpin();
                    }, this),
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            } else if (this.reelMainView.isMysteryRespin) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            }
        } else {
            if (this.panelMainView.autoSpinAmt > 0) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            } else if (this.freespinNum > 0) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            } else if (this.reelMainView.isMysteryRespin) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        this.panelMainView.startSpin();
                    }, this),
                ));
            } else {
                this.panelMainView.resetAllButton();
                this.reelMainView.startWinLineByLine();
            }
        }
    },

    resultPresentation: function () {
        var _totalWin = this.spinData.curTotalWin;
        if (this.spinData.freeSpinNum >= 0) {
            this.panelMainView.updateFreeSpinTotalWin(this.spinData.curTotalWin - this.spinData.totalGameWin);
            _totalWin = 0;
            for (let i = 0; i < this.spinData.winNumbers.length; i++) {
                _totalWin += this.spinData.winNumbers[i];
            }
            // if ((this.spinData.curTotalWin - this.spinData.totalGameWin) != 0) {
            //     this.descriptionLabel.getComponent(cc.Label).string = "WIN " + accounting.formatNumberPrecision(this.spinData.curTotalWin - this.spinData.totalGameWin);
            // }
        }

        this.winEffect.startCoinEffect(_totalWin);
        this.reelMainView.startAllWinLine();
    },

    backFromExitFSEvent() {
        this.isPlusFreeSpinNum = false;
        // this.afterBigWin();
        if (this.spinData.curTotalWin / (this.spinData.lineNum * this.spinData.betValue) >= 30 && this.bigWinType >= 3) {
            this.node.runAction(cc.sequence(
                cc.delayTime(this.bigWinDelay),
                cc.callFunc(function () {
                    this.bigWinView.startMagicalWinEffect2(this.spinData.curTotalWin);
                }, this),
            ));
        } else if (this.spinData.curTotalWin / (this.spinData.lineNum * this.spinData.betValue) >= 20 && this.bigWinType >= 2) {
            this.node.runAction(cc.sequence(
                cc.delayTime(this.bigWinDelay),
                cc.callFunc(function () {
                    this.bigWinView.startMegaWinEffect2(this.spinData.curTotalWin);
                }, this),
            ));
        } else if (this.spinData.curTotalWin / (this.spinData.lineNum * this.spinData.betValue) >= 10 && this.bigWinType >= 1) {
            this.node.runAction(cc.sequence(
                cc.delayTime(this.bigWinDelay),
                cc.callFunc(function () {
                    this.bigWinView.startBigWinEffect2(this.spinData.curTotalWin);
                }, this),
            ));
        } else {
            this.panelMainView.resetAllButton();
            if (this.freespinMainView != null) {
                this.freespinMainView.exitFreeSpin();
            }
        }
    },
});