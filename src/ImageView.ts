import ComponentBase from '~/ComponentBase';
import Canvas from '~/Canvas';
import { Misc, Graphics, Media } from 'xtejs-utils';

class ImageView extends ComponentBase {

  public readonly image: HTMLImageElement = document.createElement('img');
  public readonly canvas: Canvas = Canvas.createElement();
  private readonly observer: MutationObserver;

  /**
   * Constructor
   * 
   * @return {void}
   */
  constructor() {

    super();

    // Set base style
    this.css('box-sizing', 'border-box');
    this.css('display', 'block');
    this.css('overflow', 'hidden');
    if (getComputedStyle(this).position === 'static') {
      this.css('position', 'relative');
    }

    // Add image
    this.appendChild(this.image);
    this.image.style.boxSizing = 'border-box';
    this.image.style.display = 'block';
    this.image.style.width = '100%';
    this.image.style.height = '100%';

    // Add canvas
    this.canvas.css('position', 'absolute');
    this.appendChild(this.canvas);

    // Observe changes in base elements
    this.observer = new MutationObserver(mutations => {
      for (let mutation of mutations) {
        if (mutation.attributeName === 'style') {
          this.redraw()
        } else if (mutation.attributeName === 'src') {
          this.image.setAttribute('src', this.attr('src') as string);
        }
      }
    });

    // Start observing base changes
    this.observer.observe(this, { attributes: true, attributeFilter: [ 'style', 'src' ], attributeOldValue: true });

    // Redraw
    this.redraw();
  }

  /**
   * is attribute
   * 
   * @return {string}
   */
  protected static get is(): string {
    return 'xj-image-view';
  }

  /**
   * Redraw the base
   */
  private redraw(): void {

    // Redraw base
    if (this.css('position') === 'static') {
      this.css('position', 'relative');
    }

    // Redraw image
    this.image.style.objectFit = this.css('object-fit') as string;

    // Redraw canvas
    const resolution = Media.getMediaDimensions(this.image);
    const dimensions = Graphics.calculateFitDimensions({
      objectFit: this.css('object-fit'),
      intrinsicWidth: Graphics.getIntrinsicWidth(this),
      intrinsicHeight: Graphics.getIntrinsicHeight(this),
      intrinsicTop: Graphics.getIntrinsicTop(this),
      intrinsicLeft: Graphics.getIntrinsicLeft(this),
      actualWidth: resolution.width,
      actualHeight: resolution.height
    });
    this.canvas.attr('width', resolution.width);
    this.canvas.attr('height', resolution.height);
    this.canvas.css('top', `${dimensions.top}px`);
    this.canvas.css('left', `${dimensions.left}px`);
    this.canvas.css('width', `${dimensions.width}px`);
    this.canvas.css('height', `${dimensions.height}px`);
  }
}

ImageView.define();
export default ImageView;