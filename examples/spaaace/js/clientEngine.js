var ClientEngine = function(socket){
    this.socket = socket;
    this.currentFrame = 0;

    this.outboundInput = [];
};

ClientEngine.prototype.start = function(){
    var that = this;

    this.world={
        stepCount: 0
    };

   this.socket.on('worldUpdate', function(worldData) {
       that.onWorldStep(worldData);
   });

    this.outboundInputInterval = setInterval(this.handleOutboundInput.bind(this),16);

    // this.onAnimationFrame();
};


//input

ClientEngine.prototype.sendInput = function(input){
    this.outboundInput.push({
        command: 'move',
        params:  ['up']
    });
};

ClientEngine.prototype.handleOutboundInput = function(){
    for (var x=0; x<this.outboundInput.length; x++){
        this.socket.emit(this.outboundInput[x].command, this.outboundInput[x].params);
    }
    this.outboundInput = [];
};

// clientEngine.prototype.onAnimationFrame = function(){
//     this.currentFrame++;
//     requestAnimationFrame(this.onAnimationFrame);
// };


//IO

ClientEngine.prototype.onWorldStep = function(worldData){
    if (worldData.stepCount > this.world.stepCount){
        this.world.stepCount = worldData.stepCount;
        sprite.x = worldData.ships[0].x;
        sprite.y = worldData.ships[0].y;
    }
};