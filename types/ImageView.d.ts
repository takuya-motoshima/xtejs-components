/**
 * Image component with overlay canvas.
 */
import ComponentBase from '~/ComponentBase';
import Canvas from '~/Canvas';
import './styles/image-view.css';
declare class ImageView extends ComponentBase {
    image: HTMLImageElement;
    canvas: Canvas;
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
     * Adjust the layout
     *
     * @return {void}
     */
    layout(): void;
    /**
     * Wait for the image to load
     *
     * @param  {string|File} file
     * @return {Promise<void>}
     */
    awaitImageLoaded(file: string | File): Promise<void>;
    /**
     * Get whether the image has finished loading
     *
     * @return {boolean}
     */
    get complete(): boolean;
}
export default ImageView;
