
cc.Class({
    extends: cc.Component,

    properties: {

    },
    
    onEnable(){
        this.node.position = new cc.v2(0, 0);
    },
});