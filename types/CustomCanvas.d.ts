/**
 * Canvas component.
 */
import BaseComponent from '~/BaseComponent';
declare class CustomCanvas extends BaseComponent {
    readonly extends: HTMLCanvasElement;
    /**
     * is attribute
     *
     * @return {string}
     */
    protected static get is(): string;
    /**
     * Constructor
     *
     * @return {void}
     */
    constructor();
    /**
     * Draw image
     *
     * @param  {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement} image
     * @param  {number}                                              sx
     * @param  {number}                                              sy
     * @param  {number}                                              sw
     * @param  {number}                                              sh
     * @param  {number}                                              x
     * @param  {number}                                              y
     * @param  {number}                                              w
     * @param  {number}                                              h
     * @return {CustomCanvas}
     */
    drawImage(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, sx?: number, sy?: number, sw?: number, sh?: number, dx?: number, dy?: number, dw?: number, dh?: number): CustomCanvas;
    /**
     * Draw and scale the image to fit the canvas
     *
     * @param  {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement} image
     * @return {CustomCanvas}
     */
    drawImageScaled(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): CustomCanvas;
    /**
     * Draw point
     *
     * @param  {number} x
     * @param  {number} y
     * @param  {number} options.radius
     * @param  {string} options.color
     * @return {CustomCanvas}
     */
    drawPoint(x: number, y: number, { radius, color }?: {
        radius?: number;
        color?: string;
    }): CustomCanvas;
    /**
     * Draw center point
     *
     * @param  {Object[]} coordinates
     * @param  {number} options.radius
     * @param  {string} options.color
     * @return {CustomCanvas}
     */
    drawCenterPoint(coordinates: {
        x: number;
        y: number;
    }[], { radius, color }?: {
        radius?: number;
        color?: string;
    }): CustomCanvas;
    /**
     * Draw rectangle
     *
     * @param  {number} x
     * @param  {number} y
     * @param  {number} width
     * @param  {number} height
     * @param  {number} options.degree
     * @param  {number} options.lineWidth
     * @param  {string} options.color
     * @return {CustomCanvas}
     */
    drawRectangle(x: number, y: number, width: number, height: number, { degree, lineWidth, color }?: {
        degree?: number;
        lineWidth?: number;
        color?: string;
    }): CustomCanvas;
    /**
     * Draw rectangle corners
     *
     * @param  {number} x
     * @param  {number} y
     * @param  {number} width
     * @param  {number} height
     * @param  {number} options.lineWidth
     * @param  {string} options.color
     * @return {CustomCanvas}
     */
    drawRectangleCorners(x: number, y: number, width: number, height: number, { lineWidth, color }?: {
        lineWidth?: number;
        color?: string;
    }): CustomCanvas;
    /**
     * Flip canvas horizontally
     *
     * @return {CustomCanvas}
     */
    flipHorizontal(): CustomCanvas;
    /**
     * Clear canvas
     *
     * @return {CustomCanvas}
     */
    clear(): CustomCanvas;
    /**
     * Get a canvas image in base 64 format
     *
     * @param  {boolean} flip
     * @return {string}
     */
    toDataURL(flip?: boolean): string;
}
export default CustomCanvas;
