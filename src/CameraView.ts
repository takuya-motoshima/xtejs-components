import ComponentBase from '~/ComponentBase';
import Camera from '~/Camera';
import Canvas from '~/Canvas';
import { Misc, Graphics } from 'xtejs-utils';
import './styles/camera-view.css';

class CameraView extends ComponentBase {

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
    this.classList.add('xj-camera-view');
    if (getComputedStyle(this).position === 'static') {
      this.style.position = 'relative';
    }

    // Add camera
    this.camera.classList.add('xj-camera-view-camera');
    this.appendChild(this.camera);

    // Add canvas
    this.canvas.classList.add('xj-camera-view-canvas');
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
      this.insertAdjacentHTML('afterbegin', `
        <input type="checkbox" id="xj-camera-view-gn-menustate">
        <nav class="xj-camera-view-gn" class="touch" role="navigation" aria-label="グローバル" data-hires="false" lang="ja-JP" dir="ltr">
          <div class="xj-camera-view-gn-content">
            <ul class="xj-camera-view-gn-header">
              <li class="xj-camera-view-gn-item xj-camera-view-gn-menuicon">
                <label class="xj-camera-view-gn-menuicon-label" for="xj-camera-view-gn-menustate" aria-hidden="true">
                  <span class="xj-camera-view-gn-menuicon-bread xj-camera-view-gn-menuicon-bread-top">
                    <span class="xj-camera-view-gn-menuicon-bread-crust xj-camera-view-gn-menuicon-bread-crust-top"></span>
                  </span>
                  <span class="xj-camera-view-gn-menuicon-bread xj-camera-view-gn-menuicon-bread-bottom">
                    <span class="xj-camera-view-gn-menuicon-bread-crust xj-camera-view-gn-menuicon-bread-crust-bottom"></span>
                  </span>
                </label>
              </li>
            </ul>
            <div class="xj-camera-view-gn-body">
              <slot name="xj-camera-view-gn-body-content"></slot> 
            </div>
          </div>
        </nav>`
      );
      this.insertAdjacentHTML('beforeend', `
        <div class="xj-camera-view-controls">
          <a class="xj-camera-view-capture"><img></a>
          <button action-capture class="xj-camera-view-capture-button" type="button"></button>
          <button action-rotation class="xj-camera-view-rotation-button" type="button"></button>
        </div>
      `);
      const image = this.querySelector('img')!;
      this.querySelector('[action-capture]')!.addEventListener(window.ontouchstart ? 'touchstart' : 'click', () => {
        image.setAttribute('src', this.camera.capture() as string);
      });
      this.querySelector('[action-rotation]')!.addEventListener(window.ontouchstart ? 'touchstart' : 'click', async () => {
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
    return 'xj-camera-view';
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
    const dimensions = Graphics.calculateFitDimensions({
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

CameraView.define();
export default CameraView;