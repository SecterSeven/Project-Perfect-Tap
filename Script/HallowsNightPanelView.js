var config = require('MyBaseConfig');
var accounting = require('Accounting');
var utils = require('Utils');
var MobileSocket = require("MobileSocket");
cc.Class({
    extends: require("MyBasePanelView"),

    properties: {
        goldCoinRestore: cc.Node,
        goldCoinFs: cc.Node,
        tenButton: cc.Node,
        twentyfiveButton: cc.Node,
        fiftyButton: cc.Node,
        seventyfiveButton: cc.Node,
        hundredButton: cc.Node,
        twohundredfiftyButton: cc.Node,
        fivehundredButton: cc.Node,
        sevenhundredfiftyButton: cc.Node,
        onethousandButton: cc.Node,
        infinityButton: cc.Node,
        turboButton: cc.Button,
        turbo2Button: cc.Button,
        confirmedAutoSpinAmount: 0,
        betAmountPanelBetAmount: cc.Float,
        typeLineBets: [cc.Float],

        onetButton: cc.Node,
        fivetButton: cc.Node,
        tentButton: cc.Node,
        twentytButton: cc.Node,
        fiftytButton: cc.Node,
        onehundredtButton: cc.Node,
        onehundredtwentyfivetButton: cc.Node,
        fivehundredtButton: cc.Node,
        sevenhundredfiftytButton: cc.Node,
        onethousandtButton: cc.Node,
        onethousandtwohundredfiftytButton: cc.Node,
        twothousandfivehundredtButton: cc.Node,
        // confirmedBetAmountPanelBetAmount: {
        //     visible: false,
        //     type: cc.Float,
        //     default: 0,
        // },
        // confirmedBetAmountPanelTotalBetAmount: {
        //     visible: false,
        //     type: cc.Float,
        //     default: 0,
        // },



        itemToMoveDown: [cc.Node],
        itemToMoveUp: [cc.Node],

        timeLabel: cc.Node,

        data1: cc.Node,
        data2: cc.Node,
        data3: cc.Node,
        normalTotalWin: cc.Node,
        MinusButton: cc.Node,
        AddButton: cc.Node,

        spinButtonHoverEffect: cc.Node,
        spinButtonEffect: cc.Node,

        totalTemp: {
            default: 0,
            visible: false,
        },

        // betAmountList: [cc.Node],


    },

    start() {
        // this.typeLineBets[this.lineBet] = 5
        // console.log(this.typeLineBets[this.lineBet]);

        this._super();

        if (this.turboButton != null) {
            this.turboButton.node.on("click", this.turboButtonClick, this);
        }

        if (this.turbo2Button != null) {
            this.turbo2Button.node.on("click", this.turbo2ButtonClick, this);
        }

        this.spinBtn.node.on("mouseenter", this.hoverEffectOn, this);
        this.stopBtn.node.on("mouseenter", this.hoverEffectOn, this);

        this.spinBtn.node.on("mouseleave", this.hoverEffectOff, this);
        this.stopBtn.node.on("mouseleave", this.hoverEffectOff, this);

        this.updateTime();
        this.schedule(this.updateTime, 1);
    },
    // onLoad() {
    //     for (let i = 0; i < this.betAmountList.length; i++) {
    //         this.betAmountList[i].on('click', () => {
    //             var value = i;
    //             this.changeBetamount(value);
    //         }, this);
    //     }
    // },

    hoverEffectOn() {
        this.spinButtonHoverEffect.active = true;
    },

    hoverEffectOff() {
        this.spinButtonHoverEffect.active = false;
    },

    turboButtonClick() {
        this.turboButton.node.active = false;
        this.turbo2Button.node.active = true;
        this.reelMain.getComponent("MyBaseReelManagerView").defaultReelStopTime = 0;
    },

    turbo2ButtonClick() {
        this.turboButton.node.active = true;
        this.turbo2Button.node.active = false;
        this.reelMain.getComponent("MyBaseReelManagerView").defaultReelStopTime = 0.17;
    },

    startSpin() {
        // this.audioManager.stopAllSfx();
        // console.log(this.controller.myCredit +" / " +this.controller.myTotalBet);
        if (this.controller.myCredit < this.controller.myTotalBet && this.freespinNumber <= 0) {
            this.controller.insuffucientCoins();
            this.resetAutoSpin();
            return;
        }
        if (this.autoSpinAmt > 0 && this.autoSpinAmt != 999) {
            this.autoSpinAmt -= 1;
        }
        if (this.autoSpinAmt >= 0 && this.autoSpinStopLabel != null) {
            this.autoSpinStopLabel.string = this.autoSpinAmt;
        }

        this.audioManager.scatterNumber = 0;

        if (this.autoSpinAmt >= 0) {
            this.updateAutoSpinAmount();
        }

        this.disableAutoSpinPanel();
        this.disableSidePanel();
        if (this.autoSpinAmt > 0 && this.freespinNumber <= 0) {
            if (this.autoSpinStopBtn != null) {
                this.autoSpinStopBtn.node.active = true;
            }
            this.stopBtn.node.active = true;
        } else {
            this.stopBtn.node.active = true;
        }

        if (this.spinBtn != null) {
            this.spinBtn.interactable = false;
        }
        if (this.audioManager != null) {
            if (this.audioManager.reelButtonClickClip != null) {
                this.audioManager.playCustomSoundSfx(this.audioManager.reelButtonClickClip, false);
            } else if (this.audioManager.buttonClickClip != null) {
                this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);
            }
        }
        this.controller.startSpin();

        this.isConnection = true;
        this.connectionTimer = 0;
        this.node.runAction(cc.sequence(
            cc.delayTime(this.delaySpinToServer),
            cc.callFunc(function () {
                console.log(config.PAYLINEARR.length + " >>> " + this.typeLineBets[this.confirmedBetAmountPanelBetAmount]);
                this.controller.onRequestSpinResult(config.PAYLINEARR.length, this.typeLineBets[this.confirmedBetAmountPanelBetAmount], 1);
            }, this)
        ));

        if (this.betPanel != null) {
            this.betPanel.active = false;
        }
        if (this.menuPanel != null) {
            this.menuPanel.active = false;
        }
        if (this.inifinityBtn != null) {
            this.inifinityBtn.interactable = false;
        }
        if (this.maxBetBtn != null) {
            this.maxBetBtn.interactable = false;
        }
        if (this.totalBetPlus != null) {
            this.totalBetPlus.interactable = false;
        }
        if (this.totalBetMinus != null) {
            this.totalBetMinus.interactable = false;
        }
        if (this.turboButton != null) {
            this.turboButton.interactable = false;
        }
        if (this.turbo2Button != null) {
            this.turbo2Button.interactable = false;
        }
        if (this.buyFreeSpinButton != null) {
            this.buyFreeSpinButton.interactable = false;
        }
        if (this.betAmountButton != null) {
            this.betAmountButton.interactable = false;
        }
        if (this.autoSpinButton != null) {
            this.autoSpinButton.interactable = false;
        }
    },

    // goldCoinFsPlus(){
    //     this.freespinNumber += 3;
    //     this.updateFreeSpinNumber(this.freespinNumber);
    // },

    updateFreeSpinNumber(number) {
        cc.log(number);
        var fsNum = number;
        if (number < 0) {
            number = 0;
        }
        if (this.freespinNumLabel == null) {
            return;
        }

        if (this.freespinNumLabel.getComponent(cc.Label) != null) {
            this.freespinNumLabel.getComponent(cc.Label).string = number;
        }
        if (this.freespinNumLabel.getComponent(cc.RichText) != null) {
            this.freespinNumLabel.getComponent(cc.RichText).string = utils.customRichTextFont(number);
        }

        this.freespinNumber = fsNum;
    },

    spinButtonClick() {
        this.spinButtonEffect.active = false;
        this.spinButtonEffect.active = true;
    },

    resetAllButton() {
        this.isSpinning = false;
        cc.log(this.freespinNumber);
        if (this.freespinNumber > 0) {
            this.node.runAction(cc.sequence(
                cc.delayTime(this.delayFreeSpinEnterSpin),
                cc.callFunc(this.startSpin, this)
            ));

        }
        else if (this.autoSpinAmt > 0) {
            if (this.autoSpinStopBtn != null) {
                this.autoSpinStopBtn.node.active = true;
            }
            if (this.spinBtn != null) {
                this.spinBtn.interactable = false;
            }
            this.autoSpin();
        }
        else {
            console.log("Reset All Button");
            if (this.spinBtn != null) {
                this.spinBtn.interactable = true;
            }
            if (this.autoSpinStopBtn != null) {
                this.autoSpinStopBtn.node.active = false;
            }
            if (this.inifinityBtn != null) {
                this.inifinityBtn.interactable = true;
            }
            if (this.maxBetBtn != null) {
                this.maxBetBtn.interactable = true;
            }
            if (this.lineBet == 0) {
                if (this.totalBetMinus != null) {
                    this.totalBetMinus.interactable = false;
                    this.MinusButton.interactable = false;
                    cc.log("qweasdzxc1");
                }
            } else {
                this.totalBetMinus.interactable = true;
                this.MinusButton.interactable = true;
    
            }
            if (this.lineBet == this.typeLineBets.length - 1) {
                if (this.totalBetPlus != null) {
                    this.totalBetPlus.interactable = false;
                    this.AddButton.interactable = false;
                    cc.log("qweasdzxc2");
                }
            } else {
                this.totalBetPlus.interactable = true;
                this.AddButton.interactable = true;
            }
            // if (this.totalBetPlus != null) {
            //     this.totalBetPlus.interactable = true;
            // }
            // if (this.totalBetMinus != null) {
            //     this.totalBetMinus.interactable = true;
            // }
            if (this.turboButton != null) {
                this.turboButton.interactable = true;
            }
            if (this.turbo2Button != null) {
                this.turbo2Button.interactable = true;
            }
            if (this.buyfeatureMainNode != null) {
                this.buyfeatureMainNode.active = true;
            }
            if (this.buyFreeSpinButton != null) {
                this.buyFreeSpinButton.interactable = true;
            }
            if (this.betAmountButton != null) {
                this.betAmountButton.interactable = true;
            }
            if (this.autoSpinButton != null) {
                this.autoSpinButton.interactable = true;
            }
        }
        this.isConnection = false;
        this.connectionTimer = 0;
        this.totalTemp = 0;
    },

    updateFreeSpinTotalWin(number) {
        // console.log(number);

        console.log(number);
        this.totalTemp += number;
        console.log(" totalnumber : " + this.totalTemp);
        this.freespinTotalWinLabel.string = this.totalTemp; // number
        var temp = accounting.formatNumberPrecision(number);



        console.log("totalTemp : " + this.totalTemp);

        // console.log(temp);
        if (this.freespinTotalWinLabel.getComponent(cc.Label) != null) {
            if (this.isWinWord) {
                this.freespinTotalWinLabel.getComponent(cc.Label).string = "Total Win " + this.totalTemp;// +accounting.formatNumberPrecision(number);
            } else {
                this.freespinTotalWinLabel.getComponent(cc.Label).string = this.totalTemp; //accounting.formatNumberPrecision(number);//number;
            }
        }
        if (this.freespinTotalWinLabel.getComponent(cc.RichText) != null) {
            this.freespinTotalWinLabel.getComponent(cc.RichText).string = utils.customRichTextFont(temp);
        }

    },

    requestBuySpin() {
        this.closeBuyFeature();

        if (this.freespinNumber > 0) {
            return;
        }
        if (this.isSpinning) {
            return;
        }
        // console.log(this.controller.myCredit +" / " +this.controller.myTotalBet);
        if (this.controller.myCredit < (this.controller.myTotalBet * 100) && this.freespinNumber <= 0) {
            this.controller.insuffucientCoins();
            this.resetAutoSpin();
            return;
        }
        if (this.autoSpinAmt > 0 && this.autoSpinAmt != 100)
            this.autoSpinAmt -= 1;
        if (this.autoSpinAmt != 100 && this.autoSpinAmt >= 0 && this.autoSpinStopLabel != null) {
            this.autoSpinStopLabel.string = this.autoSpinAmt;
        }

        this.disableAutoSpinPanel();
        this.disableSidePanel();
        if (this.autoSpinAmt > 0 && this.freespinNumber <= 0) {
            if (this.autoSpinStopBtn != null) {
                this.autoSpinStopBtn.node.active = true;
            }
            this.stopBtn.node.active = true;
        } else {
            this.stopBtn.node.active = true;
        }

        if (this.spinBtn != null) {
            this.spinBtn.interactable = false;
        }
        if (this.audioManager != null) {
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);
        }
        this.controller.startSpin();

        this.isConnection = true;
        this.connectionTimer = 0;
        this.node.runAction(cc.sequence(
            cc.delayTime(0.03),
            cc.callFunc(function () {
                this.controller.onRequestBuyFreeSpinResult(config.PAYLINEARR.length, this.typeLineBets[this.confirmedBetAmountPanelBetAmount], 1);
            }, this)
        ));

        if (this.betPanel != null)
            this.betPanel.active = false;
        if (this.menuPanel != null)
            this.menuPanel.active = false;
        if (this.inifinityBtn != null) {
            this.inifinityBtn.interactable = false;
        }
        if (this.maxBetBtn != null) {
            this.maxBetBtn.interactable = false;
        }
        if (this.totalBetPlus != null) {
            this.totalBetPlus.interactable = false;
        }
        if (this.totalBetMinus != null) {
            this.totalBetMinus.interactable = false;
        }
        if (this.turboButton != null) {
            this.turboButton.interactable = false;
        }
        if (this.turbo2Button != null) {
            this.turbo2Button.interactable = false;
        }
        if (this.buyFreeSpinButton != null) {
            this.buyFreeSpinButton.interactable = false;
        }
        if (this.betAmountButton != null) {
            this.betAmountButton.interactable = false;
        }
        if (this.autoSpinButton != null) {
            this.autoSpinButton.interactable = false;
        }
    },

    openAutoSpinPanel() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.autoSpinPanel.active = true;
        this.confirmedAutoSpinAmount = 0;

        this.data1.getComponent(cc.Label).string = this.playerCredit.string;
        this.data2.getComponent(cc.Label).string = this.totalBetDisplay.string;
        this.data3.getComponent(cc.Label).string = parseFloat(this.normalTotalWin.getComponent(cc.Label).string);
        this.resetColor();
    },

    closeAutoSpinPanel() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip2, false);

        this.autoSpinPanel.active = false;
    },

    autoSpin10() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.confirmedAutoSpinAmount = 10;
        this.resetColor();
        this.tenButton.color = new cc.color(150, 150, 150);
        console.log("color " + this.tenButton.color);
    },

    autoSpin25() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.confirmedAutoSpinAmount = 25;
        this.resetColor();
        this.twentyfiveButton.color = new cc.color(150, 150, 150);
    },

    autoSpin50() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.confirmedAutoSpinAmount = 50;
        this.resetColor();
        this.fiftyButton.color = new cc.color(150, 150, 150);
    },

    autoSpin75() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.confirmedAutoSpinAmount = 75;
        this.resetColor();
        this.seventyfiveButton.color = new cc.color(150, 150, 150);
    },

    autoSpin100() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.confirmedAutoSpinAmount = 100;
        this.resetColor();
        this.hundredButton.color = new cc.color(150, 150, 150);
    },

    autoSpin250() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.confirmedAutoSpinAmount = 250;
        this.resetColor();
        this.twohundredfiftyButton.color = new cc.color(150, 150, 150);
    },

    autoSpin500() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.confirmedAutoSpinAmount = 500;
        this.resetColor();
        this.fivehundredButton.color = new cc.color(150, 150, 150);
    },

    autoSpin750() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.confirmedAutoSpinAmount = 750;
        this.resetColor();
        this.sevenhundredfiftyButton.color = new cc.color(150, 150, 150);
    },

    autoSpin1000() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.confirmedAutoSpinAmount = 1000;
        this.resetColor();
        this.onethousandButton.color = new cc.color(150, 150, 150);
    },

    autoSpininfinity() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.confirmedAutoSpinAmount = 999999;
        this.resetColor();
        this.infinityButton.color = new cc.color(150, 150, 150);
    },

    resetColor() {
        this.tenButton.color = new cc.color(255, 255, 255);
        console.log("change" + this.tenButton.color);
        this.twentyfiveButton.color = new cc.color(255, 255, 255);
        this.fiftyButton.color = new cc.color(255, 255, 255);
        this.seventyfiveButton.color = new cc.color(255, 255, 255);
        this.hundredButton.color = new cc.color(255, 255, 255);
        this.twohundredfiftyButton.color = new cc.color(255, 255, 255);
        this.fivehundredButton.color = new cc.color(255, 255, 255);
        this.sevenhundredfiftyButton.color = new cc.color(255, 255, 255);
        this.onethousandButton.color = new cc.color(255, 255, 255);
        this.infinityButton.color = new cc.color(255, 255, 255);
    },

    confirmAutoSpin() {
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.autoDisplay.active = true;
        this.autoSpinAmt = this.confirmedAutoSpinAmount;
        this.autoSpin();
        this.closeAutoSpinPanel();
    },

    stopAutoSpin() {
        this.autoSpinAmt = 0;
        this.autoDisplay.active = false;
    },

    openSidePanel() {
        if (this.isSidePanelOpen) {
            return;
        }

        if (this.freespinNumber >= 0) {
            return;
        }

        if (this.audioManager != null) {
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);
        }
        this.isSidePanelOpen = true;

        for (let i = 0; i < this.itemToMoveDown.length; i++) {
            if (this.itemToMoveDown[i].active == false) {
                this.itemToMoveDown[i].active = true;
                var temp = this.itemToMoveDown[i].position.y - 254;
                this.itemToMoveDown[i].position = new cc.v2(this.itemToMoveDown[i].position.x, temp);
                this.itemToMoveDown[i].active = false;
            }

            var newPosition = new cc.v2(this.itemToMoveDown[i].position.x, this.itemToMoveDown[i].position.y - 254);
            var action = cc.moveTo(0.5, newPosition);
            this.itemToMoveDown[i].runAction(action);
        }

        for (let i = 0; i < this.itemToMoveUp.length; i++) {
            if (this.itemToMoveUp[i].active == false) {
                this.itemToMoveUp[i].active = true;
                var temp = this.itemToMoveUp[i].position.y + 254;
                this.itemToMoveUp[i].position = new cc.v2(this.itemToMoveUp[i].position.x, temp);
                this.itemToMoveUp[i].active = false;
            } else {
                var newPosition = new cc.v2(this.itemToMoveUp[i].position.x, this.itemToMoveUp[i].position.y + 254);
                var action = cc.moveTo(0.5, newPosition);
                this.itemToMoveUp[i].runAction(action);
            }
        }
    },


    updateLineBet() {
        if (this.lineBet == 0) {
            if (this.totalBetMinus != null) {
                this.totalBetMinus.interactable = false;
                this.MinusButton.interactable = false;
                cc.log("qweasdzxc1");
            }
        } else {
            this.totalBetMinus.interactable = true;
            this.MinusButton.interactable = true;

        }
        if (this.lineBet == this.typeLineBets.length - 1) {
            if (this.totalBetPlus != null) {
                this.totalBetPlus.interactable = false;
                this.AddButton.interactable = false;
                cc.log("qweasdzxc2");
            }
        } else {
            this.totalBetPlus.interactable = true;
            this.AddButton.interactable = true;
        }

        if (this.lineBet < 0) {
            this.lineBet = this.typeLineBets.length - 1;
        }
        if (this.lineBet >= this.typeLineBets.length) {
            this.lineBet = 0;
        }
        if (this.lineBetText != null) {
            this.lineBetText.string = accounting.formatNumberPrecision(this.typeLineBets[this.lineBet]);
        }
        var _totalBet = (this.typeLineBets[this.lineBet] * config.PAYLINEARR.length);
        console.log("fff" + _totalBet);

        if (this.controller != null) {
            this.controller.updateTotalBet(_totalBet);
        }
        if (this.totalBetDisplay != null) {
            this.totalBetDisplay.string = accounting.formatNumberPrecision(_totalBet);
        }
        if (this.buyFreeSpinTotalBetDisplay != null) {
            this.buyFreeSpinTotalBetDisplay.string = accounting.formatNumberPrecision(_totalBet);
        }
        for (let i = 0; i < this.buyfeatureBetSize.length; i++) {
            this.buyfeatureBetSize[i].string = accounting.formatNumberPrecision(_totalBet * 100);
        }
        if (this.lineBetDisplay != null) {
            this.lineBetDisplay.string = accounting.formatNumberPrecision(this.typeLineBets[this.lineBet]);
        }
        if (this.linesDisplay != null) {
            this.linesDisplay.string = config.PAYLINEARR.length;
        }
    },

    updateTime() {
        var currentdate = new Date();
        this.timeLabel.getComponent(cc.Label).string = currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear() + ", " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    },

    disableSidePanel() {
        if (!this.isSidePanelOpen) {
            return;
        }

        if (this.audioManager != null) {
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);
        }

        this.isSidePanelOpen = false;

        for (let i = 0; i < this.itemToMoveDown.length; i++) {
            if (this.itemToMoveDown[i].active == false) {
                this.itemToMoveDown[i].active = true;
                var temp = this.itemToMoveDown[i].position.y + 254;
                this.itemToMoveDown[i].position = new cc.v2(this.itemToMoveDown[i].position.x, temp);
                this.itemToMoveDown[i].active = false;
            } else {
                var newPosition = new cc.v2(this.itemToMoveDown[i].position.x, this.itemToMoveDown[i].position.y + 254);
                var action = cc.moveTo(0.5, newPosition);
                this.itemToMoveDown[i].runAction(action);
            }
        }

        for (let i = 0; i < this.itemToMoveUp.length; i++) {
            if (this.itemToMoveUp[i].active == false) {
                this.itemToMoveUp[i].active = true;
                var temp = this.itemToMoveUp[i].position.y - 254;
                this.itemToMoveUp[i].position = new cc.v2(this.itemToMoveUp[i].position.x, temp);
                this.itemToMoveUp[i].active = false;
            } else {
                var newPosition = new cc.v2(this.itemToMoveUp[i].position.x, this.itemToMoveUp[i].position.y - 254);
                var action = cc.moveTo(0.5, newPosition);
                this.itemToMoveUp[i].runAction(action);
            }
        }
    },

    openBetAmountPanel() {
        this.buttonClickSound();
        this.disableSidePanel();
        this.betAmountPanel.active = true;
        // this.betAmountPanelBetAmount = 0;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelBetAmountLabel.string = config.PAYLINEARR.length;
        this.betAmountPanelTotalBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount] * config.PAYLINEARR.length;
    },

    openBetAmountPanel2() {
        this.buttonClickSound();
        this.disableSidePanel();
        this.betAmountPanel.active = true;
        // this.betAmountPanelBetAmount = 0;
        this.betAmountPanelBetAmountLabel.string = config.PAYLINEARR.length;
        this.betAmountPanelTotalBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount] * config.PAYLINEARR.length;
    },

    showRestoreBetSize(betSize) {
        console.log("showRestoreBetSize " + betSize);
        for (let i = 0; i < this.typeLineBets.length; i++) {
            if (this.typeLineBets[i] == betSize) {
                this.lineBet = i;
            }
        }
        this.updateLineBet2();
    },

    updateLineBet2() {
        //bet size
        let betLineValue = this.typeLineBets[this.lineBet];
        console.log("this.lineBet" + this.lineBet);
        console.log("betLineValue " + betLineValue);
        this.betLineValue = betLineValue;
        if (this.lineBetText != null) {
            this.lineBetText.string = accounting.formatNumberPrecision(this.typeLineBets[this.lineBet]);
        }

        this.betAmountPanelBetLabel.string = this.typeLineBets[this.lineBet];
        this.betAmountPanelBetAmountLabel.string = config.PAYLINEARR.length;
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);

        var _totalBet = Number(this.betAmountPanelTotalBetLabel.string);
        console.log("_totalBet " + _totalBet);
        if (this.controller != null) {
            this.controller.updateTotalBet(_totalBet);
        }
        if (this.totalBetDisplay != null) {
            this.totalBetDisplay.string = accounting.formatNumberPrecision(_totalBet);
        }
        if (this.buyFreeSpinTotalBetDisplay != null) {
            this.buyFreeSpinTotalBetDisplay.string = accounting.formatNumberPrecision(_totalBet);
        }
        for (let i = 0; i < this.buyfeatureBetSize.length; i++) {
            this.buyfeatureBetSize[i].string = accounting.formatNumberPrecision(_totalBet * 100);
        }
        if (this.lineBetDisplay != null) {
            this.lineBetDisplay.string = accounting.formatNumberPrecision(this.typeLineBets[this.lineBet]);
        }
        if (this.linesDisplay != null) {
            this.linesDisplay.string = config.PAYLINEARR.length;
        }
        cc.log("Click!!! = " + this.betLineValue);

        this.goldCoinRestore.getComponent("HallowNightGoldCoin").showRestoreCoin(this.betLineValue);
    },

    // changeBetamount(value) {
    //     var totalBet;
    //     if (value == 0) {
    //         totalBet = 1;
    //     } else if (value == 1) {
    //         totalBet = 5;
    //     } else if (value == 2) {
    //         totalBet = 10;
    //     } else if (value == 3) {
    //         totalBet = 20;
    //     } else if (value == 4) {
    //         totalBet = 50;
    //     } else if (value == 5) {
    //         totalBet = 100;
    //     } else if (value == 6) {
    //         totalBet = 125;
    //     } else if (value == 7) {
    //         totalBet = 500;
    //     } else if (value == 8) {
    //         totalBet = 750;
    //     } else if (value == 9) {
    //         totalBet = 1000;
    //     } else if (value == 10) {
    //         totalBet = 1250;
    //     } else if (value == 11) {
    //         totalBet = 2500;
    //     }
    //     this.betAmountPanelTotalBetLabel.string = totalBet;
    //     return;

    // },



    betAmount1() {
        // console.log("bet = "+ this.typeLineBets[this.lineBet])
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 0;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.onetButton.color = new cc.color(150, 150, 150);
        this.lineBet = 0;
    },

    betAmount5() {
        // console.log("bet = "+ this.betAmountPanelBetAmount)
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 1;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.fivetButton.color = new cc.color(150, 150, 150);
        this.lineBet = 1;
    },

    betAmount10() {
        // console.log("bet = "+ this.betAmountPanelBetAmount)
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 2;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.tentButton.color = new cc.color(150, 150, 150);
        this.lineBet = 2;
    },

    betAmount20() {
        // console.log("bet = "+ this.betAmountPanelBetAmount)
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 3;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.twentytButton.color = new cc.color(150, 150, 150);
        this.lineBet = 3;
    },

    betAmount50() {
        // console.log("bet = "+ this.betAmountPanelBetAmount)
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 4;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.fiftytButton.color = new cc.color(150, 150, 150);
        this.lineBet = 4;
    },

    betAmount100() {
        // console.log("bet = "+ this.betAmountPanelBetAmount)
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 5;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.onehundredtButton.color = new cc.color(150, 150, 150);
        this.lineBet = 5;
    },

    betAmount125() {
        // console.log("bet = "+ this.betAmountPanelBetAmount)
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 6;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.onehundredtwentyfivetButton.color = new cc.color(150, 150, 150);
        this.lineBet = 6;
    },

    betAmount500() {
        // console.log("bet = "+ this.betAmountPanelBetAmount)
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 7;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.fivehundredtButton.color = new cc.color(150, 150, 150);
        this.lineBet = 7;
    },

    betAmount750() {
        // console.log("bet = "+ this.betAmountPanelBetAmount)
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 8;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.sevenhundredfiftytButton.color = new cc.color(150, 150, 150);
        this.lineBet = 8;
    },

    betAmount1000() {
        // console.log("bet = "+ this.betAmountPanelBetAmount)
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 9;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.onethousandtButton.color = new cc.color(150, 150, 150);
        this.lineBet = 9;
    },

    betAmount1250() {
        // console.log("bet = "+ this.betAmountPanelBetAmount)
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 10;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.onethousandtwohundredfiftytButton.color = new cc.color(150, 150, 150);
        this.lineBet = 10;
    },

    betAmount2500() {
        // console.log("bet = "+ this.betAmountPanelBetAmount)
        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.buttonClickClip, false);

        this.betAmountPanelBetAmount = 11;
        this.betAmountPanelBetLabel.string = this.typeLineBets[this.betAmountPanelBetAmount];
        this.betAmountPanelTotalBetLabel.string = Number(this.betAmountPanelBetLabel.string) * Number(this.betAmountPanelBetAmountLabel.string);
        this.resetColorBet();
        this.twothousandfivehundredtButton.color = new cc.color(150, 150, 150);
        this.lineBet = 11;
    },


    confirmbetAmount() {
        this.updateLineBet2();
        this.resetColorBet();
        this.closeBetAmountPanel();
        this.confirmedBetAmountPanelBetAmount = this.betAmountPanelBetAmount;
        this.confirmedBetAmountPanelTotalBetAmount = Number(this.betAmountPanelTotalBetLabel.string);
    },

    resetColorBet() {
        this.onetButton.color = new cc.color(255, 255, 255);
        this.fivetButton.color = new cc.color(255, 255, 255);
        this.tentButton.color = new cc.color(255, 255, 255);
        this.twentytButton.color = new cc.color(255, 255, 255);
        this.fiftytButton.color = new cc.color(255, 255, 255);
        this.onehundredtButton.color = new cc.color(255, 255, 255);
        this.onehundredtwentyfivetButton.color = new cc.color(255, 255, 255);
        this.fivehundredtButton.color = new cc.color(255, 255, 255);
        this.sevenhundredfiftytButton.color = new cc.color(255, 255, 255);
        this.onethousandtButton.color = new cc.color(255, 255, 255);
        this.onethousandtwohundredfiftytButton.color = new cc.color(255, 255, 255);
        this.twothousandfivehundredtButton.color = new cc.color(255, 255, 255);
    },
    resetFreeSpinNum() {
        this.freespinNumber = -1;
    },
});