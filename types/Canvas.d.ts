import ComponentBase from '~/ComponentBase';
declare class Canvas extends ComponentBase {
    private extends;
    private observer;
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
     * @param  {number} options.x
     * @param  {number} options.y
     * @param  {number} options.r
     * @param  {string} options.color
     * @return {Canvas}
     */
    drawPoint({ x, y, r, color }: {
        x: number;
        y: number;
        r?: number;
        color?: string;
    }): Canvas;
    /**
     * Draw center point
     *
     * @param  {Object[]} options.points
     * @param  {number} options.r
     * @param  {string} options.color
     * @return {Canvas}
     */
    drawCenterPoint({ points, r, color }: {
        points: {
            x: number;
            y: number;
        }[];
        r?: number;
        color?: string;
    }): Canvas;
    /**
     * Draw rect
     *
     * @param  {number} options.x
     * @param  {number} options.y
     * @param  {number} options.width
     * @param  {number} options.height
     * @param  {number} options.degree
     * @param  {number} options.lineWidth
     * @param  {string} options.color
     * @return {Canvas}
     */
    drawRect({ x, y, width, height, degree, lineWidth, color }: {
        x: number;
        y: number;
        width: number;
        height: number;
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
