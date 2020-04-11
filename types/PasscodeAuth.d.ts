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
     * Authenticate with passcode
     *
     * @example
     * <xj-passcode-auth id="passcodeAuth"></xj-passcode-auth>
     *
     * <script type="module">
     *   import 'xtejs-components';
     *
     *   const passcodeAuth = document.querySelector('#passcodeAuth');
     *   passcodeAuth.authenticate('1234', success => {
     *     if (success) {
     *       alert('Authenticated Successfully');
     *     } else {
     *       alert('Authentication Failed');
     *     }
     *   });
     * </script>
     *
     * @param {string}            passcode
     * @param {(boolean) => void} resolve
     */
    authenticate(passcode: string, resolve: (success: boolean) => void): void;
    /**
     * Called every time the element is inserted into the DOM.
     *
     * @return {void}
     */
    protected connectedCallback(): void;
}
export default PasscodeAuth;
