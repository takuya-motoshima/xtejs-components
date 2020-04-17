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
    this.image.addEventListener('load', () => super.invoke('load'));
    this.append(this.image);
    this.canvas = Canvas.createElement();
    this.canvas.classList.add('xj-image-view-canvas');
    this.append(this.canvas);

    // Watch for changes to this component attribute
    super.observe(this, [ 'style', 'src' ], async (attribute: string) => {
      if (attribute === 'src') {
        this.image.setAttribute('src', this.attr('src') as string);
      }
      this.layout();
    });

    // Adjust the layout
    this.layout();
  }

  /**
   * Adjust the layout
   *
   * @return {void}
   */
  public layout(): void {
    
    // Set object fit of base element to image
    if (getComputedStyle(this.image).getPropertyValue('object-fit') !== this.css('object-fit') as string) {
      this.image.style.objectFit = this.css('object-fit') as string;
    }

    // The base element is forced into relative position.
    if (this.css('position') === 'static') {
      this.css('position', 'relative');
    }

    // Adjust the position of the overlay canvas
    const rect = Graphics.getOverlayRect(this, this.image);
    const dimensions = Graphics.getMediaDimensions(this.image);
    this.canvas.attr('width', dimensions.width);
    this.canvas.attr('height', dimensions.height);
    this.canvas.css('left', `${rect.x}px`);
    this.canvas.css('top', `${rect.y}px`);
    this.canvas.css('width', `${rect.width}px`);
    this.canvas.css('height', `${rect.height}px`);
  }

  /**
   * Wait for the image to load
   * 
   * @param  {string|File} file
   * @return {Promise<void>}
   */
  public async awaitImageLoaded(file: string|File): Promise<void> {
    if (file instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(file as File);
      file = await new Promise<string>(resolve => reader.addEventListener('load', () => resolve(reader.result! as string)));
    }
    this.image.setAttribute('src', file as string);
    await new Promise(resolve => this.on('load', resolve, { once: true }));
    this.layout();
  }

  /**
   * Get whether the image has finished loading
   * 
   * @return {boolean}
   */
  public get complete(): boolean {
    return this.image.complete;
  }
}

ImageView.define();
export default ImageView;