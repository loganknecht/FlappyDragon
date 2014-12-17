function ScoreMenu() {
  this.background = null;
};
ScoreMenu.prototype = {
  preload: function() {
    console.log("Main Menu PRELOADING");
  },
  create: function() {
    this.level_change_triggered = false;

    this.background = game.add.sprite(0,0, 'mainMenuBackground');

    //-------------
    img_congrats_overlay = game.add.sprite(517, 627, 'AllGameTextures');
    this.img_congrats_overlay = img_congrats_overlay;
    this.img_congrats_overlay.frameName = 'congratsScreenBottomOverlay.png';
    this.img_congrats_overlay.anchor.setTo(0.5, 0.5);
    this.img_congrats_overlay.scale.setTo(2, 1);
    //congratsScreenBottomOverlay.png
    //----------------------------
    this.adc_logo = new ADCLogo(1100, 775, 'adcLogo');
    //----------------------------
    img_score_box = game.add.sprite(598, 526, 'AllGameTextures');
    this.img_score_box = img_score_box;
    //for tweening
    this.img_score_box.x = 598;
    this.img_score_box.y = 1063;
    this.img_score_box.frameName = 'congratsModule.jpg';
    this.img_score_box.anchor.setTo(0.5, 0.5);
    this.img_score_box_tween = game.add.tween(this.img_score_box);
    // this.img_score_box_tween.to({ y: 526 }, 1000, Phaser.Easing.Linear.None);
    // this.img_score_box_tween.to({ y: 526 }, 1000, Phaser.Easing.Elastic.Out);
    this.img_score_box_tween.to({ y: 481 }, 1000, Phaser.Easing.Bounce.Out);
    //-------------
    btn_get_tickets = game.add.button(248, 675, 'AllGameTextures', this.performGetTicketsButtonPress, this, 'getTicketsButton.png', 'getTicketsButton.png', 'getTicketsButton_down.png', 'getTicketsButton.png');
    this.btn_get_tickets = btn_get_tickets;
    this.btn_get_tickets.anchor.setTo(0.5, 0.5);
    this.btn_get_tickets.scale.setTo(0, 0);
    this.btn_get_tickets_tween = game.add.tween(this.btn_get_tickets.scale);
    // this.btn_get_tickets_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.Out);
    this.btn_get_tickets_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out, false, 1000);
    // this.btn_get_tickets_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Bounce.Out);
    //-------------
    btn_visit_site = game.add.button(498, 675, 'AllGameTextures', this.performVisitSiteButtonPress, this, 'visitSiteButton.png', 'visitSiteButton.png', 'visitSiteButton_down.png', 'visitSiteButton.png');
    this.btn_visit_site = btn_visit_site;
    this.btn_visit_site.anchor.setTo(0.5, 0.5);
    this.btn_visit_site.scale.setTo(0, 0);
    this.btn_visit_site_tween = game.add.tween(this.btn_visit_site.scale);
    // this.btn_visit_site_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.Out);
    this.btn_visit_site_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out, false, 1050);
    // this.btn_visit_site_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Bounce.Out);
    //-------------
    btn_replay = game.add.button(744, 675, 'AllGameTextures', this.performReplayButtonPress, this, 'replayButton.png', 'replayButton.png', 'replayButton_down.png', 'replayButton.png');
    this.btn_replay = btn_replay;
    this.btn_replay.anchor.setTo(0.5, 0.5);
    this.btn_replay.scale.setTo(0, 0);
    this.btn_replay_tween = game.add.tween(this.btn_replay.scale);
    // this.btn_replay_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.Out);
    this.btn_replay_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out, false, 1100);
    // this.btn_replay_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Bounce.Out);
    //-------------
    btn_facebook = game.add.button(933, 677, 'AllGameTextures', this.performFacebookButtonPress, this, 'facebookButton.png', 'facebookButton.png', 'facebookButton_down.png', 'facebookButton.png');
    this.btn_facebook = btn_facebook;
    this.btn_facebook.anchor.setTo(0.5, 0.5);
    this.btn_facebook.scale.setTo(0, 0);
    this.btn_facebook_tween = game.add.tween(this.btn_facebook.scale);
    // this.btn_facebook_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.Out);
    this.btn_facebook_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out, false, 1150);
    // this.btn_facebook_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Bounce.Out);
    //-------------
    btn_twitter = game.add.button(1033, 677, 'AllGameTextures', this.performTwitterButtonPress, this, 'twitterButton.png', 'twitterButton.png', 'twitterButton_down.png', 'twitterButton.png');
    this.btn_twitter = btn_twitter;
    this.btn_twitter.anchor.setTo(0.5, 0.5);
    this.btn_twitter.scale.setTo(0, 0);
    this.btn_twitter_tween = game.add.tween(this.btn_twitter.scale);
    // this.btn_twitter_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Linear.Out);
    this.btn_twitter_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out, false, 1200);
    // this.btn_twitter_tween.to({ x: 1, y: 1 }, 500, Phaser.Easing.Bounce.Out);
    //-------------
    title_image = game.add.sprite(601, 210, 'AllGameTextures');
    this.img_logo = title_image;
    //for tweening
    this.img_logo.x = 601;
    this.img_logo.y = -117;
    this.img_logo.frameName = 'dw_logo_large.png';
    this.img_logo.anchor.setTo(0.5, 0.5);
    this.img_logo_tween = game.add.tween(this.img_logo);
    // this.img_logo_tween.to({ y: 210 }, 250, Phaser.Easing.Linear.None);
    // this.img_logo_tween.to({ y: 210 }, 1000, Phaser.Easing.Elastic.Out);
    this.img_logo_tween.to({ y: 210 }, 1000, Phaser.Easing.Bounce.Out);
    //----------------------------
    img_number_of_shields = this.createNumberOfShieldsSprite();
    this.img_number_of_shields = img_number_of_shields;
    this.img_number_of_shields_tween = game.add.tween(this.img_number_of_shields);
    // this.img_number_of_shields_tween.to({ y: 526 }, 1000, Phaser.Easing.Linear.None);
    // this.img_number_of_shields_tween.to({ y: 526 }, 1000, Phaser.Easing.Elastic.Out);
    this.img_number_of_shields.y = 1130;
    this.img_number_of_shields_tween.to({ y: 548 }, 1000, Phaser.Easing.Bounce.Out);
    //----------------------------

    //creates the lens flare animation and sets the on complete call back to trigger the tweening in of the other elements
    lens_flare = new LensFlare(0, 0, 'LensFlare')
    this.lens_flare = lens_flare;
    this.lens_flare.animations.getAnimation('lensFlare').onComplete.add(this.triggerTweenIns, this);

    this.fader = new Fader(600, 400);
    this.fader.fadebg.alpha = 1;
    this.fader.startFade(1, 0, 1000);

    game.input.onDown.add(this.performTouchLogic, this);

    resizeGame();

    this.triggerIntroAnimation();
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
    this.img_logo_tween.start();
    this.img_score_box_tween.start();
    this.img_number_of_shields_tween.start();
    this.btn_get_tickets_tween.start();
    this.btn_visit_site_tween.start();
    this.btn_replay_tween.start();
    this.btn_facebook_tween.start();
    this.btn_twitter_tween.start();
  },
  triggerLevelChange: function() {
    if(!this.level_change_triggered) {
      this.level_change_triggered = true;
      this.fader = new Fader(600, 400);
      this.fader.startFade(0, 1, 1000, function() { game.state.start('FlappyDragon'); } );
    }
  },
  performTouchLogic: function() {
  },
  performGetTicketsButtonPress: function() {
    window.getTicketsRedirect();
  },
  performVisitSiteButtonPress: function() {
    window.visitSiteScoreRedirect();
  },
  performReplayButtonPress: function() {
    // this.triggerLevelChange();
    window.replayButtonRedirect();
  },
  performFacebookButtonPress: function() {
    window.facebookRedirect();
  },
  performTwitterButtonPress: function() {
    window.twitterRedirect();
  },
  createNumberOfShieldsSprite: function() {
    var number_of_shields_sprite = game.add.sprite(650, 548, 'AllGameTextures');
    number_of_shields_sprite.anchor.setTo(0.5, 0.5);

    if(typeof(window.game_score) == 'undefined') {
      window.game_score = 0;
    }

    if(window.game_score <= 0) {
      number_of_shields_sprite.frameName = 'numberOfShields/00_shields.png';
    }
    else if(window.game_score == 1) {
      number_of_shields_sprite.frameName = 'numberOfShields/01_shields.png';
    }
    else if(window.game_score == 2) {
      number_of_shields_sprite.frameName = 'numberOfShields/02_shields.png';
    }
    else if(window.game_score == 3) {
      number_of_shields_sprite.frameName = 'numberOfShields/03_shields.png';
    }
    else if(window.game_score == 4) {
      number_of_shields_sprite.frameName = 'numberOfShields/04_shields.png';
    }
    else if(window.game_score == 5) {
      number_of_shields_sprite.frameName = 'numberOfShields/05_shields.png';
    }
    else if(window.game_score == 6) {
      number_of_shields_sprite.frameName = 'numberOfShields/06_shields.png';
    }
    else if(window.game_score == 7) {
      number_of_shields_sprite.frameName = 'numberOfShields/07_shields.png';
    }
    else if(window.game_score == 8) {
      number_of_shields_sprite.frameName = 'numberOfShields/08_shields.png';
    }
    else if(window.game_score == 9) {
      number_of_shields_sprite.frameName = 'numberOfShields/09_shields.png';
    }
    else if(window.game_score >= 10) {
      number_of_shields_sprite.frameName = 'numberOfShields/10_shields.png';
    }

    return number_of_shields_sprite;
  }
};
