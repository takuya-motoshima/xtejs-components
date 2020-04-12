import ComponentBase from '~/ComponentBase';
import Camera from '~/Camera';
import Canvas from '~/Canvas';
import { Misc, Graphics } from 'xtejs-utils';
import './styles/camera-view.css';

class CameraView extends ComponentBase {

  public camera!: Camera;
  public canvas!: Canvas;
  private observer!: MutationObserver;

  /**
   * is attribute
   * 
   * @return {string}
   */
  protected static get is(): string {
    return 'xj-camera-view';
  }

  /**
   * Called every time the element is inserted into the DOM.
   * 
   * @return {void}
   */
  protected connectedCallback(): void {
    super.connectedCallback();
    this.classList.add('xj-camera-view');
    this.camera = Camera.createElement();
    this.camera.classList.add('xj-camera-view-camera');
    this.camera.on('opened', () => this.layout());
    if (this.attr('autoplay')) {
      this.camera.attr('autoplay', true);
    }
    if (this.attr('facing')) {
      this.camera.attr('facing', this.attr('facing'));
    }
    this.appendChild(this.camera);
    this.canvas = Canvas.createElement();
    this.canvas.classList.add('xj-camera-view-canvas');
    this.appendChild(this.canvas);
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
        await this.camera.open(this.camera.facing === 'front' ? 'back' : 'front')
      });
    }
    this.observer = new MutationObserver(mutations => {
      for (let { attributeName } of mutations) {
        if (attributeName === 'style') {
          this.layout()
        }
      }
    });
    this.observer.observe(this, { attributes: true, attributeFilter: [ 'style' ], attributeOldValue: true });
    this.layout();
   }

  /**
   * Set layout
   *
   * @return {void}
   */
  private layout(): void {
    if (this.css('position') === 'static') {
      this.css('position', 'relative');
    }
    const rect = Graphics.getRectToFitContainer(this, this.camera.extends);
    console.log('Dimensions: ', this.camera.dimensions);
    this.canvas.attr('width', this.camera.dimensions.width);
    this.canvas.attr('height',this.camera.dimensions.height);
    this.canvas.css('left', `${rect.x}px`);
    this.canvas.css('top', `${rect.y}px`);
    this.canvas.css('width', `${rect.width}px`);
    this.canvas.css('height', `${rect.height}px`);
  }
}

CameraView.define();
export default CameraView;