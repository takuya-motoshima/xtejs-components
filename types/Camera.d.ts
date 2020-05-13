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
 * #camera {
 *   position: absolute;
 *   top: 50%;
 *   left: 50%;
 *   width: 414px !important;
 *   height: 736px !important;
 *   transform: translate(-50%, -50%);
 * }
 *
 * HTML:
 * <xj-camera id="camera" control menu autoplay facing="back">
 *   <xj-camera-menu>
 *     <xj-camera-menu-item href="#">Home</xj-camera-menu-item>
 *     <xj-camera-menu-item href="#">About</xj-camera-menu-item>
 *     <xj-camera-menu-item href="#">Events</xj-camera-menu-item>
 *   </xj-camera-menu>
 * </xj-camera>
 *
 * JS:
 * import 'xtejs-components';
 *
 * // Get the camera element
 * const camera = document.querySelector('#camera');
 *
 * // If the autoplay attribute is true, please wait for the camera to open first.
 * await camera.waitOpened();
 *
 * // The following is the basic operation of the camera.
 * // Open front camera
 * await camera.open('front');
 *
 * // Open rear camera
 * await camera.open('back');
 *
 * // Play
 * camera.play();
 *
 * // Pause.
 * camera.pause();
 *
 * // The following are the events issued by the camera.
 * camera
 *   .on('opened', event => {
 *     // Called when open
 *   })
 *   .on('played', event => {
 *     // Called after playing
 *   })
 *   .on('paused', event => {
 *     // Called when paused
 *   })
 *   .on('capture', event => {
 *     // Called after the shoot button is pressed.
 *     // The captured image can be received from "event.detail.dat" in base64 format.
 *   });
 */
import BaseComponent from '~/BaseComponent';
import './styles/camera.css';
declare class Camera extends BaseComponent {
    video: HTMLVideoElement;
    facing: 'nothing' | 'front' | 'back';
    state: 'unopened' | 'loading' | 'opened';
    private canvas;
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
     * Open camera
     *
     * @param  {'front'|'back'} facing|back
     * @param  {'FHD'|'HD'|'VGA'|'HVGA'|'QVGA'} quality
     * @return {Promise<void>}
     */
    open(facing?: 'front' | 'back', quality?: 'FHD' | 'HD' | 'VGA' | 'HVGA' | 'QVGA'): Promise<void>;
    /**
     * Close camera
     *
     * @return {void}
     */
    close(): void;
    /**
     * Play camera
     *
     * @return {void}
     */
    play(): void;
    /**
     * Pause camera
     *
     * @return {void}
     */
    pause(): void;
    /**
     * Is the camera open?
     *
     * @return {boolean}
     */
    get opened(): boolean;
    /**
     * Is the camera paused?
     *
     * @return {boolean}
     */
    get paused(): boolean;
    /**
     * Get media tracks
     *
     * @return {MediaStreamTrack[]}
     */
    get tracks(): MediaStreamTrack[];
    /**
     * Get current camera constraints
     *
     * @return {MediaTrackConstraints|undefined}
     */
    get constraints(): MediaTrackConstraints | undefined;
    /**
     * Capture a single frame
     *
     * @return {void}
     */
    capture(): string;
    /**
     * Wait for camera to open
     *
     * @return {Promise<void>}
     */
    waitOpened(): Promise<void>;
}
export default Camera;
