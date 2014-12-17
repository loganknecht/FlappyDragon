window.isAndroid = typeof adc_bridge != 'undefined' && adc_bridge.os_name == 'android';
window.isiOS = !isAndroid;
window.device_type = 'none';
if(typeof(ADC_DEVICE_INFO) != 'undefined') {
  device_type = ADC_DEVICE_INFO.device_type;
}
var hardcoded_x_aspect = 1200;
var hardcoded_y_aspect = 800;

//this helps the transition when the player presses the replay button
window.viewable = false;
//if mraid exists make it so it can be unviewable
if(typeof(mraid) != 'undefined') {
  window.viewable = false;
}
//if mraid isn't found always viewable
else {
  window.viewable = true;
}
function configureViewableChangeReset() {
  // alert('setting viewable change');
  if(typeof(mraid) != 'undefined') {
    mraid.addEventListener('viewableChange', function (isViewable) {
      window.viewable = isViewable;
      if (isViewable) {
        game.paused = false;
      }
      else {
        if(game.load.hasLoaded) {
          if(game.state.current == 'MainMenu') {
            game.state.start('MainMenu');
          }
          else if(game.state.current == 'FlappyDragon') {
            game.state.start('MainMenu');
          }
        }
      }
    });
  }
}
configureViewableChangeReset();
//--------------------------------------------------------------------
window.event_tracker = {
  number_of_games_played: 0,
  play_button_pressed: 0,
  visit_site_button_game_pressed: 0,
  visit_site_button_score_pressed: 0,
  get_tickets_button_pressed: 0,
  replay_button_pressed: 0,
  facebook_button_pressed: 0,
  twitter_button_pressed: 0
};
window.redirectToURL = function(url_to_redirect_to) {
  window.sendFinalRedirectEvent();
  if(typeof(mraid) != 'undefined') {
    if(device_type == 'phone') {
      mraid.open(url_to_redirect_to);
    }
    else if(device_type == 'tablet') {
      mraid.open(url_to_redirect_to);
    }
    else {
      window.location = url_to_redirect_to;
    }
  }
  else {
    window.location = url_to_redirect_to;
  }
};
window.sendFinalRedirectEvent = function() {
  var finalString = '';
  finalString += 'GAME_WAS_PLAYED_'+window.event_tracker.number_of_games_played+'_TIMES';
  finalString += '\n';

  finalString += 'PLAY_BUTTON_PRESSED_'+window.event_tracker.play_button_pressed+'_TIMES';
  finalString += '\n';

  finalString += 'VISIT_SITE_BUTTON_IN_GAME_PRESSED_'+window.event_tracker.visit_site_button_game_pressed+'_TIMES';
  finalString += '\n';

  finalString += 'VISIT_SITE_BUTTON_IN_GAME_PRESSED_'+window.event_tracker.visit_site_button_score_pressed+'_TIMES';
  finalString += '\n';

  finalString += 'GET_TICKETS_BUTTON_PRESSED_'+window.event_tracker.get_tickets_button_pressed+'_TIMES';
  finalString += '\n';

  finalString += 'REPLAY_BUTTON_PRESSED_'+window.event_tracker.replay_button_pressed+'_TIMES';
  finalString += '\n';

  finalString += 'FACEBOOK_BUTTON_PRESSED_'+window.event_tracker.facebook_button_pressed+'_TIMES';
  finalString += '\n';

  finalString += 'TWITTER_BUTTON_PRESSED_'+window.event_tracker.twitter_button_pressed+'_TIMES';
  CNEventer.send_custom_event(finalString);
};
window.getTicketsRedirect = function() {
  window.event_tracker.get_tickets_button_pressed++;
  CNEventer.send_custom_event('CLICKED_GET_TICKETS_BUTTON_ON_SCORE_SCREEN');
  CNEventer.send_adc_event('INFO');
  window.redirectToURL('http://www.howtotrainyourdragon.com/tickets/');
};
window.visitSiteGameRedirect = function() {
  window.event_tracker.visit_site_button_game_pressed++;
  CNEventer.send_custom_event('CLICKED_VISIT_SITE_BUTTON_ON_GAME_SCREEN');
  CNEventer.send_adc_event('INFO');
  window.redirectToURL('http://www.howtotrainyourdragon.com/');
};
window.visitSiteScoreRedirect = function() {
  window.event_tracker.visit_site_button_score_pressed++;
  CNEventer.send_custom_event('CLICKED_VISIT_SITE_BUTTON_ON_SCORE_SCREEN');
  CNEventer.send_adc_event('INFO');
  window.redirectToURL('http://www.howtotrainyourdragon.com/');
};
window.replayButtonRedirect = function() {
  window.event_tracker.replay_button_pressed++;
  CNEventer.send_custom_event('CLICKED_REPLAY_BUTTON_ON_SCORE_SCREEN');
  game.state.start('FlappyDragon');
};
window.twitterRedirect = function() {
  window.event_tracker.twitter_button_pressed++;
  CNEventer.send_custom_event('CLICKED_TWITTER_BUTTON_ON_SCORE_SCREEN');
  CNEventer.send_adc_event('INFO');
  window.redirectToURL('https://twitter.com/DWAnimation');
};
window.facebookRedirect = function() {
  window.event_tracker.facebook_button_pressed++;
  CNEventer.send_custom_event('CLICKED_FACEBOOK_BUTTON_ON_SCORE_SCREEN');
  CNEventer.send_adc_event('INFO');
  window.redirectToURL('https://www.facebook.com/HowToTrainYourDragon');
};
// Button: http://www.fandango.com/howtotrainyourdragon2_136737/movieoverview
// Visit Site Button: http://www.howtotrainyourdragon.com/
// Twitter Button:  https://twitter.com/DWAnimation
// Facebook Button: https://www.facebook.com/HowToTrainYourDragon

function resizeGame() {
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  if(device_type == 'phone') {
    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.scale.setExactFit();
    game.scale.refresh();
  }
  else {
    var scale_factor = 1;
    var isLandscape = window.innerWidth > window.innerHeight;
    // portrait
    if (!isLandscape) {
      scale_factor = window.innerWidth/hardcoded_x_aspect;
    }
    //landscape
    else {
      scale_factor = window.innerHeight/hardcoded_y_aspect;
    }
    game.scale.height = hardcoded_y_aspect*scale_factor;
    game.scale.width = hardcoded_x_aspect*scale_factor;
    game.scale.refresh();

    if(game.scale.width > window.innerWidth) {
      game.canvas.style.marginLeft = '-'+(parseFloat(game.scale.width - window.innerWidth)/2)+'px';
    }
    //---------------------------------------------------------------------------
    // Fixes the button and adcolony logo
    if(game.state.current == 'Preloader') {
      game.state.states.Preloader.adc_logo.reconfigurePosition();
    }
    else if(game.state.current == 'MainMenu') {
      game.state.states.MainMenu.adc_logo.reconfigurePosition();
    }
    else if(game.state.current == 'FlappyDragon') {
      game.state.states.FlappyDragon.adc_logo.reconfigurePosition();
    }
    else if(game.state.current == 'ScoreMenu') {
      game.state.states.ScoreMenu.adc_logo.reconfigurePosition();
    }
    //---------------------------------------------------------------------------
    // console.log("resized");
  }
}

window.addEventListener('orientationchange', function() {
  resizeGame();
});
//-----------------------------------------------------------------------------

Boot = function (game) {
};

Boot.prototype = {
  preload: function () {
      //  Here we load the assets required for our preloader (in this case a background and a loading bar)
      this.load.image('preloaderBackground', 'images/preloader/loadingScreen.jpg');
      // this.load.image('preloaderBackground', 'images/preloader/placementReference.jpg');
      this.load.image('preloaderBar','images/preloader/loadingBar_loaded.png');
      this.load.image('preloaderBarEmpty','images/preloader/loadingBar_empty.png');
      this.load.image('loadingText','images/preloader/loadingCopy.png');

      this.load.atlas('adcLogo', 'images/atlasses/ADCLogo.png', 'images/atlasses/ADCLogo.json');
      // // this.load.image('adcLogo', 'images/backgrounds/adcolony_blk.png');
      // this.load.image('adcLogoWhite', 'images/backgrounds/adcolony_white.png');
  },
  create: function () {
    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;

    //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    this.stage.disableVisibilityChange = false;

    //-----------------
    // Custom Code
    //-----------------
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    // this.scale.setExactFit();
    // this.scale.refresh();
    //-----------------

    if (this.game.device.desktop)
    {
        //  If you have any desktop specific settings, they can go in here
        this.scale.pageAlignHorizontally = true;
    }
    else
    {
        //  Same goes for mobile settings.
        //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
        // this.scale.minWidth = 480;
        // this.scale.minHeight = 260;
        // this.scale.maxWidth = 1024;
        // this.scale.maxHeight = 768;
        // this.scale.forceLandscape = true;
        // this.scale.pagealignhorizontally = true;
        // this.scale.pagealignvertically = true;
        // this.scale.setScreenSize(true);
    }

    //  By this point the preloader assets have loaded to the cache, we've set the game settings
    //  So now let's start the real preloader going
    this.state.start('Preloader');
  },
  update: function() {
    if(window.viewable) {
      if(game.load.hasLoaded) {
        game.state.start('MainMenu');
      }
    }
  }
};
