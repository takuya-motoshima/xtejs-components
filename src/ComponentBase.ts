import { Misc } from 'xtejs-utils';

export default class extends HTMLElement {

  protected handles: { [key: string]: Function };
  protected readonly global: Window = Misc.getGlobal<Window>();

  /**
   * Constructor
   * 
   * @return {void}
   */
  constructor() {
    super();
    this.handles = {};
  }

  /**
   * The element has been added to the document
   * 
   * @return {void}
   */
  public connectedCallback(): void {}

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
   * Set event handler
   * 
   * @param  {string} event
   * @param  {Function} handler
   * @return {void}
   */
   public on(event: string, handler: Function ): any {
    this.handles[event] = handler;
    return this;
  }

  /**
   * Get or set the value of an attribute
   * 
   * @param  {string}                  name
   * @param  {string|number|undefined} value
   * @return {number|string|boolean|undefined}
   */
  public attr(name: string, value: string|number|undefined = undefined): number|string|boolean|undefined {

    // Set or return property
    if (value === undefined) {
      if (/^(cols|colspan|height|high|low|max|maxlength|minlength|min|rows|rowspan|size|start|step|tabindex|width)$/.test(name)) {
        return parseInt(this.getAttribute(name)||'0', 10);
      } else {
        return this.getAttribute(name) !== null 
          ? ( this.getAttribute(name) !== '' ? this.getAttribute(name) as string : true )
          : undefined;
      }
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

    // console.log(`CSS properties name=${name}, value=${value}`);

    // Set or return property
    if (value === undefined) {

      // Convert CSS property names to kebab case
      name = name.replace(/([A-Z])/g, '-$1').toLowerCase();
      return getComputedStyle(this, null).getPropertyValue(name);
    } else {

      // Convert CSS property names to camel case
      name = name.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
      (this.style as { [key: string]: any })[name] = value.toString();
    }
  }
}