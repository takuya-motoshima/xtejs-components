import ComponentBase from '~/ComponentBase';
import './styles/passcode-auth.css';

class PasscodeAuth extends ComponentBase {

  private passcode: string = '1234';
  private resolve!: (success: boolean) => void;

  /**
   * is attribute
   * 
   * @return {string}
   */
  protected static get is(): string {
    return 'xj-passcode-auth';
  }

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
  public authenticate(passcode: string, resolve: (success: boolean) => void): void {
    this.passcode = passcode;
    this.resolve = resolve;
  }
  // public authenticate(passcode: string): Promise<boolean> {
  //   this.passcode = passcode;
  //   return new Promise<boolean>((resolve: (success: boolean) => void) => {
  //     this.resolve = resolve;
  //   });
  // }

  /**
   * The element has been added to the document
   * 
   * @return {void}
   */
  public connectedCallback(): void {

    super.connectedCallback();

    this.classList.add('passcode-auth');

    this.innerHTML = `
      <div class="passcode-auth-dots">
        <div class="passcode-auth-dot"></div>
        <div class="passcode-auth-dot"></div>
        <div class="passcode-auth-dot"></div>
        <div class="passcode-auth-dot"></div>
      </div>
      <p>Enter the password</p>
      <div class="passcode-auth-numbers">
        <div class="passcode-auth-number"><span>1</span></div>
        <div class="passcode-auth-number"><span>2</span></div>
        <div class="passcode-auth-number"><span>3</span></div>
        <div class="passcode-auth-number"><span>4</span></div>
        <div class="passcode-auth-number"><span>5</span></div>
        <div class="passcode-auth-number"><span>6</span></div>
        <div class="passcode-auth-number"><span>7</span></div>
        <div class="passcode-auth-number"><span>8</span></div>
        <div class="passcode-auth-number"><span>9</span></div>
        <div class="passcode-auth-number"><span>0</span></div>
      </div>`;

      let input = '';
      const dots = Array.from(this.querySelectorAll('.passcode-auth-dot'));
      const numbers = Array.from(this.querySelectorAll('.passcode-auth-number'));
      for (let number of numbers) {
        number.addEventListener('click', async event => {
          if (dots.length === input.length) {
            return;
          }
          number!.classList.add('passcode-auth-number-grow');
          const target = event.currentTarget as HTMLElement;
          input += target.querySelector('span')!.textContent;
          dots[input.length - 1].classList.add('passcode-auth-dot-active');
          if (input.length >= 4) {
            const success = this.passcode === input;
            if (success) {
              dots.forEach(dot => dot.classList.add('passcode-auth-correct'));
              document.body.classList.add('passcode-auth-correct');
            } else {
              dots.forEach(dot => dot.classList.add('passcode-auth-wrong'));
              document.body.classList.add('passcode-auth-wrong');
            }
            setTimeout(() => {
              dots.forEach(dot => dot.classList.remove('passcode-auth-dot-active', 'passcode-auth-wrong', 'passcode-auth-correct'));
              input = '';
              this.resolve(success);
            }, 900);
            setTimeout(() => {
              document.body.classList.remove('passcode-auth-wrong', 'passcode-auth-correct');
            }, 1000);
          }
          setTimeout(() => {
            number.classList.remove('passcode-auth-number-grow');
          }, 1000);
        });
      }
  }
}

PasscodeAuth.define();
export default PasscodeAuth;