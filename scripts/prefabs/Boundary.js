Boundary = function(x, y, width, height, imageName) {

  //Phaser creation
  Phaser.Sprite.call(this, game, x, y, imageName);

  //Phaser Configurations
  this.anchor.setTo(0.5, 0.5);
  this.width = width;
  this.height = height;
  //----------------------------------
  game.add.existing(this);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
  //------
  // game.physics.p2.enable(this, false);
  // // this.body.kinematic = true;
  // this.body.static = true;
  // this.body.bounce = 0;
  // this.body.mass = 100000;
  // this.body.allowSleep = false;
  //----------------------------------
};

Boundary.prototype = Object.create(Phaser.Sprite.prototype);
Boundary.prototype.constructor = Boundary;

Boundary.prototype.create = function() {
}

Boundary.prototype.update = function() {
};
Boundary.prototype.enableGravity = function() {
  this.body.gravity.setTo(0, 700);
};
Boundary.prototype.flap = function() {
  this.body.velocity.y = -400;
};
