CollectableShield = function(x, y, imageName) {

  //Phaser creation
  Phaser.Sprite.call(this, game, x, y, imageName);

  //Phaser Configurations
  this.anchor.setTo(0.5, 0.5);
  //----------------------------------
  game.add.existing(this);

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(100, 100, 0, 0);
  //-------
  // game.physics.p2.enable(this, false);
  // this.body.kinematic = true;
  // this.body.setCircle(70, 0, 0, 0);
  // this.body.mass = 0.0000001;
  // this.body.damping = 0;
  // this.body.data.gravityScale = 0;
  //----------------------------------
  this.shield_one_frame = ['shield_01.png'];
  this.shield_one_animation = this.animations.add('shieldOne', this.shield_one_frame, 10, false);
  //-------
  this.shield_two_frame = ['shield_02.png'];
  this.shield_two_animation = this.animations.add('shieldTwo', this.shield_two_frame, 10, false);
  //----------------------------------
};

CollectableShield.prototype = Object.create(Phaser.Sprite.prototype);
CollectableShield.prototype.constructor = CollectableShield;

CollectableShield.prototype.create = function() {
}

CollectableShield.prototype.update = function() {
  //this kills the shield
  if(this.x < -200) {
    this.destroy();
  }
};
