export default class extends HTMLElement {
    protected handles: {
        [key: string]: Function;
    };
    protected readonly global: Window;
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
     * Define elements
     *
     * @return {this}
     */
    static define(): any;
    /**
     * Generate elements
     *
     * @return {this}
     */
    static createElement(): any;
    /**
     * Set event handler
     *
     * @param  {string} event
     * @param  {Function} handler
     * @return {void}
     */
    on(event: string, handler: Function): any;
    /**
     * Get width
     *
     * @return {number}
     */
    get width(): number;
    /**
     * Set width
     *
     * @param {number} value
     */
    set width(value: number);
    /**
     * Get height
     *
     * @return {number}
     */
    get height(): number;
    /**
     * Set height
     *
     * @param {number} value
     */
    set height(value: number);
}
