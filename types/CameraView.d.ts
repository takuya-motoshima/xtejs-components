import ComponentBase from '~/ComponentBase';
import Camera from '~/Camera';
import Canvas from '~/Canvas';
import './styles/camera-view.css';
declare class CameraView extends ComponentBase {
    camera: Camera;
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
export default CameraView;
