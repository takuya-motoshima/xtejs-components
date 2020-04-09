import ComponentBase from '~/ComponentBase';
declare class Canvas extends ComponentBase {
    readonly extends: HTMLCanvasElement;
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
    drawImage(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, sx?: number, sy?: number, swidth?: number, sheight?: number, dx?: number, dy?: number, dwidth?: number, dheight?: number): Canvas;
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
     * @param  {number} options.r
     * @param  {string} options.color
     * @return {Canvas}
     */
    drawPoint(x: number, y: number, { r, color }: {
        r?: number;
        color?: string;
    }): Canvas;
    /**
     * Draw center point
     *
     * @param  {Object[]} coordinates
     * @param  {number} options.r
     * @param  {string} options.color
     * @return {Canvas}
     */
    drawCenterPoint(coordinates: {
        x: number;
        y: number;
    }[], { r, color }: {
        r?: number;
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
    drawRectangle(x: number, y: number, width: number, height: number, { degree, lineWidth, color }: {
        degree?: number;
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
