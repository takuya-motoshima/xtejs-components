import ComponentBase from '~/ComponentBase';
declare class ImageViewer extends ComponentBase {
    private image;
    private layer;
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
     * Redraw the base
     */
    private redraw;
    /**
     * Get src
     *
     * @return {string}
     */
    get src(): string;
    /**
     * Set src
     *
     * @param {string} value
     */
    set src(value: string);
}
export default ImageViewer;
