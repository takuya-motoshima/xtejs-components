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
     * Attributes of custom elements for which you want to monitor changes
     *
     * @return {string[]}
     */
    static get observedAttributes(): string[];
    /**
     * Called every time the element is inserted into the DOM.
     *
     * @return {void}
     */
    protected connectedCallback(): void;
    /**
     * Called when an observed attribute has been added, removed, updated, or replaced.
     * Also called for initial values when an element is created by the parser, or upgraded.
     * Note: only attributes listed in the observedAttributes property will receive this callback.
     *
     * @param {string}      attributeName
     * @param {string|null} oldValue
     * @param {string|null} newValue
     * @return {void}
     */
    protected attributeChangedCallback(attributeName: string, oldValue: string | null, newValue: string | null): void;
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
