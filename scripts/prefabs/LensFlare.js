LensFlare = function(x, y, imageName) {

  //Phaser creation
  Phaser.Sprite.call(this, game, x, y, imageName);

  //Phaser Configurations
  this.scale.setTo(4, 4);
  // this.anchor.setTo(0.5, 0.5);

  game.add.existing(this);

  // Animation Configuration Goes Here
  this.lens_flare_frames = Phaser.Animation.generateFrameNames('lensFlareIntro_', 0, 55, '.png', 5);
  this.lens_flare_animation = this.animations.add('lensFlare', this.lens_flare_frames, 30, false);
};

LensFlare.prototype = Object.create(Phaser.Sprite.prototype);
LensFlare.prototype.constructor = LensFlare;

LensFlare.prototype.create = function() {
}

LensFlare.prototype.update = function() {
};
