import ComponentBase from '~/ComponentBase';
declare class Camera extends ComponentBase {
    extends: HTMLVideoElement;
    facing: 'nothing' | 'front' | 'back';
    state: 'unopened' | 'loading' | 'opened';
    private readonly canvas;
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
     * @param  {number} width
     * @return {void}
     */
    capture(width?: number): string;
}
export default Camera;
