export default class {
    /**
     * @param  {HTMLVideoElement} video
     * @param  {Object} constraints
     * @return {Void}
     */
    static open(video: HTMLVideoElement, constraints: Object): Promise<void>;
    /**
     * Stop all tracks that make up the stream
     *
     * @param  {HTMLVideoElement} video
     * @return {Void}
     */
    static close(video: HTMLVideoElement): void;
}
