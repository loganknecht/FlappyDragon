CNEventer = {
  sent_adc_events: {},
  /**
   * Sends custom events using mraid
   * @param  {string|undefined} event Event string to send
   */
  send_custom_event: function (event) {
    if (!event) return;

    if (typeof(mraid) != 'undefined' && mraid.sendADCCustomEvent) {
      console.log('[CNEventer] sending custom event "' + event + '"');
      mraid.sendADCCustomEvent(event);
    } else {
      console.log('[CNEventer] Tried to send custom event "' + event + '" but MRAID doesn\'t exist or can\'t send ADC custom events.');
    }
  },

  /**
   * Sends ADC events using the AdColony custom mraid.js.
   * @param  {string} event ADC event to send ('info'|'download')
   */
  send_adc_event: function (event) {
    if (!event) return;

    event = event.toUpperCase();

    if (this.sent_adc_events[event]) {
      console.log('[CNEventer] Already sent ADC event "' + event + '."');

    } else if (!(typeof(mraid) != 'undefined' && mraid.sendADCEvent && mraid.ADC_EVENTS)) {
      console.log('[CNEventer] Tried to send ADC event "' + event + '" but MRAID doesn\'t exist or can\'t send ADC events.');

    } else {
      if (typeof mraid.ADC_EVENTS[event] == 'undefined') {
        console.log('[CNEventer] Button unable to send unknown ADC event "' + event + '"');

      } else {
        console.log('[CNEventer] sending ADC event "' + event + '"');
        this.sent_adc_events[event] = true;
        mraid.sendADCEvent(mraid.ADC_EVENTS[event]);
      }
    }
  }
};
