
Preloader = function (game) {
  this.background = null;
  this.preloadBar = null;

  this.ready = false;
};

Preloader.prototype = {
  preload: function () {
    // window.adc_logo.visible = true;
    //  These are the assets we loaded in Boot.js
    //  A nice sparkly background and a loading progress bar
    this.background = this.add.sprite(0, 0, 'preloaderBackground');
    this.preloadBarEmpty = this.add.sprite(333, 580, 'preloaderBarEmpty');
    this.preloadBar = this.add.sprite(333, 580, 'preloaderBar');
    this.preloadText = this.add.sprite(476, 600, 'loadingText');

    adc_logo = new ADCLogo(1100, 775, 'adcLogo');
    this.adc_logo = adc_logo;

    //  This sets the preloadBar sprite as a loader sprite.
    //  What that does is automatically crop the sprite from 0 to full-width
    //  as the files below are loaded in.
    this.load.setPreloadSprite(this.preloadBar);

    //  Here we load the rest of the assets our game needs.
    //  As this is just a Project Template I've not provided these assets, swap them for your own.
    this.load.image('mainMenuBackground', 'images/backgrounds/introBackground.jpg');
    // this.load.image('mainMenuBackground', 'images/backgrounds/Dragon_comp_01.jpg');
    // this.load.image('mainMenuBackground', 'images/backgrounds/Dragon_comp_04.jpg');

    // this.load.image('flappyDragonBackground', 'images/backgrounds/background_tileable.jpg');
    // this.load.image('flappyDragonBackground', 'images/backgrounds/background_tileable_small.jpg');
    this.load.image('flappyDragonBackground', 'images/backgrounds/background_tileable_35.jpg');

    // this.load.image('flappyDragonBackground', 'images/backgrounds/Dragon_comp_02.jpg');

    // this.load.image('whitePixel', 'images/white_pixel_1x1.png');
    this.load.image('whitePixel', 'images/transparent_pixel_1x1.png');
    //------------
    this.load.atlas('AllGameTextures', 'images/atlasses/Atlas1.png', 'images/atlasses/Atlas1.json');
    // this.load.atlas('LensFlare', 'images/atlasses/LensFlare.png', 'images/atlasses/LensFlare.json');
    this.load.atlas('LensFlare', 'images/atlasses/LensFlare1.png', 'images/atlasses/LensFlare1.json');
    //------------

    resizeGame();
  },
  create: function () {
    //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
    this.preloadBar.cropEnabled = false;
    setTimeout(this.startGame.bind(this), 500);
  },
  startGame: function() {
    if(window.viewable) {
      this.state.start('MainMenu');
      // this.state.start('FlappyDragon');
      // this.state.start('ScoreMenu');
    }
    else {
      setTimeout(this.startGame.bind(this), 200);
    }
  },
  update: function () {
    //  You don't actually need to do this, but I find it gives a much smoother game experience.
    //  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
    //  You can jump right into the menu if you want and still play the music, but you'll have a few
    //  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
    //  it's best to wait for it to decode here first, then carry on.

    //  If you don't have any music in your game then put the game.state.start line into the create function and delete
    //  the update function completely.

    // if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
    // {
    //   this.ready = true;
    //   // this.state.start('MainMenu');
    // }
  },
  reconfigureADCLogo: function() {
  }
};
