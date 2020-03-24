import ComponentBase from '~/ComponentBase';
import './styles/camera-view.css';
declare class CameraView extends ComponentBase {
    private camera;
    private canvas;
    private observer;
    private controls;
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
