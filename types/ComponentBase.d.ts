export default class extends HTMLElement {
    protected handles: {
        [key: string]: ((...args: any[]) => any)[];
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
     * @param  {(...args: any[]) => any} handler
     * @return {void}
     */
    on(event: string, handler: (...args: any[]) => any): any;
    /**
     * Call event handler
     *
     * @param {string} event
     */
    invoke(event: string, ...args: any[]): void;
    /**
     * Get or set the value of an attribute
     *
     * @param  {string}                  name
     * @param  {string|number|boolean/undefined} value
     * @return {string|number|boolean|undefined}
     */
    attr(name: string, value?: string | number | boolean | undefined): string | number | boolean | undefined;
    /**
     * Get or set the value of a CSS property
     *
     * @param  {string}                  name
     * @param  {string|number|undefined} value
     * @return {string|undefined}
     */
    css(name: string, value?: string | number | undefined): string | undefined;
    /**
     *  Insert content, specified by the parameter, to the end of each element in the set of matched elements.
     *
     * @param  {HTMLElement} element
     * @return {this}
     */
    append(element: HTMLElement): any;
    /**
     * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
     *
     * @param  {HTMLElement} element
     * @return {this}
     */
    prepend(element: HTMLElement): any;
    /**
     * Insert content, specified by the parameter, before each element in the set of matched elements
     *
     * @param  {HTMLElement} element
     * @return {this}
     */
    before(element: HTMLElement): any;
    /**
     * Insert content, specified by the parameter, after each element in the set of matched elements.
     *
     * @param  {HTMLElement} element
     * @return {this}
     */
    after(element: HTMLElement): any;
}
