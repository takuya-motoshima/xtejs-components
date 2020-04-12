import ComponentBase from '~/ComponentBase';
import Canvas from '~/Canvas';
import Stream from '~/Stream';
import CameraResolutions from '~/environments/CameraResolutions';
import { Graphics } from 'xtejs-utils';

class Camera extends ComponentBase {

  public extends!: HTMLVideoElement;
  public facing: 'nothing'|'front'|'back' = 'nothing';
  public state: 'unopened'|'loading'|'opened' = 'unopened';
  private readonly canvas: Canvas = Canvas.createElement();
  private observer!: MutationObserver;

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
    this.extends = document.createElement('video');
    this.append(this.extends);
    this.css('box-sizing', 'border-box');
    this.css('display', 'block');
    if (this.css('position') === 'static') {
      this.css('position', 'relative');
    }
    if (!this.css('width')) {
      this.css('width', getComputedStyle(this.extends).getPropertyValue('width'));
    }
    if (!this.css('height')) {
      this.css('height', getComputedStyle(this.extends).getPropertyValue('height'));
    }
    this.extends.setAttribute('playsinline', 'true');
    this.extends.setAttribute('muted', 'true');
    this.extends.style.boxSizing = 'border-box';
    this.extends.style.width = '100%';
    this.extends.style.height = '100%';
    this.extends.style.objectFit = 'cover';
    this.observer = new MutationObserver(mutations => {
      for (let { attributeName } of mutations) {
        if (/^width|height$/.test(attributeName!)) {
          this.extends.setAttribute(attributeName!, this.attr(attributeName!) as string);
        }
      }
    });
    this.observer.observe(this, { attributes: true, attributeFilter: [ 'width', 'height' ] });
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
      this.extends.style.transform = 'scaleX(-1)';
      this.extends.style.filter = 'FlipH';
    } else {
      this.extends.style.transform = 'scaleX(1)';
      this.extends.style.filter = '';
    }
    await Stream.open(this.extends, {
      video: {
        facingMode: facing === 'front' ? 'user' : 'environment',
        ...CameraResolutions[quality]
      },
      audio: false
    });
    this.facing = facing;
    this.state = 'opened';
    this.play();
    super.invoke('opened');
  }

  /**
   * Close camera
   * 
   * @return {void}
   */
  public close() {
    Stream.close(this.extends);
    this.facing = 'nothing';
    this.state = 'unopened';
  }

  /**
   * Play camera
   * 
   * @return {void}
   */
  public play() {
    this.extends.play();
  }

  /**
   * Pause camera
   * 
   * @return {void}
   */
  public pause() {
    this.extends.pause();
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
    return this.extends.paused;
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
   * Get camera dimensions
   * 
   * @return {{ width: number, height: number }}
   */
  public get dimensions(): { width: number, height: number } {
    return Graphics.getMediaDimensions(this.extends);
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
   * @param  {number} width
   * @return {void}
   */
  public capture(width?: number): string {
    const dimensions = this.dimensions;
    this.canvas.attr('width', width || dimensions.width);
    this.canvas.attr('height', dimensions.height * (this.canvas.attr('width') as number / dimensions.width));
    this.canvas.drawImage(
      this.extends, 0, 0, dimensions.width, dimensions.height,
      0, 0, this.canvas.attr('width') as number, this.canvas.attr('height') as number);
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