import ComponentBase from '~/ComponentBase';
declare class ImageViewer extends ComponentBase {
    private image;
    private canvas;
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
}
export default ImageViewer;
