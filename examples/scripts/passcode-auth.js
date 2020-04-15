import '../../dist/build.esm.js';

const correctPasscode = '1234';
const passcodeAuth = document.querySelector('#passcodeAuth');

// Event handler when passcode input is completed
passcodeAuth.authenticate(correctPasscode, success => {
  // If the passcode is correct, the success variable will be true.
  if (success) {
    alert('Authenticated Successfully');
  } else {
    alert('Authentication Failed');
  }
});
