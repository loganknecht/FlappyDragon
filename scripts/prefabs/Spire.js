Spire = function(x, y, imageName) {

  //Phaser creation
  Phaser.Sprite.call(this, game, x, y, imageName);

  //Phaser Configurations
  this.anchor.setTo(0.5, 0.5);
  //----------------------------------
  game.add.existing(this);
  //----------------------------------
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = true;
  //------
  // game.physics.p2.enable(this, false);
  // this.body.data.gravityScale = 0;
  // this.body.damping = 0;
  // this.body.inertia = 0;
  // this.body.mass = 10000;
  //----------------------------------
  this.spire_type = 'none';
  // 0 - 3 respective version
  this.spire_version = 0;

  // rock_01.png - bottom spire
  // rock_04.png - bottom spire
  // rock_06.png - bottom spire
  // rock_07.png - bottom spire

  // rock_02.png - top spire
  // rock_03.png - top spire
  // rock_05.png - top spire
  // rock_08.png - top spire

  // Animation Configuration Goes Here
  this.bottom_spire_one_frame = ['obstacles/rock_01.png'];
  this.bottom_spire_two_frame = ['obstacles/rock_04.png'];
  this.bottom_spire_three_frame = ['obstacles/rock_06.png'];
  this.bottom_spire_four_frame = ['obstacles/rock_07.png'];

  this.top_spire_one_frame = ['obstacles/rock_02.png'];
  this.top_spire_two_frame = ['obstacles/rock_03.png'];
  this.top_spire_three_frame = ['obstacles/rock_05.png'];
  this.top_spire_four_frame = ['obstacles/rock_08.png'];

  this.bottom_spire_one_animation = this.animations.add('bottomSpireOne', this.bottom_spire_one_frame, 1, false);
  this.bottom_spire_two_animation = this.animations.add('bottomSpireTwo', this.bottom_spire_two_frame, 1, false);
  this.bottom_spire_three_animation = this.animations.add('bottomSpireThree', this.bottom_spire_three_frame, 1, false);
  this.bottom_spire_four_animation = this.animations.add('bottomSpireFour', this.bottom_spire_four_frame, 1, false);

  this.top_spire_one_animation = this.animations.add('topSpireOne', this.top_spire_one_frame, 1, false);
  this.top_spire_two_animation = this.animations.add('topSpireTwo', this.top_spire_two_frame, 1, false);
  this.top_spire_three_animation = this.animations.add('topSpireThree', this.top_spire_three_frame, 1, false);
  this.top_spire_four_animation = this.animations.add('topSpireFour', this.top_spire_four_frame, 1, false);
  //----------------------------------
};

// this.body.setSize(100, 270, 0, -2);
Spire.prototype = Object.create(Phaser.Sprite.prototype);
Spire.prototype.constructor = Spire;

Spire.prototype.update = function() {
  //this kills the spire
  if(this.x < -200) {
    this.destroy();
  }
};
Spire.prototype.configure = function(new_spire_type, new_spire_version) {
  this.spire_type = new_spire_type;
  this.spire_version = new_spire_version;

  if(this.spire_type == 'top') {
    if(this.spire_version == 0) {
      this.play('topSpireOne');
      this.body.setSize(120, 295, -1, -2)
      //------
      // this.body.setRectangle(120, 295, -1, -2, 0);
      // this.body.clearShapes();
      // this.body.loadPolygon('physicsData', 'rock_02');
    }
    else if(this.spire_version == 1) {
      this.play('topSpireTwo');
      this.body.setSize(100, 140, 20, -2)
      //------
      // this.body.setRectangle(100, 140, 20, -2, 0);
      // this.body.clearShapes();
      // this.body.loadPolygon('physicsData', 'rock_03');
    }
    else if(this.spire_version == 2) {
      this.play('topSpireThree');
      this.body.setSize(100, 265, 0, 0)
      //------
      // this.body.setRectangle(100, 265, 0, 0, 0);
      // this.body.clearShapes();
      // this.body.loadPolygon('physicsData', 'rock_05');
    }
    else if(this.spire_version == 3) {
      this.play('topSpireFour');
      this.body.setSize(100, 270, -5, -2)
      //------
      // this.body.setRectangle(100, 270, -5, -2, 0);
      // this.body.clearShapes();
      // this.body.loadPolygon('physicsData', 'rock_08');
    }
    else {
      console.log('A SPIRE THAT WAS CONFIGURED IS NOT OF THE ANTICIPATED SPIRE VERSION');
    }
  }
  else if(this.spire_type == 'bottom') {
    if(this.spire_version == 0) {
      this.play('bottomSpireOne');
      this.body.setSize(110, 340, 0, 0)
      //------
      // this.body.setRectangle(110, 340, 0, 0, 0);
      // this.body.clearShapes();
      // this.body.loadPolygon('physicsData', 'rock_01');
    }
    else if(this.spire_version == 1) {
      this.play('bottomSpireTwo');
      this.body.setSize(100, 390, 0, 0)
      //------
      // this.body.setRectangle(100, 390, 0, 0, 0);
      // this.body.clearShapes();
      // this.body.loadPolygon('physicsData', 'rock_04');
    }
    else if(this.spire_version == 2) {
      this.play('bottomSpireThree');
      this.body.setSize(100, 335, 0, 0)
      //------
      // this.body.setRectangle(100, 335, 0, 0, 0);
      // this.body.clearShapes();
      // this.body.loadPolygon('physicsData', 'rock_06');
    }
    else if(this.spire_version == 3) {
      this.play('bottomSpireFour');
      this.body.setSize(100, 340, 0, 0)
      //------
      // this.body.setRectangle(100, 340, 0, 0, 0);
      // this.body.clearShapes();
      // this.body.loadPolygon('physicsData', 'rock_07');
    }
    else {
      console.log('A SPIRE THAT WAS CONFIGURED IS NOT OF THE ANTICIPATED SPIRE VERSION');
    }
  }
  else {
    console.log('A SPIRE THAT WAS CONFIGURED IS NOT OF THE ANTICIPATED SPIRE TYPE');
  }
};
Spire.prototype.configureRandomSpire = function() {
};
