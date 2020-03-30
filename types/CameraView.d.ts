import ComponentBase from '~/ComponentBase';
import Camera from '~/Camera';
import Canvas from '~/Canvas';
import './styles/camera-view.css';
declare class CameraView extends ComponentBase {
    readonly camera: Camera;
    readonly canvas: Canvas;
    private readonly observer;
    /**
     * Constructor
     *
     * @return {void}
     */
    constructor();
    /**
     * The element has been added to the document
     *
     * @return {void}
     */
    connectedCallback(): void;
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
export default CameraView;
