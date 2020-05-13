/**
 * Canvas component.
 */
import BaseComponent from '~/BaseComponent';
import { Misc, Graphics, Color } from 'xtejs-utils';

class CustomCanvas extends BaseComponent {

  public readonly extends: HTMLCanvasElement;

  /**
   * is attribute
   * 
   * @return {string}
   */
  protected static get is(): string {
    return 'xj-custom-canvas';
  }

  /**
   * Constructor
   * 
   * @return {void}
   */
  constructor() {
    super();
    this.css('boxSizing', 'border-box');
    this.css('display', 'block');
    this.css('overflow', 'hidden');
    if (this.css('position') === 'static') {
      this.css('position', 'relative');
    }
    const width = parseFloat(this.css('width') as string);
    const height = parseFloat(this.css('height') as string);
    this.extends = document.createElement('canvas');
    this.append(this.extends);
    if (!width) {
      this.css('width', getComputedStyle(this.extends).getPropertyValue('width'));
    }
    if (!height) {
      this.css('height', getComputedStyle(this.extends).getPropertyValue('height'));
    }
    this.extends.style.boxSizing = 'border-box';
    this.extends.width = parseFloat(this.css('width')!);
    this.extends.height = parseFloat(this.css('height')!);
    this.extends.style.width = '100%';
    this.extends.style.height = '100%';

    // Watch for changes to this component attribute
    super.observe(this, [ 'width', 'height' ], (attribute: string) => this.extends.setAttribute(attribute, this.attr(attribute) as string));
  }

  /**
   * Draw image
   * 
   * @param  {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement} image
   * @param  {number}                                              sx
   * @param  {number}                                              sy
   * @param  {number}                                              sw
   * @param  {number}                                              sh
   * @param  {number}                                              x
   * @param  {number}                                              y
   * @param  {number}                                              w
   * @param  {number}                                              h
   * @return {CustomCanvas}
   */
  public drawImage(
    image: HTMLImageElement|HTMLVideoElement|HTMLCanvasElement,
    sx: number = 0,
    sy: number = 0,
    sw?: number,
    sh?: number,
    dx?: number,
    dy?: number,
    dw?: number,
    dh?: number
  ): CustomCanvas {
    if (sw !== undefined && sh !== undefined && dx !== undefined && dy !== undefined && dw !== undefined && dh !== undefined) {
      this.extends.getContext('2d')!.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    } else if (sw !== undefined && sh !== undefined) {
      this.extends.getContext('2d')!.drawImage(image, sx, sy, sw, sh);
    } else  {
      this.extends.getContext('2d')!.drawImage(image, sx, sy);
    }
    return this;
  }

  /**
   * Draw and scale the image to fit the canvas
   * 
   * @param  {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement} image
   * @return {CustomCanvas}
   */
  public drawImageScaled(image: HTMLImageElement|HTMLVideoElement|HTMLCanvasElement): CustomCanvas {
   const dimensions = Graphics.getMediaDimensions(image);
   const hRatio = this.extends.width  / dimensions.width;
   const vRatio =  this.extends.height / dimensions.height;
   const ratio  = Math.min( hRatio, vRatio );
   const centerShiftX = ( this.extends.width - dimensions.width * ratio ) / 2;
   const centerShiftY = ( this.extends.height - dimensions.height * ratio ) / 2;
   this.drawImage(image,
      0, 0, dimensions.width, dimensions.height,
      centerShiftX, centerShiftY, dimensions.width * ratio, dimensions.height * ratio);  
    return this;
  }

  /**
   * Draw point
   * 
   * @param  {number} x
   * @param  {number} y
   * @param  {number} options.radius
   * @param  {string} options.color
   * @return {CustomCanvas}
   */
  public drawPoint(x: number, y: number, { radius = 3, color = Color.accessibleDarkBlue }: { radius?: number, color?: string } = {}): CustomCanvas {
    Graphics.drawPoint(this.extends, x, y, { radius, color });
    return this;
  }

  /**
   * Draw center point
   * 
   * @param  {Object[]} coordinates
   * @param  {number} options.radius
   * @param  {string} options.color
   * @return {CustomCanvas}
   */
  public drawCenterPoint(coordinates: { x: number, y: number }[], { radius = 3, color = Color.accessibleDarkBlue }: { radius?: number, color?: string } = {}): CustomCanvas {
    Graphics.drawCenterPoint(this.extends, coordinates, { radius, color });
    return this;
  }

  /**
   * Draw rectangle
   * 
   * @param  {number} x
   * @param  {number} y
   * @param  {number} width
   * @param  {number} height
   * @param  {number} options.degree
   * @param  {number} options.lineWidth
   * @param  {string} options.color
   * @return {CustomCanvas}
   */
  public drawRectangle(x: number, y: number, width: number, height: number, { degree = 0, lineWidth = 3, color = Color.accessibleDarkBlue }: { degree?: number, lineWidth?: number, color?: string } = {}): CustomCanvas {
    Graphics.drawRectangle(this.extends, x, y, width, height, { degree, lineWidth, color });
    return this;
  }

  /**
   * Draw rectangle corners
   * 
   * @param  {number} x
   * @param  {number} y
   * @param  {number} width
   * @param  {number} height
   * @param  {number} options.lineWidth
   * @param  {string} options.color
   * @return {CustomCanvas}
   */
  public drawRectangleCorners(x: number, y: number, width: number, height: number, { lineWidth = 3, color = Color.accessibleDarkBlue }: { lineWidth?: number, color?: string } = {}): CustomCanvas {
    Graphics.drawRectangleCorners(this.extends, x, y, width, height, { lineWidth, color });
    return this;
  }

  /**
   * Flip canvas horizontally
   * 
   * @return {CustomCanvas}
   */
  public flipHorizontal(): CustomCanvas {
    Graphics.flipHorizontal(this.extends);
    return this;
  }

  /**
   * Clear canvas
   * 
   * @return {CustomCanvas}
   */
  public clear(): CustomCanvas {
    this.extends.getContext('2d')!.clearRect(0, 0, this.extends.width, this.extends.height);
    return this;
  }

  /**
   * Get a canvas image in base 64 format
   * 
   * @param  {boolean} flip
   * @return {string}
   */
  public toDataURL(flip = false): string {
    if (flip) {
      this.flipHorizontal();
    }
    return this.extends.toDataURL('image/png', 1.);
  }
}

CustomCanvas.define();
export default CustomCanvas;