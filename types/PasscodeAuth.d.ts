/**
 * Passcode authentication widget component.
 *
 * @example
 *
 * HTML:
 * <xj-passcode-auth id="passcodeAuth"></xj-passcode-auth>
 *
 * JS:
 * import 'xtejs-components';
 *
 * const correctPasscode = '1234';
 * const passcodeAuth = document.querySelector('#passcodeAuth');
 *
 * // Event handler when passcode input is completed
 * passcodeAuth.authenticate(correctPasscode, success => {
 *   // If the passcode is correct, the success variable will be true.
 *   if (success) {
 *     alert('Authenticated Successfully');
 *   } else {
 *     alert('Authentication Failed');
 *   }
 * });
 */
import ComponentBase from '~/ComponentBase';
import './styles/passcode-auth.css';
declare class PasscodeAuth extends ComponentBase {
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
export default PasscodeAuth;
