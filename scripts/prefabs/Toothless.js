Toothless = function(x, y, imageName) {

  //Phaser creation
  Phaser.Sprite.call(this, game, x, y, imageName);

  game.add.existing(this);

  //Phaser Configurations
  this.anchor.setTo(0.5, 0.5);
  //----------------------------------
  // game.physics.p2.enable(this, false);
  // this.body.kinematic = true;
  // this.body.fixedRotation = true;
  // this.body.setRectangle(150, 70, 60, 10);
  // this.body.bounce = 0;
  // this.body.mass = 1;
  //--------
  game.physics.enable(this, Phaser.Physics.ARCADE);
  // this.body.collideWorldBounds = true;
  this.body.gravity.setTo(0, 700);
  this.body.setSize(150, 70, 60, 10)
  this.body.bounce.set(0);
  // this.body.maxVelocity = new Phaser.Point(0, 10000);
  //----------------------------------
  // Animation Configuration Goes Here
  this.flap_frames = Phaser.Animation.generateFrameNames('_dragonFlap/dragonFlap_', 2, 35, '.png', 5);
  this.flap_animation = this.animations.add('flap', this.flap_frames, 30, false);
  this.flap_animation.onComplete.add((function() {
    this.play('idle');
  }), this);
  //----------
  this.idle_flying_frames = Phaser.Animation.generateFrameNames('_dragonIdleFlyingLoop/idleFlying_', 2, 35, '.png', 5);
  this.idle_flying_animation = this.animations.add('idle', this.idle_flying_frames, 10, false);
  //----------------------------------
};

Toothless.prototype = Object.create(Phaser.Sprite.prototype);
Toothless.prototype.constructor = Toothless;

Toothless.prototype.create = function() {
}

Toothless.prototype.update = function() {
  this.addFakeGravity();
};
Toothless.prototype.enableGravity = function() {
  this.body.gravity.setTo(0, 700);
};
Toothless.prototype.flap = function() {
  // this.body.velocity.y = -400;
  // this.body.moveUp(400);
  // this.body.applyForce(100, this.x, this.y);
  // this.body.applyForce([0, 3000], [this.x, this.y]);

  // this.body.velocity.y = -500;
  this.body.velocity.y = -400;
  this.play('flap');
};
Toothless.prototype.addFakeGravity = function() {
  // this.body.setZeroVelocity();
  // this.y += this.fake_gravity.y;
  // this.body.moveDown(100);
};
Toothless.prototype.performFakePhysicsStep = function() {
};
