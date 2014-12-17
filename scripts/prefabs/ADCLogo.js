ADCLogo = function(x, y, imageName) {

  //Phaser creation
  Phaser.Sprite.call(this, game, x, y, imageName);
  game.add.existing(this);

  //Phaser Configurations
  this.anchor.setTo(0.5, 0.5);
  //----------------------------------
  this.black_frame = ['black'];
  this.black_animation = this.animations.add('black', this.black_frame, 1, false);
  // this.black_frame = 'adcLogo';
  // //-------
  this.white_frame = ['white'];
  this.white_animation = this.animations.add('white', this.white_frame, 1, false);
  // this.play('white');
  // this.white_frame = 'adcLogoWhite';
  // this.key = 'adcLogo';
  // //-------
  // this.frameName = this.white_frame;
  //----------------------------------
  this.x_anchor = x;
  this.y_anchor = y;

  this.phone_portrait_x_offset = 0;
  this.phone_portrait_y_offset = 0;

  this.phone_landscape_x_offset = 0;
  this.phone_landscape_y_offset = 0;

  this.tablet_portrait_x_offset = 0;
  this.tablet_portrait_y_offset = 0;

  this.tablet_landscape_x_offset = -60;
  this.tablet_landscape_y_offset = 0;
  //----------------------------------
  this.reconfigurePosition();
};

ADCLogo.prototype = Object.create(Phaser.Sprite.prototype);
ADCLogo.prototype.constructor = ADCLogo;

ADCLogo.prototype.create = function() {
}

ADCLogo.prototype.update = function() {
};
ADCLogo.prototype.setColor = function(logo_color_string) {
  // if(logo_color_string == 'white') {
  //   this.frameName = this.white_frame;
  // }
  // else {
  //   this.frameName = this.black_frame;
  // }
}
ADCLogo.prototype.setNewAnchor = function(new_anchor_x, new_anchor_y) {
  this.x_anchor = new_anchor_x;
  this.y_anchor = new_anchor_y;
};
ADCLogo.prototype.reconfigurePosition = function(device_type) {
  //this is error catching, this implicitly relies on the device type existing in the scope of the window, but if that's not the case it does a quick check to make sure ADC_DEVICE_INFO is declared and if it is uses that instead
  if(typeof(ADC_DEVICE_INFO) != 'undefined') {
    var isLandscape = window.innerWidth > window.innerHeight;
    //portrait
    if(!isLandscape) {
      //if phone
      if(ADC_DEVICE_INFO.device_type == 'phone') {
        // alert('in portrait on phone');
        this.x = this.x_anchor + this.phone_portrait_x_offset;
        this.y = this.y_anchor + this.phone_portrait_y_offset;
      }
      //everything else
      else {
        // alert('in portrait on tablet');
        this.x = this.x_anchor + this.tablet_portrait_x_offset;
        this.y = this.y_anchor + this.tablet_portrait_y_offset;
      }
    }
    //landscape
    else {
      if(ADC_DEVICE_INFO.device_type == 'phone') {
        // alert('in landscape on phone');
        this.x = this.x_anchor + this.phone_landscape_x_offset;
        this.y = this.y_anchor + this.phone_landscape_y_offset;
      }
      //everything else
      else {
        // alert('in landscape on tablet');
        this.x = this.x_anchor + this.tablet_landscape_x_offset;
        this.y = this.y_anchor + this.tablet_landscape_y_offset;
      }
    }
  }
};
