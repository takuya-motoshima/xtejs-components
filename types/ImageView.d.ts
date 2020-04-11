import ComponentBase from '~/ComponentBase';
import Canvas from '~/Canvas';
declare class ImageView extends ComponentBase {
    readonly image: HTMLImageElement;
    readonly canvas: Canvas;
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
     * Fit overlay canvas to view
     *
     * @return {void}
     */
    private fitOverlayCanvasToView;
}
export default ImageView;
