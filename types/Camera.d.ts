import ComponentBase from '~/ComponentBase';
declare class Camera extends ComponentBase {
    extends: HTMLVideoElement;
    private canvas;
    cameraFace: 'front' | 'back' | undefined;
    private observer;
    /**
     * Constructor
     *
     * @return {void}
     */
    constructor();
    /**
     * is attribute
     *
     * @return {string}
     */
    protected static get is(): string;
    /**
     * Get media tracks
     *
     * @return {MediaStreamTrack[]}
     */
    get tracks(): MediaStreamTrack[];
    /**
     * Camera resolution list
     *
     * @return {Object}
     */
    private static get resolutions();
    /**
     * Returns the permission status of the requested feature, either granted, denied or - in case the user was not yet asked - prompt.
     *
     * @return {string} granted|denied|prompt|
     *                  - granted: caller will be able to successfuly access the feature without having the user agent asking the user’s permission.
     *                  - denied: caller will not be able to access the feature.
     *                  - prompt: user agent will be asking the user’s permission if the caller tries to access the feature. The user might grant, deny or dismiss the request.
     */
    getPermission(): Promise<"denied" | "granted" | "prompt" | undefined>;
    /**
     * Revoke camera access settings
     *
     * typescript doesn't support "navigator.permissions.revoke", so don't use it now
     *
     * @return {void}
     */
    revokePermission(): Promise<void>;
    /**
     * Is the camera open?
     *
     * @return {boolean}
     */
    get opened(): boolean;
    /**
     * Get current camera constraints
     *
     * @return {Object}
     */
    constraints(): MediaTrackConstraints | undefined;
    /**
     * @param  {string} cameraFace front|back
     *                       front: Open front camera
     *                       back: Open rear camera
     * @param  {string} quality FHD|HD|VGA|HVGA|QVGA|
     *                          FHD:  1920 x 1080
     *                          HD:   1280 x  720
     *                          VGA:   640 x  480
     *                          HVGA:  480 x  320
     *                          QVGA:  320 x  240
     * @return {Promise<void>}
     */
    open(cameraFace?: 'front' | 'back', quality?: string): Promise<undefined>;
    /**
     * Close camera
     *
     * @return {void}
     */
    close(): void;
    /**
     * Start shooting
     *
     * @return {void}
     */
    play(): void;
    /**
     * Pause shooting
     *
     * @return {void}
     */
    pause(): void;
    /**
     * Take a capture of the shooting scene
     *
     * @param  {number} width
     * @return {void}
     */
    capture(width?: number): string;
    /**
     * Get width
     *
     * @return {number}
     */
    get resolution(): {
        width: number;
        height: number;
    };
}
export default Camera;
