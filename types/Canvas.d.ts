import ComponentBase from '~/ComponentBase';
declare class Canvas extends ComponentBase {
    readonly extends: HTMLCanvasElement;
    private readonly observer;
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
     * @return {Canvas}
     */
    drawImage(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, sx?: number, sy?: number, sw?: number, sh?: number, dx?: number, dy?: number, dw?: number, dh?: number): Canvas;
    /**
     * Draw and scale the image to fit the canvas
     *
     * @param  {HTMLImageElement|HTMLVideoElement|HTMLCanvasElement} image
     * @return {Canvas}
     */
    drawImageScaled(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Canvas;
    /**
     * Draw point
     *
     * @param  {number} x
     * @param  {number} y
     * @param  {number} options.radius
     * @param  {string} options.color
     * @return {Canvas}
     */
    drawPoint(x: number, y: number, { radius, color }?: {
        radius?: number;
        color?: string;
    }): Canvas;
    /**
     * Draw center point
     *
     * @param  {Object[]} coordinates
     * @param  {number} options.radius
     * @param  {string} options.color
     * @return {Canvas}
     */
    drawCenterPoint(coordinates: {
        x: number;
        y: number;
    }[], { radius, color }?: {
        radius?: number;
        color?: string;
    }): Canvas;
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
     * @return {Canvas}
     */
    drawRectangle(x: number, y: number, width: number, height: number, { degree, lineWidth, color }?: {
        degree?: number;
        lineWidth?: number;
        color?: string;
    }): Canvas;
    /**
     * Draw rectangle corners
     *
     * @param  {number} x
     * @param  {number} y
     * @param  {number} width
     * @param  {number} height
     * @param  {number} options.lineWidth
     * @param  {string} options.color
     * @return {Canvas}
     */
    drawRectangleCorners(x: number, y: number, width: number, height: number, { lineWidth, color }?: {
        lineWidth?: number;
        color?: string;
    }): Canvas;
    /**
     * Flip canvas horizontally
     *
     * @return {Canvas}
     */
    flipHorizontal(): Canvas;
    /**
     * Clear canvas
     *
     * @return {Canvas}
     */
    clear(): Canvas;
    /**
     * Get a canvas image in base 64 format
     *
     * @param  {boolean} flip
     * @return {string}
     */
    toDataURL(flip?: boolean): string;
}
export default Canvas;
