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
     * Called every time the element is inserted into the DOM.
     *
     * @return {void}
     */
    protected connectedCallback(): void;
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
export default CameraView;
