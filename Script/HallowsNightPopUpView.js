var config = require('MyBaseConfig');
var utils = require('Utils');
var accounting = require('Accounting');
cc.Class({
    extends: cc.Component,

    properties: {
        controller: cc.Node,
        audioManager: cc.Node,
        retriggerNode: cc.Node,
        retriggerAnimTime: 0,

        fiveOfKindNode: cc.Node,
        fiveOfKindAnimTime: 0,

        enterFsGameView: cc.Node,

        enterFsPopUp: cc.Node,
        enterFsAutoTime:2,
        enterFsTotalNum: cc.Label,
        enterFsMultiplier: cc.Label,

        enableFsBackground: false,
        enterFsBackground: cc.Node,
        enterFsPopUpAnimation: "",
        enterFsPopUpBtn: cc.Button,

        exitFsPopUp: cc.Node,
        exitFsAutoTime:5,
        exitFsTotalWin: cc.Node,
        exitFsGameWin: cc.Node,
        exitFsFeatureWin: cc.Node,
        exitFsPopUpBtn: cc.Button,
        fsType: 0,

        preJackpotTransNode: cc.Node,
        preJackpotDelay: 0,
        enterJpPopUp: cc.Node,
        enterJpPopUpBtn: cc.Button,
        enterJpDelay: 0,
        jpType: 0,


        enterBonusPopUp: cc.Node,
        enterBonusButton: cc.Button,
        enterBonusAutoTime:3,
        bonusGameView: cc.Node,
        exitBonusPopUp: cc.Node,
        exitBonusAutoTime:5,
        exitBonusAmount: cc.Label,
        exitBonusButton: cc.Button,

        // //Pinocchio Start
        // normalFrame: cc.Node,
        // bonusFrame: cc.Node,
        // openCurtain: cc.Node,
        // closeCurtain: cc.Node,
        // loadingPanel: cc.Node,
        // startingPanel: cc.Node,
        // //Pinocchio End

        // //Mafia Start
        // normalBackground:cc.Node,
        // freeSpinBackground:cc.Node,
        // //Mafia End

        // pinocchio: 0,
        // mafia: 0,
        // mafiaResumeFS: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        if (this.controller != null) {
            this.controller = this.controller.getComponent(config.SCRIPT.GAMECONTROLLER);
        }
        if (this.enterFsGameView != null) {
            this.enterFsGameView = this.enterFsGameView.getComponent(config.SCRIPT.FREESPINGAMEVIEW);
        }
        if (this.bonusGameView != null) {
            this.bonusGameView = this.bonusGameView.getComponent(config.SCRIPT.BONUSGAMEVIEW);
        }
        if (this.enterFsPopUpBtn != null) {
            this.enterFsPopUpBtn.node.on('click', this.enterFreeSpin, this);
            this.enterFsPopUpBtn.node.active = false;
        }
        if (this.exitFsPopUpBtn != null) {
            this.exitFsPopUpBtn.node.on('click', this.disableExitFreeSpin, this);
        }
        if (this.enterBonusButton != null) {
            this.enterBonusButton.node.on('click', this.enterBonus, this);
        }
        if (this.exitBonusButton != null) {
            this.exitBonusButton.node.on('click', this.disableExitBonus, this);
        }
        if (this.enterJsPopUpBtn != null) {
            this.enterJsPopUpBtn.node.on('click', this.enterJackpot, this);
        }
        if (this.enterFsBackground != null) {
            this.enterFsBackground.active = false;
        }

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown: function (event) {
        switch (event.keyCode) {
            case 32: //Space
                break;
        }
    },

    checkButtonCondition() {
        if (this.exitFsPopUpBtn.node.active) {
            this.disableExitFreeSpin();
        }
    },

    enableFiveOfKind(isEnable) {
        if (!isEnable || this.fiveOfKindNode == null) {
            return 0;
        }

        this.fiveOfKindNode.active = true;

        if (this.audioManager != null)
            this.audioManager.playCustomSoundSfx(this.audioManager.fiveOfKind, false);

        this.node.runAction(cc.sequence(
            cc.delayTime(this.fiveOfKindAnimTime),
            cc.callFunc(this.disableFiveOfKind, this),
        ));

        return this.fiveOfKindAnimTime;
    },

    disableFiveOfKind() {
        this.fiveOfKindNode.active = false;
    },

    enableRetrigger(isEnable) {
        if (!isEnable || this.retriggerNode == null) {
            return 0;
        }

        // if (this.closeCurtain != null){
        //     this.closeCurtain.active = true;
        // }
        
        if (this.audioManager != null) {
            this.audioManager.playCustomSoundSfx(this.audioManager.retrigger, false);
        }

        this.retriggerNode.active = true;
        this.retriggerNode.runAction(cc.sequence(
            cc.delayTime(this.retriggerAnimTime),
            cc.callFunc(this.disableRetrigger, this),
        ));

        // if (this.closeCurtain != null){
        //     this.node.runAction(cc.sequence(
        //         cc.delayTime(4),
        //         cc.callFunc(function () {
        //             this.openCurtainFunction();
        //         }, this),
        //     ));
        // }

        return this.retriggerAnimTime;
    },

    disableRetrigger(){
        if (this.audioManager != null)
            this.audioManager.stopAllSfx();

        this.retriggerNode.active = false;

        // if (this.openCurtain != null){
        //     this.openCurtain.active = false;
        // }
    },

    preFreeSpinTransition() {

    },

    restorePreFreeSpinGame(data) {
        if(data!=null){
            for (let i = 0; i < data.length; i++) {
                if (data[i][0] == 0) {
                    this.enterFsGameView.restoreSectionFreeSpinMultiplier(i + 1, data[i][1]);
                } else if (data[i][0] == 1) {
                    this.enterFsGameView.restoreSectionFreeSpinNum(i + 1, data[i][1]);
                }
            }
        }
        this.enterFsGameView.showGame();
    },

    startFreeSpin(type, multiplier) {
        if (this.enterFsGameView != null) {
            this.enterFsGameView.showGame();
            return;
        }

        if (this.audioManager.randomFeatureTriggeredSound.length != 0)
        {
            var randomNumber = Math.floor(Math.random() * (this.audioManager.randomFeatureTriggeredSound.length));
            this.audioManager.playCustomSoundSfx(this.audioManager.randomFeatureTriggeredSound[randomNumber]);
        }

        this.fsType = type;
        if (this.enterFsPopUp != null) {
            this.enterFsPopUp.active = true;
            if (this.enterFsPopUpAnimation != "") {
                this.enterFsPopUp.getComponent(cc.Animation).play(this.enterFsPopUpAnimation);
            }
            this.enterFsPopUpBtn.node.active = true;

            // if (this.closeCurtain != null){
            //     this.closeCurtain.active = true;
            // }

            if(this.audioManager != null) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(2),
                    cc.callFunc(function () {
                        this.audioManager.playCustomSoundSfx(this.audioManager.enterFreeSpin, false);
                    }, this),
                ));
            }

            if (this.enableFsBackground && this.enterFsBackground != null) {
                this.node.runAction(cc.sequence(
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        this.enterFsBackground.active = true;
                    }, this),
                ));
            }
            
        // console.log('startFreeSpin')
            this.node.runAction(cc.sequence(
                cc.delayTime(this.enterFsAutoTime),
                cc.callFunc(function () {
                    console.log('enterFreeSpin123')
                    this.enterFreeSpin();
                }, this),
            ));

            // if (this.closeCurtain != null){
            //     this.node.runAction(cc.sequence(
            //         cc.delayTime(4),
            //         cc.callFunc(function () {
            //             this.openCurtainFunction();
            //         }, this),
            //         cc.delayTime(1),
            //         cc.callFunc(function () {
            //             this.audioManager.playBGM(1);
            //         }, this),
            //     ));
            // }
        } else {

        }
    },

    // openCurtainFunction(){
    //     if (this.openCurtain != null){
    //         this.closeCurtain.active = false;
    //         this.openCurtain.active = true;
    //     }
    // },

    popUpEnterFSResult(num, multiplier) {
        if (this.enterFsPopUp != null) {
            this.enterFsPopUp.active = true;
            if(this.enterFsTotalNum!=null) {
                this.enterFsTotalNum.string = num;
            }
            if(this.enterFsMultiplier!=null) {
                this.enterFsMultiplier.string = multiplier;
            }
            this.controller.updateFromFSSelectGame(num);
            this.enterFsPopUpBtn.node.active = true;

            console.log('popUpEnterFSResult')
            this.node.runAction(cc.sequence(
                cc.delayTime(this.enterFsAutoTime),
                cc.callFunc(function () {
                    this.enterFreeSpin();
                }, this),
            ));
        } else {
            this.enterFreeSpin();
        }
    },

    updateFreeSpinNumber(num){
        if(this.enterFsTotalNum != null) {
            this.enterFsTotalNum.string = num;
        }
    },

    enterFreeSpin() {
        // console.log('enterFreeSpin')
        this.node.stopAllActions();
        if (this.enterFsPopUp != null)
            this.enterFsPopUp.active = false;
        if (this.enterFsPopUpBtn != null)
            this.enterFsPopUpBtn.node.active = false;

        if (this.audioManager != null)
            this.audioManager.stopAllSfx();

        if (this.enterFsGameView != null) {
            this.enterFsGameView.hideFreeSpinGame();
        }

        this.controller.enterFreeSpin();
    },

    setJackpotType(type) {
        this.jpType = type;
    },

    preJackpotTransition() {
        if (this.preJackpotTransNode != null) {
            this.node.runAction(cc.sequence(
                cc.delayTime(this.preJackpotDelay),
                cc.callFunc(this.startJackpot, this),
            ));
        } else {
            this.startJackpot();
        }
    },

    startJackpot() {
        this.node.stopAllActions();

        if (this.enterJpPopUp != null) {
            this.enterJpPopUp.active = true;

            this.node.runAction(cc.sequence(
                cc.delayTime(this.enterJpDelay),
                cc.callFunc(this.enterJackpot, this),
            ));
        } else {
            this.node.runAction(cc.sequence(
                cc.delayTime(this.enterJpDelay),
                cc.callFunc(this.enterJackpot, this),
            ));
        }
    },

    enterJackpot() {
        this.node.stopAllActions();

        this.enterJpPopUp.active = false;
    },

    exitFreeSpinMode(total, gameWin, featureWin) {
        if (this.exitFsPopUp != null) {
            this.exitFsPopUp.active = true;
        }

        // if (this.closeCurtain != null){
        //     this.closeCurtain.active = true;
        // }

        // if (this.mafia == 1)
        // {
        //     var anim = this.normalBackground.getComponent(dragonBones.ArmatureDisplay);
        //     var anim2 = this.freeSpinBackground.getComponent(dragonBones.ArmatureDisplay);
        //     anim.playAnimation("normal", 0);
        //     anim2.playAnimation("freespin_end", 0)
        // }

        if (this.audioManager != null) {
            this.audioManager.playCustomSoundSfx(this.audioManager.exitFreeSpin, false);
        }

        var temp = accounting.formatNumberPrecision(total);
        if (this.exitFsTotalWin != null && this.exitFsTotalWin.getComponent(cc.Label) != null) {
            this.exitFsTotalWin.getComponent(cc.Label).string = temp;
        } else if (this.exitFsTotalWin != null && this.exitFsTotalWin.getComponent(cc.RichText) != null) {
            this.exitFsTotalWin.getComponent(cc.RichText).string = utils.customRichTextFont(temp);
        }
        temp =  accounting.formatNumberPrecision(featureWin);
        if (this.exitFsFeatureWin != null && this.exitFsFeatureWin.getComponent(cc.Label) != null) {
            this.exitFsFeatureWin.getComponent(cc.Label).string = temp;
        } else if (this.exitFsFeatureWin != null && this.exitFsFeatureWin.getComponent(cc.RichText) != null) {
            this.exitFsFeatureWin.getComponent(cc.RichText).string = utils.customRichTextFont(temp);
        }
        temp = accounting.formatNumberPrecision(gameWin);
        if (this.exitFsGameWin != null && this.exitFsGameWin.getComponent(cc.Label) != null) {
            this.exitFsGameWin.getComponent(cc.Label).string = temp;
        } else if (this.exitFsGameWin != null && this.exitFsGameWin.getComponent(cc.RichText) != null) {
            this.exitFsGameWin.getComponent(cc.RichText).string = utils.customRichTextFont(temp);
        }

        this.node.runAction(cc.sequence(
            cc.delayTime(this.exitFsAutoTime),
            cc.callFunc(function () {
                this.disableExitFreeSpin();
            }, this),
        ));

        // if (this.closeCurtain != null){
        //     this.node.runAction(cc.sequence(
        //         cc.delayTime(4),
        //         cc.callFunc(function () {
        //             this.openCurtainFunction();
        //         }, this),
        //     ));
        // }
    },

    disableExitFreeSpin() {
        this.node.stopAllActions();
        if (this.exitFsPopUp != null && !this.exitFsPopUp.active) {
            return;
        }

        // if (this.openCurtain != null){
        //     this.openCurtain.active = false;
        // }

        if (this.exitFsPopUp != null) {
            this.exitFsPopUp.active = false;
        }

        if (this.audioManager != null)
            this.audioManager.stopAllSfx();

        if(this.controller!=null) {
            this.controller.backFromExitFSEvent();
        }
        // //Pinocchio Start
        // if (this.normalFrame != null && this.bonusFrame != null)
        // {
        //     this.normalFrame.active = true;
        //     this.bonusFrame.active = false;
        // }
        // //PinocchioEnd

        // this.node.runAction(cc.sequence(
        //     cc.delayTime(1),
        //     cc.callFunc(function () {
        //         this.callControllerBackFromExitFSEvent();
        //     }, this),
        // ));
    },

    // callControllerBackFromExitFSEvent(){
    //     this.controller.backFromExitFSEvent();
    // },

    startBonus() {
        if (this.enterBonusPopUp != null) {
            this.enterBonusPopUp.active = true;

            this.node.runAction(cc.sequence(
                cc.delayTime(this.enterBonusAutoTime),
                cc.callFunc(function () {
                    this.enterBonus();
                }, this),
            ));
        } else {
            this.enterBonus();
        }
    },

    enterBonus() {
        if (this.enterBonusPopUp != null) {
            this.enterBonusPopUp.active = false;
        } 
        this.bonusGameView.startGame();
    },

    popUpBonusSummary(totalBonus) {
        totalBonus = accounting.formatNumberPrecision(totalBonus);
        if (this.exitBonusPopUp != null)
            this.exitBonusPopUp.active = true;
        if (this.exitBonusAmount != null)
            this.exitBonusAmount.string = totalBonus;

        this.node.runAction(cc.sequence(
            cc.delayTime(this.exitBonusAutoTime),
            cc.callFunc(function () {
                this.disableExitBonus();
            }, this),
        ));
    },

    disableExitBonus() {
        this.node.stopAllActions();
        if (this.exitBonusPopUp != null) {
            this.exitBonusPopUp.active = false;
        }

        if (this.audioManager != null)
            this.audioManager.stopAllSfx();

        this.controller.backFromBonusSpecialEvent();
    },

    onReceiveFreeSpinInfo(data) {
        if (data.selectionType == 1) {
            if (this.enterFsGameView != null)
                this.enterFsGameView.updateValue(data.selectionNum, 0);
        } else if (data.selectionType == 0) {
            if (this.enterFsGameView != null)
                this.enterFsGameView.updateValue(0, data.selectionNum);
        } else if(data.selectionType == 2){
            if (this.enterFsGameView != null)
                this.enterFsGameView.updateValue(data.selectionNum, data.selectionNum2);
        }else{
            this.enterFsGameView.updateValue(-1, -1);
        }
    },

    onReceiveBonusInfo(data) {
        console.log(data);
        this.bonusGameView.updateValue(data.amount);
    },

    updateBonusTotalClick(i) {
        this.bonusGameView.updateTotalClick(i);
    },

    restoreBonusNumber(nums) {
        this.bonusGameView.restoreBonusNumber(nums);
    },
});