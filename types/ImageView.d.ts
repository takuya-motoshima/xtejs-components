import ComponentBase from '~/ComponentBase';
declare class ImageView extends ComponentBase {
    private readonly image;
    private readonly canvas;
    private readonly observer;
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
export default ImageView;
