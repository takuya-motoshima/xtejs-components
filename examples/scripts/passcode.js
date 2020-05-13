import '../../dist/build.esm.js';

const correctPasscode = '1234';
const passcode = document.querySelector('#passcode');

// Event handler when passcode input is completed
passcode.authenticate(correctPasscode, success => {
  // If the passcode is correct, the success variable will be true.
  if (success) {
    alert('Authenticated Successfully');
  } else {
    alert('Authentication Failed');
  }
});
