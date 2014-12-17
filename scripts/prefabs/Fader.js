//TODO: remove x and y constructor arguments and make it so it draws over the center of the camera
Fader = function(x, y) {
  var start_alpha = 1;
  this.fadebg = game.add.graphics(0,0);
  this.fade_color = 0xFFFFFF;
  this.fadebg.alpha = start_alpha;

  //Configures the rectangle that is drawn
  //TODO: create set new rect or new fader function
  this.fadebg.beginFill(this.fade_color, start_alpha);
  this.fadebg.drawRect(0, 0, game.width, game.height);
  this.fadebg.endFill();

  this.is_fading = false;
  this.fade_finished = false;
};

// Fader.prototype = Object.create(Phaser.Sprite.prototype);
Fader.prototype.constructor = Fader;

Fader.prototype.update = function() {
};
Fader.prototype.startFade = function(startOpacity, endOpacity, duration, onCompleteCallback) {

  this.is_fading = true;
  this.fade_finished = false;
  // console.log("starting fade");

  this.fadebg.alpha = startOpacity;

  var tween = game.add.tween(this.fadebg);
  tween.to({ alpha: endOpacity }, duration, null);
  if(typeof(onCompleteCallback) != 'undefined' && (typeof(onCompleteCallback) == typeof(Function))) {
    tween.onComplete.add(onCompleteCallback, this);
  }
  else {
    tween.onComplete.add(function() {
      this.is_fading = false;
      this.fade_finished = true;
    }, this);
  }
  tween.start();
};
