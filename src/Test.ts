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
   * The element has been added to the document
   * 
   * @return {void}
   */
  public connectedCallback(): void {
    super.connectedCallback();
    this.innerHTML = `<h1>Hello, World!</h1>`;
  }
}

Test.define();
export default Test;