import ComponentBase from '~/ComponentBase';
import Canvas from '~/Canvas';
import './styles/image-view.css';
declare class ImageView extends ComponentBase {
    image: HTMLImageElement;
    canvas: Canvas;
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
     * Set layout
     *
     * @return {void}
     */
    private layout;
}
export default ImageView;
