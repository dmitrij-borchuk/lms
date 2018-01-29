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
    // TODO: add message like 'First admin successfully created'
    $emailTextField.removeClass(invalidMDLClass);
  }).catch((err) => {
    $emailTextFieldError.html(parseErrorText(err.responseJSON.message));
    $emailTextField.addClass(invalidMDLClass);
  });
});
