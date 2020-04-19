## 1.0.5 (April 19, 2020)

### Base component
* Changed the parameter passed to the event handler of the component to be an event object instead of just an object.

### Camera view component
* Added the features of play and pause

![Play and pause camera view](https://raw.githubusercontent.com/takuya-motoshima/xtejs-components/master/documents/camera-view-play-pause.jpg)

### Camera component
* Added open, play and pause events for the camera.

    ```js
    // Execute a JavaScript when opening camera
    camera.on('opened', event => console.log('Camera opened'));

    // Execute a JavaScript when playing camera
    camera.on('played', event => console.log('Camera played'));

    // Execute a JavaScript when the camera is paused
    camera.on('paused', event => console.log('Camera paused'));

    // You can also use method chains to set events.
    camera
      .on('opened', event => console.log('Camera opened'))
      .on('played', event => console.log('Camera played'))
      .on('paused', event => console.log('Camera paused'));
    ```
