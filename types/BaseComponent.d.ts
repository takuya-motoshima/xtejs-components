export default class extends HTMLElement {
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
     * Add event listener
     *
     * @param  {string}           type
     * @param  {() => void}       listener
     * @param  {{ once: boolen }} options.once
     * @return {this}
     */
    on(type: string, listener: () => void, option?: {
        once: boolean;
    }): any;
    /**
     * Remove event listener
     *
     * @param  {string}     type
     * @param  {() => void} listener
     * @return {this}
     */
    off(type: string, listener: () => void): any;
    /**
     * Call event listener
     *
     * @param  {string} type
     * @param  {{}}     detail
     * @return {this}
     */
    invoke(type: string, detail?: {}): any;
    /**
     * Get or set the value of an attribute
     * Numeric attributes are returned as Int type. (Cols, colspan, height, high, low, max, maxlength, minlength, min, rows, rowspan, size, start, step, tabindex, width).
     * If the attribute value is empty, it returns a boolean type true.
     * Attribute values ​​true and false are returned as boolean type.
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
    /**
     * Observe attribute changes
     *
     * @param {HTMLElement}                 target
     * @param {string[]}                    attributeFilter
     * @param {(attribute: string) => void} calback
     * @return {MutationObserver}
     */
    protected observe(target: HTMLElement, attributeFilter: string[], calback: (attribute: string) => void): MutationObserver;
}
