import ComponentBase from '~/ComponentBase';
import Camera from '~/Camera';
import Canvas from '~/Canvas';
import { Misc, Geometry } from 'xtejs-utils';
import './styles/camera-viewer.css';

class CameraViewer extends ComponentBase {

  private camera: Camera = Camera.createElement();
  private canvas: Canvas = Canvas.createElement();
  private observer: MutationObserver;
  private controls!: boolean;

  /**
   * Constructor
   * 
   * @return {void}
   */
  constructor() {

    super();


    // Set base style
    this.classList.add('camera-viewer');
    if (getComputedStyle(this).position === 'static') {
      this.style.position = 'relative';
    }

    // Add camera
    this.camera.classList.add('camera-viewer-camera');
    this.appendChild(this.camera);

    // Add canvas
    this.canvas.classList.add('camera-viewer-canvas');
    this.appendChild(this.canvas);

    // Observe changes in base elements
    this.observer = new MutationObserver(mutations => {
      for (let mutation of mutations) {
        if (mutation.attributeName === 'style') {
          this.redraw()
        }
      }
    });

    // Start observing base changes
    this.observer.observe(this, { attributes: true, attributeFilter: [ 'style' ], attributeOldValue: true });

    // Redraw
    this.redraw();
  }

  /**
   * The element has been added to the document
   * 
   * @return {void}
   */
  public connectedCallback(): void {

    super.connectedCallback();

    // Add camera controller
    if (this.getAttribute('controls') != null) {
      this.insertAdjacentHTML('beforeend', 
        `<div class="camera-controls">
          <a class="camera-captured"><img element-captured></a>
          <button action-capturing class="camera-capturing-button" type="button"></button>
          <button action-rotation class="camera-rotation-button" type="button"></button>
        </div>`);
      const startEvent = window.ontouchstart ? 'touchstart' : 'click';
      const captured = this.querySelector('[element-captured]')!;
      this.querySelector('[action-capturing]')!.addEventListener(startEvent, () => {
        captured.setAttribute('src', this.camera.capture() as string);
      });
      this.querySelector('[action-rotation]')!.addEventListener(startEvent, async () => {
        await this.camera.open(this.camera.cameraFace === 'front' ? 'back' : 'front')
      });
    }

    // Open camera automatically
    if (this.getAttribute('autoplay') != null) {
      this.camera.open(this.getAttribute('autoplay') === 'back' ? 'back' : 'front');
    }
  }

  /**
   * is attribute
   * 
   * @return {string}
   */
  protected static get is(): string {
    return 'xtejs-camera-viewer';
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

    // Redraw canvas
    const resolution = this.camera.resolution;
    const dimensions = Geometry.calculateFitDimensions({
      objectFit: this.camera.extends.style.objectFit,
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

CameraViewer.define();
export default CameraViewer;