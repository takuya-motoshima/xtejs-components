import ComponentBase from '~/ComponentBase';
declare class Test extends ComponentBase {
    /**
     * is attribute
     *
     * @return {string}
     */
    protected static get is(): string;
    /**
     * The element has been added to the document
     *
     * @return {void}
     */
    connectedCallback(): void;
}
export default Test;
