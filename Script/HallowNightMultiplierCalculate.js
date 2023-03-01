var config = require('MyBaseConfig');

cc.Class({
    extends: cc.Component,

    properties: {

        controller: cc.Node,
        panelMainView: cc.Node,
        reelMainView: cc.Node,
        popUpMainView: cc.Node,

        showMultiply: cc.Node,

        multiPlier: [cc.Node],
        // multiplierR2: cc.Node,
        // multiplierR3: cc.Node,
        // multiplierR4: cc.Node,
        // multiplierR5: cc.Node,
        multiplierCount: {
            default: 0,
            visible: false,
        },

        valueMultiply: {
            default: null,
            visible: false,
        },

        value: [],

        calculateMultiplier: {
            default: 1,
            visible: false,
        },

        countShow: {
            default: 0,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {

        if (this.controller != null) {
            this.controller = this.controller.getComponent(config.SCRIPT.GAMECONTROLLER);
        }
        if (this.popUpMainView != null) {
            this.popUpMainView = this.popUpMainView.getComponent(config.SCRIPT.POPUPMANAGER);
        }
        if (this.reelMainView != null) {
            this.reelMainView = this.reelMainView.getComponent(config.SCRIPT.REELMANAGER);
        }
        if (this.panelMainView != null) {
            this.panelMainView = this.panelMainView.getComponent(config.SCRIPT.PANELMANAGER);
        }

    },

    // receiveValue(value) {
    //     let values = [];

    //     values.push(value);
    //     this.valueMultiply = values;
    //     console.log(values)
    // },

    calculateMultiply() {
        let resultMultiply = 1;
        for (let i = 0; i < this.multiPlier.length; i++) {
            var values = this.multiPlier[i].getComponent("HallowNightMultiplier").multiplierCount;
            // console.log(values);
            resultMultiply *= this.multiPlier[i].getComponent("HallowNightMultiplier").multiplierCount;
            // console.log("Result = " + resultMultiply);
            // this.multiplier *= this.multiplier[i];
        }
        this.calculateMultiplier = resultMultiply;
        console.log("calculateMultiplier ===== " + this.calculateMultiplier)
        // var result = value1 * value2 * value3 * value4 * value5;
        // console.log("Result:", result);
        // let values = [];
        // values.push(value);
        // for (let i = 0; i < this.valueMultiply.length; i++) {
        //     console.log(this.valueMultiply[i])
        //     this.valueMultiply *= this.valueMultiply[i];
        //     this.calculateMultiplier = this.valueMultiply;
        // }

        // console.log(this.valueMultiply)
        // console.log("Result == " + this.calculateMultiplier);
        // // return result;
        this.updateMultiplier();

    },

    updateMultiplier() {

        if (this.calculateMultiplier != 1) {
            this.showMultiply.active = true;
            this.showMultiply.getComponent(cc.Animation).play("HallowNightMultiplier");
            if (this.showMultiply.getComponent(cc.Label) != null) {
                this.showMultiply.getComponent(cc.Label).string = "x" + this.calculateMultiplier;
            }
            if (this.showMultiply.getComponent(cc.RichText) != null) {
                this.showMultiply.getComponent(cc.RichText).string = utils.customRichTextFont(this.calculateMultiplier);
            }
        }

    },


    // update (dt) {},
});
