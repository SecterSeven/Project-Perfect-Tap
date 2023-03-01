var config = require('MyBaseConfig');
var accounting = require('Accounting');
cc.Class({
    extends: cc.Component,
    extends: require('MyAnimateSymbolView'),
    properties: {
        winAnimReel:[cc.Node],
        winAnimArr:cc.Node,
        count:0,
    },

    start () {
        this._super();
        this.winAnimArr = [];
        for(let i=0;i<this.winAnimReel.length;i++){   
            var childsNode = [];
            for(let j = 0;j<this.winAnimReel[i].childrenCount;j++){
                this.winAnimReel[i].children[j].active = false
                childsNode.push(this.winAnimReel[i].children[j]);
            }
            this.winAnimArr.push(childsNode);
            cc.log(childsNode);
        }
        cc.log(this.winAnimArr);
    },
    
    getAnimateSymbol(event){
        var symbolCount = event.symbolCount;
        var winSymbolCount = event.winSymbolCount;
        var winAmt = event.winAmt;
        var x = event.x;
        var y = event.y;
        var symbol = event.symbol;
        if(x == -1 || y == -1){
            this.disableAllSymbol();
            return;
        }

        this.symbolArr[x][y].active = true;
        this.originalArr[x][y].active = false;
       
        this.symbolArr[x][y].getComponent(cc.Animation).play(config.SymbolAnimation[symbol]);

        this.symbolArr[x][y].runAction(cc.sequence(
            cc.delayTime(this.count*0.1),
            cc.callFunc(function () {
                this.winAnimArr[x][y].active = true;
            }, this),
        ));
        this.count ++;

        if(this.animateAmt.length!=0){
            symbolCount = symbolCount+1;
            if(winSymbolCount == parseInt(symbolCount)){
                this.animAmtArr[x][y].active = true;
                
                if(winAmt!=0){
                    var value = accounting.formatNumber(winAmt, 0, ",");// , 0, ","
                    this.animAmtArr[x][y].getComponent(cc.Label).string = value;
                }
                else
                this.animAmtArr[x][y].getComponent(cc.Label).string = "";
            }
        }
    },

    disableAllSymbol(){
        this.count = 0;
        for(let i=0;i<this.symbolArr.length;i++){   
            for(let j = 0;j<this.symbolArr[i].length;j++){
                this.symbolArr[i][j].active = false;
                this.originalArr[i][j].active = true;
                this.animAmtArr[i][j].active = false;
                this.winAnimArr[i][j].active = false;
            }
        }
    },
});
