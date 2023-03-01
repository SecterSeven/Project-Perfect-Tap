cc.Class({
    extends: cc.Component,

    properties: {
        loadingBarBase:cc.Node,
        loadingBar: cc.Node,
        loadingText: cc.Label,
        loadingCloseButton: cc.Node,
        batEye: cc.Node,
        startCondition: {
            default: false,
            visible: false,
        },
        value: {
            default: 0,
            visible: false,
        },
    },

    onLoad: function () {
        this.loadingCloseButton.on('click', this.closeLoading, this);
        this.loadingCloseButton.on('click', this.batEyeOpen, this);
    },

    batEyeOpen() {
        this.batEye.active = true;
        this.batEye.runAction(cc.sequence(
            cc.delayTime(3),
            cc.callFunc(function () {
                this.batEye.active = false;
            }, this),
        ));
        // this.batEye.active = true;

    },

    update(dt) {
        if (this.startCondition) {
            this.value += dt;
            if (this.value > 1) {
                this.startCondition = false;
                this.value = 1;
                this.loadingBar.active = false;
                this.loadingText.node.active = false;
                this.loadingBarBase.active = false;
                this.loadingCloseButton.active = true;
            }

            this.loadingBar.getComponent(cc.Sprite).fillRange = this.value;
            let tempValue = this.value * 100;
            this.loadingText.string = tempValue.toFixed(2) + "%";
        }
    },

    startLoading() {
        this.startCondition = true;
    },

    closeLoading() {
        this.node.active = false;
    },
});
