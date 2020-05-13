/**
 * Passcode authentication widget component.
 *
 * @example
 *
 * HTML:
 * <xj-passcode id="passcode"></xj-passcode>
 *
 * JS:
 * import 'xtejs-components';
 *
 * const correctPasscode = '1234';
 * const passcode = document.querySelector('#passcode');
 *
 * // Event handler when passcode input is completed
 * passcode.authenticate(correctPasscode, success => {
 *   // If the passcode is correct, the success variable will be true.
 *   if (success) {
 *     alert('Authenticated Successfully');
 *   } else {
 *     alert('Authentication Failed');
 *   }
 * });
 */
import BaseComponent from '~/BaseComponent';
import './styles/passcode.css';
declare class Passcode extends BaseComponent {
    private passcode;
    private resolve;
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
    /**
     * Authenticate with passcode
     *
     * @param {string}            passcode
     * @param {(boolean) => void} resolve
     */
    authenticate(passcode: string, resolve: (success: boolean) => void): void;
}
export default Passcode;
