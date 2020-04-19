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
import './styles/camera-view.css';
declare class CameraView extends ComponentBase {
    camera: Camera;
    canvas: Canvas;
    /**
     * is attribute
     *
     * @return {string}
     */
    protected static get is(): string;
    /**
     * Called every time the element is inserted into the DOM.
     *
     * @return {void}
     */
    protected connectedCallback(): void;
    /**
     * Adjust the layout
     *
     * @return {void}
     */
    layout(): void;
}
export default CameraView;
