import ComponentBase from '~/ComponentBase';
import Canvas from '~/Canvas';
import Stream from '~/Stream';
import { Media } from 'xtejs-utils';

class Camera extends ComponentBase {

  public extends: HTMLVideoElement = document.createElement('video');
  private canvas: Canvas = Canvas.createElement();
  public face: 'front'|'back'|undefined = undefined;
  private observer: MutationObserver;

  /**
   * Constructor
   * 
   * @return {void}
   */
  constructor() {

    super();

    // Add extends element
    this.appendChild(this.extends);
    
    // Set wrapper element style
    this.css('box-sizing', 'border-box');
    this.css('display', 'block');
    if (this.css('position') === 'static') {
      this.css('position', 'relative');
    }
    if (!this.css('width')) {
      this.css('width', getComputedStyle(this.extends).width);
    }
    if (!this.style.height) {
      this.css('height', getComputedStyle(this.extends).height);
    }

    // Set inherited element style
    this.extends.setAttribute('playsinline', 'true');
    this.extends.setAttribute('muted', 'true');
    this.extends.style.boxSizing = 'border-box';
    this.extends.style.width = '100%';
    this.extends.style.height = '100%';
    this.extends.style.objectFit = 'cover';

    // Observe changes in base elements
    this.observer = new MutationObserver(mutations => {
      for (let mutation of mutations) {
        if (/^width|height$/.test(mutation.attributeName!)) {
          this.extends.setAttribute(mutation.attributeName!, this.attr(mutation.attributeName!) as string);
        }
      }
    });

    // Start observing base changes
    this.observer.observe(this, { attributes: true, attributeFilter: [ 'width', 'height' ], attributeOldValue: true });
  }

  /**
   * is attribute
   * 
   * @return {string}
   */
  protected static get is(): string {
    return 'xj-camera';
  }

  /**
   * Get media tracks
   * 
   * @return {MediaStreamTrack[]}
   */
  public get tracks(): MediaStreamTrack[] {
    return this.extends.srcObject ? (<MediaStream>this.extends.srcObject).getTracks() : [];
  }

  /**
   * Camera resolution list
   * 
   * @return {Object}
   */
  private static get resolutions(): { [key: string]: { width: number, height: number } } {
    return {
      FHD: { width: 1920, height: 1080 },
      HD: { width: 1280, height: 720 },
      VGA: { width: 640, height: 480 },
      HVGA: { width: 480, height: 320 },
      QVGA: { width: 320, height: 240 }
    };
  }

  /**
   * Returns the permission status of the requested feature, either granted, denied or - in case the user was not yet asked - prompt.
   * 
   * @return {string} granted|denied|prompt|
   *                  - granted: caller will be able to successfuly access the feature without having the user agent asking the user’s permission.
   *                  - denied: caller will not be able to access the feature.
   *                  - prompt: user agent will be asking the user’s permission if the caller tries to access the feature. The user might grant, deny or dismiss the request.
   */
  public async getPermission() {
    if (!navigator.permissions || !navigator.permissions.query) {
      return undefined;
    }
    const result = await navigator.permissions.query({ name: 'camera' });
    console.log(`Current permission: ${result.state}`);
    return result.state;
  }

  /**
   * Revoke camera access settings
   * 
   * typescript doesn't support "navigator.permissions.revoke", so don't use it now
   * 
   * @return {void}
   */
  public async revokePermission() {
    // if (!navigator.permissions || !navigator.permissions.revoke) {
    //   return;
    // }
    // await navigator.permissions.revoke({name: 'camera'});
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
   * Get current camera constraints
   * 
   * @return {Object}
   */
  constraints() {
    if (!this.tracks.length) {
      return undefined;
    }
    return this.tracks[0].getConstraints();
  }

  /**
   * @param  {string} face front|back
   *                       front: Open front camera
   *                       back: Open rear camera
   * @param  {string} quality FHD|HD|VGA|HVGA|QVGA|
   *                          FHD:  1920 x 1080
   *                          HD:   1280 x  720
   *                          VGA:   640 x  480
   *                          HVGA:  480 x  320
   *                          QVGA:  320 x  240
   * @return {Promise<void>}
   */
  public async open(face: 'front'|'back' = 'back',  quality = 'HD') {
    try {

      if (this.opened && this.face === face) {
        // console.log('Camera is already open');
        return void this.play();
      }

      // console.log('Open camera');

      const permission = await this.getPermission();
      if (permission === 'denied') {
        await this.revokePermission();
      }

      if (face === 'front') {
        this.extends.style.transform = 'scaleX(-1)';
        this.extends.style.filter = 'FlipH';
      } else {
        this.extends.style.transform = 'scaleX(1)';
        this.extends.style.filter = '';
      }

      await Stream.open(this.extends, {
        video: {
          facingMode: face === 'front' ? 'user' : 'environment',
          // facingMode: face === 'front' ? 'user' : { exact: 'environment' },
          width: { ideal: Camera.resolutions[quality].width },
          height: { ideal: Camera.resolutions[quality].height }
        },
        audio: false 
      });
      this.face = face;
      this.play();
    } catch (e) {
      throw e;
    }
  }

  /**
   * Close camera
   * 
   * @return {void}
   */
  public close() {
    Stream.close(this.extends);
    this.face = undefined;
  }

  /**
   * Start shooting
   * 
   * @return {void}
   */
  public play() {
    this.extends.play();
  }

  /**
   * Pause shooting
   * 
   * @return {void}
   */
  public pause() {
    this.extends.pause();
  }

  /**
   * Take a capture of the shooting scene
   * 
   * @param  {number} width
   * @return {void}
   */
  public capture(width?: number): string {
    this.canvas.attr('width', width || this.resolution.width);
    const height = this.resolution.height * ( this.canvas.attr('width') as number / this.resolution.width );
    this.canvas.attr('height', height);
    const dataURI = this.canvas
      .drawImage(
        this.extends, 0, 0, this.resolution.width, this.resolution.height,
        0, 0, this.canvas.attr('width') as number, this.canvas.attr('height') as number)
      .toDataURL(this.face === 'front');
    // console.log('dataURI format image:', dataURI.slice(0, 100));
    return dataURI;
  }

  /**
   * Get width
   * 
   * @return {number}
   */
  public get resolution(): { width: number, height: number } {
    return Media.getMediaDimensions(this.extends);
  }
}

Camera.define();
export default Camera;