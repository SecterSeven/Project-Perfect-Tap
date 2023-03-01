var config = require('MyBaseConfig');
var viewreel = require('HallowsNightReelView')

cc.Class({
    extends: cc.Component,

    properties: {
        payTableSymbol: [cc.Node],

        symbolCode:"",

        reelMainView: cc.Node,
        symbolView: cc.Node,
        symbol1 : cc.Node,
        symbol2  : cc.Node,
        symbol3 : cc.Node,
        symbol4 : cc.Node,
        symbol5 : cc.Node,
        symbol6 : cc.Node,
        symbol7 : cc.Node,
        symbol8 : cc.Node,
        symbol9 : cc.Node,
        symbol10 : cc.Node,
        symbol11 : cc.Node,
        symbolw1 : cc.Node,
        symbolw2 : cc.Node,
        symbolw3 : cc.Node,
        symbolc1 : cc.Node,
        bgShow : cc.Node,
       
    },

    start () {
        if (this.reelMainView != null) {
            this.reelMainView = this.reelMainView.getComponent(config.SCRIPT.REELMANAGER);
        }
        if (this.symbolView != null) {
            this.symbolView = this.symbolView.getComponent(config.SCRIPT.SYMBOLVIEW);
        }

    },

    
    checkSymbol(){
        

    },

    closeSymbool(){

        this.bgShow.active = false;
        this.symbol1.active = false;
        this.symbol2.active = false;
        this.symbol3.active = false;
        this.symbol4.active = false;
        this.symbol5.active = false;
        this.symbol6.active = false;
        this.symbol7.active = false;
        this.symbol8.active = false;
        this.symbol9.active = false;
        this.symbol10.active = false;
        this.symbol11.active = false;
        this.symbolw1.active = false;
        this.symbolw2.active = false;
        this.symbolw3.active = false;
        this.symbolc1.active = false;

    },

    testShow () {
        // this.symbol1.active = true;
        
            // if (this.symbolCode == "s1") {
            //     this.s1.node.active = true;
            // } else if (this.symbolCode == "s2") {
            //     this.s2.node.active = true;
            // } else if (this.symbolCode == "s3" ) {
            //     this.s3.node.active = true;
            // } else if (this.symbolCode == "s4" ) {
            //     this.s4.node.active = true;
            // } else if (this.symbolCode == "s5" ) {
            //     this.s5.node.active = true;
            // } else if (this.symbolCode == "s6" ) {
            //     this.s6.node.active = true;
            // } else if (this.symbolCode == "s7" ) {
            //     this.s7.node.active = true;
            // } else if (this.symbolCode == "s8" ) {
            //     this.s8.node.active = true;
            // } else if (this.symbolCode == "s9" ) {
            //     this.s9.node.active = true;
            // } else if (this.symbolCode == "s10" ) {
            //     this.s10.node.active = true;
            // } else if (this.symbolCode == "s11" ) {
            //     this.s11.node.active = true;
            // } else if (this.symbolCode == "w1" ) {
            //     this.w1.node.active = true;
            // }
        //     this.betAmountPanelTotalBetLabel.string = totalBet;
        //     return;
    },

    // update (dt) {},
});
