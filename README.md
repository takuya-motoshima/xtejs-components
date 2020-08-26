# xtejs-components

## Installation

```sh
npm install xtejs-components;
```

## Usage

### Camera component with controller, menu and overlay canvas.

Version 1.05 added play and pause features.

![Camera component with controller, menu and overlay canvas](https://raw.githubusercontent.com/takuya-motoshima/xtejs-components/master/documents/camera.gif)

![Camera playback button capture](https://raw.githubusercontent.com/takuya-motoshima/xtejs-components/master/documents/camera-play.png)

![Camera pause button capture](https://raw.githubusercontent.com/takuya-motoshima/xtejs-components/master/documents/camera-pause.png)

Optional Attributes:

|Attribute|Value|Description|
|-|-|-|
|autoplay|true\|false|Specify to open the camera when ready. The default is not to open automatically.|
|control|true\|false|Specifies to display the camera control. (Camera shooting button, camera face switching button, etc.) The default is to display.The default is back.|
|menu|true\|false|Specifies to display the camera menu. The default is to display.|
|facing|back\|front|Specify the camera face. The front is "front" and the back is "back".|

CSS:

```css
#camera {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 414px !important;
  height: 736px !important;
  transform: translate(-50%, -50%);
}
```

HTML:

```html
<xj-camera id="camera" control menu autoplay facing="back">
  <xj-camera-menu>
    <xj-camera-menu-item href="#">Home</xj-camera-menu-item>
    <xj-camera-menu-item href="#">About</xj-camera-menu-item>
    <xj-camera-menu-item href="#">Events</xj-camera-menu-item>
  </xj-camera-menu>
</xj-camera>
```

JS:

```js
import 'xtejs-components';

// Get the camera element
const camera = document.querySelector('#camera');

// If the autoplay attribute is true, please wait for the camera to open first.
await camera.waitOpened();

// The following is the basic operation of the camera.
// Open front camera
await camera.open('front');

// Open rear camera
await camera.open('back');

// Play
camera.play();

// Pause.
camera.pause();

// The following are the events issued by the camera.
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

### Passcode authentication.

![Passcode authentication](https://raw.githubusercontent.com/takuya-motoshima/xtejs-components/master/documents/passcode.gif)

HTML:

```html
<xj-passcode id="passcode"></xj-passcode>
```

JS:

```js
import "xtejs-components";

const correctPasscode = '1234';
const passcode = document.querySelector('#passcode');

// Event handler when passcode input is completed
passcode.authenticate(correctPasscode, success => {
  // If the passcode is correct, the success variable will be true.
  if (success) {
    alert('Authenticated Successfully');
  } else {
    alert('Authentication Failed');
  }
});
```

## Examples

There are some examples in "./examples" in this package.Here is the first one to get you started.
