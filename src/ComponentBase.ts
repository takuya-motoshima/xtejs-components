/**
 * The base of all components.
 */
import { Misc } from 'xtejs-utils';

export default class extends HTMLElement {

  protected handles: { [key: string]: { handler: (...params: any[]) => any, option: { once: boolean } }[] } = {};
  protected readonly global: Window = Misc.getGlobal<Window>();

  /**
   * Constructor
   * 
   * @return {void}
   */
  constructor() {
    super();
  }

  /**
   * Attributes of custom elements for which you want to monitor changes
   * 
   * @return {string[]}
   */
  public static get observedAttributes(): string[] {
    return [];
  }

  /**
   * Called every time the element is inserted into the DOM.
   * 
   * @return {void}
   */
  protected connectedCallback(): void {
    // super.connectedCallback();
  }

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
  protected attributeChangedCallback(attributeName: string, oldValue: string|null, newValue: string|null): void {
    // super.attributeChangedCallback(attributeName, oldValue, newValue);
  }

  /**
   * is attribute
   * 
   * @return {string}
   */
  protected static get is(): string {
    return '';
  }

  // /**
  //  * Inherited element name
  //  * 
  //  * @return {string}
  //  */
  // public static get extends(): string {
  //   return '';
  // }

  /**
   * Define elements
   *
   * @return {this}
   */
  public static define(): any {
    const global = Misc.getGlobal<Window>();
    if (global.customElements.get(this.is)) {
      return this;
    }
    global.customElements.define(this.is, this);
    // global.customElements.define(this.is, this, { extends: this.extends });
    return this;
  }

  /**
   * Generate elements
   *
   * @return {this}
   */
  static createElement(): any {
    this.define();
    const global = Misc.getGlobal<Window>();
    return new (global.customElements.get(this.is))()
    // return global.document.createElement(this.is);
    // return global.document.createElement(this.extends, { is: this.is });
  }

  /**
   * Add event handler
   * 
   * @param  {string}          event
   * @param  {any[]) => any}   handler
   * @param  {boolean = false} once
   * @return {void}
   */
   public on(event: string, handler: (...params: any[]) => any, option: { once: boolean} = { once: false }): any {
    if (!this.handles[event]) {
      this.handles[event] = [];
    }
    this.handles[event].push({ handler, option });
    return this;
  }

  /**
   * Remove event handler
   * 
   * @param  {string} event
   * @param  {(...params: any[]) => any} handler
   * @return {void}
   */
   public off(event: string, handler: (...params: any[]) => any ): any {
    const i = this.handles[event] && this.handles[event].findIndex(handleObj => handleObj.handler === handler);
    if (i > -1) {
      this.handles[event].splice(i, 1);
    }
    return this;
  }

  /**
   * Call event handler
   * 
   * @param  {string} event
   * @param  {any[]}  ...params
   * @return {void}
   */
  public invoke(event: string, ...params: any[]): void {
    if (this.handles[event]) {
      let i = this.handles[event].length;
      while (i--) {
        const { handler, option } = this.handles[event][i];
        handler.apply(null, params);
        if (option.once) {
          this.handles[event].splice(i, 1);
        }
      }
    }
  }

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
  public attr(name: string, value: string|number|boolean|undefined = undefined): string|number|boolean|undefined {
      if (value === undefined) {
      const value = this.getAttribute(name);
      return value === null ? undefined
        : /^(cols|colspan|height|high|low|max|maxlength|minlength|min|rows|rowspan|size|start|step|tabindex|width)$/.test(name) ? parseInt(value || '0', 10)
        : /^(true|false)$/i.test(value) ? value.toLowerCase() === 'true'
        : value === '' ? true
        : value.toString();
    } else {
      this.setAttribute(name, value.toString());
    }
  }

  /**
   * Get or set the value of a CSS property
   * 
   * @param  {string}                  name
   * @param  {string|number|undefined} value
   * @return {string|undefined}
   */
  public css(name: string, value: string|number|undefined = undefined): string|undefined {
    if (value === undefined) {
      // Convert CSS property names to kebab case
      name = name.replace(/([A-Z])/g, '-$1').toLowerCase();
      return getComputedStyle(this).getPropertyValue(name);
    } else {
      // Convert CSS property names to camel case
      name = name.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
      (this.style as { [key: string]: any })[name] = value.toString();
    }
  }

  /**
   *  Insert content, specified by the parameter, to the end of each element in the set of matched elements.
   *
   * @param  {HTMLElement} element
   * @return {this}
   */
  public append(element: HTMLElement): any {
    this.appendChild(element);
    return this;
  }

  /**
   * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
   *
   * @param  {HTMLElement} element
   * @return {this}
   */
  public prepend(element: HTMLElement): any {
    this.insertBefore(element, this.firstElementChild);
    return this;
  }

  /**
   * Insert content, specified by the parameter, before each element in the set of matched elements
   *
   * @param  {HTMLElement} element
   * @return {this}
   */
  public before(element: HTMLElement): any {
    this.parentElement!.insertBefore(element, this);
    return this;
  }

  /**
   * Insert content, specified by the parameter, after each element in the set of matched elements.
   *
   * @param  {HTMLElement} element
   * @return {this}
   */
  public after(element: HTMLElement): any {
    this.parentElement!.insertBefore(element, this.nextElementSibling);
    return this;
  }

  /**
   * Observe attribute changes
   * 
   * @param {HTMLElement}                 target
   * @param {string[]}                    attributeFilter
   * @param {(attribute: string) => void} calback
   * @return {MutationObserver}
   */
  protected observe(target: HTMLElement, attributeFilter: string[], calback: (attribute: string) => void ): MutationObserver {
    const observer = new MutationObserver(mutations => {
      for (let { attributeName } of mutations) {
        if (attributeFilter.indexOf(attributeName!)) {
          calback(attributeName!);
        }
      }
    });
    observer.observe(target, { attributes: true, attributeFilter });
    return observer;
  }
}