import '../../dist/build.esm.js';

const passcodeAuth = document.querySelector('#passcodeAuth');
passcodeAuth.authenticate('1234', success => {
  if (success) {
    alert('Authenticated Successfully');
  } else {
    alert('Authentication Failed');
  }
});
