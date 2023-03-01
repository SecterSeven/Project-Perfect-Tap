// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        StartButton : cc.Node,
    },

    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        // Assume that the icon node is called "iconNode" and the other node is called "otherNode"

        // Register an event listener for the "click" event on the icon node
    // cc.eventManager.addListener({
    // event: cc.EventListener.TOUCH_ONE_BY_ONE,
    // onTouchBegan: function(touch, event) {
    //   let target = event.getCurrentTarget();
    //   // Check if the icon node was clicked
    //   if (target === iconNode) {
    //     // Get the spine component on the other node
    //     let spine = iconNode.getComponent(sp.Skeleton);
    //     // Play the desired animation
    //     spine.setAnimation(0, "animationName", true);
    //   }
    // }
    // }, iconNode);
        
        // this.node.getComponent(cc.Animation).play("BigWin_MegaStart");

    },

    onTouchBegan: function(touch, event) {

        StartButton.Node.on('click', function() {
            // Activate the spine animation on the spine node
            iconNode.getComponent(sp.Skeleton).play(0,'animation',true);
          });
        // let target = event.getCurrentTarget();
        // // Check if the icon node was clicked
        // if (target === iconNode) {
        //   // Get the spine component on the other node
        //   let spine = iconNode.getComponent(sp.Skeleton);
        //   // Play the desired animation
        //   spine.setAnimation(1, "animationName", true);
        // }
      },

    // update (dt) {},
});
