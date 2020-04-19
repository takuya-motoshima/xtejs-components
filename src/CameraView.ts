/**
 * Camera component with controller, menu and overlay canvas.
 * 
 * Optional Attributes:
 * autoplay:Specify to open the camera when ready. The default is not to open automatically.
 * control: Specifies to display the camera control. (Camera shooting button, camera face switching button, etc.) The default is to display.The default is back.
 * menu: Specifies to display the camera menu. The default is to display.
 * facing: Specify the camera face. The front is "front" and the back is "back".
 * 
 * @example
 * 
 * CSS:
 * .xj-camera-view {
 *   position: absolute;
 *   top: 50%;
 *   left: 50%;
 *   width: 414px !important;
 *   height: 736px !important;
 *   transform: translate(-50%, -50%);
 * }
 *
 * HTML:
 * <xj-camera-view id="cameraView" control menu autoplay facing="back">
 *   <xj-camera-view-menu>
 *     <xj-camera-view-menu-item href="#">Home</xj-camera-view-menu-item>
 *     <xj-camera-view-menu-item href="#">About</xj-camera-view-menu-item>
 *     <xj-camera-view-menu-item href="#">Events</xj-camera-view-menu-item>
 *   </xj-camera-view-menu>
 * </xj-camera-view>
 *
 * JS:
 * import 'xtejs-components';
 * 
 * const cameraView = document.querySelector('#cameraView');
 * 
 * // Get a photo taken
 * cameraView.on('capture', event => {
 *   // Photos taken can be received in base64 format.
 *   console.log(event.detail.data);// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
 * });
 * 
 */
import ComponentBase from '~/ComponentBase';
import Camera from '~/Camera';
import Canvas from '~/Canvas';
import { Misc, Graphics, Template } from 'xtejs-utils';
import './styles/camera-view.css';

class CameraView extends ComponentBase {

  public camera!: Camera;
  public canvas!: Canvas;

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

    // Add camera to this component
    this.camera = Camera.createElement();
    this.camera.classList.add('xj-camera-view-camera');
    this.camera.on('opened', () => this.layout());

    // Check for the option to open the camera automatically
    if (this.attr('autoplay')) {
      this.camera.attr('autoplay', true);
    }

    // Check for camera facing options
    if (this.attr('facing')) {
      this.camera.attr('facing', this.attr('facing'));
    }
    this.append(this.camera);

    // Add overlay canvas to this component
    this.canvas = Canvas.createElement();
    this.canvas.classList.add('xj-camera-view-canvas');
    this.append(this.canvas);

    // Added camera play and pause controls
    this.insertAdjacentHTML('afterbegin', `
      <div action-tap-camera-player class="xj-camera-view-player">
        <button action-play-pause-camera class="xj-camera-view-play-pause-button" type="button" played="false"><i></i></button>
      </div>`);

    // Controlling camera play and pause
    const playPauseButton = this.querySelector('[action-play-pause-camera]')!;
    playPauseButton.addEventListener('click', event => {
      // event.stopPropagation();
      if (this.camera.paused) {
        this.camera.play();
      } else {
        this.camera.pause();
      }
      // player.classList.remove('fadein');
    });

    // Control display of player menu
    const player = this.querySelector('[action-tap-camera-player]')!;
    let playerHideTimer: ReturnType<typeof setTimeout>|undefined = undefined;
    player.addEventListener('click', event => {
      if (playerHideTimer !== undefined) {
        clearTimeout(playerHideTimer);
      }
      playPauseButton.setAttribute('played', !this.camera.paused ? 'true' : 'false');
      if (player.classList.contains('fadein')) {
        player.classList.remove('fadein');
      } else {
        player.classList.add('fadein');
        playerHideTimer = setTimeout(() => {
          playerHideTimer = undefined;
          player.classList.remove('fadein');
        }, 2000);
      }
    });

    // Adds a menu to this component if the menu option is on
    if (this.attr('menu') !== false) {

      // Create a menu object if the menu is embedded
      const menu = Array.from(this.querySelectorAll('xj-camera-view-menu-item')).map(menu => ({ content: menu.innerHTML, url: menu.getAttribute('href') }));
      if (this.querySelector('xj-camera-view-menu') !== null) {
        this.querySelector('xj-camera-view-menu')!.remove();
      }

      // Add a menu to this component
      this.insertAdjacentHTML('afterbegin', Template.render(`
        <input type="checkbox" id="xj-camera-view-nav-menustate">
        <nav class="xj-camera-view-nav" class="touch" role="navigation" aria-label="Camera view navigation" dir="ltr">
          <div class="xj-camera-view-nav-content">
            <ul class="xj-camera-view-nav-header">
              <li class="xj-camera-view-nav-item xj-camera-view-nav-menuicon">
                <label class="xj-camera-view-nav-menuicon-label" for="xj-camera-view-nav-menustate" aria-hidden="true">
                  <span class="xj-camera-view-nav-menuicon-bread xj-camera-view-nav-menuicon-bread-top">
                    <span class="xj-camera-view-nav-menuicon-bread-crust xj-camera-view-nav-menuicon-bread-crust-top"></span>
                  </span>
                  <span class="xj-camera-view-nav-menuicon-bread xj-camera-view-nav-menuicon-bread-bottom">
                    <span class="xj-camera-view-nav-menuicon-bread-crust xj-camera-view-nav-menuicon-bread-crust-bottom"></span>
                  </span>
                </label>
              </li>
            </ul>
            {{#if menu}}
              <ul class="xj-camera-view-nav-list">
                {{#each menu}}
                  <li class="xj-camera-view-nav-item xj-camera-view-nav-item-menu">
                    <a class="xj-camera-view-nav-link" href="{{url}}">{{content}}</a>
                  </li>
                {{/each}}
              </ul>
            {{/if}}
          </div>
        </nav>`, { menu }));
    }

    // Add camera control to this component if the control option is on
    if (this.attr('control') !== false) {

      // Add a camera controller to this component
      this.insertAdjacentHTML('beforeend', `
        <div class="xj-camera-view-control">
          <div class="xj-camera-view-control-content">
            <a class="xj-camera-view-captured"><img></a>
            <button action-camera-capturing class="xj-camera-view-capture-button" type="button"></button>
            <button action-change-camera-facing class="xj-camera-view-switch-face-button" type="button"></button>
          </div>
        </div>`);

      // Get a capture of the current frame if the take a picture button is pressed
      this.querySelector('[action-camera-capturing]')!.addEventListener('click', () => {
        const data = this.camera.capture();
        this.querySelector('.xj-camera-view-captured img')!.setAttribute('src', data);
        super.invoke('capture', { data });
      });

      // Switch camera face when facing button is pressed
      this.querySelector('[action-change-camera-facing]')!.addEventListener('touchstart', async () => {
        await this.camera.open(this.camera.facing === 'front' ? 'back' : 'front');
      });
    }

    // Watch for changes to this component attribute
    super.observe(this, [ 'style' ], (attribute: string) => this.layout());

    // Adjust the layout
    this.layout();
   }

  /**
   * Adjust the layout
   *
   * @return {void}
   */
  public layout(): void {
    if (this.css('position') === 'static') {
      this.css('position', 'relative');
    }
    const rect = Graphics.getOverlayRect(this, this.camera.extends);
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