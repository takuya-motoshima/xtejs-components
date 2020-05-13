/**
 * Camera component with controller, menu and overlay canvas.
 * 
 * Optional Attributes:
 * autoplay:Specify to open the camera when ready. The default is not to open automatically.
 * control: Specifies to display the camera control. (Camera shooting button, camera face switching button, etc.) The default is to display.The default is back.
 * menu: Specifies to display the camera menu. The default is to display.
 * facing: Specify the camera face. The front is "front" and the back is "back".
 * 
 * @example
 * 
 * CSS:
 * #camera {
 *   position: absolute;
 *   top: 50%;
 *   left: 50%;
 *   width: 414px !important;
 *   height: 736px !important;
 *   transform: translate(-50%, -50%);
 * }
 * 
 * HTML:
 * <xj-camera id="camera" control menu autoplay facing="back">
 *   <xj-camera-menu>
 *     <xj-camera-menu-item href="#">Home</xj-camera-menu-item>
 *     <xj-camera-menu-item href="#">About</xj-camera-menu-item>
 *     <xj-camera-menu-item href="#">Events</xj-camera-menu-item>
 *   </xj-camera-menu>
 * </xj-camera>
 * 
 * JS:
 * import 'xtejs-components';
 * 
 * // Get the camera element
 * const camera = document.querySelector('#camera');
 * 
 * // If the autoplay attribute is true, please wait for the camera to open first.
 * await camera.waitOpened();
 * 
 * // The following is the basic operation of the camera.
 * // Open front camera
 * await camera.open('front');
 * 
 * // Open rear camera
 * await camera.open('back');
 * 
 * // Play
 * camera.play();
 * 
 * // Pause.
 * camera.pause();
 * 
 * // The following are the events issued by the camera.
 * camera
 *   .on('opened', event => {
 *     // Called when open
 *   })
 *   .on('played', event => {
 *     // Called after playing
 *   })
 *   .on('paused', event => {
 *     // Called when paused
 *   })
 *   .on('capture', event => {
 *     // Called after the shoot button is pressed.
 *     // The captured image can be received from "event.detail.dat" in base64 format.
 *   });
 */
import BaseComponent from '~/BaseComponent';
import CameraStream from '~/CameraStream';
import CameraResolutions from '~/environments/CameraResolutions';
import CustomCanvas from '~/CustomCanvas';
import { Graphics, Template } from 'xtejs-utils';
import './styles/camera.css';

class Camera extends BaseComponent {

  public video: HTMLVideoElement = document.createElement('video');
  public facing: 'nothing'|'front'|'back' = 'nothing';
  public state: 'unopened'|'loading'|'opened' = 'unopened';
  private canvas: CustomCanvas = CustomCanvas.createElement();

  /**
   * is attribute
   * 
   * @return {string}
   */
  protected static get is(): string {
    return 'xj-camera';
  }

  /**
   * Called every time the element is inserted into the DOM.
   * 
   * @return {void}
   */
  protected connectedCallback(): void {

    super.connectedCallback();

    // Component styling
    if (this.css('position') === 'static') {
      this.css('position', 'relative');
    }
    this.classList.add('xj-camera');

    // Create video element
    this.video.classList.add('xj-camera-video');
    this.video.setAttribute('playsinline', 'true');
    this.video.setAttribute('muted', 'true');
    this.append(this.video);

    // Added camera play and pause controls
    this.insertAdjacentHTML('afterbegin', `
      <div action-tap-camera-player class="xj-camera-player">
        <button action-play-pause-camera class="xj-camera-play-pause-button" type="button" played="false"><i></i></button>
      </div>`);

    // Controlling camera play and pause
    const playPauseButton = this.querySelector('[action-play-pause-camera]')!;
    playPauseButton.addEventListener('click', event => {
      // event.stopPropagation();
      if (this.paused) {
        this.play();
      } else {
        this.pause();
      }
      // player.classList.remove('fadein');
    });

    // Control display of player menu
    const player = this.querySelector('[action-tap-camera-player]')!;
    let playerHideTimer: ReturnType<typeof setTimeout>|undefined = undefined;
    player.addEventListener('click', event => {
      if (playerHideTimer !== undefined) {
        clearTimeout(playerHideTimer);
      }
      playPauseButton.setAttribute('played', !this.paused ? 'true' : 'false');
      if (player.classList.contains('fadein')) {
        player.classList.remove('fadein');
      } else {
        player.classList.add('fadein');
        playerHideTimer = setTimeout(() => {
          playerHideTimer = undefined;
          player.classList.remove('fadein');
        }, 2000);
      }
    });

    // Adds a menu to this component if the menu option is on
    if (this.attr('menu') !== false) {

      // Create a menu object if the menu is embedded
      const menu = Array.from(this.querySelectorAll('xj-camera-menu-item')).map(menu => ({ content: menu.innerHTML, url: menu.getAttribute('href') }));
      if (this.querySelector('xj-camera-menu') !== null) {
        this.querySelector('xj-camera-menu')!.remove();
      }

      // Add a menu to this component
      this.insertAdjacentHTML('afterbegin', Template.render(`
        <input type="checkbox" id="xj-camera-nav-menustate">
        <nav class="xj-camera-nav" class="touch" role="navigation" aria-label="Camera view navigation" dir="ltr">
          <div class="xj-camera-nav-content">
            <ul class="xj-camera-nav-header">
              <li class="xj-camera-nav-item xj-camera-nav-menuicon">
                <label class="xj-camera-nav-menuicon-label" for="xj-camera-nav-menustate" aria-hidden="true">
                  <span class="xj-camera-nav-menuicon-bread xj-camera-nav-menuicon-bread-top">
                    <span class="xj-camera-nav-menuicon-bread-crust xj-camera-nav-menuicon-bread-crust-top"></span>
                  </span>
                  <span class="xj-camera-nav-menuicon-bread xj-camera-nav-menuicon-bread-bottom">
                    <span class="xj-camera-nav-menuicon-bread-crust xj-camera-nav-menuicon-bread-crust-bottom"></span>
                  </span>
                </label>
              </li>
            </ul>
            {{#if menu}}
              <ul class="xj-camera-nav-list">
                {{#each menu}}
                  <li class="xj-camera-nav-item xj-camera-nav-item-menu">
                    <a class="xj-camera-nav-link" href="{{url}}">{{content}}</a>
                  </li>
                {{/each}}
              </ul>
            {{/if}}
          </div>
        </nav>`, { menu }));
    }

    // Add camera control to this component if the control option is on
    if (this.attr('control') !== false) {

      // Add a camera controller to this component
      this.insertAdjacentHTML('beforeend', `
        <div class="xj-camera-control">
          <div class="xj-camera-control-content">
            <a class="xj-camera-captured"><img></a>
            <button action-camera-capturing class="xj-camera-capture-button" type="button"></button>
            <button action-change-camera-facing class="xj-camera-switch-face-button" type="button"></button>
          </div>
        </div>`);

      // Get a capture of the current frame if the take a picture button is pressed
      this.querySelector('[action-camera-capturing]')!.addEventListener('click', () => {
        const data = this.capture();
        this.querySelector('.xj-camera-captured img')!.setAttribute('src', data);
        super.invoke('capture', { data });
      });

      // Switch camera face when facing button is pressed
      this.querySelector('[action-change-camera-facing]')!.addEventListener('touchstart', async () => {
        await this.open(this.facing === 'front' ? 'back' : 'front');
      });
    }

    // Check for the option to open the camera automatically
    if (this.attr('autoplay')) {
      this.open(this.attr('facing') as 'front'|'back' || 'back');
    }
  }


  /**
   * Open camera
   * 
   * @param  {'front'|'back'} facing|back
   * @param  {'FHD'|'HD'|'VGA'|'HVGA'|'QVGA'} quality
   * @return {Promise<void>}
   */
  public async open(facing: 'front'|'back' = 'back', quality: 'FHD'|'HD'|'VGA'|'HVGA'|'QVGA' = 'HD'): Promise<void> {
    this.state = 'loading';
    if (this.opened && this.facing === facing) {
      this.state = 'opened';
      return void this.play();
    }
    // const permission = await this.permission();
    // if (permission === 'denied') {
    //   await this.revokePermission();
    // }
    if (facing === 'front') {
      this.video.style.transform = 'scaleX(-1)';
      this.video.style.filter = 'FlipH';
    } else {
      this.video.style.transform = 'scaleX(1)';
      this.video.style.filter = '';
    }
    await CameraStream.open(this.video, {
      video: {
        facingMode: facing === 'front' ? 'user' : 'environment',
        ...CameraResolutions[quality]
      },
      audio: false
    });
    this.facing = facing;
    this.state = 'opened';
    super.invoke('opened');
    this.play();
  }

  /**
   * Close camera
   * 
   * @return {void}
   */
  public close() {
    CameraStream.close(this.video);
    this.facing = 'nothing';
    this.state = 'unopened';
  }

  /**
   * Play camera
   * 
   * @return {void}
   */
  public play() {
    this.video.play();
    super.invoke('played');
  }

  /**
   * Pause camera
   * 
   * @return {void}
   */
  public pause() {
    this.video.pause();
    super.invoke('paused');
  }

  /**
   * Is the camera open?
   * 
   * @return {boolean}
   */
  public get opened(): boolean {
    return this.tracks.length > 0;
  }

  /**
   * Is the camera paused?
   * 
   * @return {boolean}
   */
  public get paused(): boolean {
    return this.video.paused;
  }

  /**
   * Get media tracks
   * 
   * @return {MediaStreamTrack[]}
   */
  public get tracks(): MediaStreamTrack[] {
    return this.video.srcObject ? (<MediaStream>this.video.srcObject).getTracks() : [];
  }

  /**
   * Get current camera constraints
   * 
   * @return {MediaTrackConstraints|undefined}
   */
  public get constraints(): MediaTrackConstraints|undefined {
    if (!this.tracks.length) {
      return undefined;
    }
    return this.tracks[0].getConstraints();
  }

  /**
   * Capture a single frame
   * 
   * @return {void}
   */
  public capture(): string {
    const dimensions = Graphics.getMediaDimensions(this.video);
    this.canvas.extends.setAttribute('width', dimensions.width.toString());
    this.canvas.extends.setAttribute('height', dimensions.height.toString());
    this.canvas.drawImage(this.video, 0, 0, dimensions.width, dimensions.height);
    return this.canvas.toDataURL(this.facing === 'front');
  }

  /**
   * Wait for camera to open
   * 
   * @return {Promise<void>}
   */
  public async waitOpened(): Promise<void> {
    return new Promise(resolve => {
      if (this.state === 'loading') {
        this.on('opened', resolve, { once: true });
      } else {
        resolve();
      }
    });
  }

  // /**
  //  * Returns the permission status of the requested feature, either granted, denied or - in case the user was not yet asked - prompt.
  //  * 
  //  * @return {Promise<string|undefined>} granted|denied|prompt|
  //  *                  - granted: caller will be able to successfuly access the feature without having the user agent asking the user’s permission.
  //  *                  - denied: caller will not be able to access the feature.
  //  *                  - prompt: user agent will be asking the user’s permission if the caller tries to access the feature. The user might grant, deny or dismiss the request.
  //  */
  // public async permission(): Promise<string|undefined> {
  //   if (!navigator.permissions || !navigator.permissions.query) {
  //     return undefined;
  //   }
  //   const result = await navigator.permissions.query({ name: 'camera' });
  //   return result.state;
  // }

  // /**
  //  * Revoke camera access settings
  //  * 
  //  * typescript doesn't support "navigator.permissions.revoke", so don't use it now
  //  * 
  //  * @return {Promise<void>}
  //  */
  // public async revokePermission(): Promise<void> {
  //   if (!navigator.permissions || !navigator.permissions.revoke) {
  //     return;
  //   }
  //   await navigator.permissions.revoke({name: 'camera'});
  // }
}

Camera.define();
export default Camera;