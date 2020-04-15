/**
 * Image component with overlay canvas.
 */
import ComponentBase from '~/ComponentBase';
import Canvas from '~/Canvas';
import { Misc, Graphics } from 'xtejs-utils';
import './styles/image-view.css';

class ImageView extends ComponentBase {

  public image!: HTMLImageElement;
  public canvas!: Canvas;
  private observer!: MutationObserver;

  /**
   * is attribute
   * 
   * @return {string}
   */
  protected static get is(): string {
    return 'xj-image-view';
  }

  /**
   * Called every time the element is inserted into the DOM.
   * 
   * @return {void}
   */
  protected connectedCallback(): void {
    super.connectedCallback();
    this.classList.add('xj-image-view');
    this.image = document.createElement('img');
    this.image.classList.add('xj-image-view-image');
    this.append(this.image);
    this.canvas = Canvas.createElement();
    this.canvas.classList.add('xj-image-view-canvas');
    this.append(this.canvas);

    // Watch for changes to this component attribute
    this.observer = new MutationObserver(mutations => {
      for (let { attributeName } of mutations) {
        if (attributeName === 'style') {
          this.layout();
        } else if (attributeName === 'src') {
          this.image.setAttribute('src', this.attr('src') as string);
        }
      }
    });
    this.observer.observe(this, { attributes: true, attributeFilter: [ 'style', 'src' ] });

    // Arrange the layout of this component
    this.layout();
  }

  /**
   * Arrange the layout of this component
   *
   * @return {void}
   */
  private layout(): void {
    console.log('Start image view layout');
    console.log(`Image ObjectFit before change: ${getComputedStyle(this.image).getPropertyValue('object-fit')}`);
    if (getComputedStyle(this.image).getPropertyValue('object-fit') !== this.css('object-fit') as string) {
      this.image.style.objectFit = this.css('object-fit') as string;
    }
    console.log(`Image ObjectFit after change: ${getComputedStyle(this.image).getPropertyValue('object-fit')}`);
    if (this.css('position') === 'static') {
      this.css('position', 'relative');
    }
    const rect = Graphics.getOverlayRect(this, this.image);
    const dimensions = Graphics.getMediaDimensions(this.image);
    this.canvas.attr('width', dimensions.width);
    this.canvas.attr('height', dimensions.height);
    this.canvas.css('left', `${rect.x}px`);
    this.canvas.css('top', `${rect.y}px`);
    this.canvas.css('width', `${rect.width}px`);
    this.canvas.css('height', `${rect.height}px`);
    console.log('End image view layout');
  }
}

ImageView.define();
export default ImageView;