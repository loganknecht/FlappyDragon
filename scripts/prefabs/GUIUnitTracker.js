GUIUnitTracker = function(x, y, imageName) {

  //Phaser creation
  Phaser.Sprite.call(this, game, x, y, imageName);

  //Phaser Configurations
  this.anchor.setTo(0.5, 0.5);

  game.add.existing(this);
  // game.physics.enable(this, Phaser.Physics.ARCADE);

  this.zero_frames = ['shieldNumbers/shield_00.png'];
  this.one_frames = ['shieldNumbers/shield_01.png'];
  this.two_frames = ['shieldNumbers/shield_02.png'];
  this.three_frames = ['shieldNumbers/shield_03.png'];
  this.four_frames = ['shieldNumbers/shield_04.png'];
  this.five_frames = ['shieldNumbers/shield_05.png'];
  this.six_frames = ['shieldNumbers/shield_06.png'];
  this.seven_frames = ['shieldNumbers/shield_07.png'];
  this.eight_frames = ['shieldNumbers/shield_08.png'];
  this.nine_frames = ['shieldNumbers/shield_09.png'];
  this.ten_frames = ['shieldNumbers/shield_10.png'];

  this.zero_animation = this.animations.add('zero', this.zero_frames, 10, false);
  this.one_animation = this.animations.add('one', this.one_frames, 10, false);
  this.two_animation = this.animations.add('two', this.two_frames, 10, false);
  this.three_animation = this.animations.add('three', this.three_frames, 10, false);
  this.four_animation = this.animations.add('four', this.four_frames, 10, false);
  this.five_animation = this.animations.add('five', this.five_frames, 10, false);
  this.six_animation = this.animations.add('six', this.six_frames, 10, false);
  this.seven_animation = this.animations.add('seven', this.seven_frames, 10, false);
  this.eight_animation = this.animations.add('eight', this.eight_frames, 10, false);
  this.nine_animation = this.animations.add('nine', this.nine_frames, 10, false);
  this.ten_animation = this.animations.add('ten', this.ten_frames, 10, false);

  //anchor x and y are the anchor points that the gui unit track should stick around
  this.digit_anchor_x = x;
  this.digit_anchor_y = y;
  this.double_digit_x_offset = 20;
  this.double_digit_y_offset = 0;

  this.current_unit = 10;
  this.updateAnimationBasedOnUnitsAvailable();
};
GUIUnitTracker.prototype = Object.create(Phaser.Sprite.prototype);
GUIUnitTracker.prototype.constructor = GUIUnitTracker;
GUIUnitTracker.prototype.create = function() {
  // this.updateAnimationBasedOnUnitsAvailable();
};
GUIUnitTracker.prototype.update = function() {
};
GUIUnitTracker.prototype.configure = function(new_unit) {
  // console.log("configured");
  this.current_unit = new_unit;
  this.updateAnimationBasedOnUnitsAvailable();
};
GUIUnitTracker.prototype.addToUnitCount = function(amountToAdd) {
  this.current_unit += amountToAdd;
  if(this.current_unit < 0) {
    this.current_unit = 0;
  }
  this.updateAnimationBasedOnUnitsAvailable();
};
GUIUnitTracker.prototype.updateAnimationBasedOnUnitsAvailable = function() {
  if(this.current_unit == 0) {
    this.play('zero');
  }
  else if(this.current_unit == 1) {
    this.play('one');
  }
  else if(this.current_unit == 2) {
    this.play('two');
  }
  else if(this.current_unit == 3) {
    this.play('three');
  }
  else if(this.current_unit == 4) {
    this.play('four');
  }
  else if(this.current_unit == 5) {
    this.play('five');
  }
  else if(this.current_unit == 6) {
    this.play('six');
  }
  else if(this.current_unit == 7) {
    this.play('seven');
  }
  else if(this.current_unit == 8) {
    this.play('eight');
  }
  else if(this.current_unit == 9) {
    this.play('nine');
  }
  else if(this.current_unit == 10) {
    this.play('ten');
  }
  else {
    this.visible = false;
  }

  if(this.current_unit >= 0
     && this.current_unit <= 9) {
    this.x = this.digit_anchor_x;
    this.y = this.digit_anchor_y;
  }
  else if(this.current_unit > 9) {
    this.x = (this.digit_anchor_x + this.double_digit_x_offset);
    this.y = (this.digit_anchor_y + this.double_digit_y_offset);
  }
};
