import ComponentBase from '~/ComponentBase';
import Camera from '~/Camera';
import Canvas from '~/Canvas';
import { Misc, Graphics } from 'xtejs-utils';
import './styles/camera-view.css';

class CameraView extends ComponentBase {

  public readonly camera: Camera = Camera.createElement();
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
    this.classList.add('xj-camera-view');
    if (getComputedStyle(this).getPropertyValue('position') === 'static') {
      this.css('position', 'relative');
    }

    // Add camera
    this.camera.classList.add('xj-camera-view-camera');
    // this.camera.on('opened', () => this.fitOverlayCanvasToView());
    this.appendChild(this.camera);

    // Add canvas
    this.canvas.classList.add('xj-camera-view-canvas');
    this.appendChild(this.canvas);

    // Observe changes in base elements
    this.observer = new MutationObserver(mutations => {
      for (let mutation of mutations) {
        if (mutation.attributeName === 'style') {
          this.fitOverlayCanvasToView()
        }
      }
    });

    // Start observing base changes
    this.observer.observe(this, { attributes: true, attributeFilter: [ 'style' ], attributeOldValue: true });

    // Fit overlay canvas to view
    this.fitOverlayCanvasToView();
  }

  /**
   * Called every time the element is inserted into the DOM.
   * 
   * @return {void}
   */
  protected connectedCallback(): void {

    super.connectedCallback();

    // Add camera controller
    if (this.attr('controls')) {
      // this.insertAdjacentHTML('afterbegin', `
      //   <input type="checkbox" id="xj-camera-view-gn-menustate">
      //   <nav class="xj-camera-view-gn" class="touch" role="navigation" aria-label="グローバル" data-hires="false" lang="ja-JP" dir="ltr">
      //     <div class="xj-camera-view-gn-content">
      //       <ul class="xj-camera-view-gn-header">
      //         <li class="xj-camera-view-gn-item xj-camera-view-gn-menuicon">
      //           <label class="xj-camera-view-gn-menuicon-label" for="xj-camera-view-gn-menustate" aria-hidden="true">
      //             <span class="xj-camera-view-gn-menuicon-bread xj-camera-view-gn-menuicon-bread-top">
      //               <span class="xj-camera-view-gn-menuicon-bread-crust xj-camera-view-gn-menuicon-bread-crust-top"></span>
      //             </span>
      //             <span class="xj-camera-view-gn-menuicon-bread xj-camera-view-gn-menuicon-bread-bottom">
      //               <span class="xj-camera-view-gn-menuicon-bread-crust xj-camera-view-gn-menuicon-bread-crust-bottom"></span>
      //             </span>
      //           </label>
      //         </li>
      //       </ul>
      //       <div class="xj-camera-view-gn-body">
      //         <slot name="xj-camera-view-gn-body-content"></slot> 
      //       </div>
      //     </div>
      //   </nav>`
      // );
      this.insertAdjacentHTML('beforeend', `
        <div class="xj-camera-view-controls">
          <a class="xj-camera-view-capture"><img></a>
          <button action-capture class="xj-camera-view-capture-button" type="button"></button>
          <button action-rotation class="xj-camera-view-rotation-button" type="button"></button>
        </div>
      `);
      const image = this.querySelector('img')!;
      this.querySelector('[action-capture]')!.addEventListener('click', () => {
        image.setAttribute('src', this.camera.capture() as string);
      });
      this.querySelector('[action-rotation]')!.addEventListener('touchstart', async () => {
        await this.camera.open(this.camera.face === 'front' ? 'back' : 'front')
      });
    }

    // Open camera automatically
    if (this.attr('autoplay')) {
      this.camera.open(this.attr('face') as 'front'|'back' || 'back');
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
   * Fit overlay canvas to view
   *
   * @return {void}
   */
  private fitOverlayCanvasToView(): void {
    if (this.css('position') === 'static') {
      this.css('position', 'relative');
    }
    const rect = Graphics.getRectToFitContainer(this, this.camera.extends);
    const dimensions = this.camera.dimensions;
    console.log('Media element dimensions: ', dimensions);
    this.canvas.attr('width', dimensions.width);
    this.canvas.attr('height', dimensions.height);
    this.canvas.css('left', `${rect.x}px`);
    this.canvas.css('top', `${rect.y}px`);
    this.canvas.css('width', `${rect.width}px`);
    this.canvas.css('height', `${rect.height}px`);
  }
}

CameraView.define();
export default CameraView;