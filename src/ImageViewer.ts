import ComponentBase from '~/ComponentBase';
import Canvas from '~/Canvas';
import { Misc, Geometry } from 'xtejs-utils';

class ImageViewer extends ComponentBase {

  private image: HTMLImageElement = document.createElement('img');
  private canvas: Canvas = Canvas.createElement();
  private observer: MutationObserver;

  /**
   * Constructor
   * 
   * @return {void}
   */
  constructor() {

    super();

    // Set base style
    this.style.boxSizing = 'border-box';
    this.style.display = 'block';
    this.style.overflow = 'hidden';
    if (getComputedStyle(this).position === 'static') {
      this.style.position = 'relative';
    }

    // Add image
    this.appendChild(this.image);
    this.image.style.boxSizing = 'border-box';
    this.image.style.display = 'block';
    this.image.style.width = '100%';
    this.image.style.height = '100%';

    // Add canvas
    this.canvas.style.position = 'absolute';
    this.appendChild(this.canvas);

    // Observe changes in base elements
    this.observer = new MutationObserver(mutations => {
      for (let mutation of mutations) {
        if (mutation.attributeName === 'style') {
          this.redraw()
        } else if (mutation.attributeName === 'src') {
          this.image.setAttribute('src', this.getAttribute('src') as string);
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
    return 'xtejs-image-viewer';
  }

  /**
   * Redraw the base
   */
  private redraw(): void {

    // Redraw base
    const styles = getComputedStyle(this);
    if (styles.position === 'static') {
      this.style.position = 'relative';
    }

    // Redraw image
    this.image.style.objectFit = styles.objectFit;

    // Redraw canvas
    const resolution = Geometry.getMediaDimensions(this.image);
    const dimensions = Geometry.calculateFitDimensions({
      objectFit: styles.objectFit,
      intrinsicWidth: parseFloat(styles.width) - parseFloat(styles.paddingRight) - parseFloat(styles.borderRightWidth) - parseFloat(styles.paddingLeft) - parseFloat(styles.borderLeftWidth),
      intrinsicHeight: parseFloat(styles.height) - parseFloat(styles.paddingTop) - parseFloat(styles.borderTopWidth) - parseFloat(styles.paddingBottom) - parseFloat(styles.borderBottomWidth),
      intrinsicTop: parseFloat(styles.paddingTop) + parseFloat(styles.borderTopWidth) + parseFloat(styles.marginTop),
      intrinsicLeft: parseFloat(styles.paddingLeft) + parseFloat(styles.borderLeftWidth) + parseFloat(styles.marginLeft),
      actualWidth: resolution.width,
      actualHeight: resolution.height
    });
    this.canvas.width = resolution.width;
    this.canvas.height = resolution.height;
    this.canvas.style.top = `${dimensions.top}px`;
    this.canvas.style.left = `${dimensions.left}px`;
    this.canvas.style.width = `${dimensions.width}px`;
    this.canvas.style.height = `${dimensions.height}px`;
  }
}

ImageViewer.define();
export default ImageViewer;