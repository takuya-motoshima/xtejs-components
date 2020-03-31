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
     * Get or set the value of an attribute
     *
     * @param  {string}                  name
     * @param  {string|number|undefined} value
     * @return {number|string|boolean|undefined}
     */
    attr(name: string, value?: string | number | undefined): number | string | boolean | undefined;
    /**
     * Get or set the value of a CSS property
     *
     * @param  {string}                  name
     * @param  {string|number|undefined} value
     * @return {string|undefined}
     */
    css(name: string, value?: string | number | undefined): string | undefined;
}
