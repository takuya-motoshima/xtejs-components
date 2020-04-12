import ComponentBase from '~/ComponentBase';

class Test extends ComponentBase {

  /**
   * is attribute
   * 
   * @return {string}
   */
  protected static get is(): string {
    return 'xj-test';
  }

  /**
   * Called every time the element is inserted into the DOM.
   * 
   * @return {void}
   */
  protected connectedCallback(): void {
    super.connectedCallback();
    this.innerHTML = `Hello, World`;
  }
}

Test.define();
export default Test;