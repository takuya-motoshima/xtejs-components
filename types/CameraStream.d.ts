/**
 * Video input / output stream.
 */
export default class {
    /**
     * Open video stream
     *
     * @param  {HTMLVideoElement} video
     * @param  {Object} constraints
     * @return {void}
     */
    static open(video: HTMLVideoElement, constraints: Object): Promise<void>;
    /**
     * Close video stream
     *
     * @param  {HTMLVideoElement} video
     * @return {void}
     */
    static close(video: HTMLVideoElement): void;
}
