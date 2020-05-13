
## 1.0.6 (May 13, 2020)

### Camera component
* All the features of the camera and camera view have been consolidated into the camera component.

### Passcode component
* Changed component name from passcode Auth to passcode

## 1.0.5 (April 19, 2020)

### Base component
* Changed the parameter passed to the event handler of the component to be an event object instead of just an object.

### Camera view component
* Added the features of play and pause

![Camera playback button capture](https://raw.githubusercontent.com/takuya-motoshima/xtejs-components/master/documents/camera-play.png)

![Camera pause button capture](https://raw.githubusercontent.com/takuya-motoshima/xtejs-components/master/documents/camera-pause.png)

### Camera component
* Added open, play and pause events for the camera.

    ```js
    camera
      .on('opened', event => {
        // Called when open
      })
      .on('played', event => {
        // Called after playing
      })
      .on('paused', event => {
        // Called when paused
      })
      .on('capture', event => {
        // Called after the shoot button is pressed.
        // The captured image can be received from "event.detail.dat" in base64 format.
      });

    ```
