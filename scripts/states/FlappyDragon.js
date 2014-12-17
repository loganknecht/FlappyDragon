function FlappyDragon() {
  this.background = null;
};
FlappyDragon.prototype = {
  preload: function() {
    console.log("FLAPPY DRAGON PRELOADING");
  },
  create: function() {
    // if(typeof(window.number_of_games_played) == 'undefined') {
    //   window.number_of_games_played = 0;
    // }
    window.game_score = 0;
    window.event_tracker.number_of_games_played++;

    // game.physics.startSystem(Phaser.Physics.P2JS);
    // game.physics.p2.gravity.y = 700;
    // game.physics.p2.setImpactEvents(true);
    //-------------------
    this.background_x_velocity = -250;
    this.level_x_velocity = -450;
    this.spire_x_start = 1400;
    this.level_change_triggered = false;

    // background = game.add.tileSprite(0,0,1200,800,'flappyDragonBackground');
    // background = game.add.tileSprite(355,300,490,200,'flappyDragonBackground');

    // background = game.add.tileSprite(0,0,490,200,'flappyDragonBackground');
    // this.background = background;
    // this.background.scale.setTo(4,4);

    background = game.add.tileSprite(0,0,686,280,'flappyDragonBackground');
    this.background = background;
    this.background.scale.setTo(2.87,2.85);


    this.adc_logo = new ADCLogo(1100, 775, 'adcLogo');
    //-------------------
    grp_boundaries = game.add.group();
    this.grp_boundaries = grp_boundaries;

    grp_benign_boundaries = game.add.group();
    this.grp_benign_boundaries = grp_benign_boundaries;

    grp_spires = game.add.group();
    this.grp_spires = grp_spires;

    grp_collectable_shields = game.add.group();
    this.grp_collectable_shields = grp_collectable_shields;

    grp_gui = game.add.group();
    this.grp_gui = grp_gui;

    this.grp_adc_logo = game.add.group();
    this.grp_adc_logo.add(this.adc_logo);
    //-------------------
    // player_collision_group = game.physics.p2.createCollisionGroup();
    // boundary_collision_group = game.physics.p2.createCollisionGroup();
    // shield_collision_group = game.physics.p2.createCollisionGroup();
    // spire_collision_group = game.physics.p2.createCollisionGroup();
    //-------------------
    title_copy = game.add.sprite(253, 655, 'AllGameTextures');
    this.title_copy = title_copy;
    this.title_copy.frameName = 'dw_logo_small.png';
    this.title_copy.anchor.setTo(0.5, 0.5);
    grp_gui.add(this.title_copy);
    //-------------------
    btn_visit_site = game.add.button(927, 676, 'AllGameTextures', this.performVisitSiteButtonPress, this, 'visitSiteButton.png', 'visitSiteButton.png', 'visitSiteButton_down.png', 'visitSiteButton.png');
    this.btn_visit_site = btn_visit_site;
    this.btn_visit_site.anchor.setTo(0.5, 0.5);
    grp_gui.add(this.btn_visit_site);
    //-------------------
    gui_shield = game.add.sprite(214, 112, 'AllGameTextures');
    this.gui_shield = gui_shield;
    this.gui_shield.frameName = 'sm_ShieldCounter.png';
    this.gui_shield.anchor.setTo(0.5, 0.5);
    grp_gui.add(this.gui_shield);
    //-------------------
    gui_shield_tracker = new GUIUnitTracker(289, 115, 'AllGameTextures');
    this.gui_shield_tracker = gui_shield_tracker;
    this.gui_shield_tracker.configure(0);
    grp_gui.add(this.gui_shield_tracker);
    //-------------------
    gui_timer = new GUITimer(597, 665, 'AllGameTextures');
    this.gui_timer = gui_timer;
    grp_gui.add(this.gui_timer.timer_background);
    grp_gui.add(this.gui_timer);
    //-------------------
    toothless = new Toothless(300, 300, 'AllGameTextures');
    this.toothless = toothless;
    this.toothless.play('idle', 15, true, false);
    // this.toothless.body.setCollisionGroup(player_collision_group);

    // this.toothless.body.collides(boundary_collision_group, null, this);
    // this.toothless.body.collides(spire_collision_group, this.toothlessCollidedWithBounds, this);

    // this.toothless.body.collides(shield_collision_group, this.toothlessCollidedWithCollectableShield, this);
    //-------------------
    this.createBoundaries(grp_boundaries);
    //-------------------

    this.fader = new Fader(600, 400);

    // game.input.onDown.add(this.performTouchLogic, this);
    game.input.onDown.add(this.performTouchLogic, this);

    this.triggerIntroAnimation();

    resizeGame();

    // this.level_x_velocity = 0;
    // this.spire_x_start = 700;
    // this.generateSpireSet(this.grp_spires, this.grp_collectable_shields);
    this.startLevel();
  },
  render: function() {
    // game.debug.pointer(game.input.activePointer);
    // game.debug.body(this.toothless);
    // game.debug.body(collectableShield);
    // game.debug.body(top_spire);
    // game.debug.body(bottom_spire);
    // for(var i = 0; i < grp_boundaries.children.length; i++) {
    //   game.debug.body(grp_boundaries.children[i]);
    // }
    // for(var i = 0; i < this.grp_spires.children.length; i++) {
    //   game.debug.body(this.grp_spires.children[i]);
    // }
    // game.debug.spriteBounds(this.toothless);
    // game.debug.spriteInfo(this.toothless, 32, 32);
    // game.debug.text('Distance Travelled: ' + this.playerShip.distanceTravelledY, 500, 32);
  },
  update: function() {
    this.toothless.body.velocity.x = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.F)) {
      if(!this.level_change_triggered) {
        this.triggerLevelChange();
      }
    }
    this.performToothlessCollisionCheck();
    // this.performP2ToothlessCollisionCheck();
  },
  triggerIntroAnimation: function() {
    this.fader.startFade(1, 0, 1000);
  },
  triggerLevelChange: function() {
    if(!this.level_change_triggered) {
      this.level_change_triggered = true;
      this.fader = new Fader(600, 400);
      this.fader.startFade(0, 1, 1000, (function() { game.state.start('ScoreMenu');
        window.game_score = gui_shield_tracker.current_unit;
      }).bind(this));
      clearInterval(this.spire_generation_interval);
      clearInterval(this.gui_timer_interval);
      window.game_score = gui_shield_tracker.current_unit;
    }
  },
  startLevel: function() {
    this.toothless.enableGravity();
    this.background.autoScroll(this.background_x_velocity, 0);

    // this.generateSpireSet(player_collision_group, spire_collision_group, shield_collision_group);
    // this.spire_generation_interval = setInterval(this.generateSpireSet.bind(this), 3000, player_collision_group, spire_collision_group, shield_collision_group);

    this.generateSpireSet(this.grp_spires, this.grp_collectable_shields);
    this.spire_generation_interval = setInterval(this.generateSpireSet.bind(this), 3000, this.grp_spires, this.grp_collectable_shields);

    this.gui_timer_interval = setInterval((function() {
      if(this.gui_timer.current_unit == 0) {
        this.triggerLevelChange();
      }
      this.gui_timer.addToUnitCount(-1);
    }).bind(this), 1000);
  },
  performTouchLogic: function() {
    this.toothless.flap();
  },
  performVisitSiteButtonPress: function() {
    if(this.fader.fade_finished) {
      window.visitSiteGameRedirect();
    }
  },
  performBackgroundMovement: function() {
    // this.background.tilePosition.y += ship.body.velocity.y;
  },
  performGetTicketsButtonPress: function() {
  },
  createBoundaries: function(group_to_add_boundaries_to) {
    this.left_boundary = new Boundary(1, 400, 1, 800, 'whitePixel');
    this.top_boundary = new Boundary(600, 1, 1200, 1, 'whitePixel');
    this.right_boundary = new Boundary(1199, 400, 1, 800, 'whitePixel');
    this.bottom_boundary = new Boundary(600, 849, 1200, 100, 'whitePixel');

    // this.grp_boundaries.add(this.left_boundary);
    // this.grp_boundaries.add(this.top_boundary);
    // this.grp_boundaries.add(this.right_boundary);
    this.grp_boundaries.add(this.bottom_boundary);

    this.grp_benign_boundaries.add(this.left_boundary);
    this.grp_benign_boundaries.add(this.top_boundary);
    this.grp_benign_boundaries.add(this.right_boundary);
    // this.grp_benign_boundaries.add(this.bottom_boundary);

    // this.left_boundary.body.setCollisionGroup(boundary_collision_group);
    // this.left_boundary.body.collides(player_collision_group);

    // this.top_boundary.body.setCollisionGroup(boundary_collision_group);
    // this.top_boundary.body.collides(player_collision_group);

    // this.right_boundary.body.setCollisionGroup(boundary_collision_group);
    // this.right_boundary.body.collides(player_collision_group);

    // this.bottom_boundary.body.setCollisionGroup(boundary_collision_group);
    // this.bottom_boundary.body.setCollisionGroup(spire_collision_group);
    // this.bottom_boundary.body.collides(player_collision_group);
  },
  performToothlessCollisionCheck: function() {
    //-----------------
    // Stuff that blocks toothless
    //-----------------
    // game.physics.arcade.collide(this.toothless, this.grp_benign_boundaries, null, null, this);
    game.physics.arcade.collide(this.toothless, this.top_boundary, null, null, this);
    // if(Math.abs(this.toothless.y - this.top_boundary.y) < 200) {
    //   game.physics.arcade.collide(this.toothless, this.top_boundary, null, null, this);
    // }
    //-----------------
    // Stuff that kills toothless
    //-----------------
    // game.physics.arcade.collide(this.toothless, this.grp_boundaries, this.toothlessCollidedWithBounds, null, this);
    // if(Math.abs(this.toothless.y - this.bottom_boundary.y) < 200) {
    //   // console.log("derp");
    //   game.physics.arcade.collide(this.toothless, this.bottom_boundary, this.toothlessCollidedWithBounds, null, this);
    // }
    game.physics.arcade.collide(this.toothless, this.bottom_boundary, this.toothlessCollidedWithBounds, null, this);

    // for(var i = 0; i < this.grp_spires.children.length; i++) {
    //   // console.log(Math.abs(this.toothless.x - this.grp_spires.children[i].x));
    //   if(Math.abs(this.toothless.x - this.grp_spires.children[i].x) < 200) {
    //     console.log("collision");
    //     game.physics.arcade.collide(this.toothless, this.grp_spires.children[i], this.toothlessCollidedWithBounds, null, this);
    //   }
    // }
    game.physics.arcade.collide(this.toothless, this.grp_spires, this.toothlessCollidedWithBounds, null, this);
    //-----------------
    // Shield tracking
    //-----------------
    // for(var i = 0; i < this.grp_collectable_shields.children.length; i++) {
    //   if(Math.abs(this.toothless.x - this.grp_collectable_shields.children[i].x) < 200) {
    //     game.physics.arcade.collide(this.toothless, this.grp_collectable_shields.children[i], this.toothlessCollidedWithCollectableShield, null, this);
    //   }
    // }
    game.physics.arcade.collide(this.toothless, this.grp_collectable_shields, this.toothlessCollidedWithCollectableShield, null, this);
  },
  toothlessCollidedWithBounds: function() {
    // console.log("changing level whooaaaaaa");
    this.triggerLevelChange();
  },
  toothlessCollidedWithCollectableShield: function(body1, body2) {
    // console.log("p2 collision check");
    // console.log("collided with shield");
    // body2.sprite.destroy();
    // collectable_shield_sprite.destroy();
    body2.destroy();
    this.gui_shield_tracker.addToUnitCount(1);
  },
  generateSpireSet: function(group_to_add_spires_to, group_to_add_collectable_shields_to) {
    // console.log("generating");
    top_spire = null;
    bottom_spire = null;
    collectable_shield = null;

    var max_number_of_spire_set_types = 2;
    var spire_set_type = Math.floor(Math.random() * max_number_of_spire_set_types);
    // spire_set_type = 3;

    switch(spire_set_type) {
      case(0):
        top_spire = new Spire(this.spire_x_start, 120, 'AllGameTextures');
        top_spire.configure('top', 0);
        top_spire.body.velocity.x = this.level_x_velocity;

        bottom_spire = new Spire(this.spire_x_start, 640, 'AllGameTextures');
        bottom_spire.configure('bottom', 0);
        bottom_spire.body.velocity.x = this.level_x_velocity;

        collectable_shield = new CollectableShield(this.spire_x_start, 375, 'AllGameTextures');
        collectable_shield.body.velocity.x = this.level_x_velocity;
      break;
      case(1):
        top_spire = new Spire(this.spire_x_start, 61, 'AllGameTextures');
        top_spire.configure('top', 1);
        top_spire.body.velocity.x = this.level_x_velocity;

        bottom_spire = new Spire(this.spire_x_start, 579, 'AllGameTextures');
        bottom_spire.configure('bottom', 1);
        bottom_spire.body.velocity.x = this.level_x_velocity;

        collectable_shield = new CollectableShield(this.spire_x_start, 246, 'AllGameTextures');
        collectable_shield.body.velocity.x = this.level_x_velocity;
      break;
      case(2):
        top_spire = new Spire(this.spire_x_start, 120, 'AllGameTextures');
        top_spire.configure('top', 2);
        top_spire.body.velocity.x = this.level_x_velocity;

        bottom_spire = new Spire(this.spire_x_start, 641, 'AllGameTextures');
        bottom_spire.configure('bottom', 2);
        bottom_spire.body.velocity.x = this.level_x_velocity;

        collectable_shield = new CollectableShield(this.spire_x_start, 357, 'AllGameTextures');
        collectable_shield.body.velocity.x = this.level_x_velocity;
      break;
      case(3):
        top_spire = new Spire(this.spire_x_start, 125, 'AllGameTextures');
        top_spire.configure('top', 3);
        top_spire.body.velocity.x = this.level_x_velocity;

        bottom_spire = new Spire(this.spire_x_start, 639, 'AllGameTextures');
        bottom_spire.configure('bottom', 3);
        bottom_spire.body.velocity.x = this.level_x_velocity;

        collectable_shield = new CollectableShield(this.spire_x_start, 365, 'AllGameTextures');
        collectable_shield.body.velocity.x = this.level_x_velocity;
      break;
      default:
      break;
    }

    // top_spire.body.setCollisionGroup(group_to_add_spires_to);
    // top_spire.body.collides(player_collision_group);

    // bottom_spire.body.setCollisionGroup(group_to_add_spires_to);
    // bottom_spire.body.collides(player_collision_group);

    // collectable_shield.body.setCollisionGroup(group_to_add_collectable_shields_to);
    // collectable_shield.body.collides(player_collision_group);

    // grp_spires.add(top_spire);
    // grp_spires.add(bottom_spire);
    // grp_collectable_shields.add(collectable_shield);

    group_to_add_spires_to.add(top_spire);
    group_to_add_spires_to.add(bottom_spire);

    group_to_add_collectable_shields_to.add(collectable_shield);
  }
};
