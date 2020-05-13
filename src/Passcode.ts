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

class Passcode extends BaseComponent {

  private passcode: string = '1234';
  private resolve!: (success: boolean) => void;

  /**
   * is attribute
   * 
   * @return {string}
   */
  protected static get is(): string {
    return 'xj-passcode';
  }

  /**
   * Called every time the element is inserted into the DOM.
   * 
   * @return {void}
   */
  protected connectedCallback(): void {
    super.connectedCallback();
    this.classList.add('passcode');
    this.innerHTML = `
      <div class="passcode-dots">
        <div class="passcode-dot"></div>
        <div class="passcode-dot"></div>
        <div class="passcode-dot"></div>
        <div class="passcode-dot"></div>
      </div>
      <p>Enter the password</p>
      <div class="passcode-numbers">
        <div class="passcode-number"><span>1</span></div>
        <div class="passcode-number"><span>2</span></div>
        <div class="passcode-number"><span>3</span></div>
        <div class="passcode-number"><span>4</span></div>
        <div class="passcode-number"><span>5</span></div>
        <div class="passcode-number"><span>6</span></div>
        <div class="passcode-number"><span>7</span></div>
        <div class="passcode-number"><span>8</span></div>
        <div class="passcode-number"><span>9</span></div>
        <div class="passcode-number"><span>0</span></div>
      </div>`;
      let input = '';
      const dots = Array.from(this.querySelectorAll('.passcode-dot'));
      const numbers = Array.from(this.querySelectorAll('.passcode-number'));
      for (let number of numbers) {
        number.addEventListener('click', async event => {
          if (dots.length === input.length) {
            return;
          }
          number!.classList.add('passcode-number-grow');
          const target = event.currentTarget as HTMLElement;
          input += target.querySelector('span')!.textContent;
          dots[input.length - 1].classList.add('passcode-dot-active');
          if (input.length >= 4) {
            const success = this.passcode === input;
            if (success) {
              dots.forEach(dot => dot.classList.add('passcode-correct'));
              document.body.classList.add('passcode-correct');
            } else {
              dots.forEach(dot => dot.classList.add('passcode-wrong'));
              document.body.classList.add('passcode-wrong');
            }
            setTimeout(() => {
              dots.forEach(dot => dot.classList.remove('passcode-dot-active', 'passcode-wrong', 'passcode-correct'));
              input = '';
              this.resolve(success);
            }, 900);
            setTimeout(() => {
              document.body.classList.remove('passcode-wrong', 'passcode-correct');
            }, 1000);
          }
          setTimeout(() => {
            number.classList.remove('passcode-number-grow');
          }, 1000);
        });
      }
  }

  /**
   * Authenticate with passcode
   *
   * @param {string}            passcode
   * @param {(boolean) => void} resolve
   */
  public authenticate(passcode: string, resolve: (success: boolean) => void): void {
    this.passcode = passcode;
    this.resolve = resolve;
  }
}

Passcode.define();
export default Passcode;