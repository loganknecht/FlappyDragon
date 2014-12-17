function MainMenu() {
  this.background = null;
};
MainMenu.prototype = {
  preload: function() {
    console.log("Main Menu PRELOADING");
  },
  create: function() {
    this.level_change_triggered = false;

    this.background = game.add.sprite(0,0, 'mainMenuBackground');

    this.adc_logo = new ADCLogo(1100, 775, 'adcLogo');
    //----------------------------
    title_button_background = game.add.sprite(598, 526, 'AllGameTextures');
    this.title_button_background = title_button_background;
    //for tweening
    this.title_button_background.x = 598;
    this.title_button_background.y = 1063;
    this.title_button_background.frameName = 'introModule.png';
    this.title_button_background.anchor.setTo(0.5, 0.5);
    this.title_button_background_tween = game.add.tween(this.title_button_background);
    // this.title_button_background_tween.to({ y: 526 }, 1000, Phaser.Easing.Linear.None);
    // this.title_button_background_tween.to({ y: 526 }, 1000, Phaser.Easing.Elastic.Out);
    this.title_button_background_tween.to({ y: 526 }, 1000, Phaser.Easing.Bounce.Out);
    //-------------
    title_play_button = game.add.button(598, 648, 'AllGameTextures', this.performPlayButtonPress, this, 'playNowButton.png', 'playNowButton.png', 'playNowButton_down.png', 'playNowButton.png');
    this.title_play_button = title_play_button;
    this.title_play_button.anchor.setTo(0.5, 0.5);
    this.title_play_button.scale.setTo(0, 0);
    this.title_play_button_tween = game.add.tween(this.title_play_button.scale);
    // this.title_play_button_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.Out);
    this.title_play_button_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out);
    // this.title_play_button_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Bounce.Out);
    this.title_button_background_tween.onComplete.add((function() {
      this.title_play_button_tween.start();
    }), this);
    //-------------
    title_image = game.add.sprite(601, 210, 'AllGameTextures');
    this.title_image = title_image;
    //for tweening
    this.title_image.x = 601;
    this.title_image.y = -117;
    this.title_image.frameName = 'dw_logo_large.png';
    this.title_image.anchor.setTo(0.5, 0.5);
    this.title_image_tween = game.add.tween(this.title_image);
    // this.title_image_tween.to({ y: 210 }, 250, Phaser.Easing.Linear.None);
    // this.title_image_tween.to({ y: 210 }, 1000, Phaser.Easing.Elastic.Out);
    this.title_image_tween.to({ y: 210 }, 1000, Phaser.Easing.Bounce.Out);
    //----------------------------

    //creates the lens flare animation and sets the on complete call back to trigger the tweening in of the other elements
    lens_flare = new LensFlare(0, 0, 'LensFlare')
    this.lens_flare = lens_flare;
    this.lens_flare.animations.getAnimation('lensFlare').onComplete.add(this.triggerTweenIns, this);

    this.fader = new Fader(600, 400);
    this.fader.fadebg.alpha = 1;
    this.fader.startFade(1, 0, 1000);

    game.input.onDown.add(this.performTouchLogic, this);

    this.triggerIntroAnimation();

    resizeGame();
  },
  render: function() {
    // game.debug.pointer(game.input.activePointer);
    // game.debug.spriteBounds(overlay);
    // game.debug.spriteInfo(playerShip, 32, 32);
    // game.debug.text('Distance Travelled: ' + this.playerShip.distanceTravelledY, 500, 32);
  },
  update: function() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.F)) {
      if(!this.level_change_triggered) {
        this.triggerLevelChange();
      }
    }
  },
  triggerIntroAnimation: function() {
    this.lens_flare.play('lensFlare');
  },
  triggerTweenIns: function() {
    this.title_image_tween.start();
    this.title_button_background_tween.start();
  },
  triggerLevelChange: function() {
    if(!this.level_change_triggered) {
      this.level_change_triggered = true;
      this.fader = new Fader(600, 400);
      this.fader.startFade(0, 1, 1000, function() { game.state.start('FlappyDragon'); } );
    }
  },
  performPlayButtonPress: function() {
    this.triggerLevelChange();
    window.event_tracker.play_button_pressed++;
    CNEventer.send_adc_event('DOWNLOAD');
  },
  performTouchLogic: function() {
  }
};
