/**
 * Camera component.
 *
 * Optional Attributes:
 * autoplay:Specify to open the camera when ready. The default is not to open automatically.
 * facing: Specify the camera face. The front is "front" and the back is "back".
 *
 * @example
 *
 * HTML:
 * <xj-camera id="camera" autoplay facing="back"></xj-camera>
 *
 * JS:
 * import 'xtejs-components';
 *
 * const camera = document.querySelector('#camera');
 *
 * // Wait until the camera opens
 * await camera.waitOpened();
 *
 * // Pause camera
 * camera.pause();
 *
 * // Open camera in front mode
 * await camera.open('front');
 *
 * // Open camera in back mode
 * await camera.open('back');
 */
import ComponentBase from '~/ComponentBase';
declare class Camera extends ComponentBase {
    extends: HTMLVideoElement;
    facing: 'nothing' | 'front' | 'back';
    state: 'unopened' | 'loading' | 'opened';
    private captured;
    private observer;
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
     * Get camera dimensions
     *
     * @return {{ width: number, height: number }}
     */
    get dimensions(): {
        width: number;
        height: number;
    };
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
