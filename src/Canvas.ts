import ComponentBase from '~/ComponentBase';
import { Misc, Graphics } from 'xtejs-utils';

class Canvas extends ComponentBase {

  public readonly extends: HTMLCanvasElement = document.createElement('canvas');
  private readonly observer: MutationObserver;

  /**
   * Constructor
   * 
   * @return {void}
   */
  constructor() {

    super();

    // Set wrapper element style
    this.css('boxSizing', 'border-box');
    this.css('display', 'block');
    this.css('overflow', 'hidden');
    if (this.css('position') === 'static') {
      this.css('position', 'relative');
    }

    // Get the original size of the base
    const originalWidth = parseFloat(this.css('width') as string);
    const originalHeight = parseFloat(this.css('height') as string);

    // Add extends element
    this.appendChild(this.extends);

    // Set the default size of the canvas if the original size of the base element is 0
    if (!originalWidth) {
      this.css('width', getComputedStyle(this.extends).getPropertyValue('width'));
    }
    if (!originalHeight) {
      this.css('height', getComputedStyle(this.extends).getPropertyValue('height'));
    }

    // Set inherited element style
    this.extends.style.boxSizing = 'border-box';
    this.extends.width = parseFloat(this.css('width') as string);
    this.extends.height = parseFloat(this.css('height') as string);
    this.extends.style.width = '100%';
    this.extends.style.height = '100%';

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
    return 'xj-canvas';
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
   * @return {Canvas}
   */
  public drawImage(
    image: HTMLImageElement|HTMLVideoElement|HTMLCanvasElement,
    sx: number = 0,
    sy: number = 0,
    swidth?: number,
    sheight?: number,
    dx?: number,
    dy?: number,
    dwidth?: number,
    dheight?: number
  ): Canvas {
    if (swidth !== undefined && sheight !== undefined && dx !== undefined && dy !== undefined && dwidth !== undefined && dheight !== undefined) {
      this.extends.getContext('2d')!.drawImage(image, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);
    } else if (swidth !== undefined && sheight !== undefined) {
      this.extends.getContext('2d')!.drawImage(image, sx, sy, swidth, sheight);
    } else  {
      this.extends.getContext('2d')!.drawImage(image, sx, sy);
    }
    // this.extends.getContext('2d')!.drawImage(image, sx, sy, swidth!, sheight!, dx!, dy!, dwidth!, dheight!);
    return this;
  }

  /**
   * Draw and scale the image to fit the canvas
   * 
   * @param  {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement} image
   * @return {Canvas}
   */
  public drawImageScaled(image: HTMLImageElement|HTMLVideoElement|HTMLCanvasElement): Canvas {
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
   * @param  {number} options.r
   * @param  {string} options.color
   * @return {Canvas}
   */
  public drawPoint(x: number, y: number, { r = 3, color = 'aqua' }: { r?: number, color?: string }): Canvas {
    Graphics.drawPoint(this.extends, x, y, { r, color });
    return this;
  }

  /**
   * Draw center point
   * 
   * @param  {Object[]} coordinates
   * @param  {number} options.r
   * @param  {string} options.color
   * @return {Canvas}
   */
  public drawCenterPoint(coordinates: { x: number, y: number }[], { r = 3, color = 'aqua' }: { r?: number, color?: string }): Canvas {
    Graphics.drawCenterPoint(this.extends, coordinates, { r, color });
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
   * @return {Canvas}
   */
  public drawRectangle(x: number, y: number, width: number, height: number, { degree = 0, lineWidth = 2, color = 'aqua' }: { degree?: number, lineWidth?: number, color?: string }): Canvas {
    Graphics.drawRectangle(this.extends, x, y, width, height, degree, { lineWidth, color });
    return this;
  }

  /**
   * Flip canvas horizontally
   * 
   * @return {Canvas}
   */
  public flipHorizontal(): Canvas {
    Graphics.flipHorizontal(this.extends);
    return this;
  }

  /**
   * Clear canvas
   * 
   * @return {Canvas}
   */
  public clear(): Canvas {
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

Canvas.define();
export default Canvas;