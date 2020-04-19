# xtejs-components

<img src="https://raw.githubusercontent.com/takuya-motoshima/xtejs-components/master/documents/brand.png" width="58" height="90" align="left" hspace="10" vspace="6">

**XteJS components** is a component developed based on custom element v1.

### &nbsp;<!-- Code required for line break in README header -->

## Installation

```sh
npm install xtejs-components;
```

## Usage

### Camera component with controller, menu and overlay canvas.

![Camera component with controller, menu and overlay canvas](https://raw.githubusercontent.com/takuya-motoshima/xtejs-components/master/documents/camera-view.gif)

Optional Attributes:

|Attribute|Value|Description|
|-|-|-|
|autoplay|true\|false|Specify to open the camera when ready. The default is not to open automatically.|
|control|true\|false|Specifies to display the camera control. (Camera shooting button, camera face switching button, etc.) The default is to display.The default is back.|
|menu|true\|false|Specifies to display the camera menu. The default is to display.|
|facing|back\|front|Specify the camera face. The front is "front" and the back is "back".|

CSS:

```css
.xj-camera-view {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 320px !important;
  height: 568px !important;
  /*width: 414px !important;
  height: 736px !important;*/
  transform: translate(-50%, -50%);
}
```

HTML:

```html
<xj-camera-view id="cameraView" control menu autoplay facing="back">
  <xj-camera-view-menu>
    <xj-camera-view-menu-item href="#">Home</xj-camera-view-menu-item>
    <xj-camera-view-menu-item href="#">About</xj-camera-view-menu-item>
    <xj-camera-view-menu-item href="#">Events</xj-camera-view-menu-item>
  </xj-camera-view-menu>
</xj-camera-view>
```

JS:

```js
import 'xtejs-components';

const cameraView = document.querySelector('#cameraView');

// Get a photo taken
cameraView.on('capture', event => {
  // Photos taken can be received in base64 format.
  console.log(event.detail.data);// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
});
```

### Passcode authentication.

![Passcode authentication](https://raw.githubusercontent.com/takuya-motoshima/xtejs-components/master/documents/passcode-auth.gif)

HTML:

```html
<xj-passcode-auth id="passcodeAuth"></xj-passcode-auth>
```

JS:

```js
import "xtejs-components";

const correctPasscode = '1234';
const passcodeAuth = document.querySelector('#passcodeAuth');

// Event handler when passcode input is completed
passcodeAuth.authenticate(correctPasscode, success => {
  // If the passcode is correct, the success variable will be true.
  if (success) {
    alert('Authenticated Successfully');
  } else {
    alert('Authentication Failed');
  }
});
```

### Camera component.

HTML:

```html
<xj-camera id="camera" autoplay facing="back"></xj-camera>
```

JS:

```js
import 'xtejs-components';

const camera = document.querySelector('#camera');

// Wait until the camera opens
await camera.waitOpened();

// Pause camera
camera.pause();

// Open camera in front mode
await camera.open('front');

// Open camera in back mode
await camera.open('back');

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

## Examples

There are some examples in "./examples" in this package.Here is the first one to get you started.