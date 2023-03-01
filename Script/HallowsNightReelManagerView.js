var config = require('MyBaseConfig');
cc.Class({
    extends: cc.Component,
    extends: require('MyBaseReelManagerView'),

    properties: {
        animateReel: [cc.Node],

        popUpMainView: cc.Node,
        lineParent: cc.Node,

        character: cc.Node,
        multiplierR1: cc.Node,
        multiplierR2: cc.Node,
        multiplierR3: cc.Node,
        multiplierR4: cc.Node,
        multiplierR5: cc.Node,
        multiply: 0,
        MultiplierCalculate: cc.Node,

        isChangeWild: {
            default: false,
            visible: false,
        },

        isMystery: false,
        isMysteryRespin: false,
        descriptionBar: cc.Node,
        instantiateParent: [cc.Node],
        instantiateInsideParent: [cc.Node],

        isFreeSpin: false,

        mystery: [false, false, false, false, false],

        lastReelPattern: [],

        mysteryFrame: [cc.Node],

        isUp: false,

        mysteryX: [],
        mysteryY: [],

        hallowView: cc.Node,
        hallowViewScript: {
            default: null,
            visible: false,
        },

        goldCoinFreeSpin: cc.Node,

        coinCount: {
            default: 0,
            visible: false,
        },
        isCoin: {
            default: true,
            visible: false,

        },


    },

    onLoad() {
        this.goldCoinFreeSpin = this.goldCoinFreeSpin.getComponent("HallowNightGoldCoinFreeSpin")
        this.hallowViewScript = this.hallowView.getComponent("HallowNightGoldCoin");
    },


    startSpin() {
        this.popUpMainView.getComponent("HallowNightPopUpView").countScatter = 0;
        this.MultiplierCalculate.getComponent("HallowNightMultiplierCalculate").showMultiply.active = false;
        this.linePaysHide();
        this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINLINE, { line: -1 });
        this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINFRAME, { x: -1, y: -1 });
        this.node.stopAllActions();
        this.disableAllFrame();
        this.stopAllAnimation();
        this.resetStopAnimationIndex();

        this.eventManager.sendEventWithParam(config.EVENT.SPINNING, {});

        for (let i = 0; i < this.reel.length; i++) {
            this.node.runAction(cc.sequence(
                cc.delayTime(i * this.startingTimeDiff),
                cc.callFunc(this.reel[i].startSpin, this.reel[i])
            ));
        }

        this.isStopFaster = false;
        this.isFinishFirstRoundLine = false;
        this.reelStop = 0;
        this.lineCount = 0;

        // var multiActions = [];
        // this.mysteryX = [];
        // this.mysteryY = [];

        // this.isMystery = false;
        this.resetLines();


        // if (!this.gameController.isInFreeSpin && !this.isMysteryRespin) {
        //     this.character.getComponent(sp.Skeleton).setAnimation(0, "basegame_idle", true);
        //     this.character.getComponent(sp.Skeleton).timeScale = 0.5;
        // }

        // if (this.isMysteryRespin) {
        //     for (let i = 0; i < this.mysteryFrame.length; i++) {
        //         if (this.mysteryFrame[i].active) {
        //             if (this.mystery[i] == false) {
        //                 this.mysteryFrame[i].active = false;
        //                 this.instantiateParent[i].active = false;
        //                 for (let j = 0; j < this.instantiateInsideParent[i].children.length; j++) {
        //                     this.instantiateInsideParent[i].children[j].destroy();
        //                 }
        //             }
        //         }
        //     }

        //     for (let i = 0; i < this.mystery.length; i++) {
        //         if (this.mystery[i] == true) {
        //             if (this.instantiateInsideParent[i].children.length == 0) {
        //                 if (this.isUp) {
        //                     var instantiate = cc.instantiate(this.reel[i].node.children[0]);
        //                     instantiate.parent = this.instantiateInsideParent[i];
        //                     instantiate.getComponent("MyBaseSymbolView").setSymbol(this.lastReelPattern[i][0]);
        //                     instantiate.getComponent("MyBaseSymbolView").isDimSymbol(false);
        //                     this.instantiateInsideParent[i].position = new cc.v2(0, -141);
        //                 }

        //                 for (let j = 0; j < this.reelPattern[i].length; j++) {
        //                     this.mysteryFrame[i].active = true;
        //                     var instantiate = cc.instantiate(this.reel[i].node.children[j]);
        //                     instantiate.parent = this.instantiateInsideParent[i];
        //                     instantiate.getComponent("MyBaseSymbolView").setSymbol(this.lastReelPattern[i][j]);
        //                     instantiate.getComponent("MyBaseSymbolView").isDimSymbol(false);
        //                 }
        //             }

        //             this.instantiateParent[i].active = true;

        //             // var instantiate = cc.instantiate(this.reel[i].node.children[3]);
        //             // instantiate.parent = this.instantiateInsideParent[i];
        //             // instantiate.getComponent("MyBaseSymbolView").setSymbol(this.reelPattern[i][3]);
        //         }
        //     }

        //     if (this.isMysteryRespin && this.isUp) {
        //         multiActions.push(cc.callFunc(function () {
        //             for (let i = 0; i < this.mystery.length; i++) {
        //                 if (this.mystery[i] == true) {
        //                     this.instantiateParent[i].active = true;
        //                     var newPosition = new cc.v2(this.instantiateInsideParent[i].position.x, this.instantiateInsideParent[i].position.y + 141);
        //                     var action = cc.moveTo(1, newPosition);
        //                     this.instantiateInsideParent[i].runAction(action);
        //                 }
        //             }
        //         }, this));

        //         multiActions.push(cc.delayTime(1));
        //     }

        // if (!this.isFreeSpin) {
        //     this.multiply += 1;
        //     this.multiplier.getComponent(cc.Label).string = this.multiply;
        // } 
        // else {
        //     this.descriptionBar.children[0].getComponent(cc.Label).string = "Mystery Respin!";
        // }

        //     multiActions.push(cc.delayTime(0.5));
        //     multiActions.push(cc.callFunc(function () {
        //         for (let i = 0; i < this.mystery.length; i++) {
        //             if (this.mystery[i] == true) {
        //                 var newPosition = new cc.v2(this.instantiateInsideParent[i].position.x, this.instantiateInsideParent[i].position.y - 141);
        //                 var action = cc.moveTo(1, newPosition);
        //                 this.instantiateInsideParent[i].runAction(action);
        //             }
        //         }
        //     }, this));
        //     multiActions.push(cc.delayTime(1.5));
        //     multiActions.push(cc.callFunc(function () {
        //         this.reel[0].isLooping = false;
        //     }, this));

        //     this.node.runAction(cc.sequence(multiActions));
        // }
    },

    onStartResult(data) {
        //Assign to Reel
        for (let i = 0; i < this.reel.length; i++) {
            for (let j = 0; j < this.reelPattern[i].length; j++) {
                this.reel[i].updateReelResult(this.reelPattern[i][j]);
            }
        }
    },

    receiveResult() {
        //this.reelStop = 0;
        // console.log("Receive Reel Result");
        this.stopReel();
        // console.log("Receive Reel Result1");
        this.climaxCount = 0;
    },
    addReelClimax() {
        this.climaxCount++;
    },

    stopReel() {
        if (this.reelStop == this.reel.length) {
            this.reelStop = -1;
            var _delayTime = 0;

            this.node.runAction(cc.sequence(
                cc.delayTime(_delayTime),
                cc.callFunc(this.allReelFinishStop, this),
            ));
            return;
        }

        if (this.reelStop < 0)
            return;

        var stopTime = this.defaultReelStopTime;

        if (this.reelStop + 1 < this.reel.length && this.reel[this.reelStop + 1].isClimax) {
            stopTime += this.climaxAnimTime[this.climaxCount];
        }

        if (!this.isFreeSpinClimax && this.gameController.isInFreeSpin) {
            stopTime = this.defaultReelStopTime;
            this.reel[this.reelStop].isClimax = false;
        }

        this.reel[this.reelStop].receiveResult(stopTime, false);
        this.reelStop += 1;
    },

    checkStopAnimation(reel) {
        var stopSymbol = config.REELSTOPDETAILS.SYMBOL;

        for (let i = 0; i < stopSymbol.length; i++) {
            var isStopSymb = false;

            isStopSymb = reel.checkStopAnimation(stopSymbol[i]);

            if (isStopSymb) {
                //play audio
                if (this.audioManager != null)
                    this.audioManager.playCustomSoundSfx(this.audioManager.symbolStopClip[config.REELSTOPDETAILS.COUNT[i] + config.REELSTOPDETAILS.SOUNDSTOPINDEX[i]], false);
                config.REELSTOPDETAILS.COUNT[i] = config.REELSTOPDETAILS.COUNT[i] + 1;
            }
        }
    },

    updateReelResult(data) {
        cc.log("updateReelResult");
        //Reel Pattern
        var pattern = data.fullReelData;
        var reelCount = 0;
        this.reelPattern = [];
        // this.oriReelPattern = data.fullReelData;

        for (let j = 0; j < pattern[0].length; j++) {
            var array2 = [];
            for (let i = pattern.length - 1; i >= 0; i--) {
                array2.push(pattern[i][j]);
            }
            this.reelPattern.push(array2);
        }

        //Assign to Reel
        for (let i = 0; i < this.reel.length; i++) {
            this.reel[i].updateReelResult(this.reelPattern[i]);
            // console.log (this.reel[i]);
        }

        //Calculate Climax
        this.processClimax();

        // this.processFeature();

        //Reel Detail
        this.spinData = data;
        // cc.log("pattern" + this.reelPattern);
        // cc.log(this.spinData);
    },

    processFeature() {
        //     var mystery = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];

        //     if (this.isMysteryRespin) {
        //         this.reel[0].isLooping = true;

        //         for (let i = 0; i < this.mystery.length; i++) {
        //             if (this.mystery[i] == true && !this.isUp) {
        //                 var instantiate = cc.instantiate(this.reel[i].node.children[3]);
        //                 instantiate.parent = this.instantiateInsideParent[i];
        //                 instantiate.getComponent("MyBaseSymbolView").setSymbol(this.reelPattern[i][3]);
        //                 this.instantiateParent[i].active = true;
        //             }
        //         }
        //     }

        // if (this.gameController.isInFreeSpin) {
        //     this.multiply += 2;
        //     this.multiplier.getComponent(cc.Label).string = this.multiply;
        // }

        //     if (this.gameController.isInFreeSpin) {
        //         this.isFreeSpin = true;
        //     } else if (!this.gameController.isInFreeSpin) {
        //         this.isFreeSpin = false;
        //     }

        //     this.lastReelPattern = this.reelPattern;

        //     if (this.isUp) {
        //         this.isUp = false;
        //     }
    },

    allReelFinishStop() {

        // var mystery = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];
        // var multiActions = [];

        // for (let i = 0; i < this.reelPattern.length; i++) {
        //     for (let j = 0; j < this.reelPattern[i].length; j++) {
        //         for (let k = 0; k < mystery.length; k++) {
        //             if (this.reelPattern[i][j] == mystery[k]) {
        //                 this.isMystery = true;
        //                 this.mystery[i] = true;
        //                 this.mysteryX.push(i);
        //                 this.mysteryY.push(j);
        //             }

        //             if (this.reelPattern[i][j] == "f9") {
        //                 this.isUp = true;
        //             }
        //         }
        //     }
        // }

        // for (let i = 0; i < this.mystery.length; i++) {
        //     if (this.mystery[i] == true) {
        //         var temp = false;
        //         for (let j = 0; j < this.reelPattern[i].length; j++) {
        //             for (let k = 0; k < mystery.length; k++) {
        //                 if (this.reelPattern[i][j] == mystery[k]) {
        //                     temp = true;
        //                 }
        //             }
        //         }
        //         if (!temp) {
        //             this.mystery[i] = false;
        //         }
        //     }
        // }

        // if (!this.isMysteryRespin && this.isMystery) {
        //     if (!this.isFreeSpin) {
        //         multiActions.push(cc.delayTime(1));
        //         multiActions.push(cc.callFunc(function () {
        //             this.descriptionBar.active = true;
        //             this.descriptionBar.getComponent(cc.Animation).play("DescriptionAppear");
        //         }, this));
        //         multiActions.push(cc.delayTime(1));
        //         multiActions.push(cc.callFunc(function () {
        //             this.character.getComponent(sp.Skeleton).setAnimation(0, "correct_symbol_multiplier_in", false);
        //             this.character.getComponent(sp.Skeleton).addAnimation(0, "correct_symbol_multiplier_idle", true);
        //             this.character.getComponent(sp.Skeleton).timeScale = 0.5;
        //             this.multiplier.active = true;
        //             this.multiply = 1;
        //             this.multiplier.getComponent(cc.Label).string = this.multiply;
        //         }, this));
        //     }

        //     this.isMysteryRespin = true;
        // }

        // if (this.isMysteryRespin) {
        //     multiActions.push(cc.delayTime(0.5));
        //     multiActions.push(cc.callFunc(function () {
        //         for (let i = 0; i < this.mystery.length; i++) {
        //             this.instantiateParent[i].active = false;
        //         }
        //     }, this));
        // }

        // if (this.isMystery) {
        //     multiActions.push(cc.callFunc(function () {
        //         for (let i = 0; i < this.mysteryX.length; i++) {
        //             this.reel[this.mysteryX[i]].node.children[this.mysteryY[i]].children[16].getComponent(sp.Skeleton).setAnimation(0, "out", false);
        //             this.reel[this.mysteryX[i]].node.children[this.mysteryY[i]].children[16].getComponent(sp.Skeleton).timeScale = 0.6;
        //             this.animateReel[this.mysteryX[i]].children[this.mysteryY[i]].children[16].getComponent(sp.Skeleton).setAnimation(0, "out", false);
        //             this.animateReel[this.mysteryX[i]].children[this.mysteryY[i]].children[16].getComponent(sp.Skeleton).timeScale = 0.6;
        //         }
        //     }, this));
        //     multiActions.push(cc.delayTime(0.33));
        //     multiActions.push(cc.callFunc(function () {
        //         for (let i = 0; i < this.mysteryX.length; i++) {
        //             this.reel[this.mysteryX[i]].node.children[this.mysteryY[i]].getComponent("MyBaseSymbolView").playAnimationFrame(0.03);
        //             this.animateReel[this.mysteryX[i]].children[this.mysteryY[i]].getComponent("MyBaseSymbolView").playAnimationFrame(0.03);
        //         }
        //     }, this));
        //     multiActions.push(cc.delayTime(1.17));
        // }

        // multiActions.push(cc.callFunc(function () {
        //     this.eventManager.sendEventWithParam(config.EVENT.STOPALLSPINNING, {});

        //     for (let i = 0; i < this.reel.length; i++) {
        //         this.reel[i].cleanStopAnim();
        //     }

        //     if (this.gameController != null) {
        //         this.gameController.onReelStop();
        //     }

        //     this.onReelStop();
        // }, this));
        // multiActions.push(cc.delayTime(0));
        // this.node.runAction(cc.sequence(multiActions));

        this.eventManager.sendEventWithParam(config.EVENT.STOPALLSPINNING, {});

        for (let i = 0; i < this.reel.length; i++) {
            this.reel[i].cleanStopAnim();
        }
        if (this.gameController != null) {
            this.gameController.onReelStop();
        }
    },

    // onReelStop() {
    //     if (this.spinData.winLines.length != 0) {
    //         if (this.character.getComponent(sp.Skeleton)._animationName == "basegame_idle") {
    //             var randomNumber = Math.floor(Math.random() * (2));
    //             if (randomNumber == 0) {
    //                 this.character.getComponent(sp.Skeleton).setAnimation(0, "correct_symbol_style1", false);
    //                 this.character.getComponent(sp.Skeleton).addAnimation(0, "basegame_idle", true);
    //                 this.character.getComponent(sp.Skeleton).timeScale = 0.5;
    //             } else if (randomNumber == 1) {
    //                 this.character.getComponent(sp.Skeleton).setAnimation(0, "correct_symbol_style2", false);
    //                 this.character.getComponent(sp.Skeleton).addAnimation(0, "basegame_idle", true);
    //                 this.character.getComponent(sp.Skeleton).timeScale = 0.5;
    //             }
    //         }
    //     }
    // },

    startAllWinLine() {
        console.log("startAllWinLine");

        if (this.isSkipFullWinLine || this.spinData.winLines.length <= 0) {
            this.afterAllWinLine();
            return;
        }

        if (this.audioManager.animationClip != null) {
            this.audioManager.playCustomSoundSfx(this.audioManager.animationClip, false);
        }

        if (!this.isDisableDimEffect) {
            for (let j = 0; j < this.reel.length; j++) {
                this.reel[j].isDimAllSymbol(true);
            }
        }

        var _winlines = this.spinData.winLines;
        var _winCounts = this.spinData.winCounts;
        var _winSymbols = this.spinData.winSymbols;
        var _winWays = this.spinData.winWays;
        // console.log(this.spinData);
        // console.log("dataWINLINE = " + this.spinData.winLines);
        // console.log("WinLength = " + _winlines.length);
        // console.log(this.lineParent.children)

        this.resetLines();
        // if (_winlines.length != 0) {
        //     for (let i = 0; i < _winlines.length; i++) {
        //         console.log (_winlines[i]);
        //         console.log(this.lineParent.children[_winlines[i]]);
        //         this.lineParent.children[_winlines[i]].active = true; 
        //     }
        // }
        console.log("WinLength = " + _winlines.length);
        if (_winlines.length != 0) {
            for (let i = 0; i < _winlines.length; i++) {
                if (_winlines[i] > 0) {
                    this.lineParent.children[_winlines[i] - 1].active = true;
                }
            }
        }


        for (let i = 0; i < _winlines.length; i++) {
            var reelState = [];
            for (let i = 0; i < this.reel.length; i++) {
                reelState.push(true);
            }
            // for(let )
            if (!this.isWaysSlot) {
                let winCount = 0;
                // console.log("Checking winline : " +_winlines[i]);
                if (_winlines[i] != 0) {
                    this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINLINE, { line: _winlines[i] - 1, winSymbols: _winSymbols[i], winWays: _winWays[i] });
                    if (_winWays[i] != 1) {
                        let jCount = 0;
                        for (let j = this.reel.length - 1; j >= 0; j--) {
                            if (winCount < _winCounts[i]) {
                                this.reel[j].setSymbolAnimate(config.PAYLINEARR[_winlines[i] - 1][j], true);
                                this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINFRAME, { line: _winlines[i] - 1, x: j, y: config.PAYLINEARR[_winlines[i] - 1][j] - 1, winAmt: 0, winWay: _winWays[i], x2: jCount, symbolCount: 0, winSymbolCount: 0, symbol: this.reelPattern[j][config.PAYLINEARR[_winlines[i] - 1][j] - 1] });
                                winCount++;
                            }
                            jCount++;
                        }
                    } else {
                        for (let j = 0; j < this.reel.length; j++) {
                            if (winCount < _winCounts[i]) {
                                this.reel[j].setSymbolAnimate(config.PAYLINEARR[_winlines[i] - 1][j], true);
                                this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINFRAME, { line: _winlines[i] - 1, x: j, y: config.PAYLINEARR[_winlines[i] - 1][j] - 1, winAmt: 0, winWay: _winWays[i], x2: 0, symbolCount: 0, winSymbolCount: 0, symbol: this.reelPattern[j][config.PAYLINEARR[_winlines[i] - 1][j] - 1] });
                                winCount++;
                            }
                        }
                    }
                } else {
                    if (_winWays[i] != 1) {
                        for (let j = this.reel.length - 1; j >= 0; j--) {
                            for (let k = 0; k < this.reelPattern[j].length; k++) {
                                // console.log("Checking Symbol : " +this.reelPattern[j][k] +" / " +_winSymbols[this.lineCount]);
                                if (this.reelPattern[j][k] == _winSymbols[i] && winCount < _winCounts[i]) {
                                    this.reel[j].setSymbolAnimate(k + 1, true);
                                    this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { x: j, y: k, symbol: this.reelPattern[j][k] });
                                    winCount++;
                                    k = this.reelPattern[j].length;
                                } else if (this.isScatterWild && this.reelPattern[j][k] == config.SYMBOLCODE.SYMBOL_WILD && winCount < _winCounts[i]) {
                                    this.reel[j].setSymbolAnimate(k + 1, true);
                                    this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { x: j, y: k, symbol: this.reelPattern[j][k] });
                                    winCount++;
                                    k = this.reelPattern[j].length;
                                }
                            }
                        }
                    } else {
                        for (let j = 0; j < this.reel.length; j++) {
                            for (let k = 0; k < this.reelPattern[j].length; k++) {
                                if (this.reelPattern[j][k] == _winSymbols[i] && winCount < _winCounts[i]) {
                                    this.reel[j].setSymbolAnimate(k + 1, true);
                                    this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { x: j, y: k, symbol: this.reelPattern[j][k] });
                                    winCount++;
                                    k = this.reelPattern[j].length;
                                } else if (this.isScatterWild && this.reelPattern[j][k] == config.SYMBOLCODE.SYMBOL_WILD && winCount < _winCounts[i]) {
                                    //console.log("here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111");
                                    this.reel[j].setSymbolAnimate(k + 1, true);
                                    this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { x: j, y: k, symbol: this.reelPattern[j][k] });
                                    winCount++;
                                    k = this.reelPattern[j].length;
                                }
                            }
                        }
                    }
                }
            } else {
                for (let j = 0; j < this.reel.length; j++) {
                    let isStopWinningSymbol = true;
                    for (let k = 0; k < this.reelPattern[j].length; k++) {
                        // console.log(this.reelPattern[j][k] == _winSymbols[i] +" / "+ config.CHECKWAYSWILD(this.reelPattern[j][k]));
                        if (_winSymbols[i] == config.SYMBOLCODE.SYMBOL_FREESPINSCATTER) {
                            if (this.reelPattern[j][k] == _winSymbols[i] && this.reelPattern[j][k] == config.SYMBOLCODE.SYMBOL_FREESPINSCATTER) {
                                this.reel[j].setSymbolAnimate(k + 1, true);
                                this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { x: j, y: k, symbol: this.reelPattern[j][k] });
                            }
                            isStopWinningSymbol = false;
                        } else if (this.reelPattern[j][k] == _winSymbols[i] && (this.reelPattern[j][k] == config.SYMBOLCODE.SYMBOL_JACKPOT2 || this.reelPattern[j][k] == config.SYMBOLCODE.SYMBOL_JACKPOT3)) {
                            this.reel[j].setSymbolAnimate(k + 1, true);
                            this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { x: j, y: k, symbol: this.reelPattern[j][k] });
                            isStopWinningSymbol = false;
                        } else if (this.reelPattern[j][k] == _winSymbols[i] || config.CHECKWAYSWILD(this.reelPattern[j][k])) {
                            if (this.isSymbolRepeat) {
                                this.reel[j].setSymbolAnimate(k + 1, true);
                                this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { x: j, y: k, symbol: this.reelPattern[j][k] });
                                isStopWinningSymbol = false;
                            } else {
                                let isCheckWild = false;
                                for (let x = 0; x < this.reelPattern[j].length; x++) {
                                    if (this.reelPattern[j][x] == "w1") {
                                        isCheckWild = true;
                                        break;
                                    }

                                }
                                if (!isCheckWild) {
                                    if (reelState[j]) {
                                        this.reel[j].setSymbolAnimate(k + 1, true);
                                        this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { x: j, y: k, symbol: this.reelPattern[j][k] });
                                        isStopWinningSymbol = false;
                                        reelState[j] = false;
                                    }
                                } else {
                                    if (reelState[j] && this.reelPattern[j][k] == "w1") {
                                        this.reel[j].setSymbolAnimate(k + 1, true);
                                        this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { x: j, y: k, symbol: this.reelPattern[j][k] });
                                        isStopWinningSymbol = false;
                                        reelState[j] = false;
                                    }
                                }

                            }

                        } else if (this.isScatterWild && this.reelPattern[j][k] == config.SYMBOLCODE.SYMBOL_WILD) {
                            this.reel[j].setSymbolAnimate(k + 1, true);
                            this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { x: j, y: k, symbol: this.reelPattern[j][k] });
                            isStopWinningSymbol = false;
                        }
                    }
                    if (_winSymbols[i] == config.SYMBOLCODE.SYMBOL_JACKPOT2 || _winSymbols[i] == config.SYMBOLCODE.SYMBOL_JACKPOT3 || _winSymbols[i] == config.SYMBOLCODE.SYMBOL_JACKPOT) {

                    }
                    else if (isStopWinningSymbol) {
                        break;
                    }
                }
            }
        }
        let delayTime = this.allwinDelayTime;
        if (this.isStopFaster) {
            delayTime = 1.25;
        }

        // if (this.isMysteryRespin) {
        //     this.node.runAction(cc.sequence(
        //         cc.delayTime(delayTime),
        //         cc.callFunc(function(){
        //             cc.log(this.mystery);
        //             for (let i = 0; i < this.mystery.length; i++) {
        //                 if (this.mystery[i] == true) {
        //                     this.instantiateParent[i].active = true;
        //                     var newPosition = new cc.v2(this.instantiateInsideParent[i].position.x, this.instantiateInsideParent[i].position.y + 141);
        //                     var action = cc.moveTo(1, newPosition);
        //                     this.instantiateInsideParent[i].runAction(action); 
        //                 }
        //             }
        //         }, this),
        //         cc.delayTime(1.5),
        //         cc.callFunc(this.afterAllWinLine, this),
        //     ));
        // } else if (this.isMysteryRespin && !this.isMystery) {

        this.node.runAction(cc.sequence(
            cc.delayTime(delayTime),
            cc.callFunc(this.afterAllWinLine, this),
        ));
    },

    afterAllWinLine() {
        console.log("afterAllWinLine");
        // if (this.isMysteryRespin && !this.isMystery) {
        //     console.log(" !this.isMystery");
        //     this.isMysteryRespin = false;
        //     this.node.runAction(cc.sequence(
        //         cc.callFunc(function () {
        //             this.descriptionBar.active = true;
        //             this.descriptionBar.getComponent(cc.Animation).play("DescriptionDisappear");
        //         }, this),
        //         cc.delayTime(1),
        //         cc.callFunc(function () {
        //             this.character.getComponent(sp.Skeleton).setAnimation(0, "basegame_idle", true);
        //             this.character.getComponent(sp.Skeleton).timeScale = 0.5;
        //             this.multiplier.active = false;
        //             this.mystery = [false, false, false, false, false];
        //             for (let i = 0; i < this.mystery.length; i++) {
        //                 this.mysteryFrame[i].active = false;
        //                 this.instantiateParent[i].active = false;
        //             }
        //             for (let i = 0; i < this.instantiateInsideParent.length; i++) {
        //                 if (this.instantiateInsideParent[i].children.length != 0) {
        //                     for (let j = 0; j < this.instantiateInsideParent[i].children.length; j++) {
        //                         this.instantiateInsideParent[i].children[j].destroy();
        //                     }
        //                 }
        //                 this.instantiateInsideParent[i].position = new cc.v2(0, 0);
        //             }
        //         }, this),
        //         cc.delayTime(1),
        //         cc.callFunc(function () {
        //             if (this.gameController != null)
        //                 this.gameController.afterAllWinLine();
        //         }, this),
        //     ));
        // } else if (this.isMystery) {
        //     console.log(" this.isMystery");
        //     this.node.runAction(cc.sequence(
        //         cc.callFunc(function () {
        //             for (let i = 0; i < this.mysteryX.length; i++) {
        //                 this.reel[this.mysteryX[i]].node.children[this.mysteryY[i]].children[16].getComponent(sp.Skeleton).setAnimation(0, "in", false);
        //                 this.animateReel[this.mysteryX[i]].children[this.mysteryY[i]].children[16].getComponent(sp.Skeleton).setAnimation(0, "in", false);
        //             }
        //         }, this),
        //         cc.delayTime(1),
        //         cc.callFunc(function () {
        //             for (let i = 0; i < this.mysteryX.length; i++) {
        //                 for (let j = 0; j < this.reel[this.mysteryX[i]].node.children[this.mysteryY[i]].children.length; j++) {
        //                     if (j != 16) {
        //                         this.reel[this.mysteryX[i]].node.children[this.mysteryY[i]].children[j].active = false;
        //                         this.animateReel[this.mysteryX[i]].children[this.mysteryY[i]].children[j].active = false;
        //                     }
        //                 }
        //                 this.reel[this.mysteryX[i]].node.children[this.mysteryY[i]].children[16].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        //                 this.reel[this.mysteryX[i]].node.children[this.mysteryY[i]].children[16].getComponent(sp.Skeleton).timeScale = 0;
        //                 this.animateReel[this.mysteryX[i]].children[this.mysteryY[i]].children[16].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        //                 this.animateReel[this.mysteryX[i]].children[this.mysteryY[i]].children[16].getComponent(sp.Skeleton).timeScale = 0;
        //             }
        //         }, this),
        //         cc.delayTime(1),
        //         cc.callFunc(function () {
        //             if (this.gameController != null)
        //                 this.gameController.afterAllWinLine();
        //         }, this),
        //     ));
        // } else {
        //     if (this.gameController != null)
        //         this.gameController.afterAllWinLine();
        // }

        if (this.gameController.isInFreeSpinMode) {
            console.log(this.gameController.isInFreeSpinMode);
            this.multiplierR1.getComponent("HallowNightMultiplier").showMultiReel();
            this.multiplierR2.getComponent("HallowNightMultiplier").showMultiReel();
            this.multiplierR3.getComponent("HallowNightMultiplier").showMultiReel();
            this.multiplierR4.getComponent("HallowNightMultiplier").showMultiReel();
            this.multiplierR5.getComponent("HallowNightMultiplier").showMultiReel();
            this.MultiplierCalculate.getComponent("HallowNightMultiplierCalculate").calculateMultiply();
            this.goldCoinFreeSpin.showGoldCoinFs();

            this.node.runAction(cc.sequence(
                cc.delayTime(2),
                cc.callFunc(function () {
                    if (this.gameController != null)
                        this.gameController.afterAllWinLine();
                }, this),
            ));
        } else if (!this.gameController.isInFreeSpinMode) {
            console.log(!this.gameController.isInFreeSpinMode);
            // this.isInFreeSpinMode = false;
            this.hallowViewScript.showCoin();
            this.node.runAction(cc.sequence(
                cc.delayTime(1),
                cc.callFunc(function () {
                    if (this.gameController != null)
                        this.gameController.afterAllWinLine();
                }, this),
            ));

        }

        this.popUpMainView.getComponent("HallowNightPopUpView").showUpBatFly();



        // this.hallowViewScript.showCoin();
        // this.goldCoinFreeSpin.showGoldCoinFs();


    },

    // testButton() {
    //     // this.reelPattern = [["", "", "", "", ""],["", "", "", "", ""],["", "", "", "", ""],["", "", "", "", ""],["", "", "", "", ""]];
    //     //this.reelPattern = [["w1", "s4", "s6", "s1", "s4"],["s3", "w1", "s5", "s5", "w1"],["s5", "s8", "s7", "s7", "s1"],["s6", "s1", "s6", "s1", "s7"]];
    //     cc.log ("reelpattern = "+this.reelPattern);
    //     for (let i = 0; i < this.reel.length; i++) {
    //         this.reel[i].updateReelResult(this.reelPattern[i]);
    //         this.reel[i].updateSymbol();
    //         // this.reel[i].getComponent("MyBaseSymbolView").setSymbol(this.reelPattern[i]);
    //     }
    // //     this.linePaysShow(null);
    // //     this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINLINE, { line: -1 });
    // //     this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINFRAME, { x: -1, y: -1 });
    // //     this.stopAllAnimation();
    // },

    startWinLineByLine() {
        console.log("startWinLineByLine");
        // cc.log(this.spinData.winLines.length);
        // if (this.spinData.winLines.length != 0) {
        //     if (this.character.getComponent(sp.Skeleton)._animationName == "basegame_idle") {
        //         var randomNumber = Math.floor(Math.random() * (2));
        //         if (randomNumber == 0) {
        //             this.character.getComponent(sp.Skeleton).setAnimation(0, "correct_symbol_style1", false);
        //             this.character.getComponent(sp.Skeleton).addAnimation(0, "basegame_idle", true);
        //             this.character.getComponent(sp.Skeleton).timeScale = 0.5;
        //         } else if (randomNumber == 1) {
        //             this.character.getComponent(sp.Skeleton).setAnimation(0, "correct_symbol_style2", false);
        //             this.character.getComponent(sp.Skeleton).addAnimation(0, "basegame_idle", true);
        //             this.character.getComponent(sp.Skeleton).timeScale = 0.5;
        //         }
        //     }
        // }

        this.linePaysShow(null);
        this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINLINE, { line: -1 });
        this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINFRAME, { x: -1, y: -1 });
        this.stopAllAnimation();

        if (this.spinData.winLines.length <= 0)
            return;
        var hasWild = false;

        if (this.audioManager.animationClip != null) {
            this.audioManager.playCustomSoundSfx(this.audioManager.animationClip, false);
        }

        if (!this.isDisableDimEffect) {
            for (let j = 0; j < this.reel.length; j++) {
                this.reel[j].isDimAllSymbol(true);
            }
        }

        var _winlines = this.spinData.winLines;
        var _winCounts = this.spinData.winCounts;
        var _winSymbols = this.spinData.winSymbols;
        var _winWays = this.spinData.winWays;
        var _winNumbers = this.spinData.winNumbers;
        var winCount = 0;

        this.resetLines();
        if (_winlines.length != 0) {
            this.lineParent.children[_winlines[this.lineCount] - 1].active = true;
        }

        if (_winlines[this.lineCount] - 1 >= 0) {
            this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINLINE, { line: _winlines[this.lineCount] - 1, winSymbols: _winSymbols[this.lineCount], winWays: _winWays[this.lineCount] });
        }

        if (!this.isWaysSlot) {
            // console.log("!this.isWaysSlot");
            if (_winWays[this.lineCount] != 1) {
                // console.log("!this.isWaysSlot 002");
                let jCount = 0;
                for (let j = this.reel.length - 1; j >= 0; j--) {
                    if (_winlines[this.lineCount] > 0) {
                        if (winCount < _winCounts[this.lineCount]) {
                            if (this.reelPattern[j][config.PAYLINEARR[_winlines[this.lineCount] - 1][j] - 1] == "w1") {
                                hasWild = true;
                            }
                            console.log("here 01");
                            this.reel[j].setSymbolAnimate(config.PAYLINEARR[_winlines[this.lineCount] - 1][j], true);
                            this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINFRAME, { line: _winlines[this.lineCount] - 1, x: j, y: config.PAYLINEARR[_winlines[this.lineCount] - 1][j] - 1, winAmt: _winNumbers[this.lineCount], symbolCount: winCount, winSymbolCount: _winCounts[this.lineCount], winWay: _winWays[this.lineCount], x2: jCount, symbol: this.reelPattern[j][config.PAYLINEARR[_winlines[this.lineCount] - 1][j] - 1] });
                            winCount++;
                        }
                    }
                    else {
                        for (let k = 0; k < this.reelPattern[j].length; k++) {
                            if (this.reelPattern[j][k] == _winSymbols[this.lineCount] && winCount < _winCounts[this.lineCount]) {
                                console.log("here 02");
                                this.reel[j].setSymbolAnimate(k + 1, true);
                                this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { line: 0, x: j, y: k, winAmt: _winNumbers[this.lineCount], symbolCount: winCount, winSymbolCount: _winCounts[this.lineCount], symbol: this.reelPattern[j][k] });
                                winCount++;
                            } else if (this.isScatterWild && this.reelPattern[j][k] == config.SYMBOLCODE.SYMBOL_WILD && winCount < _winCounts[this.lineCount]) {
                                console.log("here 03");
                                this.reel[j].setSymbolAnimate(k + 1, true);
                                this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { line: 0, x: j, y: k, winAmt: _winNumbers[this.lineCount], symbolCount: winCount, winSymbolCount: _winCounts[this.lineCount], symbol: this.reelPattern[j][k] });
                                winCount++;
                                k = this.reelPattern[j].length;
                            }
                        }
                    }
                    jCount++;
                }
            }
            else {
                console.log("!this.isWaysSlot 000 3");
                for (let j = 0; j < this.reel.length; j++) {
                    if (_winlines[this.lineCount] > 0) {
                        if (winCount < _winCounts[this.lineCount]) {
                            if (this.reelPattern[j][config.PAYLINEARR[_winlines[this.lineCount] - 1][j] - 1] == "w1") {
                                hasWild = true;

                            }


                            console.log("here 000000!!!!!");

                            // this.hollowViewScript.move()
                            this.reel[j].setSymbolAnimate(config.PAYLINEARR[_winlines[this.lineCount] - 1][j], true);
                            this.eventManager.sendEventWithParam(config.EVENT.ENABLEWINFRAME, { line: _winlines[this.lineCount] - 1, x: j, y: config.PAYLINEARR[_winlines[this.lineCount] - 1][j] - 1, winAmt: _winNumbers[this.lineCount], symbolCount: winCount, winSymbolCount: _winCounts[this.lineCount], winWay: _winWays[this.lineCount], x2: 0, symbol: this.reelPattern[j][config.PAYLINEARR[_winlines[this.lineCount] - 1][j] - 1] });
                            winCount++;
                        }
                    }
                    else {
                        for (let k = 0; k < this.reelPattern[j].length; k++) {
                            if (this.reelPattern[j][k] == _winSymbols[this.lineCount] && winCount < _winCounts[this.lineCount]) {

                                this.reel[j].setSymbolAnimate(k + 1, true);
                                this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { line: 0, x: j, y: k, winAmt: _winNumbers[this.lineCount], symbolCount: winCount, winSymbolCount: _winCounts[this.lineCount], symbol: this.reelPattern[j][k] });
                                winCount++;
                            } else if (this.isScatterWild && this.reelPattern[j][k] == config.SYMBOLCODE.SYMBOL_WILD && winCount < _winCounts[this.lineCount]) {
                                this.reel[j].setSymbolAnimate(k + 1, true);
                                this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { line: 0, x: j, y: k, winAmt: _winNumbers[this.lineCount], symbolCount: winCount, winSymbolCount: _winCounts[this.lineCount], symbol: this.reelPattern[j][k] });
                                winCount++;
                                k = this.reelPattern[j].length;
                            }
                        }
                    }
                }
            }
        }
        else {
            console.log("this.isWaysSlot");
            var reelState = [];
            for (let i = 0; i < this.reel.length; i++) {
                reelState.push(true);
            }
            let isStopWinAmountDisplay = true;
            let winSymbolCountAmount = 3;
            let isDisplayWinAmt = false;
            for (let j = 0; j < this.reel.length; j++) {
                let isStopWinningSymbol = true;
                for (let k = 0; k < this.reelPattern[j].length; k++) {
                    if (this.reelPattern[j][k] == _winSymbols[this.lineCount] || config.CHECKWAYSWILD(this.reelPattern[j][k])) {
                        // this.reel[j].setSymbolAnimate(k + 1, true);
                        //     this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { line: 0, x: j, y: k, winAmt: _winNumbers[this.lineCount], symbolCount: j, winSymbolCount: winSymbolCountAmount, symbol: this.reelPattern[j][k] });
                        //     isStopWinningSymbol = false;
                        //     if (j == 2 && !isDisplayWinAmt) {
                        //         isDisplayWinAmt = true;
                        //     }
                        if (this.isSymbolRepeat) {
                            console.log("this.isSymbolRepeat");
                            this.reel[j].setSymbolAnimate(k + 1, true);
                            this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { line: 0, x: j, y: k, winAmt: _winNumbers[this.lineCount], symbolCount: j, winSymbolCount: winSymbolCountAmount, symbol: this.reelPattern[j][k] });
                            isStopWinningSymbol = false;
                            if (j == 2 && !isDisplayWinAmt) {
                                isDisplayWinAmt = true;
                            }
                        }
                        else {
                            console.log("else ");
                            let isCheckWild = false;
                            for (let x = 0; x < this.reelPattern[j].length; x++) {
                                if (this.reelPattern[j][x] == "w1") {
                                    isCheckWild = true;
                                    break;
                                }
                            }
                            if (!isCheckWild) {
                                if (reelState[j] != false) {
                                    this.reel[j].setSymbolAnimate(k + 1, true);
                                    this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { line: 0, x: j, y: k, winAmt: _winNumbers[this.lineCount], symbolCount: j, winSymbolCount: winSymbolCountAmount, symbol: this.reelPattern[j][k] });
                                    isStopWinningSymbol = false;
                                    if (j == 2 && !isDisplayWinAmt) {
                                        isDisplayWinAmt = true;
                                    }
                                    reelState[j] = false;
                                }
                            }
                            else {
                                if (reelState[j] != false && this.reelPattern[j][k] == "w1") {
                                    console.log(" w1");
                                    this.reel[j].setSymbolAnimate(k + 1, true);
                                    this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { line: 0, x: j, y: k, winAmt: _winNumbers[this.lineCount], symbolCount: j, winSymbolCount: winSymbolCountAmount, symbol: this.reelPattern[j][k] });
                                    isStopWinningSymbol = false;
                                    if (j == 2 && !isDisplayWinAmt) {
                                        isDisplayWinAmt = true;
                                    }
                                    reelState[j] = false;
                                }
                            }
                        }
                    } else if (this.isScatterWild && this.reelPattern[j][k] == config.SYMBOLCODE.SYMBOL_WILD) {
                        this.reel[j].setSymbolAnimate(k + 1, true);
                        this.eventManager.sendEventWithParam(config.EVENT.ENABLESCATTERFRAME, { line: 0, x: j, y: k, winAmt: _winNumbers[this.lineCount], symbolCount: j, winSymbolCount: winSymbolCountAmount, symbol: this.reelPattern[j][k] });
                        isStopWinningSymbol = false;
                        if (j == 2 && !isDisplayWinAmt) {
                            isDisplayWinAmt = true;
                        }
                    }
                    if (this.isDisplayWinAmt) {
                        winSymbolCountAmount = -100;
                    }
                }
                if (isStopWinningSymbol)
                    break;
            }
        }
        if (this.isPlayWildSoundFirst && hasWild) {
            this.audioManager.playSymbolSoundSfx(this.audioManager.symbolClip[config.SymbolAnimationSound["w1"]], false);
        } else if (this.audioManager != null && !this.isFinishFirstRoundLine)
            this.audioManager.playSymbolSoundSfx(this.audioManager.symbolClip[config.SymbolAnimationSound[_winSymbols[this.lineCount]]], false);

        this.lineCount++;

        if (this.isDesposeSlot) {

            if (this.lineCount >= _winlines.length) {
                this.lineCount = 0;
                this.isFinishFirstRoundLine = true;
                this.node.runAction(cc.sequence(
                    cc.delayTime(this.lineByLineDelayTime),
                    cc.callFunc(this.gameController.finishFirstRoundLine, this.gameController),
                ));
            }
            else {
                this.node.runAction(cc.sequence(
                    cc.delayTime(this.lineByLineDelayTime),
                    cc.callFunc(this.startWinLineByLine, this),
                ));
            }
            // this.gameController.finishFirstRoundLine();
        }
        else {
            if (this.lineCount >= _winlines.length) {
                this.lineCount = 0;
                this.isFinishFirstRoundLine = true;
            }
            this.node.runAction(cc.sequence(
                cc.delayTime(this.lineByLineDelayTime),
                cc.callFunc(this.startWinLineByLine, this),
            ));
        }
    },

    resetLines() {
        for (let i = 0; i < this.lineParent.children.length; i++) {
            this.lineParent.children[i].active = false;
        }
    },
});
