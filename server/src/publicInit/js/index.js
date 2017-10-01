const $button = $('#submit');
const $email = $('#email');
const $emailTextField = $('#emailTextField');
const $emailTextFieldError = $('#emailTextField .mdl-textfield__error');
const invalidMDLClass = 'is-invalid';

function parseErrorText(txt) {
  return txt.replace(/^[^\[]*\[/, '').replace(/\][^\]]*$/, '');
}

$button.on('click', () => {
  $.ajax('/init/set-email', {
    method: 'post',
    data: {
      email: $email.val(),
    },
  }).then(() => {
    // TODO
  }).catch((err) => {
    $emailTextFieldError.html(parseErrorText(err.responseJSON.message));
    $emailTextField.addClass(invalidMDLClass);
  });
});
