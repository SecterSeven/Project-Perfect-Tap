var config = require('MyBaseConfig');

cc.Class({
    extends: cc.Component,

    properties: {

        // gameController: cc.Node,
        hallowNightCamera: cc.Node,
        hallowNightButtonCamera: cc.Node,
        hallowNightButtonCloseCamera: cc.Node,
        iconNode: cc.Node,
        panelMainView: cc.Node,
        click: {
            default: false,
            visible: false,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {

        this.hallowNightButtonCamera.on('click', this.moveGame, this);
        this.hallowNightButtonCamera.on('click', this.onTouchBegan, this);
        this.hallowNightButtonCloseCamera.on('click', this.moveMenu, this);
    },

    start() {
        // if (this.controller != null) {
        //     this.controller = this.controller.getComponent(config.SCRIPT.GAMECONTROLLER);
        // }
        // if (this.gameController.isInFreeSpin) {
        //     console.log(this.gameController.isInFreeSpin);
        //     this.hallowNightCamera.position = new cc.v2(0, 0);
        // }

    },




    onTouchBegan: function () {
        if (this.click == true) {
            return;
        }
        // this.iconNode.getComponent(sp.Skeleton).addAnimation(1, "animation", false);
        // this.iconNode.runAction(cc.sequence(
        //     cc.delayTime(2),
        //     cc.callFunc(function() {
        //         this.iconNode.getComponent(sp.Skeleton).addAnimation(1, "animation", false);
        //     },this)
        // ));


        this.click = true;
    },
    showAnimation() {
        console.log("showAnimation");
        // this.iconNode.getComponent(sp.Skeleton).addAnimation(1, "animation", false);
    },

    moveGame() {
        if (this.click == true) {
            return;
        }
        this.hallowNightCamera.position = new cc.v2(0, 785.188);
        // this.hallowNightCamera.runAction(cc.moveTo(0.4, new cc.v2(0, 0)));
        this.hallowNightCamera.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.moveTo(0.4, new cc.v2(0, 0),
                )));

        this.scheduleOnce(function () {
            this.showAnimation();
        }, 1.1);
        this.click = true;


    },

    moveMenu() {
        this.click = false;
        this.hallowNightCamera.position = new cc.v2(0, 0);
        this.hallowNightCamera.runAction(cc.moveTo(0.3, new cc.v2(0, 785.188)));
        this.panelMainView.getComponent("HallowsNightPanelView").menuPanel.active = false;

    },

    // setCamera(){

    //     if (this.gameController.isInFreeSpin) {
    //         console.log(this.gameController.isInFreeSpin);
    //         this.hallowNightCamera.position = new cc.v2(0, 0);
    //     }

    // },

    // this.reelMainView.character.getComponent(sp.Skeleton).setAnimation(0, "correct_symbol_multiplier_in", false);
    // this.reelMainView.character.getComponent(sp.Skeleton).addAnimation(0, "correct_symbol_multiplier_idle", true);

    // update (dt) {},
});
