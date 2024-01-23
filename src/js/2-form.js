const feedback = document.querySelector('.feedback-form');
const email = feedback.elements.email;
const message = feedback.elements.message;

const parsedData =
  JSON.parse(localStorage.getItem('feedback-form-state')) || {};

email.value = parsedData.email || '';
message.value = parsedData.message || '';

const removeError = element => {
  element.classList.remove('error');
  element.removeAttribute('placeholder');
};

email.addEventListener('focus', () => {
  if (!email.classList.contains('focused')) {
    return;
  }
  removeError(email);
});

message.addEventListener('focus', () => {
  if (!message.classList.contains('focused')) {
    return;
  }
  removeError(message);
});

feedback.addEventListener('input', () => {
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({
      email: email.value.trim(),
      message: message.value.trim(),
    })
  );
});

feedback.addEventListener('submit', e => {
  if (!email.value.trim()) {
    e.preventDefault();
    email.classList.add('error', 'focused');
    email.setAttribute('placeholder', 'E-mail is required to proceed');
    return;
  }
  if (!message.value.trim()) {
    e.preventDefault();
    message.classList.add('error', 'focused');
    message.setAttribute('placeholder', 'Message is required to proceed');
    return;
  }
  e.preventDefault();
  console.log(parsedData);
  localStorage.removeItem('feedback-form-state');
  feedback.reset();
});

window.addEventListener(
  'load',
  () => {
    document.body.classList.add('visible');
  },
  { once: true }
);
