var config = require('MyBaseConfig');

cc.Class({
    extends: cc.Component,

    properties: {

        panelMainView: cc.Node,
        reelMainView: cc.Node,
        popUpMainView: cc.Node,
        MultiplierCalculate: cc.Node,

        multiX1: cc.Node,
        multiX2: cc.Node,
        multiX3: cc.Node,
        // multiplierR1: [cc.Node],
        // multiplierR2: [cc.Node],
        // multiplierR3: [cc.Node],
        // multiplierR4: [cc.Node],
        // multiplierR5: [cc.Node],
        multiplierCount: {
            default: 1,
            visible: false,
        },

        multiplyMode: false,

        countShow: {
            default: 0,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        if (this.popUpMainView != null) {
            this.popUpMainView = this.popUpMainView.getComponent(config.SCRIPT.POPUPMANAGER);
        }
        if (this.reelMainView != null) {
            this.reelMainView = this.reelMainView.getComponent(config.SCRIPT.REELMANAGER);
        }
        if (this.panelMainView != null) {
            this.panelMainView = this.panelMainView.getComponent(config.SCRIPT.PANELMANAGER);
        }

        // this.multiplierR1[0].active = true;
        // this.multiplierR2[0].active = true;
        // this.multiplierR3[0].active = true;
        // this.multiplierR4[0].active = true;
        // this.multiplierR5[0].active = true;
        this.multiX1.active = true;
        // this.multiX2.active = false;
        // this.multiX3.active = true;
    },

    keepCount(getCount) {
        this.countShow += 1;
        console.log("this.countShow " + this.countShow);
        this.showMultiReel();

    },

    showMultiReel() {
        let value = this.multiplierCount;
        if (this.countShow == 3) {
            this.multiplierCount = 2;
            console.log(this.countShow == 3);
            this.multiX1.active = false;
            this.multiX2.active = true;
            this.multiX2.getComponent(sp.Skeleton).setAnimation(1, "animation", false);
            this.multiX3.active = false;
            this.multiplyMode = true;
            // this.MultiplierCalculate.getComponent("HallowNightMultiplierCalculate").receiveValue(value);
        } else if (this.countShow == 4) {
            console.log(this.countShow == 4);
            this.multiplierCount = 3;
            this.multiX1.active = false;
            this.multiX2.active = false;
            this.multiX3.active = true;
            this.multiX3.getComponent(sp.Skeleton).setAnimation(1, "animation", false);
            this.multiplyMode = true;
            // this.MultiplierCalculate.getComponent("HallowNightMultiplierCalculate").receiveValue(value);
        } else {
            this.multiplierCount = 1;
            this.multiX1.active = true;
            this.multiX2.active = false;
            this.multiX3.active = false;
            this.multiplyMode = false;
            // this.MultiplierCalculate.getComponent("HallowNightMultiplierCalculate").receiveValue(value);
        }
        // this.MultiplierCalculate.getComponent("HallowNightMultiplierCalculate").receiveValue(value);
        // let MultiplierCalculate = this.MultiplierCalculate.getComponent("HallowNightMultiplierCalculate");
        // MultiplierCalculate.receiveValue(value);
        console.log("multiplierCount = " + value);



    },


    // update (dt) {},
});
