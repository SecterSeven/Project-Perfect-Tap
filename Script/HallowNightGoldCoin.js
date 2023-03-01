var config = require('MyBaseConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        coinList: [cc.Node],
        ghostShowUp: cc.Node,
        coinObj: cc.Node,
        baseCoin: cc.Node,
        keepCoin: {
            default: -1,
            visible: false,
        },
        isInFreeSpin: {
            visible: false,
            default: false,
        },
        coinCount: {
            default: 0,
            visible: false,
        },
        currentCount: {
            default: 0,
            visible: false,
        },
        reel: cc.Node,

        reelPattern: [],

        gameController: cc.Node,
        hallowManager: cc.Node,
        panelView: cc.Node,
        hallowManagerScript: {
            default: null,
            visible: false,
        },

        goldCoins: {
            default: 0,
            visible: false,
        },

        isFreeSpin: false,
        goldCoinList: {
            default: null,
            visible: false,
        },
        isStartKeepCoin: {
            default: false,
            visible: false,
        },
        isOnStart: {
            default: false,
            visible: false,
        },
        currentBetSize:{
            default:0,
            visible:false,
        },
    },


    start() {
        console.log("this.keepCoin = " + this.keepCoin);
        if (this.gameController != null)
            this.gameController = this.gameController.getComponent(config.SCRIPT.GAMECONTROLLER);

        // if (this.randomSymbol != null)
        //     this.randomSymbol = this.randomSymbol.getComponent(config.SCRIPT.GAMECONTROLLER);

    },
    keepCoinCount() {
        this.keepCoin += 1;
        // this.coinCount += 1;
        console.log("this.keepCoin " + this.keepCoin);
        return this.keepCoin;
    },

    storeGoldCoinList(goldCoinList) {
        this.goldCoinList = goldCoinList;
    },

    showRestoreCoin(betSize) {
        this.currentBetSize = betSize;
        //reset
        for (let i = 0; i < this.baseCoin.children.length; i++) {
            this.baseCoin.children[i].destroy();
        }
        // console.log(this.isOnStart);
        // this.isOnStart = true;

        // this.coinCount = 0;
        this.keepCoin = 0;
        this.currentCount = 0;
        for (let i = 0; i < this.goldCoinList.length; i++) {
            // console.log(this.goldCoinList[i].betSize +"   "+ betSize);
            if (this.goldCoinList[i].betSize == betSize) {
                this.keepCoin = this.goldCoinList[i].goldCoinSize;
                // if (this.isStartKeepCoin) {
                //     // let coinCount = this.keepCoin;
                //     console.log(this.isStartKeepCoin);
                //     // this.goldCoinList[i].goldCoinSize = this.keepCoin;
                //     this.keepCoin = this.goldCoinList[i].goldCoinSize + this.coinCount;
                // } else if(this.isOnStart) {
                //     console.log(this.isOnStart);
                //     this.keepCoin = this.goldCoinList[i].goldCoinSize;
                // } else {
                //     this.keepCoin = this.coinCount;
                // }
            }
        }

        for (let i = 0; i < this.keepCoin; i++) {
            let coinclone = cc.instantiate(this.coinObj);
            coinclone.parent = this.baseCoin;
            this.goldCoin = this.baseCoin.children;
            coinclone.active = true;
            coinclone.setPosition(new cc.Vec2(this.coinList[this.currentCount].position.x, this.coinList[this.currentCount].position.y));
            coinclone.getComponent(sp.Skeleton).setAnimation(1, "Idle", true);
            this.currentCount += 1;
        }
    },

    showCoin() {
        this.reelPattern = this.baseCoin.getComponent("HallowNightReelManagerView");
        let condition = false;
        console.log("HallowNightGoldCoin " + this.keepCoin + "   " + this.currentCount);
        if (this.keepCoin > this.currentCount) {
            let max = 9;

            if (this.keepCoin > max) {
                let nextCount = max - this.currentCount;
                console.log("HallowNightGoldCoin " + "nextCount1  " + nextCount);
                for (let i = 0; i < nextCount; i++) {
                    let coinclone = cc.instantiate(this.coinObj);
                    coinclone.parent = this.baseCoin;
                    this.goldCoin = this.baseCoin.children;
                    coinclone.active = true;
                    coinclone.setPosition(new cc.Vec2(this.coinList[this.currentCount].position.x, this.coinList[this.currentCount].position.y));
                    coinclone.getComponent(sp.Skeleton).setAnimation(1, "Idle", true);
                    this.currentCount += 1;
                }
            }
            else {
                let nextCount = this.keepCoin - this.currentCount;
                console.log("HallowNightGoldCoin " + "nextCount2  " + nextCount);
                for (let i = 0; i < nextCount; i++) {
                    let coinclone = cc.instantiate(this.coinObj);
                    coinclone.parent = this.baseCoin;
                    this.goldCoin = this.baseCoin.children;
                    coinclone.active = true;
                    coinclone.setPosition(new cc.Vec2(this.coinList[this.currentCount].position.x, this.coinList[this.currentCount].position.y));
                    coinclone.getComponent(sp.Skeleton).setAnimation(1, "Idle", true);
                    this.currentCount += 1;
                }
            }
        }

        console.log("HallowNightGoldCoin " + "this.currentCount " + this.currentCount)
        if (this.currentCount == 9) {
            // this.randomSymbol[Math.floor(Math.random() * this.randomSymbol.length)]
            for (let i = 0; i < 9; i++) {
                this.baseCoin.children[i].runAction(cc.sequence(
                    // cc.delayTime(0),//moveTo(1, new cc.v2(0,0)),
                    cc.callFunc(function () {
                        this.baseCoin.children[i].getComponent(sp.Skeleton).addAnimation(1, "Disappear", false);
                        this.ghostShowUp.active = true;
                        this.ghostShowUp.getComponent(sp.Skeleton).addAnimation(1, "animation", false);
                    }, this),
                    cc.delayTime(1),
                    cc.callFunc(function () {
                        this.ghostShowUp.active = false;
                        this.baseCoin.children[i].destroy();
                    }, this),
                ));
                this.keepCoin -= 1;
                console.log("HallowNightGoldCoin " + "this.keepCoin 111 " + this.keepCoin);
            }
            // this.isOnStart = false;
            // this.coinCount = 0;
            this.currentCount = 0;
            console.log("HallowNightGoldCoin " + "this.keepCoin 222 " + this.keepCoin);

            this.scheduleOnce(() => {
                for (let i = 0; i < this.keepCoin; i++) {
                    let coinclone = cc.instantiate(this.coinObj);
                    coinclone.parent = this.baseCoin;
                    this.goldCoin = this.baseCoin.children;
                    coinclone.active = true;
                    coinclone.setPosition(new cc.Vec2(this.coinList[i].position.x, this.coinList[i].position.y));
                    coinclone.getComponent(sp.Skeleton).setAnimation(1, "Idle", true);
                    this.currentCount += 1;
                }
            }, 1.5)
            condition = true;
        }

        //store back latest
        for (let i = 0; i < this.goldCoinList.length; i++) {
            if (this.goldCoinList[i].betSize == this.currentBetSize) {
                this.goldCoinList[i].goldCoinSize = this.keepCoin;
            }
        }

        return condition;
    },

    showCoinRestore() {

    },


});
