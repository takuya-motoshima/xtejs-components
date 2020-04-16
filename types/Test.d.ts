/**
 * It's just a component for my personal testing
 */
import ComponentBase from '~/ComponentBase';
declare class Test extends ComponentBase {
    /**
     * is attribute
     *
     * @return {string}
     */
    protected static get is(): string;
    /**
     * Called every time the element is inserted into the DOM.
     *
     * @return {void}
     */
    protected connectedCallback(): void;
}
export default Test;
