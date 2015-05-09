/**
 * Count time for long loading of DOM elements.
 * Simple usage:
 *   Javascript
 *     timeCount = new BatsgLoadingTime(function() {
 *       window.console && console.log("Loading time: " + timeCount.getTimeSeconds() + " seconds.");
 *     });
 *     timeCount.start();
 *     // ... Long process here.
 *     timeCount.stop();
 * Multiple stop() usage:
 *   Javascript
 *     timeCount = new BatsgLoadingTime();
 *     timeCount.start();
 *     // ... Do process 1 here.
 *     timeCount.stop(function(
 *       window.console && console.log("Stop 1 at: " + timeCount.getTimeSeconds() + " seconds.");
 *       // ... Do process 2 here.
 *       timeCount.stop(function() {
 *         window.console && console.log("Stop 2 at: " + timeCount.getTimeSeconds() + " seconds.");
 *       });
 *     ));
 *
 * @author umbalaconmeogia.
 */
 
/**
 * BatsgLoadingTime constructor.
 * @param Function stopCallback Callback function when BatsgLoadingTime#stop() is called.
 */
var BatsgLoadingTime = function(stopCallback) {
  // Remember time at BatsgLoadingTime#start()
  this.startTime = null;
  
  // If multipleStop is true, then image file is reloaded from server every time.
  // Set this to true in case use multiple call BatsgLoadingTime#stop() with just one
  // BatsgLoadingTime#start()
  this.multipleStop = true;
  
  // Selector of img tag.
  this.img = null;
  
  // Image file loaded in BatsgLoadingTime#stop().
  this.imgSrc = 'images/loadTimeCount.png';
  
  /**
   * Start timer.
   */
  this.start = function() {
    $(this.img).attr('src', '');
    this.startTime = performance.now();
  },
  
  /**
   * Load image to raise stop event.
   * @param Function stopCallback If set, then called when stop.
   */
  this.stop = function(stopCallback) {
    this.log("stop()");
    if (typeof stopCallback !== 'undefined') {
      this.setStopCallback(stopCallback);
    }
    var url = this.multipleStop ? this.addTimestamp(this.imgSrc) : this.imgSrc;
    this.log("Image url: " + url);
    $(this.img).attr('src', url);
  },
  
  /**
   * Get time from startTime to now.
   * @return int Time in milliseconds.
   */
  this.getTimeMilliseconds = function() {
    return performance.now() - this.startTime;
  }
  
  this.getTimeSeconds = function() {
    return this.getTimeMilliseconds() / 1000;
  }
  
  /**
   * Set callback method when image is loaded.
   * @param Function stopCallback
   */
  this.setStopCallback = function(stopCallback) {
    this.log("setStopCallback()");
    $(this.img).off('load');
    $(this.img).on('load', stopCallback);
  }

  /**
   * Add timestamp to the end of url so that browser do not cache data.
   * @return string The url with timestamp added.
   */
  this.addTimestamp = function(url) {
    var randomString = Math.random().toString(36).substring(7);
    var separator = url.indexOf('?') > -1 ? '&' : '?';
    return url + separator + "timestamp" + randomString + '=' + randomString;
  };
  
  /**
   * Display log to console.
   * @param String message
   */
  this.log = function(message) {
    //window.console && console.log(message);
  }
  
  /**
   * Create this.img object, append it to HTML.
   */
  this.createImg = function() {
    if (this.img != null) {
      this.img.remove();
    }
    this.img = new Image();
    this.img.style.display = "none";
    $(document.body).append(this.img);
  };
  
  var that = this;
  $(document).ready(function() {
    that.createImg();
    that.setStopCallback(stopCallback);
  });
};