var utils = require('Utils');
var accounting = require('Accounting');

cc.Class({
    extends: cc.Component,
    extends: require('WinEffect'),

    properties: {
        coinsPrefab:cc.Prefab,
        coinsArr:[],
        coinsNum:10,

        maxUpYPos:100,
        minUpYPos:100,
        upXPos:100,

        downYPos:100,
        destination:cc.Node,

        amount:0,
        text:cc.RichText,
        text2:cc.Label,
        totalWin2:cc.Label,
        winValueCallBack:null,
        tweenWinValue:0,
        isHideWinAmt:true,
        audioManager:cc.Node,
        isNoSpawnCoin:false,
        coinAnim:cc.Animation,
        isWinWord:false,
        

        // totalWinAnimation: "",
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },
    testCoinEffect(){
        this.startCoinEffect(1000);
    },
    startCoinEffect(amount){
        if(amount <=0){
            this.amount =0;
            return;
        }
        if(this.text!=null)
        this.text.node.active = true;
        if(this.text2!=null)
        this.text2.node.active = true;
        if(this.coinAnim!=null)
        this.coinAnim.play("CoinsEffect");
        for(let i=0;i<this.coinsNum;i++){
            var action = cc.sequence(
                cc.delayTime(((Math.floor(Math.random() * 5))+1)/10),
                cc.callFunc(this.instantiateCoin, this, {}),
            );
            this.node.runAction(action);
        }
        this.amount = amount;
        if(this.text!=null)
        this.text.node.stopAllActions();
        if(this.text2!=null)
        this.text2.node.stopAllActions();
        this.startTweenWinValue(this.amount);
        if(this.audioManager!=null)
        this.audioManager.playWinSoundSfx(this.audioManager.winClip,false);
        if(this.audioManager!=null)
        this.audioManager.playWinSoundSfx(this.audioManager.winCoinsClip,false);
                

        if (this.audioManager.randomWinEffectClip.length != 0)
        {
            var randomNumber = Math.floor(Math.random() * (this.audioManager.randomWinEffectClip.length));
            this.audioManager.playCustomSoundSfx(this.audioManager.randomWinEffectClip[randomNumber]);
        }
    },
    instantiateCoin(){
        if(this.isNoSpawnCoin){
            return;
        }

        var coins = cc.instantiate(this.coinsPrefab);
        this.coinsArr.push(coins);
        coins.parent = this.node;
        coins.setPosition(0, 0);    
        var condition = Math.random() > 0.5;
        
        var upPos = cc.v2(Math.floor((Math.random() * this.upXPos) + 10),Math.floor((Math.random() * this.maxUpYPos) + this.minUpYPos));
        var downPos ;
        if(condition){ //left
            upPos = cc.v2(-upPos.x,upPos.y);
            downPos = cc.v2(upPos.x - Math.floor((Math.random() * 100) + 1) ,upPos.y - Math.floor((Math.random() * this.downYPos) + 10) );
        }
        else{
            downPos = cc.v2(upPos.x + Math.floor((Math.random() * 100) + 1) ,upPos.y - Math.floor((Math.random() * this.downYPos) + 10) );
        }

        var action = cc.sequence(
            cc.moveTo(0.5, upPos),
            cc.moveTo(0.5, downPos),
            cc.moveTo(1, this.destination.position),
            cc.callFunc(this.destroyObject,this,{obj:coins}),
        );
        coins.runAction(action);
    },
    destroyObject(target,data){
        data.obj.destroy();
    },

    hideObject(){
        // console.log("Update Win Effetc Amount to zero ::: ");
        this.updateAmount(0);
        if(this.audioManager!=null)
        this.audioManager.stopWinSoundSfx();

        if(this.isHideWinAmt&&this.text!=null)
        this.text.node.active = false;
        if(this.isHideWinAmt&&this.text2!=null)
        this.text2.node.active = false;
        //this.node.active = false;
    },
    updateAmount(amt){
        cc.log(amt);
        var temp = accounting.formatNumberPrecision(amt); //accounting.formatNumber(amt, 0, ",");
        if(this.text!=null)
        this.text.string = utils.customRichTextFont(temp);
        if(this.text2!=null)
        this.text2.string = temp;
        if(this.totalWin2!=null)
        {
            if(this.isWinWord){
                this.totalWin2.string = "WIN "+temp;
            }
            else
            this.totalWin2.string = temp;
        }
    },
    startTweenWinValue: function (end) {
        this.unschedule(this.winValueCallBack);
        this.winValueCallBack = null;

        this.tweenWinValue = 0;
        var addValue = 0;
        var tempTimeCount = 20;
        addValue = end / tempTimeCount;
        addValue = Math.floor(addValue);
        if (addValue == 0) {
            addValue = 1;
        }

        // if (this.totalWinAnimation != "")
        // {
        //     this.totalWin2.node.parent.getComponent(cc.Animation).play(this.totalWinAnimation);
        // }

        //console.log("startNormalTweenWinValue :: "+tempTimeCount +" / " +addValue +" / " + end);
        this.winValueCallBack = function () {
            if (this.tweenWinValue >= end) {
                var temp = accounting.formatNumberPrecision(end); //accounting.formatNumber(end, 0, ",");
                if(this.text!=null)
                this.text.string = utils.customRichTextFont(temp);
                if(this.text2!=null)
                this.text2.string = temp;
                if(this.totalWin2!=null){
                    if(this.isWinWord){
                        this.totalWin2.string = "WIN "+temp;
                    }
                    else
                    this.totalWin2.string = temp;
                }
                this.unschedule(this.winValueCallBack);
                this.winValueCallBack = null;
               
                if(this.isHideWinAmt){
                    var action = cc.sequence(
                        cc.delayTime(2),
                        cc.callFunc(this.hideObject,this,{}),
                    );
                    if(this.text!=null)
                    this.text.node.runAction(action);
                    if(this.text2!=null)
                    this.text2.node.runAction(action);
                }
            } 
            else {
                this.tweenWinValue += addValue;
                
                var temp = accounting.formatNumberPrecision(this.tweenWinValue);//accounting.formatNumber(this.tweenWinValue, 0, ",");
                if(this.text!=null)
                this.text.string = utils.customRichTextFont(temp);
                if(this.text2!=null)
                this.text2.string = temp;
                if(this.totalWin2!=null){
                    if(this.isWinWord){
                        this.totalWin2.string = "WIN "+temp;
                    }
                    else
                    this.totalWin2.string = temp;
                }
                // this.totalWin2.string = temp;
            }
        }
        this.schedule(this.winValueCallBack, 0.01);
    },
});
