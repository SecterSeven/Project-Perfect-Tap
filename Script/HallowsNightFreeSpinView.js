var config = require('MyBaseConfig');
cc.Class({
    extends: cc.Component,
    extends: require('MyBaseFreeSpinView'),

    properties: {
        controller:cc.Node,
        audioManager:cc.Node,
        mainNode:cc.Node,
        reelMainView:cc.Node,
        mainNodes:[cc.Node],
        delayStarts:0,
        freeSpinHideNodes:[cc.Node],///XSG Slot use
        itemToHide:[cc.Node],
        itemToHideOpacity:[cc.Node],
        itemToShow:[cc.Node],
    },

    start () {
        if(this.controller!=null) {
            this.controller = this.controller.getComponent(config.SCRIPT.GAMECONTROLLER);
        }
        if (this.reelMainView != null) {
            this.reelMainView = this.reelMainView.getComponent(config.SCRIPT.REELMANAGER);
        }

        if(this.mainNode!=null) {
            this.mainNode.active = false;
        }

        for(let i=0;i<this.mainNodes.length;i++) {
            this.mainNodes[i].active = false;
        }

        for(let i=0;i<this.itemToShow.length;i++) {
            if (this.itemToShow[i].opacity != 0) {
                this.itemToShow[i].active = false;
            }
        }
    },

    enterFreeSpin(){
        if (this.mainNode != null) {
            this.mainNode.active = true;
        }

        for(let i=0;i<this.mainNodes.length;i++) {
            this.mainNodes[i].active = true;
        }

        for (let i=0; i<this.itemToHide.length; i++) {
            if (this.itemToHide[i].active == true) {
                this.itemToHide[i].active = false;
            } else {
                this.itemToHide[i].opacity = 0;
            }
        }

        for (let i=0; i<this.itemToHideOpacity.length; i++) {
            this.itemToHideOpacity[i].opacity = 0;
        }

        for (let i=0; i<this.itemToShow.length; i++) {
            if (this.itemToShow[i].opacity == 0) {
                this.itemToShow[i].opacity = 254.9;
            } else {
                this.itemToShow[i].active = true;
            }
        }
    },

    exitFreeSpin(){
        if (this.mainNode != null) {
            this.mainNode.active = false;
        }

        this.reelMainView.resetLines();

        for(let i=0;i<this.mainNodes.length;i++) {
            this.mainNodes[i].active = false;
        }

        for (let i=0; i<this.itemToHide.length; i++) {
            if (this.itemToHide[i].opacity == 0) {
                this.itemToHide[i].opacity = 255;
            } else {
                this.itemToHide[i].active = true;
            }
        }

        for (let i=0; i<this.itemToHideOpacity.length; i++) {
            this.itemToHideOpacity[i].opacity = 255;
        }

        console.log("exitFreeSpin");
        for (let i=0; i<this.itemToShow.length; i++) {
            if (this.itemToShow[i].opacity == 254.9) {
                this.itemToShow[i].opacity = 0;
            } else {
                this.itemToShow[i].active = false;
            }
        }
    },

    enableRetrigger(){

    },

    getEnterDelayStart(){
        return this.delayStarts;
    },

    ///XSG Slot use
    show(isFree) {        
        this.mainNode.active = isFree == true

        for(let i in this.mainNodes) {
            this.mainNodes[i].active = isFree == true;
        }

        for(let i in this.freeSpinHideNodes) {
            this.freeSpinHideNodes[i].active = isFree == false
        }
    }
});
