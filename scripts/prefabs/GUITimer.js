// This is a timer class used to create a gui interface timer that can/will countdown. This has been configured to have offsets based on a center origin specified.
// The background is centered at the point specified, with the digits offset accordingly

//@anchor_x - default center x position
//@anchor_y - default center y position
//@digit_anchor_x - default center x position for the timer's digits
//@digit_anchor_y - default center y position for the timer's digits
//@double_digit_x_offset - default center x offset for the timer's digits when it's a double digit number
//@double_digit_y_offset - default center y offset for the timer's digits when it's a double digit number
//@current_unit - this is the current timer number to display
GUITimer = function(x, y, imageName) {
  this.timer_background = game.add.sprite(x, y, imageName);
  this.timer_background.frameName = 'timer.png';
  this.timer_background.anchor.setTo(0.5, 0.5);

  //Phaser creation
  Phaser.Sprite.call(this, game, x, y, imageName);

  //Phaser Configurations
  this.anchor.setTo(0.5, 0.5);

  game.add.existing(this);

  this.zero_frames = ['timerNumbers/00.png'];
  this.one_frames = ['timerNumbers/01.png'];
  this.two_frames = ['timerNumbers/02.png'];
  this.three_frames = ['timerNumbers/03.png'];
  this.four_frames = ['timerNumbers/04.png'];
  this.five_frames = ['timerNumbers/05.png'];
  this.six_frames = ['timerNumbers/06.png'];
  this.seven_frames = ['timerNumbers/07.png'];
  this.eight_frames = ['timerNumbers/08.png'];
  this.nine_frames = ['timerNumbers/09.png'];
  this.ten_frames = ['timerNumbers/10.png'];

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
  this.anchor_x = x;
  this.anchor_y = y;

  this.digit_anchor_x = (x + -3);
  this.digit_anchor_y = (y + 20);

  this.double_digit_x_offset = 0;
  this.double_digit_y_offset = 0;

  this.current_unit = 10;
  this.updateAnimationBasedOnUnitsAvailable();
};
GUITimer.prototype = Object.create(Phaser.Sprite.prototype);
GUITimer.prototype.constructor = GUITimer;
GUITimer.prototype.create = function() {
  // this.updateAnimationBasedOnUnitsAvailable();
};
GUITimer.prototype.update = function() {
};
GUITimer.prototype.configure = function(new_unit) {
  // console.log("configured");
  this.current_unit = new_unit;
  this.updateAnimationBasedOnUnitsAvailable();
};
GUITimer.prototype.addToUnitCount = function(amountToAdd) {
  this.current_unit += amountToAdd;
  if(this.current_unit < 0) {
    this.current_unit = 0;
  }
  this.updateAnimationBasedOnUnitsAvailable();
};
GUITimer.prototype.updateAnimationBasedOnUnitsAvailable = function() {
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
