var config = require('MyBaseConfig');
cc.Class({
    extends: require("MyBaseSymbolView"),

    properties: {
        checkSymbol: cc.Node,
        showDetail: cc.Node,

        showPayTable: {
            default: null,
            visible: false,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.animation == null)
            this.animation = this.node.getComponent(cc.Animation);

        this.node.on(cc.Node.EventType.TOUCH_END, this.testButtonSymbol, this);
    },

    start() {
        this.defaultScale = new cc.v2(this.node.scaleX, this.node.scaleY);
    },

    setSymbol(symbol) {
        this.symbolCode = symbol;
        // console.log(this.node.name +" / "+ this.symbolCode);
        this.playAnimationFirstFrame();
        if (this.audioManager != null) {
            if (symbol == "c1" && this.scatter == false) {
                if (this.audioManager.getComponent("MyAudioManagerView").scatterNumber == 0 && this.audioManager.getComponent("MyAudioManagerView").scatter1 != null) {
                    this.audioManager.getComponent("MyAudioManagerView").playCustomSoundSfx(this.audioManager.getComponent("MyAudioManagerView").scatter1, false);
                    this.audioManager.getComponent("MyAudioManagerView").scatterNumber += 1;
                    this.scatter = true;
                } else if (this.audioManager.getComponent("MyAudioManagerView").scatterNumber == 1 && this.audioManager.getComponent("MyAudioManagerView").scatter2 != null) {
                    this.audioManager.getComponent("MyAudioManagerView").playCustomSoundSfx(this.audioManager.getComponent("MyAudioManagerView").scatter2, false);
                    this.audioManager.getComponent("MyAudioManagerView").scatterNumber += 1;
                    this.scatter = true;
                } else if (this.audioManager.getComponent("MyAudioManagerView").scatterNumber == 2 && this.audioManager.getComponent("MyAudioManagerView").scatter3 != null) {
                    this.audioManager.getComponent("MyAudioManagerView").playCustomSoundSfx(this.audioManager.getComponent("MyAudioManagerView").scatter3, false);
                    this.audioManager.getComponent("MyAudioManagerView").scatterNumber += 1;
                    this.scatter = true;
                }
            }
        }

        // this.testButtonSymbol();
    },

    testButtonSymbol(event) {
        // console.log("testButtonSymbol 1");
        // console.log(this.node.name + " / == " + this.symbolCode);
        // console.log(this.checkSymbol);
        let touchPos = this.showDetail.getPosition();//event.getLocation();
        this.showPayTable = this.checkSymbol.getComponent("HallowNightShowSymbol");
        this.showPayTable.bgShow.active = true;
        if (this.symbolCode == "s1") {
            this.showPayTable.symbol1.setPosition(touchPos);
            console.log(touchPos);
            this.showPayTable.symbol1.active = true;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "s2") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.setPosition(touchPos);
            console.log(touchPos);
            this.showPayTable.symbol2.active = true;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "s3") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.setPosition(touchPos);
            this.showPayTable.symbol3.active = true;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "s4") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.setPosition(touchPos);
            this.showPayTable.symbol4.active = true;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "s5") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.setPosition(touchPos);
            this.showPayTable.symbol5.active = true;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "s6") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.setPosition(touchPos);
            this.showPayTable.symbol6.active = true;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "s7") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.setPosition(touchPos);
            this.showPayTable.symbol7.active = true;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "s8") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.setPosition(touchPos);
            this.showPayTable.symbol8.active = true;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "s9") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.setPosition(touchPos);
            this.showPayTable.symbol9.active = true;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "s10") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.setPosition(touchPos);
            this.showPayTable.symbol10.active = true;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "s11") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.setPosition(touchPos);
            this.showPayTable.symbol11.active = true;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "w1") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.setPosition(touchPos);
            this.showPayTable.symbolw1.active = true;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "w2") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.setPosition(touchPos);
            this.showPayTable.symbolw2.active = true;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.active = false;
        } else if (this.symbolCode == "c1") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.active = false;
            this.showPayTable.symbolc1.setPosition(touchPos);
            this.showPayTable.symbolc1.active = true;
        } else if (this.symbolCode == "w3") {
            this.showPayTable.symbol1.active = false;
            this.showPayTable.symbol2.active = false;
            this.showPayTable.symbol3.active = false;
            this.showPayTable.symbol4.active = false;
            this.showPayTable.symbol5.active = false;
            this.showPayTable.symbol6.active = false;
            this.showPayTable.symbol7.active = false;
            this.showPayTable.symbol8.active = false;
            this.showPayTable.symbol9.active = false;
            this.showPayTable.symbol10.active = false;
            this.showPayTable.symbol11.active = false;
            this.showPayTable.symbolw1.active = false;
            this.showPayTable.symbolw2.active = false;
            this.showPayTable.symbolw3.setPosition(touchPos);
            this.showPayTable.symbolw3.active = true;
            this.showPayTable.symbolc1.active = false;
        }
        console.log("testButtonSymbol 2");
        // return;
    },
    setSpinningSymbol(symbol) {
        // console.log("setSpinningSymbol : " +symbol );
        this.symbolCode = symbol;
        this.animation.play(config.BlurSymbolAnimation[this.symbolCode]);
        this.animation.setCurrentTime(0);
        this.animation.pause();
    },
    playSpecialAnimation() {
        this.isDimSymbol(false);
        // console.log(config.SymbolAnimation[config.SPECIALSYMBOLANIM[this.symbolCode]]);
        this.animation.play(config.SymbolAnimation[config.SPECIALSYMBOLANIM[this.symbolCode]]);
    },
    playSelectedSymbol(anim) {
        this.animation.play(anim);
    },

    playAnimation() {
        // console.log("playAnimation : " );
        this.isDimSymbol(false);
        this.animation.resume();
    },
    playAnimationFirstFrame() {
        // console.log(this.node.name);
        // console.log(config.SymbolAnimation[this.symbolCode] +" / " +this.symbolCode);
        this.animation.play(config.SymbolAnimation[this.symbolCode]);
        this.animation.setCurrentTime(0);
        this.animation.pause();
    },
    playStopAnimation() {
        // this.node.runAction(
        //     cc.sequence(
        //         cc.scaleTo(0.2,1.3,1.3),
        //         cc.scaleTo(0.2,1,1),
        //     )
        // );
    },
    resetStopAnim() {
        this.node.stopAllActions();
        this.node.runAction(
            cc.sequence(
                cc.scaleTo(0, this.defaultScale.x, this.defaultScale.y),
                cc.scaleTo(0, this.defaultScale.x, this.defaultScale.y),
            )
        );
    },
    isDimSymbol(isDim) {
        if (isDim) {
            for (let i = 0; i < this.node.children.length; i++) {
                this.node.children[i].color = new cc.Color(100, 100, 100);

                if (this.node.children[i].children.length != 0) {
                    for (let j = 0; j < this.node.children[i].children.length; j++) {
                        this.node.children[i].children[j].color = new cc.Color(100, 100, 100);
                    }
                }
            }
        } else {
            for (let i = 0; i < this.node.children.length; i++) {
                this.node.children[i].color = new cc.Color(255, 255, 255);

                if (this.node.children[i].children.length != 0) {
                    for (let j = 0; j < this.node.children[i].children.length; j++) {
                        this.node.children[i].children[j].color = new cc.Color(255, 255, 255);
                    }
                }
            }
        }
    },

    playAnimationFrame(number) {
        cc.log(this.symbolCode);
        // console.log(config.SymbolAnimation[this.symbolCode] +" / " +this.symbolCode);
        var animState = this.animation.play(config.SymbolAnimation[this.symbolCode]);
        // if (animState != null) {
        //     animState.time = number;
        // }
        this.animation.setCurrentTime(number);
        this.animation.pause();
    },
    // update (dt) {},
});