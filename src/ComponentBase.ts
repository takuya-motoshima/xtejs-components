import { Misc } from 'xtejs-utils';

export default class extends HTMLElement {

  private handlers: { [key: string]: Function };
  private readonly global: Window = Misc.getGlobal<Window>();

  /**
   * Constructor
   * 
   * @return {void}
   */
  constructor() {
    super();
    this.handlers = {};
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
    this.handlers[event] = handler;
    return this;
  }

  /**
   * Get width
   * 
   * @return {number}
   */
  public get width(): number {
    return this.getAttribute('width') ? parseInt(this.getAttribute('width') || '0', 10) : 0;
  }

 /**
  * Set width
  *  
  * @param {number} value
  */
  public set width(value: number) {
    this.setAttribute('width', value.toString());
  }

  /**
   * Get height
   * 
   * @return {number}
   */
  public get height(): number {
    return this.getAttribute('height') ? parseInt(this.getAttribute('height') || '0', 10) : 0;
  }

 /**
  * Set height
  *  
  * @param {number} value
  */
  public set height(value: number) {
    this.setAttribute('height', value.toString());
  }
}