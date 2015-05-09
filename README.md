# batsgLoadingTime.js

Measure time when image or data (especially large data) is loaded and displayed completely on web page.
This library is used for debugging, to measure the running time until the data (including image) is completely displayed on the screen.

It works on Firefox and Chrome, but *not work on IE*.
It requires jquery.

If you get the time before a javascript script code starts running, then get the time when it finishes,
and get the time difference between them, then you only get running time of the script,
not the time until when browser fully displays the data (it the script displayes data on the web page).

The browser takes more time to display image and large data on the screen.

To get the time when all data is displayed completely on the screen, this library loads an image,
and get the time when the image is fully loaded.
This is not exactly the time when the data is fully displayed, but it gives the time close to what we want.

# Usage
* Simple usage:

  Javascript
```
    // Create time counter.
    timeCount = new BatsgLoadingTime(function() { // Function to be called when timeCount.stop().
      window.console && console.log("Loading time: " + timeCount.getTimeSeconds() + " seconds.");
    });
    
    // Start time measuring.
    timeCount.start();
    
    // ... Long process here.
    
    // Stop time measuring.
    timeCount.stop();
```
* Multiple stop() usage:

  Javascript
```
    // Create time counter.
    timeCount = new BatsgLoadingTime();

    // Start time measuring.
    timeCount.start();

    // ... Do process 1 here.

    // Stop time measuring the first time.
    timeCount.stop(function( // Function to be called when timeCount.stop() the first time.
      window.console && console.log("Stop 1 at: " + timeCount.getTimeSeconds() + " seconds.");
      
      // ... Do process 2 here.
      
      // Stop time measuring the second time.
      timeCount.stop(function() { // Function to be called when timeCount.stop() the second time.
        window.console && console.log("Stop 2 at: " + timeCount.getTimeSeconds() + " seconds.");
      });
    ));
```
