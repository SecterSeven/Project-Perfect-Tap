var config = require('MyBaseConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        reelMainView: cc.Node,
        gameController: cc.Node,
        panelMainView: cc.Node,
        ghostShowUpFs: cc.Node,
        plusThree: cc.Node,
        coinListFs: [cc.Node],
        coinObjFs: cc.Node,
        baseCoinFs: cc.Node,
        keepCoinFs: 0,
        hallowManager: cc.Node,
        hallowManagerScript: {
            default: null,
            visible: false,
        },
        // freespinNumLabel: cc.Node,
        freespinNumber: 0,

        goldCoins: {
            default: 0,
            visible: false,
        },

        isFreeSpin: true,
        countCoinFs: {
            default: 0,
            visible: false,
        },

        isPlusFsNum: {
            default: false,
            visible: false,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        if (this.gameController != null)
            this.gameController = this.gameController.getComponent(config.SCRIPT.GAMECONTROLLER);

        if (this.reelMainView != null) {
            this.reelMainView = this.reelMainView.getComponent(config.SCRIPT.REELMANAGER);
        }
        if (this.panelMainView != null) {
            this.panelMainView = this.panelMainView.getComponent(config.SCRIPT.PANELMANAGER);
        }
    },

    // resetCoin(){
    //     this.keepCoinFs = 0;
    //     this.countCoinFs = 0;

    // },

    keepCoinCountFs() {
        this.keepCoinFs += 1;
        console.log("this.keepCoinFs " + this.keepCoinFs);

    },

    // storeGoldCoinFsList(goldCoinFsList){
    //     this.goldCoinFsList = goldCoinFsList;
    // },

    // plusFreeNum(data){
    //     this.freeSpinNum = this.gameController.getComponent("HallowNightController");
    //     this.freespinNum = data.freeSpinNum;
    //     if (this.keepCoinFs == 3){
    //         this.freespinNum += 3;

    //     }

    // },
    showRestoreCoinFs() {
        //reset
        for (let i = 0; i < this.baseCoinFs.children.length; i++) {
            this.baseCoinFs.children[i].destroy();
        }

        this.keepCoinFs = 0;
        this.countCoinFs = 0;
        this.goldCoins = 0;
        // for (let i = 0; i < this.goldCoinList.length; i++) {
        //     if(this.goldCoinList[i].betSize == betSize)
        //     {
        //         this.keepCoinFs = this.goldCoinList[i].goldCoinFsSize;
        //     }
        // }

        for (let i = 0; i < this.keepCoinFs; i++) {
            let coincloneFs = cc.instantiate(this.coinObjFs);
            coincloneFs.parent = this.baseCoinFs;
            this.goldCoin = this.baseCoinFs.children;
            coincloneFs.active = true;
            coincloneFs.setPosition(new cc.Vec2(this.coinListFs[this.countCoinFs].position.x, this.coinListFs[this.countCoinFs].position.y));
            this.countCoinFs += 1;
        }
    },

    showGoldCoinFs(number) {
        this.gameController = this.gameController.getComponent("HallowsNightController");
        this.panelMainView = this.panelMainView.getComponent("HallowsNightPanelView");
        // this.countCoinFs = 0;
        console.log("keepCoinFs = " + this.keepCoinFs)
        console.log("keepCoinFs === " + this.keepCoinFs + "   countCoinFs === " + this.countCoinFs);

        let nextCountFs = this.keepCoinFs - this.goldCoins;
        console.log("HallowNightGoldCoin " + "nextCount2  " + nextCountFs);
        if (this.gameController.isOneTimeGoldCoins == false) {
            for (let i = 0; i < nextCountFs; i++) {
                let coincloneFs = cc.instantiate(this.coinObjFs);
                coincloneFs.parent = this.baseCoinFs;
                this.goldCoin = this.baseCoinFs.children;
                coincloneFs.active = true;
                coincloneFs.setPosition(new cc.Vec2(this.coinListFs[this.countCoinFs].position.x, this.coinListFs[this.countCoinFs].position.y));
                this.countCoinFs += 1;
                this.goldCoins += 1;

                // if (this.countCoinFs >= 8) {
                //     console.log(this.countCoinFs >= 8);
                //     console.log(this.baseCoinFs.childrenCount);
                //     this.baseCoinFs.children[i].runAction(cc.sequence(
                //         cc.delayTime(),
                //         cc.callFunc(function () {
                //             this.node.active = false;
                //         }, this),
                //     ));
                //     this.countCoinFs = 0;
                //     return;
                //     // this.node.active = false;
                //     console.log("this.countCoinFs == " + this.countCoinFs);
                //     console.log(this.baseCoinFs.childrenCount);
                // }

            }

            // if (this.keepCoinFs == 3) {
            //     // console.log ("this.keepCoinFs ===="+this.keepCoinFs == 3);
            //     this.freespinNumber += 3
            //     this.panelMainView.updateFreeSpinNumber(number);

            // }

            if (this.keepCoinFs == 3) {
                // this.isPlusFsNum = true;
                this.gameController.getComponent("HallowsNightController").goldCoinFsPlus();
                // this.panelMainView.getComponent("HallowsNightPanelView").goldCoinFsPlus();
                console.log("countCoinFs1 === " + this.countCoinFs >= 3);
                // console.log(this.baseCoinFs);
                console.log("this.baseCoinFs.childrenCount " + this.baseCoinFs.childrenCount);
                for (let i = 0; i < 3; i++) {
                    this.baseCoinFs.children[i].runAction(cc.sequence(
                        cc.delayTime(0),//moveTo(1, new cc.v2(0,0)),
                        cc.callFunc(function () {
                            this.baseCoinFs.children[i].getComponent(sp.Skeleton).addAnimation(1, "Disappear", false);
                        }, this),
                        cc.delayTime(1),
                        cc.callFunc(function () {
                            this.ghostShowUpFs.active = true;
                            this.plusThree.active = true;
                            this.plusThree.getComponent(sp.Skeleton).addAnimation(1, "animation", false);
                        }, this),
                        cc.delayTime(1.5),
                        cc.callFunc(function () {
                            this.ghostShowUpFs.active = false;
                            this.plusThree.active = false;
                            this.baseCoinFs.children[i].destroy();
                        }, this),
                    ));
                    this.keepCoinFs -= 1;
                    this.goldCoins -= 1;
                }
                // this.gameController.getComponent("HallowsNightController").freespinNum += 3;
                // this.panelMainView.getComponent("HallowsNightPanelView").goldCoinFsPlus();
            }
            // this.isPlusFsNum = false;
            // this.keepCoinFs = 0;
            // this.countCoinFs = 0;
        }

    },

    // update (dt) {},
});
